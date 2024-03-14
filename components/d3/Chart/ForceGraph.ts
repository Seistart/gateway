"use client"

import { forceCollide, forceManyBody } from "d3-force"

import { getNodesFromLocalStorage } from "./entities/Node"
import { end, ticked } from "./entities/Simulation"
import {
  CanvasSelection,
  ChartData,
  CreateCanvasFn,
  CreateDefsFn,
  CreateMaskFn,
  CreateNodeGroupFn,
  CreateNodesFn,
  CreateSimulationFn,
  CreateSimulationNodeDataFn,
  CreateStageFn,
  GenerateMaskColorFn,
  MapEntityToColorFn,
  MaskSelection,
  NodeCollisionRadiusFn,
  NodeDatum,
  NodeDatumState,
  NodeGroupSelection,
  NodeIdResolverFn,
  NodeSelection,
  NodeStrengthFn,
  Simulation,
  StageSelection,
} from "./types"

export type ForceGraphInstance = {
  canvas: HTMLCanvasElement | null
  canvasMask: HTMLCanvasElement | null
  stage: SVGSVGElement | null
  getCanvasSelection: () => CanvasSelection
  getCanvasMaskSelection: () => MaskSelection
  getStageSelection: () => StageSelection
  getNodeGroupSelection: () => NodeGroupSelection
  getNodeSelection: () => NodeSelection
  getSimulation: () => Simulation
}

type Options = {
  createCanvas: CreateCanvasFn
  createMask: CreateMaskFn
  createStage: CreateStageFn
  createSimulation: CreateSimulationFn
  createDefs: CreateDefsFn
  createSimulationNodeData: CreateSimulationNodeDataFn
  createNodeGroup: CreateNodeGroupFn
  createNodes: CreateNodesFn
  nodeIdResolver: NodeIdResolverFn
  nodeStrength: NodeStrengthFn
  nodeCollisionRadius: NodeCollisionRadiusFn

  generateMaskColor: GenerateMaskColorFn
  mapEntityToColor: MapEntityToColorFn

  onReady: (graph: ForceGraphInstance) => void

  invalidation?: Promise<void> | null // when this promise resolves, stop the simulation
}

// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/disjoint-force-directed-graph
export function ForceGraph(
  { nodes }: ChartData,
  {
    // Injectables
    createCanvas,
    createMask,
    createStage,
    createSimulation,
    createDefs,
    createSimulationNodeData,
    createNodeGroup,
    createNodes,
    nodeStrength,
    nodeCollisionRadius,
    generateMaskColor,
    mapEntityToColor,

    onReady,

    // Termination
    invalidation = null, // when this promise resolves, stop the simulation
  }: Options
) {
  const nodesFromLocalStorage = getNodesFromLocalStorage(nodes)
  const isUsingStoredState = Object.entries(nodesFromLocalStorage).length > 0

  function onCompleteWorker(payload?: {
    nodeState: Record<string, NodeDatumState>
  }) {
    const isUsingPreparedState =
      Object.entries(payload?.nodeState ?? {}).length > 0

    const simulationNodeData = createSimulationNodeData(
      nodes,
      payload?.nodeState ?? nodesFromLocalStorage
    )

    const simulation = createSimulation(
      simulationNodeData,
      isUsingPreparedState || isUsingStoredState
    )

    simulation.on("tick", ticked).on("end", end)

    // Construct the forces.
    const nodeForce = forceManyBody<NodeDatum>()
      .theta(0.9)
      .distanceMin(1)
      .distanceMax(200)

    const collideForce = forceCollide(nodeCollisionRadius).iterations(5) // Tune this down for more performance but more chaotic node positioning (default = 1).

    nodeForce.strength(nodeStrength)
    simulation.force("charge", nodeForce).force("collide", collideForce)

    const canvas = createCanvas()
    const canvasMask = createMask()
    const entityColorMaps = canvasMask.datum().state.colorEntityMaps

    const stage = createStage()
    const defs = createDefs(stage)

    simulationNodeData.forEach((datum) => {
      const maskColor = generateMaskColor(entityColorMaps.nodes, datum)
      mapEntityToColor(canvasMask, datum, maskColor)
      datum.state.maskColor = maskColor
    })

    const nodeGroupSelection = createNodeGroup(defs)
    const nodeSelection = createNodes(nodeGroupSelection, simulationNodeData)

    // Handle invalidation.
    if (invalidation !== null) {
      invalidation.then(() => simulation.stop())
    }

    const getCanvasSelection = () => canvas
    const getCanvasMaskSelection = () => canvasMask
    const getStageSelection = () => stage
    const getNodeGroupSelection = () => nodeGroupSelection
    const getNodeSelection = () => nodeSelection
    const getSimulation = () => simulation

    onReady({
      canvas: canvas.node(),
      canvasMask: canvasMask.node(),
      stage: stage.node(),
      getCanvasSelection,
      getCanvasMaskSelection,
      getStageSelection,
      getNodeGroupSelection,
      getNodeSelection,
      getSimulation,
    })
  }

  onCompleteWorker()

  // if (isUsingStoredState) {
  //   onCompleteWorker()
  // } else {
  //   if (typeof window !== "undefined") {
  //     const worker = new Worker(
  //       new URL("./workers/simulation?worker&url", import.meta.url),
  //       {
  //         type: "module",
  //       }
  //     )
  //     const simulationWorkerAgent = new WorkerAgent(worker, {
  //       log: console.log,
  //       error: console.error,
  //       complete: onCompleteWorker,
  //     })

  //     simulationWorkerAgent.postMessage({
  //       type: "init",
  //       payload: { nodes },
  //     })
  //   }
  // }
}
