import { unstable_cache } from "next/cache"
import { getAllStagesQuery } from "./stages.queries"

export const getAllStagesAction = unstable_cache(async () => {
  const stages = await getAllStagesQuery()
  return stages
}, ["stages"])
