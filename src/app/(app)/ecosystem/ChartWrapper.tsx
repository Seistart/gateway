'use client'

import {
  ChartContainer,
  ChartNavigation,
  NodeInfo,
  useRelationChartState,
} from '@/components/d3'
import { ChartSkeleton } from './ChartSkeleton'

export type Props = {
  nodes: NodeInfo[]
  loading: boolean
}

const ChartWrapper = ({ nodes, loading }: Props) => {
  const { ready } = useRelationChartState()

  return (
    <div className='relative flex h-full w-full'>
      {!ready && <ChartSkeleton />}
      <ChartContainer
        className='chart-container'
        nodes={nodes}
        loading={loading}
      />
      <ChartNavigation />
    </div>
  )
}

export default ChartWrapper
