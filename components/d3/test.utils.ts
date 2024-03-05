import { create } from "d3-selection"

export type MockStageParams = {
  width?: number
  height?: number
  xOffset?: number
  yOffset?: number
}
export const mockStage = ({
  width = 800,
  height = 600,
  xOffset = 0,
  yOffset = 0,
} = {}) =>
  create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [xOffset, yOffset, width, height])
