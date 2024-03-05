import { CanvasSelection } from "../../../types"

export const attachClickBehaviour = function (selection: CanvasSelection) {
  return selection.on("click.clickhovered", function (event) {
    const datum = selection.datum()

    selection.dispatch("canvasclick", {
      bubbles: false,
      cancelable: false,
      detail: {
        event,
        entity: datum.state.hovered,
      },
    })
  })
}

export const detachClickBehaviour = function (selection: CanvasSelection) {
  return selection.on("click.clickhovered", null)
}
