"use client"

import React, { Suspense } from "react"

import { mockProjects } from "@/mocks/projects.mocks"
import { useFilterStore } from "@/stores/project-filter-store"
import { ChartSkeleton } from "./ChartSkeleton"
import RelationsChart from "./RelationsChart"

export const RelationsContainer = () => {
  const { projects, filteredProjects, setProjects } = useFilterStore()
  if (projects.length === 0) {
    setProjects(mockProjects(100))
  }

  const [nodes] = React.useMemo(() => {
    const nodes = filteredProjects

    return [nodes] as const
  }, [filteredProjects])

  return (
    <Suspense fallback={<ChartSkeleton />}>
      <RelationsChart nodes={nodes} loading={false} />
    </Suspense>
  )
}

export default RelationsContainer
