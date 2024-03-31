"use server"

import { validateRequest } from "@/auth/auth-guard"
import { lucia } from "@/auth/lucia"
import { db } from "@/database/database"
import { UserProfileTable } from "@/database/schemas/profiles.schema"
import { RoleTable, UserRoleTable } from "@/database/schemas/roles.schema"
import { UserTable } from "@/database/schemas/users.schema"
import { MainWalletTable, WalletTable } from "@/database/schemas/wallets.schema"
import { env } from "@/env.mjs"
import { StdSignature } from "@cosmjs/amino"
import { verifyArbitrary } from "@sei-js/core"
import { and, eq } from "drizzle-orm"
import jwt from "jsonwebtoken"
import { Cookie, generateId } from "lucia"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Role } from "../entitlements/entitlements.models"
import { getUserEntitlements } from "../entitlements/entitlements.queries"
import { getCompleteUserProfileAction } from "../user-profile/user-profile.actions"
export const setAuthCookie = (cookie: Cookie) => {
  cookies().set(cookie.name, cookie.value, cookie.attributes)
}

interface ActionResult {
  error: string
}

export async function createUserAction(
  walletAddress: string,
  pathName: string
): Promise<ActionResult> {
  let userId
  try {
    const existingWallets = await db
      .select()
      .from(WalletTable)
      .where(and(eq(WalletTable.walletAddress, walletAddress)))
    if (existingWallets[0]?.userId) {
      userId = existingWallets[0].userId
    } else {
      userId = generateId(15)
      await db.insert(UserTable).values({
        id: userId,
      })
      const rows = await db
        .insert(WalletTable)
        .values({
          userId,
          walletAddress,
        })
        .returning()
      await db.insert(MainWalletTable).values({
        userId,
        walletId: rows[0]?.id,
      })
      await db.insert(UserProfileTable).values({
        userId,
      })
      const [{ id: roleId }] = await db
        .select({ id: RoleTable.id })
        .from(RoleTable)
        .where(eq(RoleTable.name, Role.User))

      await db.insert(UserRoleTable).values({ userId, roleId })
    }
    const entitlements = await getUserEntitlements(userId)
    const session = await lucia.createSession(userId, {
      entitlements: JSON.stringify(entitlements),
    })
    const sessionCookie = lucia.createSessionCookie(session.id)
    setAuthCookie(sessionCookie)
  } catch (e) {
    console.log(e)
  }
  return redirect(pathName)
}

export async function signOutAction() {
  const { session } = await validateRequest()
  if (!session) {
    return {
      error: "Unauthorized",
    }
  }
  await lucia.invalidateSession(session.id)
  const sessionCookie = lucia.createBlankSessionCookie()
  setAuthCookie(sessionCookie)
  return redirect("/")
}

export async function generateSignedMessageAction(walletAddress: string) {
  const message = {
    message: "SeiStart Authentication Request",
    walletAddress,
    description:
      "By selecting 'Sign' or 'Approve', you affirm ownership of this wallet. This procedure does not instigate any blockchain transactions nor will it result in any gas fees.",
    termsOfService: "https://seistart.com/legal/terms",
    privacyPolicy: "https://seistart.com/legal/privacy",
    uri: "https://seistart.io",
    nonce: crypto.randomUUID().slice(0, 10),
    issuedAt: new Date().toISOString(),
  }
  const signedJwtToken = jwt.sign(message, env.NEXTAUTH_JWT_SECRET, {
    expiresIn: 600,
  })
  return { jwt: signedJwtToken, message: message }
}

export async function singInSignUpAction(
  signedMessage: StdSignature,
  signedJwtToken: string
) {
  const isValidJwt = jwt.verify(signedJwtToken, env.NEXTAUTH_JWT_SECRET)
  if (!isValidJwt) {
    throw "Invalid JWT"
  }
  const { iat, exp, ...message } = jwt.decode(signedJwtToken) as jwt.JwtPayload
  const verified = await verifyArbitrary(
    message.walletAddress,
    JSON.stringify(message),
    signedMessage
  )
  if (!verified) {
    throw "Invalid Signature"
  } else {
    await signInUserAction(message.walletAddress)
    const { userProfile } = await getCompleteUserProfileAction()
    return userProfile
  }
}

export async function signInUserAction(walletAddress: string) {
  let userId
  try {
    const existingWallets = await db
      .select()
      .from(WalletTable)
      .where(and(eq(WalletTable.walletAddress, walletAddress)))
    if (existingWallets[0]?.userId) {
      userId = existingWallets[0].userId

      const entitlements = await getUserEntitlements(userId)
      const session = await lucia.createSession(userId, {
        entitlements: JSON.stringify(entitlements),
      })
      const sessionCookie = lucia.createSessionCookie(session.id)
      setAuthCookie(sessionCookie)
    } else {
      throw "No Access"
    }
  } catch (e) {
    console.log(e)
  }
}
