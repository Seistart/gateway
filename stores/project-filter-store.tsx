import { Project } from "@/database/schemas/projects.schema"
import { create } from "zustand"

interface ProjectState {
  projects: Project[]
  filteredProjects: Project[]
  filter: string
  setProjects: (projects: Project[]) => void
  setFilter: (filter: string) => void
}

export const useProjectStore = create<ProjectState>((set) => ({
  projects: [],
  filteredProjects: [],
  filter: "",
  setProjects: (projects) => set({ projects }),
  setFilter: (filter: string) => {
    set((state) => ({
      filter,
      filteredProjects: state.projects.filter((project) =>
        project.name.toLowerCase().includes(filter.toLowerCase())
      ),
    }))
  },
}))
