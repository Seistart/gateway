"use client"

import * as React from "react"

import {
  ContextMenu,
  DetailScreen,
  NodeInfo,
  useRelationChartState,
} from "@/components/d3"
import Legend from "@/components/d3/Chart/ui/Legend"
import ChartWrapper from "./ChartWrapper"

export type TProps = {
  nodes: NodeInfo[]
  loading: boolean
}

const RelationsChart = ({ nodes, loading }: TProps) => {
  const [showLegend, setShowLegend] = React.useState(false)
  const { chart, details } = useRelationChartState()

  const onClickLegendButtonHandler = React.useCallback(() => {
    setShowLegend(!showLegend)
  }, [showLegend])

  React.useEffect(() => {
    if (details.show) {
      setShowLegend(false)
    }
  }, [details.show])

  return (
    <div className='left-0" absolute top-0 flex h-full w-full overflow-hidden bg-[#f3f4f6]'>
      <ChartWrapper nodes={nodes} loading={loading} />
      {chart && (
        <>
          <Legend
            show={showLegend}
            onClickLegendButton={onClickLegendButtonHandler}
          />
          <DetailScreen nodes={nodes} />
          <ContextMenu />
          {/* <HoverToolTip /> */}
        </>
      )}
    </div>
  )
}

export default RelationsChart
