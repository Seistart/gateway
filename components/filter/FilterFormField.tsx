import { useEffect, useState } from "react"
import MultipleSelector from "../shared/multiple-selector"
import { FormField, FormItem, FormMessage } from "../ui/form"

type Props = {
  name: string
  methods: any
  items: any[]
}

export function FilterFormField({ name, methods, items }: Props) {
  // Local state to manage the values of the MultipleSelector
  const [selectedValues, setSelectedValues] = useState([])

  // This effect updates the local state when the external form field is reset
  useEffect(() => {
    if (methods.getValues(name).length === 0) {
      setSelectedValues([])
    }
  }, [methods.getValues(name)]) // Re-run the effect if the value of the form field changes

  return (
    <FormField
      control={methods.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex w-full flex-col gap-5">
            <MultipleSelector
              {...field}
              defaultOptions={items}
              onChange={(change) =>
                field.onChange(change.map((option) => option.value))
              }
              value={selectedValues} // Controlled value from react-hook-form
              ref={methods.ref} // Ref forwarding for react-hook-form
              hidePlaceholderWhenSelected
              placeholder={`Filter ${name}`}
              emptyIndicator={
                <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                  No {name} found.
                </p>
              }
            />
          </div>
          {methods.error && <FormMessage>{methods.error.message}</FormMessage>}
        </FormItem>
      )}
    />
  )
}
