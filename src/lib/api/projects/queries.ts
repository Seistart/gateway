import { getUserAuth } from '@/lib/auth/utils'
import { db } from '@/lib/db/index'
import {
  CompleteProject,
  projectIdSchema,
  projects,
  type ProjectId,
} from '@/lib/db/schema/projects'
import { projectTags, tags } from '@/lib/db/schema/tags'
import { mockProjects } from '@/lib/mock-data'
import { and, eq } from 'drizzle-orm'

export const getProjects = async () => {
  if (process.env.NODE_ENV === 'development') {
    return { projects: mockProjects }
  }
  const { session } = await getUserAuth()
  const rows = await db
    .select()
    .from(projects)
    .leftJoin(projectTags, eq(projects.id, projectTags.projectId))
    .leftJoin(tags, eq(projectTags.tagId, tags.id))
    .where(eq(projects.userId, session?.user.id!))

  const projectsWithTags = new Map()
  rows.forEach((row) => {
    const project = row.projects
    const tag = row.tags?.typeName
    if (!projectsWithTags.has(project.id)) {
      projectsWithTags.set(project.id, { ...project, tags: [] })
    }
    if (tag) {
      const projectToUpdate = projectsWithTags.get(project.id)
      projectToUpdate.tags.push(tag)
    }
  })
  const finalProjects = Array.from(projectsWithTags.values())
  return { projects: finalProjects as CompleteProject[] }
}

export const getProjectById = async (id: ProjectId) => {
  const { session } = await getUserAuth()
  const { id: projectId } = projectIdSchema.parse({ id })
  const [row] = await db
    .select()
    .from(projects)
    .where(
      and(eq(projects.id, projectId), eq(projects.userId, session?.user.id!))
    )
  if (row === undefined) return {}
  const p = row
  return { project: p }
}
