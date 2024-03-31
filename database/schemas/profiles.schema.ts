import { Entitlements } from "@/server-actions/entitlements/entitlements.models"
import { pgTable, text } from "drizzle-orm/pg-core"
import { createSelectSchema } from "drizzle-zod"
import { z } from "zod"
import { UserTable } from "./users.schema"
import { Wallet } from "./wallets.schema"

export const UserProfileTable = pgTable("user_profile", {
  userId: text("user_id")
    .references(() => UserTable.id, {
      onDelete: "cascade",
    })
    .primaryKey(),
})

const UserProfileBaseSchema = createSelectSchema(UserProfileTable)
export type UserProfile = z.infer<typeof UserProfileBaseSchema>
export type CompletUserProfile = {
  mainWallet: Wallet
  wallets: Wallet[]
  entitlements: Entitlements
}
