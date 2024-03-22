import { AspectRatio } from "@/components/ui/aspect-ratio"
import { appMetadata } from "@/config/meteada.config"
import { mockProjects } from "@/mocks/projects.mocks"
import { getAllProjectsAction } from "@/server-actions/projects/projects.actions"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  ...appMetadata.projects,
}

export default async function ProjectsPage() {
  const { projects } = await getAllProjectsAction()
  const projectsList = mockProjects(10)
  return (
    <div className="sm:p-12">
      {/* <div className="mb-5 text-center text-4xl">
        Discover SEI&#39;s most innovating projects
        <div className="mx-auto mt-10 max-w-[900px] text-center text-2xl">
          Search through our leading platform to find new innovations in this
          fast growing ecosystem
        </div>
      </div> */}
      <div className="flex w-full flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <h1 className="text-lg sm:text-2xl">
          Discover SEI&#39;s most innovating projects
        </h1>
        {/* <FilterProjects projects={projects}/> */}
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {projectsList.map((project) => (
          <Link
            key={project.id}
            href={`/porjects/${project.slug}`}
            className="flex flex-col rounded-md shadow-xl"
          >
            <AspectRatio ratio={1}>
              <Image
                src={"/images/image1.png"}
                alt={project.name}
                fill
                className="rounded-t-md"
              />
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
