import { getUser } from "@/auth/auth-guard"
import { EditProjects } from "@/components/pages/edit-projects"
import { Permission } from "@/server-actions/entitlements/entitlements.models"
import {
  getAllProjectsAction,
  getAllProjectsByUserAction,
} from "@/server-actions/projects/projects.actions"
import { redirect } from "next/navigation"

export default async function EditProjectsPage() {
  const { entitlements, userId } = await getUser()
  if (entitlements && entitlements.permissions[Permission.ProjectAllEdit]) {
    const { projects } = await getAllProjectsAction()
    return (
      <>
        <h1 className="my-4 text-2xl font-semibold">Edit Projects</h1>
        <EditProjects projects={projects}></EditProjects>
      </>
    )
  } else if (
    entitlements &&
    entitlements.permissions[Permission.ProjectSelfEdit]
  ) {
    const { projects } = await getAllProjectsByUserAction(userId)
    return (
      <>
        <h1 className="my-4 text-2xl font-semibold">Edit Projects</h1>
        <EditProjects projects={projects}></EditProjects>
      </>
    )
  } else {
    redirect("/dashboard")
  }
}
