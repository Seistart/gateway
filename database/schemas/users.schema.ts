import { pgTable, text } from "drizzle-orm/pg-core"

export const UserTable = pgTable("user", {
  id: text("id").primaryKey(),
})
