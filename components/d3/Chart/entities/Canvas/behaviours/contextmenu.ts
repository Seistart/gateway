import { pointer } from "d3-selection"

import { CanvasSelection } from "../../../types"

export const attachContextMenu = function (selection: CanvasSelection) {
  selection.on("contextmenu", function (event, datum) {
    event.preventDefault()

    const hovered = datum.state.hovered

    selection.dispatch("canvascontextmenu", {
      bubbles: false,
      cancelable: false,
      detail: {
        element: this,
        event,
        datum: hovered,
        position: pointer(event),
      },
    })
  })
}

export const detachContextMenu = function (selection: CanvasSelection) {
  return selection.on("contextmenu", null)
}
