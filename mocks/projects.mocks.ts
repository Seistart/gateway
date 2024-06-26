import {
  ProjectWithTagsSchema,
  ProjectsResponseSchema,
} from "@/database/schemas/projects.schema"
import { getMockFn } from "@/utils/mock.utils"
import { faker } from "@faker-js/faker"
import { generateTags, tags } from "./tags.mock"

const seed = 1337 // Ensuring the use of the same seed for consistency

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

export const getMockProject = getMockFn(ProjectWithTagsSchema)
export const mockProject = getMockProject({
  overrideFn: (project) => {
    const _projectType = tags[Math.floor(Math.random() * tags.length)]
    project.mainTag = _projectType
    project.tags = [_projectType, ...generateTags([], _projectType)]
    project.description =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"

    return {
      ...project,
    }
  },
})
