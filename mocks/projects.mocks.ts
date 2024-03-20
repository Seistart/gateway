import {
  InsertProjectSchema,
  ProjectsResponseSchema,
  projectTagSchema,
} from "@/database/schemas/projects.schema"
import { getMockFn } from "@/utils/mock.utils"
import { faker } from "@faker-js/faker"

// Convert the z.enum to an array
const tags = projectTagSchema.options
const seed = 1337 // Ensuring the use of the same seed for consistency

const generateTags = (existingTags = [] as string[], projectType: string) => {
  const allExcludedTags = [...existingTags, projectType]

  const filteredTags = tags.filter((tag) => !allExcludedTags.includes(tag))

  const shuffledTags = filteredTags.sort(() => 0.5 - Math.random())

  return shuffledTags.slice(0, 2)
}

export const getMockProjects = getMockFn(ProjectsResponseSchema)

export const mockProjects = (size: number) => {
  return getMockProjects({
    length: size,
    seed: seed, // Explicitly setting the seed
    overrideFn: (project) => {
      const _projectType =
        tags[faker.number.int({ min: 0, max: tags.length - 1 })]
      return {
        ...project,
        mainTag: _projectType,
        tags: [_projectType, ...generateTags([], _projectType)],
        communitySize: faker.number.int({ min: 0, max: 100000 }),
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
      }
    },
  })
}

export const getMockProject = getMockFn(InsertProjectSchema)
export const mockProject = getMockProject({
  overrideFn: (entry) => ({
    ...entry,
    mainTag: "Dex",
  }),
})
