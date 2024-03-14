import { create } from "d3-selection"

import { CreateStageFn } from "../../types"

export const createStage: CreateStageFn = function () {
  return create("svg")
    .attr("id", "stage")
    .attr("width", 0)
    .attr("height", 0)
    .attr("style", "position:absolute;top:-99999px;left:-99999px;")
}
