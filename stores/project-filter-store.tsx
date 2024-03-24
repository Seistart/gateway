import { Project } from "@/database/schemas/projects.schema"
import { create } from "zustand"

export interface FilterState {
  projects: Project[]
  filteredProjects: Project[]
  searchFilter: string
  mainTagFilter: string[]
  isLoading: boolean
  setProjects: (projects: Project[]) => void
  setSearchFilter: (search: string) => void
  setMainTagFilter: (mainTag: string) => void
  resetFilters: () => void
}

export const useFilterStore = create<FilterState>((set) => ({
  projects: [],
  filteredProjects: [],
  searchFilter: "",
  mainTagFilter: [],
  isLoading: true,
  setProjects: (projects) =>
    set({ projects, filteredProjects: projects, isLoading: false }),
  setSearchFilter: (searchFilter) =>
    set((state) => ({
      searchFilter,
      filteredProjects: state.projects.filter((project) => {
        const matchesSearchFilter = project.name
          .toLowerCase()
          .includes(searchFilter.toLowerCase())
        const matchesMainTagFilter =
          state.mainTagFilter.length === 0 ||
          state.mainTagFilter.includes(project.mainTag)
        return matchesSearchFilter && matchesMainTagFilter
      }),
    })),
  setMainTagFilter: (tag) =>
    set((state) => {
      const newTags = state.mainTagFilter.includes(tag)
        ? state.mainTagFilter.filter((t) => t !== tag)
        : [...state.mainTagFilter, tag]

      return {
        mainTagFilter: newTags,
        filteredProjects: state.projects.filter((project) => {
          const matchesSearchFilter = project.name
            .toLowerCase()
            .includes(state.searchFilter.toLowerCase())
          const matchesMainTagFilter =
            newTags.length === 0 || newTags.includes(project.mainTag)
          return matchesSearchFilter && matchesMainTagFilter
        }),
      }
    }),
  resetFilters: () =>
    set((state) => ({
      mainTagFilter: [],
      filteredProjects: state.projects,
      searchFilter: "",
    })),
}))
