import {
  projectTagSchema,
  stageSchema,
} from "@/database/schemas/projects.schema"
import { useFilterStore } from "@/stores/project-filter-store"
import { zodResolver } from "@hookform/resolvers/zod"
import { DoubleArrowRightIcon } from "@radix-ui/react-icons"
import * as React from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"

// Define form schema
const FormSchema = z.object({
  searchTerm: z.string().optional(),
  tags: z.array(z.string()), // Assuming this matches your actual schema
  stage: z.string(), // Assuming this matches your actual schema
})

export const FilterScreen = () => {
  const { filter, filteredProjects, resetFilters, updateFilter } =
    useFilterStore()
  const [showFilters, setShowFilters] = useState(true)

  const ready = true // changed uppon loading graph

  // Tags - Assuming projectTagSchema is imported and used similarly
  const tags = projectTagSchema.options

  // Stages - Derived from the stage schema
  const stages = stageSchema.options // Adjust according to the actual property

  React.useEffect(() => {
    if (!ready) {
      setShowFilters(true)
    }
  }, [ready, setShowFilters])

  const methods = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      searchTerm: "",
      tags: [],
      stage: "",
    },
  })

  const onSubmit = (data: any) => {
    updateFilter(data)
    setShowFilters(false)
  }

  const handleResetFilters = () => {
    resetFilters()

    setShowFilters(false)
  }

  return (
    <div
      className={`relative bg-white text-sm transition-all duration-300 ease-out ${showFilters ? "max-w-[280px]" : "max-w-0"} relative left-0 z-20 flex h-full flex-1 flex-col `}
    >
      <Button
        onClick={() => setShowFilters(!showFilters)}
        variant="outline"
        className={`absolute right-[-2.25rem] top-6 z-10 m-0 h-9 w-9 bg-gray-800 p-2.5 text-white transition-transform duration-300 ${showFilters ? "rotate-180" : "rotate-0"}`}
      >
        <DoubleArrowRightIcon className="h-4 w-4" />
      </Button>
      <div
        className={`scrollbar-left w-full overflow-y-scroll p-2 text-neutral-800  ${showFilters ? "visible" : "hidden"}`}
      >
        <div className="flex w-full items-center justify-between p-4">
          <div className="text-center text-lg">
            Projects: {filteredProjects.length}
          </div>
          <Button
            onClick={handleResetFilters}
            variant={"outline"}
            className="text-white"
          >
            Reset
          </Button>
        </div>
        <Form {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className={`flex min-w-12 flex-col space-y-4  p-4 `}
          >
            <FormField
              control={methods.control}
              name="tags"
              render={() => (
                <FormItem>
                  {tags.map((tag) => (
                    <FormField
                      key={tag}
                      control={methods.control}
                      name="tags"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={tag}
                            className="flex flex-row items-start space-x-3 space-y-0 text-neutral-800"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(tag as never)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, tag])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== tag
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {tag}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex space-x-2">
              <Button
                onClick={onSubmit}
                variant={"outline"}
                className="text-white"
              >
                Apply
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
