import { cn } from "@/utils/tailwind.utils"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-bold transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-accent-foreground",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-background hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        nav: "bg-primary text-primary-foreground hover:bg-primary hover:text-accent-foreground",
        navigation: `text-primary underline-offset-4 hover:underline h-8 w-[100%] items-center justify-center p-1 text-gray-400`,
      },
      selected: { true: "bg-neutral-800 text-white" },
      size: {
        default: "h-9 w-32 py-6 my-4 mx-0",
        sm: "h-8 py-3 text-xs",
        lg: "h-10 py-8",
        icon: "h-9 w-9 my-1 mx-2",
      },
      shadow: {
        default: "shadow-bottom-right",
        none: "shadow-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shadow: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  selected?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      shadow,
      selected = false,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, shadow, selected, className })
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
