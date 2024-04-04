import { cn } from "@/utils/tailwind.utils"
import React, { HTMLProps } from "react"

interface LandingContProps extends HTMLProps<HTMLDivElement> {
  children: React.ReactNode
}

export default function LandingCont({
  children,
  className,
  ...props
}: LandingContProps) {
  return (
    <div className={cn("px-2 sm:px-40", className)} {...props}>
      {children}
    </div>
  )
}
