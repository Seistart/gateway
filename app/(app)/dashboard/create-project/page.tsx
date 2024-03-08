import { CreateProject } from "@/components/pages/create-project"
import { getAllTagsAction } from "@/server-actions/tags/tags.actions"

export default async function CreateProjectPage() {
  const { tags } = await getAllTagsAction()
  return <CreateProject tags={tags}></CreateProject>
}
