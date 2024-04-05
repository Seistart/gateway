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
    <div
      className={cn("mx-auto max-w-[80rem] px-4 sm:px-0", className)}
      {...props}
    >
      {children}
    </div>
  )
}
