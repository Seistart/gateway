import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle"
import { pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { db } from "../database"
import { UserTable } from "./users.schema"

export const SessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }),
  entitlements: text("entitlements").notNull(),
  expiresAt: timestamp("expires_at", {
    mode: "date",
  }).notNull(),
})

export const adapter = new DrizzlePostgreSQLAdapter(db, SessionTable, UserTable)
