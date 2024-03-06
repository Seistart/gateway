import { Tag } from "@/database/schemas/tags.schema"
import CreateProjectForm from "../dashboard/create-project-form"

interface CreateProjectProps {
  tags: Tag[]
}

export const CreateProject = ({ tags }: CreateProjectProps) => {
  return <CreateProjectForm tags={tags}></CreateProjectForm>
}
