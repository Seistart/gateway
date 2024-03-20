import React, { Suspense } from "react"

import { mockProjects } from "@/mocks/projects.mocks"
import { ChartSkeleton } from "./ChartSkeleton"
import RelationsChart from "./RelationsChart"

export const RelationsContainer = () => {
  const generateMockData2 = mockProjects(100)

  const [nodes] = React.useMemo(() => {
    const nodes = generateMockData2

    return [nodes] as const
  }, [generateMockData2])

  return (
    <Suspense fallback={<ChartSkeleton />}>
      <RelationsChart nodes={nodes} loading={false} />
    </Suspense>
  )
}

export default RelationsContainer
