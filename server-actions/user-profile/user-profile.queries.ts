"use server"

import { getUser } from "@/auth/auth-guard"
import { db } from "@/database/database"
import {
  CompletUserProfile,
  UserProfileTable,
} from "@/database/schemas/profiles.schema"
import { MainWalletTable, WalletTable } from "@/database/schemas/wallets.schema"
import { eq } from "drizzle-orm"

export async function getUserProfileQuery() {
  const { userId } = await getUser()
  if (!userId) return { userProfile: null }
  try {
    const rows = await db
      .select()
      .from(UserProfileTable)
      .where(eq(UserProfileTable.userId, userId))
    return { userProfile: rows[0] || null }
  } catch (error) {
    console.error("Error fetching user profile:", error)
    return { userProfile: null }
  }
}

export async function getCompleteUserProfileQuery() {
  const { userId, entitlements } = await getUser()
  if (!userId) return { userProfile: null }

  try {
    const [userProfileRows, userWalletRows, mainWalletRows] = await Promise.all(
      [
        db
          .select()
          .from(UserProfileTable)
          .where(eq(UserProfileTable.userId, userId)),
        db.select().from(WalletTable).where(eq(WalletTable.userId, userId)),
        db
          .select()
          .from(MainWalletTable)
          .leftJoin(WalletTable, eq(MainWalletTable.walletId, WalletTable.id))
          .where(eq(MainWalletTable.userId, userId)),
      ]
    )

    const mainWallet =
      mainWalletRows.length > 0 ? mainWalletRows[0].wallet : null
    const filteredUserWallets = userWalletRows.filter(
      (wallet) => wallet.id !== mainWallet?.id
    )

    const userProfile = {
      userProfile: userProfileRows[0] || null,
      wallets: filteredUserWallets,
      mainWallet,
      entitlements,
    } as CompletUserProfile

    return { userProfile }
  } catch (error) {
    console.error("Error fetching complete user profile:", error)
    return { userProfile: null }
  }
}
