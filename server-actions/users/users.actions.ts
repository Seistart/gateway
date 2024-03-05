"use server"

import { validateRequest } from "@/auth/auth-guard"
import { lucia } from "@/auth/lucia"
import { genericError, validateAuthFormData } from "@/auth/utils"
import { db } from "@/database/database"
import { users } from "@/database/schemas/auth.schema"
import { eq } from "drizzle-orm"
import { Cookie, generateId } from "lucia"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Argon2id } from "oslo/password"

export const setAuthCookie = (cookie: Cookie) => {
  cookies().set(cookie)
}

interface ActionResult {
  error: string
}

export async function signInAction(
  _: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const { data, error } = validateAuthFormData(formData)
  if (error !== null) return { error }

  try {
    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, data.email.toLowerCase()))
    if (!existingUser) {
      return {
        error: "Incorrect username or password",
      }
    }

    const validPassword = await new Argon2id().verify(
      existingUser.hashedPassword,
      data.password
    )
    if (!validPassword) {
      return {
        error: "Incorrect username or password",
      }
    }

    const session = await lucia.createSession(existingUser.id, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    setAuthCookie(sessionCookie)

    return redirect("/dashboard")
  } catch (e) {
    return genericError
  }
}

export async function signUpAction(
  _: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const { data, error } = validateAuthFormData(formData)

  if (error !== null) return { error }

  const hashedPassword = await new Argon2id().hash(data.password)
  const userId = generateId(15)

  try {
    await db.insert(users).values({
      id: userId,
      email: data.email,
      hashedPassword,
    })
  } catch (e) {
    return genericError
  }

  const session = await lucia.createSession(userId, {})
  const sessionCookie = lucia.createSessionCookie(session.id)
  setAuthCookie(sessionCookie)
  return redirect("/dashboard")
}

export async function signOutAction(): Promise<ActionResult> {
  const { session } = await validateRequest()
  if (!session) {
    return {
      error: "Unauthorized",
    }
  }

  await lucia.invalidateSession(session.id)

  const sessionCookie = lucia.createBlankSessionCookie()
  setAuthCookie(sessionCookie)
  redirect("/sign-in")
}
