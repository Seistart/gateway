import { Button } from "@/components/ui/button"
import { appMetadata } from "@/config/meteada.config"
import { mockProjects } from "@/mocks/projects.mocks"
import { Fullscreen } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"
import FilterProjects from "./ProjectsFilter"

export const metadata: Metadata = {
  ...appMetadata.projects,
}

export default async function ProjectsPage() {
  // const { projects } = await getAllProjectsAction()
  const projectsList = mockProjects(50)

  return (
    <div className="relative sm:p-6">
      <div className="flex w-full flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <h1 className="py-6 pb-12 text-lg sm:text-2xl">
          Journey Through the SEI Ecosystem
        </h1>
      </div>
      <div>
        <FilterProjects initialProjects={projectsList} />
      </div>
      <Link href="/ecosystem">
        <div className="h-18 w-18 fixed bottom-4 right-4 m-4 bg-white p-0">
          <Button
            className="z-50 m-0 h-12 w-12 p-0 text-neutral-800"
            size="sm"
            variant="ghost"
          >
            <Fullscreen />
          </Button>
        </div>
      </Link>
    </div>
  )
}
