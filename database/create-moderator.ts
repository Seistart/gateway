import { Role } from "@/server-actions/entitlements/entitlements.models"
import { eq } from "drizzle-orm"
import { db } from "./database"
import { UserProfileTable } from "./schemas/profiles.schema"
import { RoleTable, UserRoleTable } from "./schemas/roles.schema"
import { UserTable } from "./schemas/users.schema"
import { MainWalletTable, WalletTable } from "./schemas/wallets.schema"

function generateId(length: number): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let result = ""
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

export async function createInitialModeratorAction(walletAddress: string) {
  const userId = generateId(15)
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
    .where(eq(RoleTable.name, Role.Moderator))
  await db.insert(UserRoleTable).values({
    userId,
    roleId,
  })
}

const walletAddress = process.argv[2]

const initModerator = async () => {
  await createInitialModeratorAction(walletAddress)
  process.exit(0)
}

initModerator().catch((err) => {
  console.error("❌ Migration failed")
  console.error(err)
  process.exit(1)
})
