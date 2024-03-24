import { projectTagSchema } from "@/utils/colors.utils"
import { getMockFn } from "@/utils/mock.utils"

// Convert the z.enum to an array
export const tags = projectTagSchema.options

export const generateTags = (
  existingTags = [] as string[],
  projectType: string
) => {
  const allExcludedTags = [...existingTags, projectType]

  const filteredTags = tags.filter((tag) => !allExcludedTags.includes(tag))

  const shuffledTags = filteredTags.sort(() => 0.5 - Math.random())

  return shuffledTags.slice(0, 2)
}

export const getMockTags = getMockFn(projectTagSchema)

// export const mockTags = getMockTags({
//   overrideFn: (tags: projectTag[]) => {
//     const _projectType =
//       tags[faker.number.int({ min: 0, max: tags.length - 1 })]

//     return {
//       tags: [_projectType, ...generateTags([], _projectType)],
//     }
//   },
// })
