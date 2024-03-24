"use client"

import Spinner from "@/components/spinner"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Project } from "@/database/schemas/projects.schema"
import { useFilterStore } from "@/stores/project-filter-store"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect } from "react"
import TagFilter from "./TagFilter"

export default function FilterProjects({
  initialProjects,
}: {
  initialProjects: Project[]
}) {
  const {
    projects,
    searchFilter,
    setSearchFilter,
    resetFilters,
    setProjects,
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
    setSearchFilter(event.target.value)
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div>
      <div className="flex items-center gap-4">
        <Input
          type="text"
          placeholder="Search projects..."
          value={searchFilter}
          onChange={handleInputChange}
          className="input h-12 rounded-none"
        />
        <Button
          variant="outline"
          className="justify center h-12 items-center bg-white p-0 text-neutral-800"
          onClick={resetFilters}
        >
          Restet Filters
        </Button>
      </div>
      <TagFilter />

      {filteredProjects.length === 0 ? (
        <div className="mt-10 flex w-full justify-center">
          No Projects found
        </div>
      ) : (
        <div className="projects-grid">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
