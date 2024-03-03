import { forceSimulation } from 'd3-force'
import { select, selectAll } from 'd3-selection'

import type {
  CanvasDatum,
  CreateSimulationFn,
  NodeDatum,
  Simulation,
} from '../types'

import {
  getZoomBoundaries,
  updateCanvasZoomScaleMax,
  zoomToBoundaries,
} from './Canvas'

const ALPHA_MIN = 0.01

const INITIAL_ALPHA_AIMED_ITERATIONS = 100
const INITIAL_VELOCITY_DECAY = 0.1

const INTERACTION_ALPHA_AIMED_ITERATIONS = 30
const INTERACTION_VELOCITY_DECAY = 0.4

export const createSimulation: CreateSimulationFn = function (
  simulationNodeData,
  nodeForce,
  collideForce
) {
  const simulation: Simulation = forceSimulation<NodeDatum>(simulationNodeData)
    .velocityDecay(INITIAL_VELOCITY_DECAY)
    .alphaMin(ALPHA_MIN)
    .alphaDecay(1 - Math.pow(ALPHA_MIN, 1 / INITIAL_ALPHA_AIMED_ITERATIONS))
    .force('charge', nodeForce)
    .force('collide', collideForce)
    .on('tick', ticked)
    .on('end', end)

  return simulation
}

export const destroySimulation = function (simulation: Simulation) {
  simulation
    .on('tick', null)
    .on('end', null)
    .force('collide', null)
    .force('charge', null)
    .force('link', null)
    .stop()
}

export function ticked(this: Simulation) {
  if (this.alpha() <= ALPHA_MIN) {
    coolDown(this)
  }

  const nodes = selectAll<SVGGElement, NodeDatum>('.node')
  if (!nodes.empty()) {
    nodes.attr(
      'transform',
      (datum) => `translate(${datum?.state?.x ?? 0},${datum?.state?.y ?? 0})`
    )
  }
}

export function coolDown(simulation: Simulation) {
  selectAll<SVGGElement, NodeDatum>('.node').each((datum) => {
    if (datum) {
      datum.idle = true
    }
  })
  simulation
    .velocityDecay(INTERACTION_VELOCITY_DECAY)
    .alphaDecay(1 - Math.pow(ALPHA_MIN, 1 / INTERACTION_ALPHA_AIMED_ITERATIONS))
}

export function end(this: Simulation) {
  this.on('end', null) // Remove this event listener

  const canvas = select<HTMLCanvasElement, CanvasDatum>('#canvas')
  const zoomBoundaries = getZoomBoundaries(canvas)

  canvas
    // TODO: once we have a correct setup for the node sizes,
    // we can use the smallest node size as a factor for the
    // zoom scale min value.
    //.call(updateCanvasZoomScaleMin, zoomBoundaries)
    .call(updateCanvasZoomScaleMax, zoomBoundaries)
    .call(zoomToBoundaries, zoomBoundaries, false)

  canvas.dispatch('canvasready')
}