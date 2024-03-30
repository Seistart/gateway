"use client"

import { DetailScreen, useRelationChartState } from "@/components/d3"
import { Project } from "@/database/schemas/projects.schema"

import { FilterScreen } from "@/components/filter"
import ChartWrapper from "./ChartWrapper"

export type TProps = {
  nodes: Project[]
  loading: boolean
}

const RelationsChart = ({ nodes, loading }: TProps) => {
  const { chart } = useRelationChartState()

  return (
    <div className='left-0" absolute top-0 flex h-full w-full overflow-hidden bg-[#f3f4f6]'>
      {chart! && (
        <>
          <FilterScreen close={true} />
        </>
      )}
      <ChartWrapper nodes={nodes} loading={loading} />
      {chart! && (
        <>
          <DetailScreen nodes={nodes} />
        </>
      )}
    </div>
  )
}

export default RelationsChart
