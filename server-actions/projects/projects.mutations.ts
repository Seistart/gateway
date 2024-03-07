"use server"

import { getUserAuth } from "@/auth/auth-guard"
import { db } from "@/database/database"
import {
  InsertProjectSchema,
  NewProjectParams,
  ProjectIdSchema,
  ProjectsTable,
  updateProjectSchema,
} from "@/database/schemas/projects.schema"
import { projectTags } from "@/database/schemas/tags.schema"
import { and, eq } from "drizzle-orm"
import { getProjectTagIdsQuery } from "./projects.queries"

// TODO: Add validation schemas to all inputs

export const createProjectMutation = async (project: NewProjectParams) => {
  const { session } = await getUserAuth()
  const userId = session?.user.id
  try {
    if (!userId) {
      throw "No userId"
    }
    const newProject = InsertProjectSchema.parse({
      ...project,
      userId,
    })
    const [p] = await db.insert(ProjectsTable).values(newProject).returning()
    return { project: p }
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again"
    console.error(message)
    throw { error: message }
  }
}

export const updateProjectMutation = async (
  id: number,
  project: NewProjectParams
) => {
  const { session } = await getUserAuth()
  const userId = session?.user.id
  const newProject = updateProjectSchema.parse({
    ...project,
    userId,
    updatedAt: new Date(),
  })
  try {
    const [p] = await db
      .update(ProjectsTable)
      .set(newProject)
      .where(and(eq(ProjectsTable.id, id)))
      .returning()
    return { project: p }
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again"
    console.error(message)
    throw { error: message }
  }
}

export const addTagsToProjectMutation = async (
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

export const deleteProjectMutation = async (id: number) => {
  const { id: projectId } = ProjectIdSchema.parse({ id })
  try {
    const [p] = await db
      .delete(ProjectsTable)
      .where(and(eq(ProjectsTable.id, projectId!)))
      .returning()
    return { project: p }
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again"
    console.error(message)
    throw { error: message }
  }
}
