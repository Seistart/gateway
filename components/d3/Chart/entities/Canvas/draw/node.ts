import type { BaseType, Selection } from "d3-selection"
import { select } from "d3-selection"
import { zoomTransform } from "d3-zoom"

import {
  CanvasDrawOptions,
  NodeDatum,
  NodeInfoMapKey,
  NodeSelection,
} from "../../../types"
import {
  isNodeDatumWithInfoType,
  projectNodeLabelSize,
} from "../../../utils/node"
import { applyGeometryNormalisation, applyScale } from "../geometry"

const generateIconImage = (
  nodeIcon: Selection<SVGUseElement, NodeDatum, BaseType, undefined>,
  iconName: NodeInfoMapKey
) => {
  const iconSymbol = select<SVGUseElement, undefined>(`#icon-${iconName}`)
  const iconSymbolNode = iconSymbol.node()

  if (!iconSymbolNode) {
    throw new Error(`Icon symbol #icon-${iconName} can't be found in the DOM`)
  }

  const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg")

  icon.setAttribute("fill", nodeIcon.attr("fill"))

  const attributes = iconSymbolNode.attributes as unknown as Iterable<Attr>
  for (const attr of attributes) {
    if (!["id", "class"].includes(attr.name)) {
      icon.setAttribute(attr.name, attr.value)
    }
  }

  iconSymbol.selectChildren<SVGPathElement, undefined>().each(function () {
    icon.appendChild(this.cloneNode())
  })

  const iconString = new XMLSerializer().serializeToString(icon)
  const encodedIconString = encodeURIComponent(iconString)
  const imgSrc = `data:image/svg+xml;charset=utf8,${encodedIconString}`

  const image = new Image()
  image.src = imgSrc

  return image
}

type ImageRecord = Record<NodeInfoMapKey, HTMLImageElement | null>
const iconImages: ImageRecord = {
  project: null,
}
const getIconImage = (
  nodeIcon: Selection<SVGUseElement, NodeDatum, BaseType, undefined>
) => {
  const datum = nodeIcon.datum()
  if (isNodeDatumWithInfoType(datum, "project")) {
    return (
      iconImages.project ??
      (iconImages.project = generateIconImage(nodeIcon, datum.info.type))
    )
  }
}

const getIconYOffset = (
  nodeIcon: Selection<SVGUseElement, NodeDatum, BaseType, undefined>
) => {
  return 0
}

export const drawNode = function (
  context: CanvasRenderingContext2D,
  maskContext: CanvasRenderingContext2D,
  selection: NodeSelection<SVGGElement, BaseType>,
  options: CanvasDrawOptions
) {
  const datum = selection.datum()
  const nodeIcon = selection.select<SVGUseElement>(".nodeIcon")
  const nodeCircle = selection.select(".nodeCircle")
  const nodeLabel = selection.select<SVGTextElement>(".nodeLabel")

  const { offsets, scale, hasSelectedNodes } = options

  if (datum.state.hidden) {
    return
  }

  const lowOpacity = hasSelectedNodes && !datum.state.selected

  const centerX = applyGeometryNormalisation(datum.x ?? 0, {
    scale,
    offsets: offsets ?? { x: 0, y: 0 },
    axis: "x",
  })
  const centerY = applyGeometryNormalisation(datum.y ?? 0, {
    scale,
    offsets: offsets ?? { x: 0, y: 0 },
    axis: "y",
  })

  // Node selection circle
  if (datum.state.selected) {
    const selected = selection.select(".selected")
    if (selected.node()) {
      const selectedRadius = applyGeometryNormalisation(selected.attr("r"), {
        scale,
      })

      context.beginPath()

      context.strokeStyle = selected.attr("fill")
      context.globalAlpha = parseFloat(selected.attr("opacity"))

      context.ellipse(
        centerX,
        centerY,
        selectedRadius,
        selectedRadius,
        0,
        0,
        2 * Math.PI
      )
      context.fill()
      context.globalAlpha = 1
    }
  }

  // Node circle
  const nodeRadius = applyGeometryNormalisation(nodeCircle.attr("r"), {
    scale,
  })
  const renderSimpleMode = options.performanceMode && nodeRadius < 10

  context.beginPath()
  maskContext.beginPath()

  context.fillStyle = nodeCircle.attr("fill")

  const maskColor = `rgb(${datum.state.maskColor.join(", ")})`
  maskContext.fillStyle = maskColor

  const ellipseParams = [
    centerX,
    centerY,
    nodeRadius,
    nodeRadius,
    0,
    0,
    2 * Math.PI,
  ] as const
  context.ellipse(...ellipseParams)
  maskContext.ellipse(...ellipseParams)

  context.fill()

  if (lowOpacity) {
    context.fillStyle = "rgba(255,255,255,0.6)"
    context.ellipse(...ellipseParams)
    context.fill()
  }

  maskContext.fill()

  // Icon
  if (!renderSimpleMode) {
    const iconImage = getIconImage(nodeIcon)
    if (iconImage && iconImage.complete) {
      const iconWidth = applyGeometryNormalisation(nodeIcon.attr("width"), {
        scale,
      })
      const heightScale = iconWidth / iconImage.width
      const iconHeight = heightScale * iconImage.height // Apply width ratio to height

      const yOffset = heightScale * getIconYOffset(nodeIcon)

      context.drawImage(
        iconImage,
        centerX - iconWidth / 2,
        centerY + yOffset - iconHeight / 2,
        iconWidth,
        iconHeight
      )
    }
  }

  // Label
  if (!renderSimpleMode && datum.state.idle) {
    if (lowOpacity) {
      context.globalAlpha = 0.4
    }

    // Label - calculations
    const labelNode = nodeLabel.node()
    if (!labelNode) {
      throw new Error("Node of node label can't be found")
    }
    const transform = zoomTransform(labelNode)
    const { y } = transform

    const showLabel = true

    if (showLabel) {
      const labelDistance =
        centerY +
        applyGeometryNormalisation(y, {
          scale,
        })

      const labelPadding = applyScale(4, scale ?? 1)
      const linePadding = applyScale(3, scale ?? 1)
      const lines: [string, number, number][] = []
      let totalWidth = 0
      let totalHeight = 0

      const labelSize = projectNodeLabelSize(datum)

      nodeLabel.selectAll("tspan").each(function () {
        const line = select(this)
        const text = line.text()
        const fontSize = 16
        context.font = `${Math.min(
          fontSize,
          applyScale(labelSize, scale ?? 1)
        )}px sans-serif`
        context.lineCap = "round"
        context.textAlign = "center"
        context.textBaseline = "top"

        const metrics = context.measureText(text)

        totalWidth = Math.max(totalWidth, metrics.width)
        if (totalHeight) {
          totalHeight += linePadding
        } else {
          totalHeight += labelPadding
        }
        lines.push([text, centerX, labelDistance + totalHeight])
        totalHeight += metrics.actualBoundingBoxDescent
      })
      totalHeight += labelPadding

      // Label - background
      context.beginPath()

      context.fillStyle = "rgba(255, 255, 255, 0.75)"

      context.rect(
        centerX - totalWidth / 2 - labelPadding,
        labelDistance,
        totalWidth + labelPadding * 2,
        totalHeight
      )
      context.fill()

      // Label - text
      context.fillStyle = "#000000"
      lines.forEach(([text, x, y]) => context.fillText(text, x, y))
    }

    if (lowOpacity) {
      context.globalAlpha = 1
    }
  }
}
