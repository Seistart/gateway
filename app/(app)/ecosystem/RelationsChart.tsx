"use client"

import { DetailScreen, NodeInfo, useRelationChartState } from "@/components/d3"

import ChartWrapper from "./ChartWrapper"

export type TProps = {
  nodes: NodeInfo[]
  loading: boolean
}

const RelationsChart = ({ nodes, loading }: TProps) => {
  const { chart } = useRelationChartState()

  return (
    <div className='left-0" absolute top-0 flex h-full w-full overflow-hidden bg-[#f3f4f6]'>
      <ChartWrapper nodes={nodes} loading={loading} />
      {chart! && (
        <>
          <DetailScreen nodes={nodes} />
          {/* <ContextMenu /> */}
          {/* <HoverToolTip /> */}
        </>
      )}
    </div>
  )
}

export default RelationsChart
