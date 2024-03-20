"use server"

import { getUser } from "@/auth/auth-guard"
import { db } from "@/database/database"
import { WalletTable } from "@/database/schemas/wallets.schema"
import { eq } from "drizzle-orm"

// TODO: Add validation schemas to all inputs

export const getAllWalletsQuery = async () => {
  const { userId } = await getUser()
  if (!userId) throw "ERROR"
  const rows = await db
    .select()
    .from(WalletTable)
    .where(eq(WalletTable.userId, userId))
    .orderBy(WalletTable.id)
  return { wallets: rows }
}
