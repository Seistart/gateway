import { Selection } from "d3"
import { CreateNodeGroupFn } from "../../types"

type DefsSelection = Selection<
  SVGDefsElement,
  undefined,
  SVGSVGElement,
  undefined
>

export const createNodeGroup: CreateNodeGroupFn = function (
  selection: DefsSelection
) {
  return selection.append("g").attr("id", "nodeGroup")
  // or, if appending symbols directly under defs as intended
  // return selection.append("symbol").attr("id", "nodeGroup");
}
