import { BaseType, Selection } from "d3-selection"

export const drawDragSelection = function (
  context: CanvasRenderingContext2D,
  selection: Selection<SVGSymbolElement, unknown, BaseType, unknown>
) {
  if (selection.node()) {
    const polygonSelection = selection.selectChild()
    const points = polygonSelection
      .attr("points")
      .trim()
      .replace(/\s+/, ",")
      .split(",")
      .map((entry) => parseFloat(entry))

    const [x1, y1, x2, , , y2] = points
    const width = x2 - x1
    const height = y2 - y1

    context.beginPath()
    context.strokeStyle = polygonSelection.attr("stroke")
    context.lineWidth = parseFloat(polygonSelection.attr("strokeWidth"))
    context.rect(x1, y1, width, height)
    context.stroke()
  }
}
