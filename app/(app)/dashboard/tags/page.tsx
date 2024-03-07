import { DashboardTags } from "@/components/pages/dashboard-tags"
import { getAllTagsAction } from "@/server-actions/tags/tags.actions"

export default async function ProjectsPage() {
  const { tags } = await getAllTagsAction()
  return <DashboardTags tags={tags}></DashboardTags>
}
