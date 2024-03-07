"use server"

import { db } from "@/database/database"
import { tags } from "@/database/schemas/tags.schema"

// TODO: Add validation schemas to all inputs

export const getAllTagsQuery = async () => {
  const rows = await db.select().from(tags).orderBy(tags.id)
  return { tags: rows }
}
