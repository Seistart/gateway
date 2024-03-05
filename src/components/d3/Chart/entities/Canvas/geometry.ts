import { zoomTransform } from 'd3-zoom'

import { CanvasSelection } from '../../types'

type Offsets = {
  x: number
  y: number
}

export const getScale = (selection: CanvasSelection) => {
  const node = selection.node()
  return node ? zoomTransform(node).k : 1
}

export const getOffsets = (selection: CanvasSelection): Offsets => {
  const node = selection.node()
  const transform = node ? zoomTransform(node) : null
  return { x: transform?.x ?? 0, y: transform?.y ?? 0 }
}

export const applyScale = (subject: number, scale: number) => subject * scale

export const applyReversedScale = (subject: number, scale: number) =>
  (1 / scale) * subject

export const applyOffset = (value: number, offset: number) => (value += offset)

export const applyReversedOffset = (value: number, offset: number) =>
  (value -= offset)

export type GeometryNormalisationOptions =
  | {
      scale?: number
      axis?: undefined
      offsets?: undefined
    }
  | { scale?: number; axis: 'x'; offsets: Pick<Offsets, 'x'> }
  | { scale?: number; axis: 'y'; offsets: Pick<Offsets, 'y'> }
export const applyGeometryNormalisation = (
  value: number | string,
  options: GeometryNormalisationOptions = {}
) => {
  let val = typeof value === 'string' ? parseFloat(value) : value
  if (options.scale) {
    val = applyScale(val, options.scale)
  }

  const { axis, offsets } = options

  if (axis === 'x' && offsets) {
    val = applyOffset(val, offsets[axis])
  } else if (axis === 'y' && offsets) {
    val = applyOffset(val, offsets[axis])
  }

  return val
}
