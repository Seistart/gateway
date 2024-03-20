"use server"

import { db } from "@/database/database"
import { TagTable } from "@/database/schemas/tags.schema"

// TODO: Add validation schemas to all inputs

export const getAllTagsQuery = async () => {
  const rows = await db.select().from(TagTable).orderBy(TagTable.id)
  return { tags: rows }
}
