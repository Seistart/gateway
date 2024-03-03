import { create, select } from 'd3-selection'
import { CSSProperties } from 'react'

import {
  CreateMaskFn,
  MaskColor,
  MaskDatum,
  MaskSelection,
  NodeDatum,
} from '../../types'

export const createMask: CreateMaskFn = function () {
  return create('canvas')
    .attr('id', 'canvas-mask')
    .attr('class', 'canvas-mask')
    .datum<MaskDatum>({
      state: {
        colorEntityMaps: {
          nodes: {},
        },
      },
    })
    .call(styleMask)
}

export const styleMask = function (
  selection: MaskSelection,
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
    .attr(
      'style',
      `position:absolute;top:-99999px;left:-99999px;image-rendering:pixelated;${styleString}`
    )
    .attr('width', style?.width ?? currentWidth)
    .attr('height', style?.height ?? currentHeight)
}

export const generateMaskColor = function <T extends NodeDatum>(
  colorEntityMap: Record<string, T> | Record<string, T>,
  entity: T
): MaskColor {
  const mapKeys = Object.keys(colorEntityMap)
  const mapLength = mapKeys.length ?? 0
  const colorOffsetGroups = {
    nodes: 85,
  }
  const colorOffset = colorOffsetGroups.nodes
  const baseValue = mapLength

  const b = baseValue % 256
  const g = ((baseValue - b) / 256) % 256
  const r = colorOffset + (baseValue - b - g * 256) / (256 ^ 2)

  return [r, g, b] as MaskColor
}

export const colorToKey = (color: MaskColor) => color.join(',')

export const mapEntityToColor = function (
  maskSelection: MaskSelection = select('#canvas-mask'),
  entity: NodeDatum,
  color: MaskColor
) {
  const maskDatum = maskSelection.datum()
  const maps = maskDatum.state.colorEntityMaps
  const key = colorToKey(color)

  if (Object.values(maps).some((map) => map[key] !== undefined)) {
    throw new Error(
      'Duplicate entity key detected, too many entities in diagram!'
    )
  }

  const map = maps.nodes

  map[key] = entity
}

export const lookUpEntityByColor = function (
  maskSelection: MaskSelection = select('#canvas-mask'),
  color: MaskColor
): NodeDatum | null {
  const maskDatum = maskSelection.datum()
  const maps = maskDatum.state.colorEntityMaps
  const key = colorToKey(color)

  return Object.values(maps).find((map) => map[key])?.[key] ?? null
}
