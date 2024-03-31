import { getUser } from "@/auth/auth-guard"
import { CreateProject } from "@/components/pages/create-project"
import { Permission } from "@/server-actions/entitlements/entitlements.models"
import { getAllStagesAction } from "@/server-actions/stages/stages.actions"
import { getAllTagsAction } from "@/server-actions/tags/tags.actions"
import { redirect } from "next/navigation"

export default async function CreateProjectPage() {
  const [{ tags }, { stages }, { entitlements }] = await Promise.all([
    getAllTagsAction(),
    getAllStagesAction(),
    getUser(),
  ])
  if (entitlements && entitlements.permissions[Permission.ProjectSelfWrite]) {
    return <CreateProject tags={tags} stages={stages}></CreateProject>
  } else {
    redirect("/")
  }
}
