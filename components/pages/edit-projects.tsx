"use client"

import { Project } from "@/database/schemas/projects.schema"
import { useFilteredProjects } from "@/hooks/use-filtered-projects"
import { DashboardProjectList } from "../dashboard/dashboard-project-list"
import { ProjectsFilter } from "../projects-filter"

interface EditProjectsProps {
  projects: Project[]
}

export const EditProjects = ({ projects }: EditProjectsProps) => {
  const { searchTerm, setSearchTerm, filteredProjects } =
    useFilteredProjects(projects)
  return (
    <>
      <ProjectsFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      ></ProjectsFilter>
      <div className="h-4"></div>
      <DashboardProjectList projects={filteredProjects}></DashboardProjectList>
    </>
  )
}
