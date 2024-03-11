import { select, selectAll } from "d3-selection"
import { D3ZoomEvent, ZoomTransform, zoom, zoomTransform } from "d3-zoom"

import type { CanvasDatum, CanvasSelection, NodeDatum } from "../../../types"
import { updateCursor } from "../cursor"
import { applyReversedScale, getScale } from "../geometry"

export const createCanvasZoomBehaviour = function () {
  function onZoom(
    this: HTMLCanvasElement,
    event: D3ZoomEvent<HTMLCanvasElement, CanvasDatum>
  ) {
    const canvasSelection = select<HTMLCanvasElement, CanvasDatum>("#canvas")

    if (event.sourceEvent?.type === "mousemove") {
      canvasSelection.style("cursor", "grabbing")
    } else {
      const [minZoomLevel, maxZoomLevel] = getZoomLevelRange(canvasSelection)
      const currentZoomLevel = getZoomLevel(canvasSelection)

      canvasSelection.dispatch("canvaszoomed", {
        bubbles: false,
        cancelable: false,
        detail: {
          event,
          datum: canvasSelection.datum(),
          element: this,
          minZoomLevel,
          maxZoomLevel,
          currentZoomLevel,
        },
      })
    }
  }

  function onZoomEnded(this: HTMLCanvasElement) {
    const canvasSelection = select<HTMLCanvasElement, CanvasDatum>(this)
    const datum = canvasSelection.datum()

    if (datum.state.cursorMode === "move") {
      canvasSelection.call(updateCursor)
    }
  }

  return zoom<HTMLCanvasElement, CanvasDatum>()
    .filter(function (event, datum) {
      const mouseEvents = ["mousedown", "mousemove", "mouseup", "dblclick"]
      if (
        mouseEvents.includes(event.type) &&
        (datum.state.cursorMode === "select" ||
          datum.state.hovered ||
          datum.state.dragged)
      ) {
        return false
      }
      return true
    })
    .on("zoom", onZoom)
    .on("end.zoom", onZoomEnded)
}

export const attachZoomBehaviour = function (selection: CanvasSelection) {
  const zoomBehaviour = selection.datum().zoom

  if (!zoomBehaviour) {
    throw new Error("zoomBehaviour not found")
  }

  return selection.call(zoomBehaviour)
}

export const detachZoomBehaviour = function (selection: CanvasSelection) {
  const zoomBehaviour = selection.datum().zoom

  zoomBehaviour?.on("zoom", null)?.on("end.zoom", null)

  return selection
}

export const updateCanvasZoomScaleMax = function (
  canvasSelection: CanvasSelection,
  zoomTransform: ZoomTransform
) {
  const canvasDatum = canvasSelection.datum()
  const scale = canvasDatum.scales.zoom

  const [currMin] = scale.domain()
  const { k: newMax } = zoomTransform

  scale.domain([currMin, newMax])
  canvasDatum.zoom?.scaleExtent([scale.invert(32), scale.invert(0)])
}

export const getZoomBoundaries = function (canvasSelection: CanvasSelection) {
  const PADDING = 200

  const canvasNode = canvasSelection.node()
  if (!canvasNode) {
    throw new Error("canvasNode cannot be found")
  }

  const { width: outerCanvasWidth, height: outerCanvasHeight } =
    canvasNode.getBoundingClientRect()

  const nodes = selectAll<SVGGElement, NodeDatum>(".node")
  type Boundaries = {
    xMin: number
    xMax: number
    yMin: number
    yMax: number
  }
  const nodeBoundaries = nodes.data().reduce<Boundaries>(
    (acc, datum) => {
      if (!datum || datum.hidden) {
        return acc
      }

      const { xMin, xMax, yMin, yMax } = acc
      const x = datum.x as number
      const y = datum.y as number
      acc.xMin = Math.min(x, xMin ?? x)
      acc.xMax = Math.max(x, xMax ?? x)
      acc.yMin = Math.min(y, yMin ?? y)
      acc.yMax = Math.max(y, yMax ?? y)
      return acc
    },
    {
      xMin: undefined,
      xMax: undefined,
      yMin: undefined,
      yMax: undefined,
    } as unknown as Boundaries
  )

  const nodeGroupWidth = Math.abs(nodeBoundaries.xMin - nodeBoundaries.xMax)
  const nodeGroupHeight = Math.abs(nodeBoundaries.yMin - nodeBoundaries.yMax)
  const nodeCenterX = nodeBoundaries.xMin + nodeGroupWidth / 2
  const nodeCenterY = nodeBoundaries.yMin + nodeGroupHeight / 2

  const horizontalPadding = PADDING * 2
  const verticlaPadding = PADDING * 2
  const widthScale = outerCanvasWidth / (nodeGroupWidth + horizontalPadding)
  const heightScale = outerCanvasHeight / (nodeGroupHeight + verticlaPadding)
  const newScale = Math.min(heightScale, widthScale)

  return new ZoomTransform(newScale, nodeCenterX, nodeCenterY)
}

export const zoomToBoundaries = function (
  canvasSelection: CanvasSelection,
  zoomTransform: ZoomTransform,
  withTansition = true
) {
  const { x, y } = zoomTransform

  const canvasDatum = canvasSelection.datum()
  const zoomScale = canvasDatum.scales.zoom
  const zoom = canvasDatum.zoom

  if (!zoom) {
    throw new Error(
      "zoomToBoundaries was called but no zoom could be found on canvasDatum"
    )
  }

  canvasSelection.call(zoom.translateTo, x, y)

  if (withTansition) {
    canvasSelection.transition().call(zoom.scaleTo, zoomScale.invert(40))
  } else {
    canvasSelection.call(zoom.scaleTo, zoomScale.invert(40))
  }
}

export const zoomToLevel = function (
  this: HTMLCanvasElement,
  selection: CanvasSelection = select<HTMLCanvasElement, CanvasDatum>(
    "#canvas"
  ),
  zoomLevel: number
) {
  const canvasDatum = selection.datum()
  const zoomScale = canvasDatum.scales.zoom
  const zoom = canvasDatum.zoom

  if (!zoom) {
    throw new Error(
      "zoomToLevel was called but no zoom could be found on canvasDatum"
    )
  }

  selection.call(zoom.scaleTo, zoomScale.invert(zoomLevel))

  const [minZoomLevel, maxZoomLevel] = getZoomLevelRange(selection)

  selection.dispatch("canvaszoomed", {
    bubbles: false,
    cancelable: false,
    detail: {
      event: null,
      datum: selection.datum(),
      element: this,
      minZoomLevel,
      maxZoomLevel,
      currentZoomLevel: zoomLevel,
    },
  })
}

export const getZoomLevel = function (
  selection: CanvasSelection = select<HTMLCanvasElement, CanvasDatum>("#canvas")
) {
  const canvasNode = selection.node()
  const canvasDatum = selection.datum()
  const zoomScale = canvasDatum.scales.zoom

  if (!canvasNode) {
    throw new Error("getZoomLevel was called but no canvas node could be found")
  }

  const { k } = zoomTransform(canvasNode)
  const scaleResult = zoomScale(k)

  return isNaN(scaleResult) ? 30 : scaleResult
}

export const getZoomLevelRange = function (
  selection: CanvasSelection = select<HTMLCanvasElement, CanvasDatum>("#canvas")
) {
  if (!selection) {
    return
  }

  const canvasDatum = selection.datum()
  const zoomScale = canvasDatum.scales.zoom

  return zoomScale.range()
}

export const applyBoundaryMovement = function (
  selection: CanvasSelection,
  currRect: DOMRect | null | undefined,
  newRect: DOMRect
) {
  const canvasDatum = selection.datum()
  const zoom = canvasDatum.zoom
  const scale = getScale(selection)

  if (!zoom) {
    throw new Error(
      "applyBoundaryMovement was called but no zoom could be found on canvasDatum"
    )
  }

  const diffX = newRect.x - (currRect?.x ?? newRect.x)
  const diffY = newRect.y - (currRect?.y ?? newRect.y)

  if (diffX || diffY) {
    selection.call(
      zoom.translateBy,
      applyReversedScale(-diffX, scale),
      applyReversedScale(-diffY, scale)
    )
  }
}

export const updateAndEnforceZoomLevels = function (
  selection: CanvasSelection
) {
  const zoomBoundaries = getZoomBoundaries(selection)

  selection.call(updateCanvasZoomScaleMax, zoomBoundaries)

  const currentZoomLevel = getZoomLevel(selection)
  const [, maxZoomLevel] = getZoomLevelRange(selection)
  if (currentZoomLevel > maxZoomLevel) {
    selection.call(zoomToBoundaries, zoomBoundaries)
  } else {
    selection.call(zoomToLevel, currentZoomLevel)
  }
}
