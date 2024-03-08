import { map } from "d3-array"
import type { BaseType, Selection } from "d3-selection"
import { select } from "d3-selection"
import { zoom } from "d3-zoom"

import type {
  CanvasDatum,
  CreateNodesFn,
  CreateSimulationNodeDataFn,
  MaskColor,
  NodeCollisionRadiusFn,
  NodeDatum,
  NodeDatumBase,
  NodeGroupSelection,
  NodeIdResolverFn,
  NodeInfo,
  NodeInfoType,
  NodeLabelSizeFn,
  NodeSelection,
  NodeStrengthFn,
  NodeValueFn,
} from "../types"
import {
  isNodeDatumWithInfoType,
  projectCollisionRadius,
  projectLabelSizeScaleFactory,
  projectNodeLabelSize,
  projectNodeSizeScaleFactory,
  projectNodeStrengthScaleFactory,
  projectRadius,
  projectStrength,
} from "../utils/node"
import {
  generateStorageKey,
  getD3LocalStorage,
  setD3LocalStorage,
} from "../utils/storage"

const unexpectedType = (_: never): never => {
  throw new Error("Unexpected node type")
}

export const createNodeScales = function (data: NodeInfo[]) {
  const projectNodeSizeScale = projectNodeSizeScaleFactory()
  const projectNodeStrengthScale = projectNodeStrengthScaleFactory()
  const projectNodeLabelSizeScale = projectLabelSizeScaleFactory()

  data.forEach((datum: NodeInfo) => {
    projectNodeSizeScale.add(datum)
  })

  return {
    // Scales setup methods
    setNodeData: function (nodeData: NodeDatum[]) {
      projectNodeLabelSizeScale.set(nodeData[0])
      projectNodeStrengthScale.set(nodeData[0])
    },
    // TODO: fix because unused
    updateScales: function () {
      this.project.nodeSize = projectNodeSizeScale.result()
      this.project.nodeStrength = projectNodeStrengthScale.result()
      this.project.nodeLabelSize = projectNodeLabelSizeScale.result()
    },
    // Actual scales
    project: {
      nodeSize: projectNodeSizeScale.result(),
      nodeStrength: projectNodeStrengthScale.result(),
      nodeLabelSize: projectNodeLabelSizeScale.result(),
    },
  }
}

export const createSimulationNodeData: CreateSimulationNodeDataFn = function (
  data,
  localStorageData
) {
  const scales = createNodeScales(data)
  const nodeData = map<NodeInfo, NodeDatum>(data, (info) => {
    const storedState = localStorageData?.[info.id]

    const createDatum = <InfoType extends NodeInfo>(
      info: InfoType
    ): NodeDatumBase<InfoType> => ({
      info,
      state: {
        index: storedState?.index,
        x: storedState?.x,
        y: storedState?.y,
        fx: storedState?.fx,
        fy: storedState?.fy,
        vx: storedState?.vx,
        vy: storedState?.vy,
        maskColor: storedState?.maskColor ?? ([0, 0, 0] as MaskColor),
        selected: storedState?.selected ?? false,
        hidden: storedState?.hidden ?? false,
        idle: storedState?.idle ?? false,
        positioned: storedState?.positioned ?? false,
      },
      scales,
      cache: {},
      // Properties below are manipulated by d3-force, we make sure they're part of our state object.
      set index(value: number | undefined) {
        this.state.index = value
      },
      get index() {
        return this.state.index
      },
      set x(value: number | undefined) {
        this.state.x = value
      },
      get x() {
        return this.state.x
      },
      set y(value: number | undefined) {
        this.state.y = value
      },
      get y() {
        return this.state.y
      },
      set fx(value: number | undefined | null) {
        this.state.fx = value
      },
      get fx() {
        return this.state.fx
      },
      set fy(value: number | undefined | null) {
        this.state.fy = value
      },
      get fy() {
        return this.state.fy
      },
      set vx(value: number | undefined) {
        this.state.vx = value
      },
      get vx() {
        return this.state.vx
      },
      set vy(value: number | undefined) {
        this.state.vy = value
      },
      get vy() {
        return this.state.vy
      },
      // Custom properties, only manipulated by us
      set maskColor(value: MaskColor) {
        this.state.maskColor = value
      },
      get maskColor() {
        return this.state.maskColor
      },
      set selected(value: boolean) {
        this.state.selected = value
      },
      get selected() {
        return this.state.selected
      },
      set idle(value: boolean) {
        this.state.idle = value
        if (value) {
          this.fx = this.x
          this.fy = this.y
        } else if (!this.positioned) {
          this.fx = undefined
          this.fy = undefined
        }
      },
      get idle() {
        return this.state.idle
      },
      set positioned(value: boolean) {
        this.state.positioned = value
      },
      get positioned() {
        return this.state.positioned
      },
      set hidden(value: boolean) {
        this.state.hidden = value
      },
      get hidden() {
        return this.state.hidden
      },
    })

    const type = info.type
    switch (type) {
      case "project":
        return createDatum<NodeInfoType<"project">>(info)
      default:
        return unexpectedType(type as never)
    }
  })

  nodeData.forEach((datum) => {
    if (!datum.scales) {
      throw new Error("Node scales have not been defined")
    }

    datum.scales.setNodeData(nodeData)
  })

  return nodeData
}

export const getNodeByDatum = function (
  selection: NodeGroupSelection,
  datum: NodeDatum
) {
  return selection.select<SVGGElement>(
    `#node-${datum.info.id}`
  ) as unknown as Selection<SVGGElement, NodeDatum, SVGSymbolElement, undefined>
}

export const createNodes: CreateNodesFn = function (selection, data) {
  const nodeSelection = selection
    .selectAll("g")
    .data(data)
    .join("g") as NodeSelection<SVGGElement, SVGSymbolElement>

  return nodeSelection.call(setAttributes)
}

export const clearAttributes = function <PT extends BaseType>(
  selection: Selection<SVGGElement, NodeDatum, PT, unknown>
) {
  const node = selection.node()

  if (!node || !("attributes" in node)) {
    return
  }

  const attributes = node.attributes

  for (const attr of attributes) {
    selection.attr(attr.name, null)
  }
}

export const setAttributes = function <PT extends BaseType>(
  selection: Selection<SVGGElement, NodeDatum, PT, unknown>
) {
  selection
    .attr("id", (datum) => `node-${datum.info.id}`)
    .attr("class", "node")
    .attr("display", (datum) => (datum.state.hidden ? "none" : null))
    .call(renderNodeContents)
    .call(renderNodeSelectedState)
}

export const renderNodeContents = function <PT extends BaseType>(
  selection: Selection<SVGGElement, NodeDatum, PT, unknown>
) {
  selection.each(function (datum) {
    if (isNodeDatumWithInfoType(datum, "project")) {
      const node = select<SVGGElement, NodeDatum>(this)
      node
        .append("circle")
        .attr("class", "nodeCircle")
        .attr("r", nodeRadius)
        .attr("fill", nodeFill)
      node.call(renderNodeIcon)
      node.call(renderNodeLabel)
    } else {
      return unexpectedType(datum)
    }
  })
}

export const renderNodeIcon = function <PT extends BaseType>(
  selection: Selection<SVGGElement, NodeDatum, PT, unknown>
) {
  selection.each(function (datum) {
    const { cache } = datum

    const node = select(this)
    const icon = node
      .append("use")
      .attr("class", "nodeIcon")
      .attr("fill", "#ffffff")
    let radius = 0

    if (isNodeDatumWithInfoType(datum, "project")) {
      radius += cache.radius ?? projectRadius(datum) // Match node radius
      icon
        .attr("width", radius * 1.2)
        .attr("height", radius * 1.2)
        .attr("xlink:href", "#icon-project")
    } else {
      return unexpectedType(datum)
    }
  })
}

export const renderNodeLabel = function <PT extends BaseType>(
  selection: Selection<SVGGElement, NodeDatum, PT, unknown>
) {
  function applyLabelPosition<T extends BaseType>(
    selection: Selection<T, unknown, null, unknown>,
    distance: number
  ) {
    zoom().translateBy(
      selection as unknown as Selection<Element, unknown, null, unknown>,
      0,
      distance
    )
  }

  selection.each(function (datum) {
    const node = select(this)
    const label = node
      .append("text")
      .attr("class", "nodeLabel")
      .attr("filter", "url(#bg-white)")
      .attr("dominant-baseline", "text-before-edge")
      .attr("text-anchor", "middle")

    let distance = 0

    if (isNodeDatumWithInfoType(datum, "project")) {
      const { info, cache } = datum
      label
        .append("tspan")
        .text(info.name)
        .attr("x", "0")
        .attr("y", "0")
        .attr("font-weight", "bold")
      // TODO: Show Account Number when the user hovers over the node

      distance += cache.radius ?? projectRadius(datum)
      label.call(applyLabelPosition, distance)
    } else {
      return unexpectedType(datum)
    }
  })
}

export const renderNodeSelectedState = function <PT extends BaseType>(
  selection: Selection<SVGGElement, NodeDatum, PT, unknown>
) {
  const datum = selection.datum()
  let radius = 0

  if (isNodeDatumWithInfoType(datum, "project")) {
    radius += projectRadius(datum) // Match node radius
    radius += 6 // Actual visual size of the selection circle

    if (datum.state.selected) {
      selection.select(".nodeCircle").attr("fill", nodeFill)
      selection
        .insert("circle", ".nodeCircle")
        .attr("class", "selected")
        .attr("r", radius)
        .attr("fill", "#000000")
        .attr("opacity", 0.4)
    } else {
      selection.select(".nodeCircle").attr("fill", nodeFill)
      selection.select(".selected").remove()
    }
  } else {
    return unexpectedType(datum)
  }
}

export const nodeIdResolver: NodeIdResolverFn = function ({ info }) {
  return info.id
}

export const nodeCollisionRadius: NodeCollisionRadiusFn = function (datum) {
  const { state, cache } = datum

  if (state.hidden) {
    return 0
  }

  if (isNodeDatumWithInfoType(datum, "project")) {
    return (
      cache.collisionRadius ??
      (cache.collisionRadius = projectCollisionRadius(datum))
    )
  } else {
    return unexpectedType(datum)
  }
}

export const nodeRadius: NodeValueFn<BaseType, number> = function (datum) {
  const { state, cache } = datum

  if (state.hidden) {
    return 0
  }

  if (isNodeDatumWithInfoType(datum, "project")) {
    return cache.radius ?? (cache.radius = projectRadius(datum))
  } else {
    return unexpectedType(datum)
  }
}

export const nodeFill: NodeValueFn<BaseType, string> = function (datum) {
  const canvas = select<HTMLCanvasElement, CanvasDatum>("#canvas")
  const isHovered = !canvas.empty() && datum === canvas.datum().state.hovered

  if (isNodeDatumWithInfoType(datum, "project")) {
    const { info, state } = datum

    if (info.tag === "Gamefi") {
      if (isHovered) {
        if (state.selected) {
          return "#5c0000"
        }
        return "#8b0000"
      } else {
        if (state.selected) {
          return "#8b0000"
        }
        return "#d0021b"
      }
    }

    if (info.tag === "DAO") {
      if (isHovered) {
        if (state.selected) {
          return "#ffb805"
        }
        return "#ffa505"
      } else {
        if (state.selected) {
          return "#ffc905"
        }
        return "#ffa505"
      }
    }

    if (info.tag === "NFT") {
      if (isHovered) {
        if (state.selected) {
          return "#ff0000"
        }
        return "#a70000"
      } else {
        if (state.selected) {
          return "#ff5252"
        }
        return "#a70000"
      }
    }

    if (info.tag === "DeFi") {
      if (isHovered) {
        if (state.selected) {
          return "#77ab59"
        }
        return "#36802d"
      } else {
        if (state.selected) {
          return "#234d20"
        }
        return "#36802d"
      }
    }

    if (isHovered) {
      if (state.selected) {
        return "#00485e"
      }
      return "#006e90"
    } else {
      if (state.selected) {
        return "#006e90"
      }
      return "#029ecf"
    }
  } else {
    return unexpectedType(datum)
  }
}

export const nodeStrength: NodeStrengthFn = function (datum) {
  const { state, cache } = datum

  if (state.hidden) {
    return 0
  }

  if (isNodeDatumWithInfoType(datum, "project")) {
    return cache.strength ?? (cache.strength = projectStrength(datum))
  } else {
    return unexpectedType(datum)
  }
}

export const nodeLabelSize: NodeLabelSizeFn = function (datum) {
  const { state, cache } = datum

  if (state.hidden) {
    return 0
  }

  if (isNodeDatumWithInfoType(datum, "project")) {
    return cache.labelSize ?? (cache.labelSize = projectNodeLabelSize(datum))
  } else {
    return unexpectedType(datum)
  }
}

export const nodesToLocalStorage = function (data: NodeDatum[]) {
  const dataMap = data.reduce<Record<string, NodeDatum["state"]>>(
    (acc, entry) => {
      acc[`${entry.info.id}`] = entry.state
      return acc
    },
    {}
  )
  const ids = Object.keys(dataMap).sort()
  const key = generateStorageKey(ids)

  setD3LocalStorage(key, "NODE", dataMap)
}

export const getNodesFromLocalStorage = function (data: NodeInfo[]) {
  // check if exist in local storage then return localstorage otherwise default state
  const ids = data.map((entry) => `${entry.id}`, []).sort()
  const key = generateStorageKey(ids)

  return getD3LocalStorage(key, "NODE")
}
