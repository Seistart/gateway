import { Button } from "@/components/ui/button"
import { projectTagSchema } from "@/database/schemas/projects.schema"
import { useFilterStore } from "@/stores/project-filter-store"

const TagFilter = () => {
  const { mainTagFilter, setMainTagFilter } = useFilterStore()

  return (
    <div className="flex h-44 w-full flex-wrap gap-2 leading-none">
      {projectTagSchema.options.map((tag) => (
        <Button
          key={tag}
          variant="outline"
          onClick={() => setMainTagFilter(tag)}
          className={`my-1 w-auto px-3 py-2 ${mainTagFilter.includes(tag) ? "bg-white text-neutral-800" : ""}`}
        >
          {tag}
        </Button>
      ))}
    </div>
  )
}

export default TagFilter
