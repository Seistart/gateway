import { AspectRatio } from "@/components/ui/aspect-ratio"
import { appMetadata } from "@/config/meteada.config"
import { mockProjects } from "@/mocks/projects.mocks"
import { getAllProjectsAction } from "@/server-actions/projects/projects.actions"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import FilterProjects from "./FilterProjects"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  ...appMetadata.projects,
}

export default async function ProjectsPage() {
  const { projects } = await getAllProjectsAction()
  const projectsList = mockProjects(10)

  return (
    <div className="sm:p-12">
      <div className="flex w-full flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <h1 className="text-lg sm:text-2xl">
          Journey Through the SEI Ecosystem
        </h1>
        <FilterProjects projects={projects} />
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {projectsList.map((project) => (
          <Link
            key={project.id}
            href={`/porjects/${project.slug}`}
            className="flex flex-col rounded-md shadow-xl"
          >
            <AspectRatio ratio={1} className="relative">
              <Image
                src={"/images/image1.png"}
                alt={project.name}
                fill
                className="rounded-t-md"
              />
              <div className="absolute right-4 top-4 bg-white px-2 py-1 text-xs text-neutral-950 opacity-90">
                {project.mainTag}
              </div>
            </AspectRatio>
            <div className="flex items-center gap-4 bg-neutral-800 px-4 py-2 text-center">
              <Image
                src={"/images/sei.jpg"}
                alt={project.name}
                width={30}
                height={30}
                className="rounded-full"
              />
              <p className="text-sm font-medium">{project.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
