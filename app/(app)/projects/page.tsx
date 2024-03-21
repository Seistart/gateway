import { appMetadata } from "@/config/meteada.config"
import { getMockProjects } from "@/mocks/projects.mocks"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import FilterProjects from "./FilterProjects"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  ...appMetadata.projects,
}

export default async function ProjectsPage() {
  //const { projects } = await getAllProjectsAction()
  const projects = getMockProjects()
  return (
    <div className="sm:p-12">
      {/* <div className="mb-5 text-center text-4xl">
        Discover SEI&#39;s most innovating projects
        <div className="mx-auto mt-10 max-w-[900px] text-center text-2xl">
          Search through our leading platform to find new innovations in this
          fast growing ecosystem
        </div>
      </div> */}
      <div className="flex w-full flex-col justify-between sm:flex-row sm:items-center">
        <h1 className="text-lg sm:text-2xl">
          Discover SEI&#39;s most innovating projects
        </h1>
        <FilterProjects />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/porjects/${project.slug}`}
            className="flex flex-col rounded-md shadow-xl"
          >
            <Image
              src={"/images/image1.png"}
              alt={project.name}
              width={300}
              height={300}
              className="rounded-t-md"
            />
            <div className="flex items-center gap-4 bg-neutral-800 px-4 py-2 text-center">
              <Image
                src={"/images/sei.jpg"}
                alt={project.name}
                width={45}
                height={45}
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
