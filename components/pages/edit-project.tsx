import { Project } from "@/database/schemas/projects.schema"
import { Tag } from "@/database/schemas/tags.schema"
import CreateProjectForm from "../dashboard/create-project-form"

interface EditProjectProps {
  tags: Tag[]
  project: Project
}

export const EditProject = ({ tags, project }: EditProjectProps) => {
  return <CreateProjectForm tags={tags} project={project}></CreateProjectForm>
}
