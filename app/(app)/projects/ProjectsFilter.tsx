"use client"
import { buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Project } from "@/database/schemas/projects.schema"
import { mockTags } from "@/mocks/projects.mocks"
import { useProjectStore } from "@/stores/project-filter-store"
import { cn } from "@/utils/tailwind.utils"
import { debounce } from "lodash"
import { useCallback, useEffect } from "react"

export default function FilterProjects({
  projects: initialProjects,
}: {
  projects: Project[]
}) {
  const { filter, setFilter, setProjects } = useProjectStore()
  const tags = mockTags
  // const { searchTerm, setSearchTerm, filteredProjects } =
  //   useFilteredProjects(initialProjects)

  useEffect(() => {
    // Here you would fetch the projects and set them. For demonstration, let's pretend we're fetching them.
    // const fetchProjects = async () => {
    //   const projects = await getAllProjectsAction();
    //   setProjects(projects);
    // };
    // fetchProjects();

    // Using mockProjects for demonstration
    setProjects(initialProjects)
  }, [setProjects])

  // Debounce setFilter action
  const debounceSetFilter = useCallback(
    debounce((nextValue) => setFilter(nextValue), 300),
    []
  )

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debounceSetFilter(event.target.value)
  }

  return (
    <Sheet>
      <SheetTrigger className={cn(buttonVariants({ variant: "default" }))}>
        Filter
      </SheetTrigger>
      <SheetContent className="border-none">
        <SheetHeader>
          <SheetTitle>Filter</SheetTitle>
          <SheetDescription>Discover Our Various Tags</SheetDescription>
          <input
            type="text"
            placeholder="Search projects..."
            value={filter}
            onChange={handleInputChange}
            className="input"
          />
          <div className="grid grid-cols-2"></div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
