import { Stage } from "@/database/schemas/stages.schema"
import { Tag } from "@/database/schemas/tags.schema"
import CreateProjectForm from "../dashboard/create-project-form"

interface CreateProjectProps {
  tags: Tag[]
  stages: Stage[]
}

export const CreateProject = ({ tags, stages }: CreateProjectProps) => {
  return <CreateProjectForm tags={tags} stages={stages}></CreateProjectForm>
}
