import {
  InsertProjectSchema,
  ProjectsResponseSchema,
  projectTagSchema,
} from "@/database/schemas/projects.schema"
import { getMockFn } from "@/utils/mock.utils"

// Convert the z.enum to an array
const tags = projectTagSchema.options

const generateTagsWithNFT = (existingTags = [] as string[]) => {
  return Array.from(
    new Set(existingTags.map((_) => tags[Math.floor(Math.random() * 3)]))
  )
}

export const getMockProjects = getMockFn(ProjectsResponseSchema)

export const mockProjects = (size: number) => {
  return getMockProjects({
    length: size,
    overrideFn: (project) => {
      return {
        ...project,
        tags: [tags[Math.floor(Math.random() * tags.length)]],
        projectType: tags[Math.floor(Math.random() * tags.length)],
        communitySize: Math.round(Math.random() * 100000),
      }
    },
  })
}

export const getMockProject = getMockFn(InsertProjectSchema)
export const mockProject = getMockProject({
  overrideFn: (entry) => ({
    ...entry,
    projectType: "Dex",
  }),
})
