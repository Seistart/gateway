import { FormField, FormItem, FormMessage } from "../ui/form"

import { CaretSortIcon } from "@radix-ui/react-icons"
import { useState } from "react"
import { Button } from "../ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible"
import { CheckboxItem } from "./CheckboxItem"

type Props = {
  name: string
  methods: any
  items: any[]
}

export function FilterFormField({ name, methods, items }: Props) {
  const [itemIsOpen, setItemIsOpen] = useState<boolean>(false)

  const initialItems = items.slice(0, 5)
  const collabsibleItems = items.slice(5)

  const disabled = items.length < 5

  return (
    <FormField
      control={methods.control}
      name={name}
      render={() => (
        <FormItem>
          {/* Collapsible Items */}
          <Collapsible
            open={itemIsOpen}
            onOpenChange={setItemIsOpen}
            className="space-y-2"
          >
            <div className="flex items-center justify-between space-x-4">
              <h4 className="text-sm font-semibold capitalize">{name}</h4>
              <CollapsibleTrigger asChild disabled={disabled}>
                <Button variant="ghost" size="sm">
                  <CaretSortIcon className="h-4 w-8" />
                </Button>
              </CollapsibleTrigger>
            </div>
            {/* Initial Items */}
            {initialItems.map((item: string) => (
              <CheckboxItem
                key={item}
                item={item}
                name={name}
                control={methods.control}
              />
            ))}
            <div
              className={`transition-all duration-500 ease-out ${itemIsOpen ? "max-h-[30rem]" : "max-h-0"}`}
            >
              <CollapsibleContent className="space-y-2 transition-all duration-300 ease-out">
                {collabsibleItems.map((item: string) => (
                  <CheckboxItem
                    key={item}
                    item={item}
                    name={name}
                    control={methods.control}
                  />
                ))}
              </CollapsibleContent>
            </div>
          </Collapsible>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}
