"use server"

import { getUserAuth } from "@/auth/auth-guard"
import { db } from "@/database/database"
import {
  NewProjectParams,
  ProjectId,
  UpdateProjectParams,
  insertProjectSchema,
  projectIdSchema,
  projects,
  updateProjectSchema,
} from "@/database/schemas/projects.schema"
import { projectTags } from "@/database/schemas/tags.schema"
import { and, eq } from "drizzle-orm"
import { getProjectTagIdsQuery } from "./projects.queries"

export const createProject = async (project: NewProjectParams) => {
  const { session } = await getUserAuth()
  const userId = session?.user.id
  try {
    if (!userId) {
      throw "No userId"
    }
    const newProject = insertProjectSchema.parse({
      ...project,
      userId,
    })
    const [p] = await db.insert(projects).values(newProject).returning()
    return { project: p }
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again"
    console.error(message)
    throw { error: message }
  }
}

export const addTagsToProject = async (
  projectId: number,
  newTags: number[]
) => {
  const { session } = await getUserAuth()
  const userId = session?.user.id
  try {
    if (!userId) {
      throw "No userId"
    }
    if (newTags.length > 3) {
      throw "Too many tags"
    }
    const existingTags = await getProjectTagIdsQuery(projectId)
    const tagsToRemove = existingTags.filter((tag) => !newTags.includes(tag))
    for (const tagId of tagsToRemove) {
      await db
        .delete(projectTags)
        .where(
          and(
            eq(projectTags.projectId, projectId),
            eq(projectTags.tagId, tagId),
            eq(projectTags.userId, userId)
          )
        )
    }
    const tagsToAdd = newTags
      .filter((tag) => !existingTags.includes(tag))
      .slice(0, 3 - (existingTags.length - tagsToRemove.length))
    for (const tagId of tagsToAdd) {
      await db.insert(projectTags).values({ projectId, tagId, userId })
    }
    const updatedTags = await getProjectTagIdsQuery(projectId)
    return { updatedTags }
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again"
    console.error(message)
    throw { error: message }
  }
}

export const updateProject = async (
  id: ProjectId,
  project: UpdateProjectParams
) => {
  const { id: projectId } = projectIdSchema.parse({ id })
  const newProject = updateProjectSchema.parse({
    ...project,
  })
  try {
    const [p] = await db
      .update(projects)
      .set({ ...newProject, updatedAt: new Date() })
      .where(and(eq(projects.id, projectId!)))
      .returning()
    return { project: p }
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again"
    console.error(message)
    throw { error: message }
  }
}

export const deleteProject = async (id: ProjectId) => {
  const { id: projectId } = projectIdSchema.parse({ id })
  try {
    const [p] = await db
      .delete(projects)
      .where(and(eq(projects.id, projectId!)))
      .returning()
    return { project: p }
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again"
    console.error(message)
    throw { error: message }
  }
}
