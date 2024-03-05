"use server"

import {
  NewProjectParams,
  ProjectId,
  UpdateProjectParams,
  insertProjectParams,
  projectIdSchema,
  updateProjectParams,
} from "@/database/schemas/projects.schema"
import { revalidatePath } from "next/cache"
import {
  addTagsToProject,
  createProject,
  deleteProject,
  updateProject,
} from "./projects.mutations"
import { getAllProjectsQuery, getProjectBySlugQuery } from "./projects.queries"

const revalidateProjects = () => revalidatePath("/projects")

export const createProjectAction = async (input: NewProjectParams) => {
  const payload = insertProjectParams.parse(input)
  await createProject(payload)
  revalidateProjects()
}

export const addTagsToProjectAction = async (
  projectId: number,
  newTags: number[]
) => {
  await addTagsToProject(projectId, newTags)
  revalidateProjects()
}

export const updateProjectAction = async (input: UpdateProjectParams) => {
  const payload = updateProjectParams.parse(input)
  await updateProject(payload.id, payload)
  revalidateProjects()
}

export const deleteProjectAction = async (input: ProjectId) => {
  const payload = projectIdSchema.parse({ id: input })
  await deleteProject(payload.id)
  revalidateProjects()
}

export const getAllProjectsAction = async () => {
  const projects = await getAllProjectsQuery()
  return projects
}

export const getProjectBySlugAction = async (slug: string) => {
  const project = await getProjectBySlugQuery(slug)
  return project
}
