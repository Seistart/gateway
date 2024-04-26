import { projectTagSchema } from "@/database/schemas/projects.schema"
import { useFilterStore } from "@/stores/project-filter-store"
import { debounce } from "@/utils/debounce"
import { stages } from "@/utils/mock.utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { DoubleArrowRightIcon } from "@radix-ui/react-icons"
import * as React from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form"
import { FilterFormField } from "./FilterFormField"

type Props = {
  close: boolean
}

// Define form schema
export const FormSchema = z.object({
  searchTerm: z.string().optional(),
  tags: z.array(z.string()),
  stage: z.array(z.string()),
})

export const FilterScreen = ({ close }: Props) => {
  const { filter, filteredProjects, resetFilters, updateFilter } =
    useFilterStore()
  const [showFilters, setShowFilters] = useState<boolean>(true)
  const [reset, setReset] = useState<boolean>(false)

  const ready = true // changed uppon loading graph

  // Tags - Derived from the tags schema
  // const tags = projectTagSchema.options

  const tagsOptions = projectTagSchema.options.map((tag) => ({
    value: tag, // or any logic to assign value
    label: tag, // or any logic to transform tag into a more readable label if necessary
  }))

  // Given stages array
  const stagesOptions = stages.map((stage) => ({
    value: stage.toLowerCase().replace(/\W+/g, "_"), // Transforming "Local/Private" to "local_private", etc.
    label: stage, // Keeping the original string as the label
  }))

  React.useEffect(() => {
    if (!ready) {
      setShowFilters(true)
    }
  }, [ready, setShowFilters])

  const methods = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      searchTerm: filter.searchTerm,
      tags: filter.mainTag,
      stage: filter.stage,
    },
  })

  // Create a debounced function to handle updates
  const debouncedUpdateFilter = React.useCallback(
    debounce((newFilter) => {
      updateFilter(newFilter)
    }, 300),
    [updateFilter]
  ) // Debounce period is 300 ms

  const { searchTerm, tags, stage } = methods.watch()

  React.useEffect(() => {
    const newFilter = { searchTerm, tags, stage }
    debouncedUpdateFilter(newFilter)
  }, [searchTerm, tags, stage, debouncedUpdateFilter])

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    updateFilter({
      searchTerm: data.searchTerm,
      mainTag: data.tags,
      stage: data.stage,
    })
    close && setShowFilters(false)
  }

  const handleResetFilters = () => {
    resetFilters()
    methods.reset({
      searchTerm: "",
      tags: [],
      stage: [],
    })
    setReset(!reset)
    close && setShowFilters(false)
  }

  return (
    <div
      className={`relative bg-white text-sm transition-all duration-300 ease-out ${showFilters ? "max-w-[18rem]" : "max-w-0"} z-1 relative left-0 flex h-full flex-1 flex-col `}
    >
      {close && (
        <Button
          onClick={() => setShowFilters(!showFilters)}
          variant="outline"
          shadow="none"
          className={`absolute right-[-2.21rem] top-6 z-10 m-0 h-9 w-9 bg-gray-800 p-2.5 text-white transition-transform duration-300 ${showFilters ? "rotate-180" : "rotate-0"}`}
        >
          <DoubleArrowRightIcon className="h-4 w-4" />
        </Button>
      )}

      <div
        className={`scrollbar-left h-full w-full overflow-y-scroll px-2 text-neutral-800  ${showFilters ? "visible" : "hidden"}`}
      >
        <div className="flex w-full items-center justify-between py-4">
          <div className="text-left text-sm text-neutral-800">
            Visible projects: {filteredProjects.length}
          </div>
        </div>
        <Form {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className={`flex min-w-12 flex-col space-y-4`}
          >
            <FormField
              control={methods.control}
              name="searchTerm"
              render={() => (
                <>
                  <FormLabel className="text-sm font-bold">Search</FormLabel>
                  <FormControl>
                    <FormItem className="flex flex-col">
                      <input
                        id="searchTerm"
                        {...methods.register("searchTerm")}
                        className="relative border bg-white px-3 py-2 text-sm text-gray-600 placeholder-gray-300 shadow outline-none focus:outline-none focus:ring"
                        placeholder="Enter search term..."
                      />
                    </FormItem>
                  </FormControl>
                </>
              )}
            />
            <FilterFormField
              key="tags"
              name="tags"
              methods={methods}
              items={tagsOptions}
            />
            <FilterFormField
              key="stage"
              name="stage"
              methods={methods}
              items={stagesOptions}
            />

            <div className="absolute bottom-0 ml-[-.5rem] flex justify-between">
              <Button
                onClick={(e) => {
                  e.preventDefault()
                  handleResetFilters()
                }}
                variant={"outline"}
                className="text-white"
              >
                Reset
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
