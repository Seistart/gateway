import { CreateNodeGroupFn } from "../../types"

export const createNodeGroup: CreateNodeGroupFn = function (selection) {
  return selection.append("symbol").attr("id", "nodeGroup")
}
