"use client"

import { Button } from "@/components/ui/button"
import { Project } from "@/database/schemas/projects.schema"
import { useFilteredProjects } from "@/hooks/use-filtered-projects"
import Link from "next/link"
import { ProjectsFilter } from "../projects-filter"

export const Projects = ({
  projects: initialProjects,
}: {
  projects: Project[]
}) => {
  const { searchTerm, setSearchTerm, filteredProjects } =
    useFilteredProjects(initialProjects)

  return (
    <>
      <div className="container mx-auto items-center">
        <div className="my-20 text-center text-4xl">
          Discover SEI&#39;s most innovating projects
          <div className="mx-auto mt-10 max-w-[900px] text-center text-2xl">
            Search through our leading platform to find new innovations in this
            fast growing ecosystem
          </div>
        </div>
      </div>
      <ProjectsFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      ></ProjectsFilter>
      <div className="mx-auto grid grid-cols-2 place-items-center">
        {filteredProjects.map((project) => (
          <Link
            href={`/projects/${project.slug}`}
            key={project.id + project.slug}
          >
            <Button className="min-w-[400px]">
              <div className="flex flex-col">
                <div>{project.name}</div>
                <div> {project.tags.toString()}</div>
                <div> {project.name}</div>
              </div>
            </Button>
          </Link>
        ))}
      </div>
    </>
  )
}
