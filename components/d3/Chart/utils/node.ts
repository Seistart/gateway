import { scaleLog, scaleSqrt } from "d3-scale"

import {
  NodeDatum,
  NodeDatumMapKey,
  NodeDatumType,
  NodeInfo,
  NodeInfoMapKey,
  NodeInfoType,
} from "../types"

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
  ["project"].includes(entity.info.type)

export const projectRadius = (datum: NodeDatumType<"project">) => {
  if (!datum.scales) {
    throw new Error("Node scales have not been defined")
  }

  return datum.scales.project.nodeSize(datum.info.communitySize)
}

export const projectCollisionRadius = (datum: NodeDatumType<"project">) => {
  const labelHeight = 60

  const { cache } = datum
  let radius = cache.radius ?? (cache.radius = projectRadius(datum))

  radius += labelHeight

  console.log("test")

  return radius
}

export const projectStrength = (datum: NodeDatumType<"project">) => {
  if (!datum.scales) {
    throw new Error("Node scales have not been defined")
  }

  const value = projectRadius(datum)
  return datum.scales.project.nodeStrength(value)
}

export const projectNodeLabelSize = (datum: NodeDatumType<"project">) => {
  if (!datum.scales) {
    throw new Error("Node scales have not been defined")
  }

  const value = projectRadius(datum)
  return datum.scales.project.nodeLabelSize(value)
}

export const projectNodeSizeScaleFactory = () => {
  const data: NodeInfoType<"project">[] = []

  return {
    add: (datum: NodeInfoType<"project">) => data.push(datum),
    result: () => {
      let min = 0
      let max = 0

      data.forEach((datum) => {
        min = Math.min(min, datum.communitySize)
        max = Math.max(max, datum.communitySize)
      })

      return scaleSqrt().domain([min, max]).range([30, 200])
    },
  }
}

export const projectNodeStrengthScaleFactory = () => {
  let min = 0
  let max = 0

  return {
    set: (datum: NodeDatumType<"project">) => {
      if (!datum.scales) {
        throw new Error("Node scales have not been defined")
      }
      ;[min, max] = datum.scales.project.nodeSize.range()
    },
    result: () => {
      return scaleLog().domain([30, 200]).range([-1, -10])
    },
  }
}

export const projectLabelSizeScaleFactory = () => {
  let min = 0
  let max = 0

  return {
    set: (datum: NodeDatumType<"project">) => {
      if (!datum.scales) {
        throw new Error("Node scales have not been defined")
      }

      ;[min, max] = datum.scales.project.nodeSize.range()
    },
    result: () => {
      return scaleLog().domain([30, 200]).range([10, 50])
    },
  }
}
