import { scaleLog, scaleSqrt } from 'd3-scale'

import {
  NodeDatum,
  NodeDatumMapKey,
  NodeDatumType,
  NodeInfo,
  NodeInfoMapKey,
  NodeInfoType,
} from '../types'

export const isInfoType = <T extends NodeInfoMapKey>(
  info: NodeInfo,
  type: T
): info is NodeInfoType<T> => info.type === type

export const isNodeDatumWithInfoType = <T extends NodeDatumMapKey>(
  datum: NodeDatum,
  type: T
): datum is NodeDatumType<T> => datum.info.type === type

export const isNodeDatum = (
  entity: NodeDatum | null | undefined
): entity is NodeDatum =>
  entity !== undefined &&
  entity !== null &&
  ['project'].includes(entity.info.type)

export const projectRadius = (datum: NodeDatumType<'project'>) => {
  if (!datum.scales) {
    throw new Error('Node scales have not been defined')
  }

  let totalMarketcap = 0
  let max

  if (isNodeDatumWithInfoType(datum, 'project')) {
    ;[, max] = datum.scales.project.nodeSize.domain()
    totalMarketcap = max / 1.5
  }
  return datum.scales.project.nodeSize(totalMarketcap)
}

export const projectCollisionRadius = (datum: NodeDatumType<'project'>) => {
  const labelHeight = 55

  const { cache } = datum
  let radius = cache.radius ?? (cache.radius = projectRadius(datum))

  radius += labelHeight

  return radius
}

export const projectStrength = (datum: NodeDatumType<'project'>) => {
  if (!datum.scales) {
    throw new Error('Node scales have not been defined')
  }

  const value = projectRadius(datum)
  return datum.scales.project.nodeStrength(value)
}

export const projectNodeLabelSize = (datum: NodeDatumType<'project'>) => {
  if (!datum.scales) {
    throw new Error('Node scales have not been defined')
  }

  const value = projectRadius(datum)
  return datum.scales.project.nodeLabelSize(value)
}

export const projectNodeSizeScaleFactory = () => {
  const data: NodeDatumType<'project'>[] = []

  return {
    add: (datum: NodeDatumType<'project'>) => data.push(datum),
    result: () => {
      let min = 0
      let max = 0

      return scaleSqrt().domain([min, max]).range([5, 80])
    },
  }
}

export const projectNodeStrengthScaleFactory = () => {
  let min = 0
  let max = 0

  return {
    set: (datum: NodeDatumType<'project'>) => {
      if (!datum.scales) {
        throw new Error('Node scales have not been defined')
      }

      ;[min, max] = datum.scales.project.nodeSize.range()
    },
    result: () => {
      return scaleLog().domain([min, max]).range([-1, -10])
    },
  }
}

export const projectLabelSizeScaleFactory = () => {
  let min = 0
  let max = 0

  return {
    set: (datum: NodeDatumType<'project'>) => {
      if (!datum.scales) {
        throw new Error('Node scales have not been defined')
      }

      ;[min, max] = datum.scales.project.nodeSize.range()
    },
    result: () => {
      return scaleLog().domain([min, max]).range([5, 35])
    },
  }
}
