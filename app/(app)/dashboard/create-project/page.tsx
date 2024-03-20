import { getUser } from "@/auth/auth-guard"
import { CreateProject } from "@/components/pages/create-project"
import { Permission } from "@/server-actions/entitlements/entitlements.models"
import { getAllTagsAction } from "@/server-actions/tags/tags.actions"
import { redirect } from "next/navigation"

export default async function CreateProjectPage() {
  const { entitlements } = await getUser()
  if (entitlements && entitlements.permissions[Permission.ProjectSelfWrite]) {
    const { tags } = await getAllTagsAction()
    return <CreateProject tags={tags}></CreateProject>
  } else {
    redirect("/dashboard")
  }
}
