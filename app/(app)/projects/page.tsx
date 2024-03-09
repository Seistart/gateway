import { Projects } from "@/components/pages/projects"
import { appMetadata } from "@/config/meteada.config"
import { getAllProjectsAction } from "@/server-actions/projects/projects.actions"
import { Metadata } from "next"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  ...appMetadata.projects,
}

export default async function ProjectsPage() {
  const { projects } = await getAllProjectsAction()
  return (
    <>
      <Projects projects={projects}></Projects>
    </>
  )
}
