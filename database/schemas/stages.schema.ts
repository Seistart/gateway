import { pgTable, serial, varchar } from "drizzle-orm/pg-core"
import { createSelectSchema } from "drizzle-zod"
import { z } from "zod"

export const StageTable = pgTable("stage", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).unique().notNull(),
})

const stageBaseSchema = createSelectSchema(StageTable)
export type Stage = z.infer<typeof stageBaseSchema>
