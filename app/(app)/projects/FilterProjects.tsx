"use client"
import { ProjectsFilter } from "@/components/projects-filter"
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
import { useFilteredProjects } from "@/hooks/use-filtered-projects"
import { mockTags } from "@/mocks/projects.mocks"
import { cn } from "@/utils/tailwind.utils"

export default function FilterProjects({
  projects: initialProjects,
}: {
  projects: Project[]
}) {
  const tags = mockTags
  const { searchTerm, setSearchTerm, filteredProjects } =
    useFilteredProjects(initialProjects)
  return (
    <Sheet>
      <SheetTrigger className={cn(buttonVariants({ variant: "default" }))}>
        Filter
      </SheetTrigger>
      <SheetContent className="border-none">
        <SheetHeader>
          <SheetTitle>Filter</SheetTitle>
          <SheetDescription>Discover Our Various Tags</SheetDescription>
          <ProjectsFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          ></ProjectsFilter>
          <div className="grid grid-cols-2">
            {/* {tags.map((tag) => (
              <Link
                key={tag}
                href={`?tag=${tag}`}
                className={cn(buttonVariants({ variant: "default" }))}
              >
                {tag}
              </Link>
            ))} */}
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
