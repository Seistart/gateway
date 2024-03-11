import { HTMLAttributes, memo, useEffect, useRef } from "react"

import {
  createCanvas,
  createMask,
  generateMaskColor,
  mapEntityToColor,
} from "./entities/Canvas"
import {
  createNodes,
  createSimulationNodeData,
  nodeCollisionRadius,
  nodeIdResolver,
  nodeStrength,
} from "./entities/Node"
import { createSimulation } from "./entities/Simulation"
import { createDefs, createNodeGroup, createStage } from "./entities/Stage"
import { ForceGraph, ForceGraphInstance } from "./ForceGraph"
import type { RelationChartManagerReturnType } from "./hooks/useRelationChartManager"
import { ChartData } from "./types"

export type Props = HTMLAttributes<HTMLDivElement> & {
  data: ChartData
  chartManager: RelationChartManagerReturnType
}

export const Chart = memo<Props>(
  ({ data, chartManager, ...rest }) => {
    const container = useRef<HTMLDivElement | null>(null)
    const isBusy = useRef<boolean>(false)
    const invalidationTrigger = useRef<(() => void) | null>(null)

    useEffect(() => {
      const currentContainer = container.current
      let _graph: ForceGraphInstance | null = null
      // Mount
      if (currentContainer && !isBusy.current) {
        isBusy.current = true
        ForceGraph(data, {
          // Injectables
          createCanvas,
          createMask,
          createStage,
          createSimulation,
          createDefs,
          createSimulationNodeData,
          createNodeGroup,
          createNodes,
          nodeIdResolver,
          nodeStrength,
          nodeCollisionRadius,
          generateMaskColor,
          mapEntityToColor,

          // Callbacks
          onReady: (graph: ForceGraphInstance) => {
            _graph = graph

            const canvas = graph.canvas
            const canvasMask = graph.canvasMask
            const stage = graph.stage

            canvas && currentContainer.appendChild(canvas)
            canvasMask && currentContainer.appendChild(canvasMask)
            stage && currentContainer.appendChild(stage)

            // Init chart state with chart internals
            const { init } = chartManager
            init({
              graph,
            })
          },

          // Termination
          invalidation: new Promise((resolve) => {
            // Store the resolve function for when the component unmounts to stop the simulation
            invalidationTrigger.current = resolve
          }),
        })
      }

      // Unmount
      const invTrigger = invalidationTrigger.current
      const { destroy } = chartManager

      return () => {
        if (invTrigger) {
          invTrigger() // Stop the simulation
          if (currentContainer && _graph) {
            const canvas = _graph.canvas
            const canvasMask = _graph.canvasMask
            const stage = _graph.stage

            destroy()

            canvas && currentContainer.removeChild(canvas)
            canvasMask && currentContainer.removeChild(canvasMask)
            stage && currentContainer.removeChild(stage)
          }
          isBusy.current = false
        }
      }
    })

    return (
      <div
        {...rest}
        className="absolute left-0 top-0 h-full w-full overflow-hidden"
        ref={container}
      />
    )
  },
  (prevProps, nextProps) => prevProps.data === nextProps.data
)

Chart.displayName = "Project Chart"
