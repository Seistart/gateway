import {
  projectTagSchema,
  stageSchema,
} from "@/database/schemas/projects.schema"
import { useFilterStore } from "@/stores/project-filter-store"
import { DoubleArrowRightIcon } from "@radix-ui/react-icons"
import * as React from "react"
import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

export const FilterScreen = () => {
  const {
    filter,
    resetFilters,
    updateFilter,
    toggleMainTagFilter,
    toggleStageFilter,
  } = useFilterStore()
  const [showFilters, setShowFilters] = useState(true)
  const [localFilter, setLocalFilter] = useState({
    searchTerm: filter.searchTerm,
    mainTag: [...filter.mainTag],
    stage: [...filter.stage],
  })

  const ready = true // changed uppon loading graph

  // Tags - Assuming projectTagSchema is imported and used similarly
  const tags = projectTagSchema.options

  // Stages - Derived from your stage schema
  const stages = stageSchema.options // Adjust according to the actual property

  React.useEffect(() => {
    if (!ready) {
      setShowFilters(true)
    }
  }, [ready, setShowFilters])

  const onClickFilter = () => setShowFilters(!showFilters)
  const handleSearchTermChange = (event: { target: { value: any } }) =>
    setLocalFilter({ ...localFilter, searchTerm: event.target.value })
  const handleTagChange = (tag: string) => {
    setLocalFilter((prev) => ({
      ...prev,
      mainTag: prev.mainTag.includes(tag)
        ? prev.mainTag.filter((t) => t !== tag)
        : [...prev.mainTag, tag],
      // Ensure other state parts remain unchanged
      searchTerm: prev.searchTerm,
      stage: prev.stage,
    }))
  }
  const handleStageChange = (stage: string) => {
    setLocalFilter((prev) => ({
      ...prev,
      stage: prev.stage.includes(stage)
        ? prev.stage.filter((t) => t !== stage)
        : [...prev.stage, stage],
      // Ensure other state parts remain unchanged
      searchTerm: prev.searchTerm,
      mainTag: prev.mainTag,
    }))
  }
  const applyFilters = () => updateFilter(localFilter)
  const handleResetFilters = () => {
    resetFilters()
    setLocalFilter({
      searchTerm: "",
      mainTag: [],
      stage: [],
    })
  }

  return (
    <div
      className={`relative bg-white transition-all duration-300 ease-out ${showFilters ? "max-w-[280px]" : "max-w-0"} relative left-0 z-20 flex h-full flex-1 `}
    >
      <Button
        variant={"ghost"}
        size="icon"
        className={`absolute right-[-1.7rem] top-8 z-10 m-0 self-start bg-gray-800 p-2 text-white `}
        onClick={onClickFilter}
      >
        <DoubleArrowRightIcon className="h4 w-4" />
      </Button>
      <div
        className={`w-full overflow-y-scroll p-2 text-neutral-800  ${showFilters ? "visible" : "hidden"}`}
      >
        <div className={`flex min-w-12 flex-col space-y-4  p-4 `}>
          <Input
            type="text"
            value={localFilter.searchTerm}
            onChange={handleSearchTermChange}
            placeholder="Search..."
            className="rounded-none border border-neutral-800 p-2"
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
                  checked={localFilter.mainTag.includes(tag)}
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
                  checked={localFilter.stage.includes(stage)}
                  onChange={() => handleStageChange(stage)}
                />
                <span>{stage}</span>
              </label>
            ))}
          </fieldset>

          <div className="flex space-x-2">
            <Button
              onClick={applyFilters}
              variant={"outline"}
              className="text-white"
            >
              Apply
            </Button>
            <Button
              onClick={handleResetFilters}
              variant={"outline"}
              className="text-white"
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
