"use server"

import { db } from "@/database/database"
import {
  InsertProjectSchema,
  NewProjectParams,
  ProjectIdSchema,
  ProjectTable,
  updateProjectSchema,
} from "@/database/schemas/projects.schema"
import { ProjectTagTable } from "@/database/schemas/tags.schema"
import { and, eq } from "drizzle-orm"
import { getProjectTagIdsQuery } from "./projects.queries"

// TODO: Add validation schemas to all inputs
// TODO: Add proper logs and error handling

export const createProjectMutation = async (
  project: NewProjectParams,
  userId: string
) => {
  try {
    const newProject = InsertProjectSchema.parse({
      ...project,
      userId,
    })
    const [p] = await db.insert(ProjectTable).values(newProject).returning()
    return { project: p }
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again"
    console.error(message)
    throw { error: message }
  }
}

export const updateProjectMutation = async (
  id: number,
  project: NewProjectParams,
  userId: string
) => {
  const newProject = updateProjectSchema.parse({
    ...project,
    userId,
    updatedAt: new Date(),
  })
  try {
    const [p] = await db
      .update(ProjectTable)
      .set(newProject)
      .where(and(eq(ProjectTable.id, id), eq(ProjectTable.userId, userId)))
      .returning()
    if (!p.id) throw "Failed to create"
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
  try {
    if (newTags.length > 3) {
      console.log("Too many tags")
      throw "Too many tags"
    }
    const existingTags = await getProjectTagIdsQuery(projectId)
    const tagsToRemove = existingTags.filter((tag) => !newTags.includes(tag))
    for (const tagId of tagsToRemove) {
      await db
        .delete(ProjectTagTable)
        .where(
          and(
            eq(ProjectTagTable.projectId, projectId),
            eq(ProjectTagTable.tagId, tagId)
          )
        )
    }
    const tagsToAdd = newTags
      .filter((tag) => !existingTags.includes(tag))
      .slice(0, 3 - (existingTags.length - tagsToRemove.length))
    for (const tagId of tagsToAdd) {
      await db.insert(ProjectTagTable).values({ projectId, tagId })
    }
    const updatedTags = await getProjectTagIdsQuery(projectId)
    return { updatedTags }
  } catch (error) {
    console.error(error)
    throw "Failed to update tags"
  }
}

export const deleteProjectMutation = async (id: number) => {
  const { id: projectId } = ProjectIdSchema.parse({ id })
  try {
    const [p] = await db
      .delete(ProjectTable)
      .where(and(eq(ProjectTable.id, projectId!)))
      .returning()
    return { project: p }
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again"
    console.error(message)
    throw { error: message }
  }
}
