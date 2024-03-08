import { Project } from "@/database/schemas/projects.schema"
import { DashboardProjectItem } from "./dashboard-project-item"

interface DashboardProjectListProps {
  projects: Project[]
}

export const DashboardProjectList = ({
  projects,
}: DashboardProjectListProps) => {
  return (
    <>
      <ul>
        {projects.map((project) => (
          <DashboardProjectItem
            project={project}
            key={project.id + project.name}
          ></DashboardProjectItem>
        ))}
      </ul>
    </>
  )
}
