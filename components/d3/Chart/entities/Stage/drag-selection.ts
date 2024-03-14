import type { BaseType, Selection } from "d3-selection"

export const createDragSelection = function (
  selection: Selection<SVGDefsElement, undefined, BaseType, undefined>
) {
  return selection
    .append("symbol")
    .attr("id", "dragSelection")
    .append("polygon")
    .attr("fill", "transparent")
    .attr("stroke", "#000000")
    .attr("strokeWidth", 1)
}

export const destroyDragSelection = function <
  T extends BaseType,
  PT extends BaseType,
>(selection: Selection<T, undefined, PT, undefined>) {
  return selection.select("#dragSelection").remove()
}
