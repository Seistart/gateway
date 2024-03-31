import { getUser } from "@/auth/auth-guard"
import { EditProject } from "@/components/pages/edit-project"
import { Permission } from "@/server-actions/entitlements/entitlements.models"
import { getProjectBySlugAction } from "@/server-actions/projects/projects.actions"
import { getAllStagesAction } from "@/server-actions/stages/stages.actions"
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
  const [{ tags }, { stages }, { entitlements, userId }, { project }] =
    await Promise.all([
      getAllTagsAction(),
      getAllStagesAction(),
      getUser(),
      getProjectBySlugAction(params.slug),
    ])
  if (
    entitlements &&
    ((entitlements.permissions[Permission.ProjectSelfEdit] &&
      project.userId === userId) ||
      entitlements.permissions[Permission.ProjectAllEdit])
  ) {
    return (
      <EditProject stages={stages} project={project} tags={tags}></EditProject>
    )
  } else {
    redirect("/")
  }
}
