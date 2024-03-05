import { Projects } from "@/components/pages/projects"
import { appMetadata } from "@/config/meteada.config"
import { getAllProjectsAction } from "@/server-actions/projects/projects.actions"
import { Metadata } from "next"

export const revalidate = 1

export const metadata: Metadata = {
  ...appMetadata.projects,
}

export default async function ProjectsPage() {
  try {
    const { projects } = await getAllProjectsAction()
    return (
      <>
        <Projects projects={projects}></Projects>
      </>
    )
  } catch {
    // TODO: Add Generic Error Component
    return "ErrorComponent"
  }
}
