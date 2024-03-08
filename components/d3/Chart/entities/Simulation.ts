import { forceSimulation } from "d3-force"
import { select, selectAll } from "d3-selection"

import type {
  CanvasDatum,
  CreateSimulationFn,
  NodeDatum,
  Simulation,
} from "../types"

import {
  getZoomBoundaries,
  updateCanvasZoomScaleMax,
  zoomToBoundaries,
} from "./Canvas"

const ALPHA_MIN = 0.02

const INITIAL_ALPHA_AIMED_ITERATIONS = 250
// const INITIAL_VELOCITY_DECAY = 0.1

const INTERACTION_ALPHA_AIMED_ITERATIONS = 30
const INTERACTION_VELOCITY_DECAY = 0.4

const nodeTags = new Map([
  ["DeFi", 1],
  ["NFT", 2],
  ["DAO", 3],
  ["GameFi", 4],
])

function forceCluster(nodes: NodeDatum[]) {
  const clusterStrength = 0.3 // Adjust the strength as needed

  // Calculates the centroid for each cluster
  function calculateCentroids() {
    const centroids: Map<number, { x: number; y: number; count: number }> =
      new Map()
    nodes.forEach((node) => {
      const cluster = centroids.get(
        Array.from(nodeTags.keys()).indexOf(node.info.tag)
      ) || { x: 0, y: 0, count: 0 }
      cluster.x += node.x || 0
      cluster.y += node.y || 0
      cluster.count += 1
      centroids.set(Array.from(nodeTags.keys()).indexOf(node.info.tag), cluster)
    })

    centroids.forEach((centroid) => {
      centroid.x /= centroid.count
      centroid.y /= centroid.count
    })

    return centroids
  }

  return (alpha: number) => {
    const centroids = calculateCentroids()
    nodes.forEach((node) => {
      const centroid = centroids.get(
        Array.from(nodeTags.keys()).indexOf(node.info.tag)
      )
      if (centroid) {
        node.vx && (node.vx += (centroid.x - node.x!) * clusterStrength * alpha)
        node.vy && (node.vy += (centroid.y - node.y!) * clusterStrength * alpha)
      }
    })
  }
}

export const createSimulation: CreateSimulationFn = function (
  simulationNodeData,
  nodeForce,
  collideForce
) {
  const simulation: Simulation = forceSimulation<NodeDatum>(simulationNodeData)
    // .velocityDecay(INITIAL_VELOCITY_DECAY)
    // .alphaMin(ALPHA_MIN)
    .alphaDecay(1 - Math.pow(ALPHA_MIN, 1 / INITIAL_ALPHA_AIMED_ITERATIONS))
    .force("charge", nodeForce)
    .force("collide", collideForce)
    .force("cluster", forceCluster(simulationNodeData))
    .on("tick", ticked)
    .on("end", end)

  return simulation
}

export const destroySimulation = function (simulation: Simulation) {
  simulation
    .on("tick", null)
    .on("end", null)
    .force("collide", null)
    .force("charge", null)
    .stop()
}

export function ticked(this: Simulation) {
  if (this.alpha() <= ALPHA_MIN) {
    coolDown(this)
  }

  const nodes = selectAll<SVGGElement, NodeDatum>(".node")
  if (!nodes.empty()) {
    nodes.attr(
      "transform",
      (datum) => `translate(${datum?.state?.x ?? 0},${datum?.state?.y ?? 0})`
    )
  }
}

export function coolDown(simulation: Simulation) {
  selectAll<SVGGElement, NodeDatum>(".node").each((datum) => {
    if (datum) {
      datum.idle = true
    }
  })
  simulation
    .velocityDecay(INTERACTION_VELOCITY_DECAY)
    .alphaDecay(1 - Math.pow(ALPHA_MIN, 1 / INTERACTION_ALPHA_AIMED_ITERATIONS))
}

export function end(this: Simulation) {
  this.on("end", null) // Remove this event listener

  const canvas = select<HTMLCanvasElement, CanvasDatum>("#canvas")
  const zoomBoundaries = getZoomBoundaries(canvas)

  canvas
    // TODO: once we have a correct setup for the node sizes,
    // we can use the smallest node size as a factor for the
    // zoom scale min value.
    //.call(updateCanvasZoomScaleMin, zoomBoundaries)
    .call(updateCanvasZoomScaleMax, zoomBoundaries)
    .call(zoomToBoundaries, zoomBoundaries, false)

  canvas.dispatch("canvasready")
}
