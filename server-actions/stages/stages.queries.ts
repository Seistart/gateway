"use server"

import { db } from "@/database/database"
import { StageTable } from "@/database/schemas/stages.schema"

// TODO: Add validation schemas to all inputs

export const getAllStagesQuery = async () => {
  const rows = await db.select().from(StageTable).orderBy(StageTable.id)
  return { stages: rows }
}
