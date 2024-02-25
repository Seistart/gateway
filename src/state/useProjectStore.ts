import { create } from "zustand";
import { Project, ProjectStatus, ProjectTags } from "@/types/projects";

export interface ProjectFilter {
  tag: ProjectTags | null;
  status: ProjectStatus | null;
}

export interface ProjectStore {
  projects: Project[];
  searchTerm: string;
  filter: ProjectFilter;
  setSearchTerm: (term: string) => void;
  setProjects: (projects: Project[]) => void;
  getFilteredProjects: () => Project[];
  setTagFilter: (tag: ProjectTags | null) => void;
  setStatusFilter: (status: ProjectStatus | null) => void;
  resetFilter: () => void;
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: [],
  searchTerm: "",
  filter: {
    tag: null,
    status: null,
  },
  getFilteredProjects: () => {
    const { searchTerm, filter } = get();
    const searchTermsLower = searchTerm
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean);
    return get().projects.filter(
      ({ projectName, description, tags, status }) => {
        const matchesSearchTerm =
          searchTermsLower.length === 0 ||
          searchTermsLower.every(
            (term) =>
              projectName.toLowerCase().includes(term) ||
              status.toLowerCase().includes(term) ||
              tags.some((tag) => tag.toLowerCase().includes(term))
          );
        const matchesFilterTag = filter.tag ? tags.includes(filter.tag) : true;
        const matchesFilterStatus = filter.status
          ? status === filter.status
          : true;
        return matchesSearchTerm && matchesFilterTag && matchesFilterStatus;
      }
    );
  },
  setSearchTerm: (term) => set(() => ({ searchTerm: term })),
  setProjects: (projects) => set(() => ({ projects })),
  setTagFilter: (tag) => set(({ filter }) => ({ filter: { ...filter, tag } })),
  setStatusFilter: (status) =>
    set(({ filter }) => ({ filter: { ...filter, status } })),
  resetFilter: () => set({ filter: { status: null, tag: null } }),
}));
