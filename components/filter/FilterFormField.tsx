import MultipleSelector from "../shared/multiple-selector"
import { FormField, FormItem, FormMessage } from "../ui/form"

type Props = {
  name: string
  methods: any
  items: any[]
}

export function FilterFormField({ name, methods, items }: Props) {
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
              value={methods.value} // Controlled value from react-hook-form
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
