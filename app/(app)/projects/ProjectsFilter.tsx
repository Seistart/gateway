"use client"

import { FilterScreen } from "@/components/filter"
import Spinner from "@/components/spinner"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Project } from "@/database/schemas/projects.schema"
import { useFilterStore } from "@/stores/project-filter-store"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect } from "react"

export default function FilterProjects({
  initialProjects,
}: {
  initialProjects: Project[]
}) {
  const {
    projects,
    filter,
    resetFilters,
    setProjects,
    updateFilter,
    filteredProjects,
    isLoading,
  } = useFilterStore()

  useEffect(() => {
    // Fetch and set projects from db here
    if (projects.length === 0) {
      setProjects(initialProjects)
    }
  }, [setProjects])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateFilter({ searchTerm: event.target.value })
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="flex h-[85vh] gap-4 overflow-hidden">
      <div className="flex w-[23.2rem] items-center gap-4">
        <FilterScreen close={false} />
      </div>

      {filteredProjects.length === 0 ? (
        <div className="mt-10 flex w-full justify-center">
          No Projects found
        </div>
      ) : (
        <div className="projects-grid overflow-y-scroll">
          <div className="grid grid-cols-2 gap-4 overflow-hidden md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filteredProjects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
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
      )}
    </div>
  )
}
