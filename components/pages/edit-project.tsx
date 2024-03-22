import { Project } from "@/database/schemas/projects.schema"
import { Stage } from "@/database/schemas/stages.schema"
import { Tag } from "@/database/schemas/tags.schema"
import CreateProjectForm from "../dashboard/create-project-form"

interface EditProjectProps {
  tags: Tag[]
  project: Project
  stages: Stage[]
}

export const EditProject = ({ tags, project, stages }: EditProjectProps) => {
  return (
    <CreateProjectForm
      tags={tags}
      project={project}
      stages={stages}
    ></CreateProjectForm>
  )
}
