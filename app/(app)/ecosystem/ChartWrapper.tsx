"use client"

import {
  ChartContainer,
  ChartNavigation,
  useRelationChartState,
} from "@/components/d3"
import Legend from "@/components/d3/Chart/ui/Legend"
import { Project } from "@/database/schemas/projects.schema"
import * as React from "react"
import { ChartSkeleton } from "./ChartSkeleton"

export type Props = {
  nodes: Project[]
  loading: boolean
}

const ChartWrapper = ({ nodes, loading }: Props) => {
  const [showLegend, setShowLegend] = React.useState(false)
  const { ready, details } = useRelationChartState()

  const onClickLegendButtonHandler = React.useCallback(() => {
    setShowLegend(!showLegend)
  }, [showLegend])

  React.useEffect(() => {
    if (details.show) {
      setShowLegend(false)
    }
  }, [details.show])

  return (
    <div className="relative flex h-full w-full flex-1">
      {!ready && <ChartSkeleton />}
      <ChartContainer
        className="chart-container"
        nodes={nodes}
        loading={loading}
      />
      {ready && <Legend show={showLegend} nodes={nodes} />}
      <ChartNavigation
        show={showLegend}
        onClickLegendButton={onClickLegendButtonHandler}
      />
    </div>
  )
}

export default ChartWrapper
