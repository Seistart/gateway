import { getUser } from "@/auth/auth-guard"
import { DashboardTags } from "@/components/pages/dashboard-tags"
import { Role } from "@/server-actions/entitlements/entitlements.models"
import { getAllTagsAction } from "@/server-actions/tags/tags.actions"
import { redirect } from "next/navigation"

export default async function ProjectsPage() {
  const [{ tags }, { entitlements }] = await Promise.all([
    getAllTagsAction(),
    getUser(),
  ])
  if (!entitlements || entitlements.role !== Role.Admin) redirect("/")

  return <DashboardTags tags={tags}></DashboardTags>
}
