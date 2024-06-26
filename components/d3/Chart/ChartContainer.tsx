"use client"

import { HTMLAttributes, useEffect, useMemo } from "react"

import { Project } from "@/database/schemas/projects.schema"
import { Chart } from "./Chart"
import { useRelationChartState } from "./hooks"
import { useRelationChartManager } from "./hooks/useRelationChartManager"
import { ChartData, NodeInfo } from "./types"

export type Props = HTMLAttributes<HTMLDivElement> & {
  nodes: Project[]
  loading: boolean
}

export const ChartContainer = ({
  nodes: rawNodes,
  loading,
  ...rest
}: Props) => {
  const chartManager = useRelationChartManager()
  const { setReady } = useRelationChartState()

  const chartData = useMemo<ChartData>(() => {
    if (!rawNodes?.length) {
      return { nodes: [] }
    }

    const nodes = rawNodes.reduce<NodeInfo[]>((acc, entry) => {
      acc.push({
        id: entry.id,
        type: "project",
        tag: entry.mainTag,
        labels: entry.tags,
        name: entry.name,
        communitySize: entry.communitySize!,
      })
      return acc
    }, [])

    return {
      nodes,
    }
  }, [rawNodes])

  const isLoading = loading || rawNodes.length === 0

  useEffect(() => {
    // When new data is loading set the ready state to false to show skeleton
    if (isLoading) {
      setReady(false)
    }
  }, [setReady, isLoading])

  return !isLoading ? (
    <Chart {...rest} data={chartData} chartManager={chartManager} />
  ) : null
}
