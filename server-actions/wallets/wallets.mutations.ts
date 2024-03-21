"use server"

import { getUser } from "@/auth/auth-guard"
import { db } from "@/database/database"
import { WalletTable } from "@/database/schemas/wallets.schema"
import { and, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function addWalletMutation(walletAddress: string) {
  const { userId } = await getUser()
  if (!userId) {
    throw "No user found"
  }
  await db.insert(WalletTable).values({
    userId,
    walletAddress,
  })
  revalidatePath("/")
}

export async function deleteWalletMutation(walletAddress: string) {
  const { userId } = await getUser()
  if (!userId) {
    throw "No user found"
  }
  await db
    .delete(WalletTable)
    .where(
      and(
        eq(WalletTable.walletAddress, walletAddress),
        eq(WalletTable.userId, userId)
      )
    )
    .returning()
  revalidatePath("/")
}
