import React, { Suspense } from 'react'

import { NodeInfo } from '@/components/d3'
import { ChartSkeleton } from './ChartSkeleton'
import RelationsChart from './RelationsChart'

export const RelationsContainer = () => {
  const generateMockData = (): NodeInfo[] => {
    const projectTypes = ['DeFi', 'NFT', 'DAO', 'GameFi']
    const mockData: NodeInfo[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      name: `Project ${i}`,
      type: 'project',
      tag: projectTypes[Math.floor(Math.random() * projectTypes.length)],
      marketCap: Math.random() * 1000,
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
