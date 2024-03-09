"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

import { push } from "@socialgouv/matomo-next"

export const Content = () => {
  return (
    <Link href="/blog">
      <Button
        variant="link"
        className="mb-4 pl-0 text-lg"
        onClick={() => push(["trackEvent", "blog", "click back button"])}
      >
        Back
      </Button>
    </Link>
  )
}
