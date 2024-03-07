"use server"

import { authGuard } from "@/auth/auth-guard"
import {
  NewProjectSchema,
  NewProjectWithTagsParams,
} from "@/database/schemas/projects.schema"
import { revalidatePath } from "next/cache"
import {
  addTagsToProjectMutation,
  createProjectMutation,
  deleteProjectMutation,
  updateProjectMutation,
} from "./projects.mutations"
import { getAllProjectsQuery, getProjectBySlugQuery } from "./projects.queries"

// TODO: Add validation schemas to all inputs

// Admins, Moderators, and Users can create
export const createProjectWithTagsAction = async (
  newProjectWithTagsParams: NewProjectWithTagsParams
) => {
  await authGuard()
  const { tags, ...newProject } = newProjectWithTagsParams
  const payload = NewProjectSchema.parse(newProject)
  const { project } = await createProjectMutation(payload)
  await addTagsToProjectMutation(project.id, tags)
  revalidatePath("/")
  return project.slug
}

// Admins, Moderators, and Users can update. Users can only update their own project
export const updateProjectWithTagsAction = async (
  newProjectWithTagsParams: NewProjectWithTagsParams,
  projectId: number
) => {
  await authGuard()
  const { tags, ...newProject } = newProjectWithTagsParams
  const payload = NewProjectSchema.parse(newProject)
  const { project } = await updateProjectMutation(projectId, payload)
  await addTagsToProjectMutation(project.id, tags)
  revalidatePath("/")
  return project.slug
}

// Admins, Moderators, and Users can delete. Users can only delete their own project
export const deleteProjectAction = async (projectId: number) => {
  await authGuard()
  await deleteProjectMutation(projectId)
  await new Promise((resolve) => setTimeout(resolve, 1000)) // Wait for 1 second (not recommended for production)
  revalidatePath("/")
}

// Public
export const getAllProjectsAction = async () => {
  const projects = await getAllProjectsQuery()
  return projects
}

// Public
export const getProjectBySlugAction = async (slug: string) => {
  const project = await getProjectBySlugQuery(slug)
  return project
}
