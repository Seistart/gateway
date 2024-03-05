import { CanvasCursorMode, CanvasSelection } from "../../types"
import { isNodeDatum } from "../../utils/node"

export const updateCursor = function (selection: CanvasSelection) {
  const datum = selection.datum()
  const { hovered, cursorMode } = datum.state
  if (hovered && isNodeDatum(hovered)) {
    selection.style("cursor", "pointer")
  } else {
    if (cursorMode === "move") {
      selection.style("cursor", "grab")
    } else {
      selection.style("cursor", "default")
    }
  }
}

export const setCursorMode = function (
  selection: CanvasSelection,
  cursorMode: CanvasCursorMode
) {
  const datum = selection.datum()
  datum.state.cursorMode = cursorMode

  selection.call(updateCursor)
}
