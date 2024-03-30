import { Controller } from "react-hook-form"
import { Checkbox } from "../ui/checkbox"
import { FormControl, FormItem, FormLabel } from "../ui/form"

type Props = {
  key: string
  item: string
  name: string
  control: any
}

export function CheckboxItem({ key, item, name, control }: Props) {
  return (
    <Controller
      control={control}
      key={key}
      name={name}
      render={({ field: { onChange, value } }) => {
        const isChecked = value?.includes(item)
        return (
          <FormItem
            key={key}
            className="flex flex-row items-start space-x-3 space-y-0 text-neutral-800"
          >
            <FormControl>
              <Checkbox
                checked={isChecked}
                onCheckedChange={(checked) => {
                  const newValue = checked
                    ? [...(value || []), item]
                    : value?.filter(
                        (currentItem: string) => currentItem !== item
                      )
                  onChange(newValue)
                }}
              />
            </FormControl>
            <FormLabel className="text-sm font-normal">{item}</FormLabel>
          </FormItem>
        )
      }}
    />
  )
}
