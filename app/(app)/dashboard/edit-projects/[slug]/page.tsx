import { getUser } from "@/auth/auth-guard"
import { EditProject } from "@/components/pages/edit-project"
import { Permission } from "@/server-actions/entitlements/entitlements.models"
import { getProjectBySlugAction } from "@/server-actions/projects/projects.actions"
import { getAllTagsAction } from "@/server-actions/tags/tags.actions"
import { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Edit Project",
}

export default async function EditProjectPage({
  params,
}: {
  params: { slug: string }
}) {
  const { entitlements, userId } = await getUser()
  const { project } = await getProjectBySlugAction(params.slug)
  if (
    entitlements &&
    ((entitlements.permissions[Permission.ProjectSelfEdit] &&
      project.userId === userId) ||
      entitlements.permissions[Permission.ProjectAllEdit])
  ) {
    const { tags } = await getAllTagsAction()
    return <EditProject project={project} tags={tags}></EditProject>
  } else {
    redirect("/dashboard")
  }
}
