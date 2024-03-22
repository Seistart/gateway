import {
  integer,
  pgTable,
  primaryKey,
  serial,
  varchar,
} from "drizzle-orm/pg-core"
import { createSelectSchema } from "drizzle-zod"
import { z } from "zod"
import { ProjectTable } from "./projects.schema"

export const TagTable = pgTable("tag", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).unique().notNull(),
})

export const ProjectTagTable = pgTable(
  "project_tag",
  {
    projectId: integer("project_id")
      .references(() => ProjectTable.id, {
        onDelete: "cascade",
      })
      .notNull(),
    tagId: integer("tag_id")
      .references(() => TagTable.id, {
        onDelete: "cascade",
      })
      .notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.projectId, table.tagId] }),
    }
  }
)

const tagsBaseSchema = createSelectSchema(TagTable)
export type Tag = z.infer<typeof tagsBaseSchema>
