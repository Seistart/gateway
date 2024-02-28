import { CompleteProject } from '@/lib/db/schema/projects'
import { create } from 'zustand'

export interface ProjectFilter {
  tag: string | null
  status: string | null
}

export interface ProjectStore {
  projects: CompleteProject[]
  searchTerm: string
  filter: ProjectFilter
  setSearchTerm: (term: string) => void
  setProjects: (projects: CompleteProject[]) => void
  getFilteredProjects: () => CompleteProject[]
  setTagFilter: (tag: string | null) => void
  setStatusFilter: (status: string | null) => void
  resetFilter: () => void
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: [],
  searchTerm: '',
  filter: {
    tag: null,
    status: null,
  },
  getFilteredProjects: () => {
    const { searchTerm } = get()
    const searchTermsLower = searchTerm
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean)
    return get().projects.filter(({ projectName, tags }) => {
      const matchesSearchTerm =
        searchTermsLower.length === 0 ||
        searchTermsLower.every(
          (term) =>
            projectName.toLowerCase().includes(term) ||
            tags.some((tag: string) => tag.toLowerCase().includes(term))
          // TODO: Add any fields we want to be able to search by term
        )
      // TODO: Add any fields we want to be able to search by filter
      // const matchesFilterTag = filter.tag
      //   ? projectType.includes(filter.tag)
      //   : true
      return matchesSearchTerm
    })
  },
  setSearchTerm: (term) => set(() => ({ searchTerm: term })),
  setProjects: (projects) => set(() => ({ projects })),
  setTagFilter: (tag) => set(({ filter }) => ({ filter: { ...filter, tag } })),
  setStatusFilter: (status) =>
    set(({ filter }) => ({ filter: { ...filter, status } })),
  resetFilter: () => set({ filter: { status: null, tag: null } }),
}))
