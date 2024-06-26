import Link from "next/link"
import React from "react"

interface ProjectLinksProps {
  url: string
  children: React.ReactNode
}

export default function ProjectLinks({ url, children }: ProjectLinksProps) {
  return url ? <Link href={url}>{children}</Link> : <></>
}
