import React, { Suspense } from "react"

import { NodeInfo } from "@/components/d3"
import { ChartSkeleton } from "./ChartSkeleton"
import RelationsChart from "./RelationsChart"

export const RelationsContainer = () => {
  const generateMockData = (): NodeInfo[] => {
    const projectTags = ["DeFi", "NFT", "DAO", "GameFi"]
    const mockData: NodeInfo[] = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      name: `Project ${i}`,
      type: "project",
      tag: projectTags[Math.floor(Math.random() * projectTags.length)],
      marketCap: Math.round(Math.random() * 1000),
      communitySize: Math.round(Math.random() * 50000),
      projectImageUrl: `/images/logo_850.png`,
    }))
    return mockData
  }

  const [nodes] = React.useMemo(() => {
    const nodes = generateMockData()

    return [nodes] as const
  }, [])

  return (
    <Suspense fallback={<ChartSkeleton />}>
      <RelationsChart nodes={nodes} loading={false} />
    </Suspense>
  )
}

export default RelationsContainer
