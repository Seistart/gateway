import { scaleLog } from 'd3-scale'
import { BaseType, create, select } from 'd3-selection'
import { CSSProperties } from 'react'

import {
  CanvasDatum,
  CanvasSelection,
  CreateCanvasFn,
  MaskSelection,
  NodeDatum,
  NodeSelection,
} from '../../types'

import { createCanvasZoomBehaviour } from './behaviours'
import { drawDragSelection, drawNode } from './draw'
import { getOffsets, getScale } from './geometry'

export const createCanvasScales = function () {
  const zoomScale = scaleLog().domain([10, 0]).range([0, 30])

  return {
    zoom: zoomScale,
  }
}

export const createCanvas: CreateCanvasFn = function () {
  return create('canvas')
    .attr('id', 'canvas')
    .attr('class', 'canvas')
    .datum<CanvasDatum>({
      state: {
        cursorMode: 'move',
        hovered: null,
        dragged: null,
        hasSelectedNodes: false,
      },
      zoom: createCanvasZoomBehaviour(),
      scales: createCanvasScales(),
    })
    .call(styleCanvas)
}

export const styleCanvas = function (
  selection: CanvasSelection,
  style?: CSSProperties
) {
  const styleString = Object.entries(style ?? {})
    .filter(([key]) => !['width', 'height'].includes(key))
    .reduce(
      (acc, [key, value]) => `${acc}${acc.length ? ';' : ''}${key}:${value}`,
      ''
    )

  const currentWidth = selection.attr('width')
  const currentHeight = selection.attr('height')

  selection
    .attr('style', `position:absolute;top:0;left:0;${styleString}`)
    .attr('width', style?.width ?? currentWidth)
    .attr('height', style?.height ?? currentHeight)
}

export const setPerfomanceMode = function (
  selection: CanvasSelection,
  enabled: boolean
) {
  const currentStyle = selection.attr('style')
  const entries = currentStyle
    .split(';')
    .filter((entry) => entry && !entry.includes('image-rendering'))

  entries.push(
    enabled
      ? 'image-rendering:pixelated'
      : 'image-rendering:-webkit-optimize-contrast;image-rendering:crisp-edges'
  )

  selection.attr('style', entries.join(';'))
}

export const positionCanvas = function (
  selection: CanvasSelection,
  rect?: DOMRect
) {
  let _rect = rect
  if (!rect) {
    const node = selection.node()?.parentElement
    _rect = node?.getBoundingClientRect()
  }
  if (!_rect) {
    return
  }
  const { height, width } = _rect

  selection.attr('width', width).attr('height', height)

  // Mimic for mask
  select('#canvas-mask').attr('width', width).attr('height', height)
}

export const getContext = function (
  selection: CanvasSelection | MaskSelection,
  options?: CanvasRenderingContext2DSettings
) {
  const node = selection.node()

  if (!node) {
    throw new Error('No DOM node can be resolved for the canvas selection')
  }

  return node.getContext('2d', options)
}

export type DrawOptions = {
  width: number
  height: number
  performanceMode: boolean
}
export const draw = function (
  canvasSelection: CanvasSelection,
  maskSelection: MaskSelection,
  drawOptions: DrawOptions
) {
  // Get contexts
  // Note alpha: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas#turn_off_transparency
  const context = getContext(canvasSelection, {
    alpha: false, // Disabeling alpha channel for the backdrop, speeding up drawing opaque content
  })

  // Note alpha: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas#turn_off_transparency
  // Note willReadFrequently: https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext#willreadfrequently
  const maskContext = getContext(maskSelection, {
    alpha: false, // Disabeling alpha channel for the backdrop, speeding up drawing opaque content
    willReadFrequently: true, // Applies to getImageData, used to get the hovered item from the mask canvas
  })

  if (!context) {
    throw new Error('No context can be resolved for the canvas selection')
  }
  if (!maskContext) {
    throw new Error('No context can be resolved for the mask selection')
  }

  // Clear the canvases
  context.fillStyle = '#f3f4f6'
  context.fillRect(0, 0, drawOptions.width, drawOptions.height)
  maskContext.fillStyle = 'white'
  maskContext.fillRect(0, 0, drawOptions.width, drawOptions.height)

  // Get active scale/translate values
  const offsets = getOffsets(canvasSelection)
  const scale = getScale(canvasSelection)

  // Get canvas state
  const canvasDatum = canvasSelection.datum()
  const { hasSelectedNodes } = canvasDatum.state

  // Get the stage
  const stageSelection = select('#stage')

  // Draw nodes
  const nodeSelection = stageSelection.selectAll<SVGGElement, NodeDatum>(
    '.node'
  )
  nodeSelection.each(function () {
    const node: NodeSelection<SVGGElement, BaseType> = select(this)
    drawNode(context, maskContext, node, {
      scale,
      offsets,
      hasSelectedNodes,
      performanceMode: drawOptions.performanceMode,
    })
  })

  // Draw drag selection
  const dragSelection =
    stageSelection.select<SVGSymbolElement>('#dragSelection')
  drawDragSelection(context, dragSelection)
}
