import { HTMLAttributes, memo, useEffect, useRef } from 'react'

import {
  createCanvas,
  createMask,
  generateMaskColor,
  mapEntityToColor,
} from './entities/Canvas'
import {
  createNodes,
  createSimulationNodeData,
  nodeCollisionRadius,
  nodeIdResolver,
  nodeStrength,
} from './entities/Node'
import { createSimulation } from './entities/Simulation'
import { createDefs, createNodeGroup, createStage } from './entities/Stage'
import { ForceGraph } from './ForceGraph'
import type { RelationChartManagerReturnType } from './hooks/useRelationChartManager'
import { ChartData } from './types'

type ForceGraphInstance = ReturnType<typeof ForceGraph>

export type Props = HTMLAttributes<HTMLDivElement> & {
  data: ChartData
  chartManager: RelationChartManagerReturnType
}

export const Chart = memo<Props>(
  ({ data, chartManager, ...rest }) => {
    const container = useRef<HTMLDivElement | null>(null)
    const chart = useRef<ForceGraphInstance | null>(null)
    const invalidationTrigger = useRef<(() => void) | null>(null)

    useEffect(() => {
      const currentContainer = container.current
      let _graph: ForceGraphInstance | null = null
      // Mount
      if (currentContainer && !chart.current) {
        _graph = ForceGraph(data, {
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

          // Termination
          invalidation: new Promise((resolve) => {
            // Store the resolve function for when the component unmounts to stop the simulation
            invalidationTrigger.current = resolve
          }),
        })

        chart.current = _graph

        const canvas = chart.current.canvas
        const canvasMask = chart.current.canvasMask
        const stage = chart.current.stage

        canvas && currentContainer.appendChild(canvas)
        canvasMask && currentContainer.appendChild(canvasMask)
        stage && currentContainer.appendChild(stage)

        // Init chart state with chart internals
        const { init } = chartManager
        init({
          graph: _graph,
        })
      }

      // Unmount
      const invTrigger = invalidationTrigger.current

      return () => {
        if (invTrigger) {
          invTrigger() // Stop the simulation
          if (currentContainer && _graph) {
            const canvas = _graph.canvas
            const canvasMask = _graph.canvasMask
            const stage = _graph.stage

            const { destroy } = chartManager
            destroy()

            canvas && currentContainer.removeChild(canvas)
            canvasMask && currentContainer.removeChild(canvasMask)
            stage && currentContainer.removeChild(stage)
          }
          chart.current = null
        }
      }
    })

    return (
      <div
        {...rest}
        className='absolute left-0 top-0 h-full w-full overflow-hidden'
        ref={container}
      />
    )
  },
  (prevProps, nextProps) => prevProps.data === nextProps.data
)
