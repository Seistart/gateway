import { integer, pgTable, primaryKey, serial, text } from "drizzle-orm/pg-core"
import { createSelectSchema } from "drizzle-zod"
import { z } from "zod"
import { UserTable } from "./users.schema"

export const WalletTable = pgTable("wallet", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .references(() => UserTable.id, {
      onDelete: "cascade",
    })
    .unique()
    .notNull(),
  walletAddress: text("wallet_address").notNull().unique(),
})

export const MainWalletTable = pgTable(
  "main_wallet",
  {
    userId: text("user_id")
      .references(() => UserTable.id, {
        onDelete: "cascade",
      })
      .notNull(),
    walletId: integer("wallet_id")
      .references(() => WalletTable.id, {
        onDelete: "cascade",
      })
      .notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.userId, table.walletId] }),
    }
  }
)

export const walletsBaseSchema = createSelectSchema(WalletTable)

export type Wallet = z.infer<typeof walletsBaseSchema>
