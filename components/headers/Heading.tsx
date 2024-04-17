import { cn } from "@/utils/tailwind.utils"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

const headingVariants = cva("mr-2 px-2 text-black", {
  variants: {
    variant: {
      default: "bg-primary",
      alternative: "bg-yellow-100",
      destructive: "bg-destructive",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export interface HeadingProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof headingVariants> {
  highlighted?: string
  headingText: string
  desc?: string
}

const Heading = React.forwardRef<HTMLLabelElement, HeadingProps>(
  ({ highlighted, variant, headingText, desc, className }, ref) => {
    return (
      <>
        <h1 className="xs:text-3xl text-2xl font-semibold sm:text-4xl">
          {highlighted && (
            <span className={cn(headingVariants({ variant, className }))}>
              {highlighted}
            </span>
          )}
          {headingText}
        </h1>
        {desc && <h2 className="mt-2 font-medium">{desc}</h2>}
      </>
    )
  }
)
Heading.displayName = "Heading"

export default Heading
