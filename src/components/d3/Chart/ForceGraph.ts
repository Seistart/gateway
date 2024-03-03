import { forceCollide, forceManyBody } from 'd3-force'

import { getNodesFromLocalStorage } from './entities/Node'
import {
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
  NodeCollisionRadiusFn,
  NodeDatum,
  NodeIdResolverFn,
  NodeStrengthFn,
} from './types'

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
    nodeIdResolver,
    nodeCollisionRadius,
    generateMaskColor,
    mapEntityToColor,

    // Termination
    invalidation = null, // when this promise resolves, stop the simulation
  }: Options
) {
  const nodesFromLocalStorage = getNodesFromLocalStorage(nodes)

  const simulationNodeData = createSimulationNodeData(
    nodes,
    nodesFromLocalStorage
  )

  // Construct the forces.
  const nodeForce = forceManyBody<NodeDatum>()
    .theta(0.9)
    .distanceMin(1)
    .distanceMax(500)

  const collideForce = forceCollide(nodeCollisionRadius).iterations(5) // Tune this down for more performance but more chaotic node positioning (default = 1).

  nodeForce.strength(nodeStrength)

  const simulation = createSimulation(
    simulationNodeData,
    nodeForce,
    collideForce
  )

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

  return {
    canvas: canvas.node(),
    canvasMask: canvasMask.node(),
    stage: stage.node(),
    getCanvasSelection,
    getCanvasMaskSelection,
    getStageSelection,
    getNodeGroupSelection,
    getNodeSelection,
    getSimulation,
  }
}
