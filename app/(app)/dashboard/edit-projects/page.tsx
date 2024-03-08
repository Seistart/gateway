import { EditProjects } from "@/components/pages/edit-projects"
import { getAllProjectsAction } from "@/server-actions/projects/projects.actions"

export default async function EditProjectsPage() {
  const { projects } = await getAllProjectsAction()
  return (
    <>
      <h1 className="my-4 text-2xl font-semibold">Edit Projects</h1>
      <EditProjects projects={projects}></EditProjects>
    </>
  )
}
