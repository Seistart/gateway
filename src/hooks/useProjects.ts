// Adjust the import path as needed

import { MockProjects } from "@/data/projects.mock";
import { useProjectStore } from "@/state";
import { useEffect } from "react";

export function useProjects() {
  //   const { data, error } = useSWR('/api/projects', fetcher); // Adjust the API endpoint as needed
  const data = MockProjects;
  const setProjects = useProjectStore((state) => state.setProjects);

  useEffect(() => {
    if (data) {
      setProjects(data);
    }
  }, [data, setProjects]);

  return {
    projects: useProjectStore((state) => state.projects),
    filteredProjects: useProjectStore((state) => state.getFilteredProjects()),
    searchTerm: useProjectStore((state) => state.searchTerm),
    setSearchTerm: useProjectStore((state) => state.setSearchTerm),
    filter: useProjectStore((state) => state.filter),
    setTagFilter: useProjectStore((state) => state.setTagFilter),
    setStatusFilter: useProjectStore((state) => state.setStatusFilter),
    resetFilter: useProjectStore((state) => state.resetFilter),
    // isLoading: !error && !data,
    // isError: error,
  };
}
