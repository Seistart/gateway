import { Project } from "@/database/schemas/projects.schema"
import { create } from "zustand"

interface FilterCriteria {
  searchTerm: string
  mainTag: string[]
  tags: string[]
  stage: string
}

interface FilterState {
  projects: Project[]
  filteredProjects: Project[]
  filter: FilterCriteria
  isLoading: boolean
  setProjects: (projects: Project[]) => void
  updateFilter: (criteria: Partial<FilterCriteria>) => void
  toggleMainTagFilter: (tag: string) => void
  resetFilters: () => void
}

export const useFilterStore = create<FilterState>((set) => ({
  projects: [],
  filteredProjects: [],
  filter: {
    tags: [],
    stage: "",
    mainTag: [],
    searchTerm: "",
  },
  isLoading: true,
  setProjects: (projects) =>
    set((state) => {
      // Apply the current filter criteria to the new projects list
      const filteredProjects = projects.filter((project) =>
        projectMatchesFilter(project, state.filter)
      )

      return { projects, filteredProjects, isLoading: false }
    }),
  updateFilter: (criteria) =>
    set((state) => {
      const newFilter = { ...state.filter, ...criteria }
      const filteredProjects = state.projects.filter((project) =>
        projectMatchesFilter(project, newFilter)
      )
      return { filter: newFilter, filteredProjects }
    }),

  // Action to toggle a mainTag in the filter
  toggleMainTagFilter: (tag: string) =>
    set((state) => {
      const newMainTagFilter = state.filter.mainTag.includes(tag)
        ? state.filter.mainTag.filter((t) => t !== tag) // Remove the tag
        : [...state.filter.mainTag, tag] // Add the tag

      // Update the filter and re-apply it
      const newFilter = { ...state.filter, mainTag: newMainTagFilter }
      const filteredProjects = state.projects.filter((project) =>
        projectMatchesFilter(project, newFilter)
      )

      return { ...state, filter: newFilter, filteredProjects }
    }),

  resetFilters: () =>
    set((state) => ({
      filter: {
        tags: [],
        stage: "",
        mainTag: [],
        searchTerm: "",
      },
      filteredProjects: state.projects,
    })),
}))

function projectMatchesFilter(
  project: Project,
  filter: FilterCriteria
): boolean {
  const matchesSearchTerm = project.name
    .toLowerCase()
    .includes(filter.searchTerm.toLowerCase())
  const matchesTags =
    filter.tags.length === 0 || filter.tags.includes(project.mainTag)
  const matchesStage = !filter.stage || project.stage === filter.stage
  const matchesMainTag =
    filter.mainTag.length === 0 || filter.mainTag.includes(project.mainTag)

  return matchesSearchTerm && matchesTags && matchesStage && matchesMainTag
}
