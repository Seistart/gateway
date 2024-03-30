import { Button } from "@/components/ui/button"
import { projectTagSchema } from "@/database/schemas/projects.schema"
import { useFilterStore } from "@/stores/project-filter-store"

const TagFilter = () => {
  const { filter, toggleMainTagFilter } = useFilterStore()

  console.log("filter", filter)

  return (
    <div className="flex h-44 w-full flex-wrap gap-2 leading-none">
      {projectTagSchema.options.map((tag) => (
        <Button
          key={tag}
          variant="outline"
          onClick={() => toggleMainTagFilter(tag)}
          className={`my-1 w-auto px-3 py-2 ${filter.mainTag.includes(tag) ? "bg-white text-neutral-800" : ""}`}
        >
          {tag}
        </Button>
      ))}
    </div>
  )
}

export default TagFilter
