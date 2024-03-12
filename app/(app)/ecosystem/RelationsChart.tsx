"use client"

import { DetailScreen, useRelationChartState } from "@/components/d3"
import { Project } from "@/database/schemas/projects.schema"

import ChartWrapper from "./ChartWrapper"

export type TProps = {
  nodes: Project[]
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
