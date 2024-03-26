import {
  projectTagSchema,
  stageSchema,
} from "@/database/schemas/projects.schema"
import { useFilterStore } from "@/stores/project-filter-store"
import { DoubleArrowRightIcon } from "@radix-ui/react-icons"
import * as React from "react"

export const FilterScreen = () => {
  const {
    filter,
    resetFilters,
    updateFilter,
    toggleMainTagFilter,
    toggleStageFilter,
  } = useFilterStore()
  const [showFilters, setShowFilters] = React.useState(false)

  const ready = true // changed uppon loading graph

  // Tags - Assuming projectTagSchema is imported and used similarly
  const tags = projectTagSchema.options

  // Stages - Derived from your stage schema
  const stages = stageSchema.options // Adjust according to the actual property

  const onClickFilter = () => setShowFilters(!showFilters)

  React.useEffect(() => {
    if (!ready) {
      setShowFilters(false)
    }
  }, [ready, setShowFilters])

  const handleSearchTermChange = (event: { target: { value: any } }) => {
    updateFilter({ searchTerm: event.target.value })
  }

  const handleTagChange = (tag: string) => {
    // Assuming toggleMainTagFilter can handle toggling tags in an array
    toggleMainTagFilter(tag)
  }

  const handleStageChange = (stage: string) => {
    toggleStageFilter(stage)
  }

  return (
    <div
      className={`relative bg-white transition-all duration-300 ease-out ${showFilters ? "max-w-[280px]" : "max-w-0"} relative left-0 z-20 flex h-full flex-1 `}
    >
      <button
        onClick={onClickFilter}
        className={`absolute right-[-2.25rem] top-6 z-10 m-0 self-start bg-gray-800 p-2.5 text-white transition-transform duration-300 ${showFilters ? "rotate-180" : "rotate-0"}`}
      >
        <DoubleArrowRightIcon className="h-4 w-4" />
      </button>
      <div
        className={`w-full overflow-y-scroll p-2 text-neutral-800  ${showFilters ? "visible" : "hidden"}`}
      >
        <div className={`flex min-w-12 flex-col space-y-4  p-4 `}>
          <input
            type="text"
            value={filter.searchTerm}
            onChange={handleSearchTermChange}
            placeholder="Search..."
            className="border p-2 text-white"
          />

          <fieldset>
            <legend>Tags:</legend>
            {tags.map((tag) => (
              <label
                key={tag}
                className="inline-flex w-full items-center space-x-2"
              >
                <input
                  type="checkbox"
                  checked={filter.mainTag.includes(tag)}
                  onChange={() => handleTagChange(tag)}
                />
                <span>{tag}</span>
              </label>
            ))}
          </fieldset>

          <fieldset>
            <legend>Stage:</legend>
            {stages.map((stage) => (
              <label
                key={stage}
                className="inline-flex w-full items-center space-x-2"
              >
                <input
                  type="checkbox"
                  name="stage"
                  checked={filter.stage.includes(stage)}
                  onChange={() => handleStageChange(stage)}
                />
                <span>{stage}</span>
              </label>
            ))}
          </fieldset>

          <button
            onClick={resetFilters}
            className="rounded bg-blue-500 p-2 text-white"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  )
}
