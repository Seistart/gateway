import { CanvasSelection } from "../../types"

export const setHasSelectedNodes = (
  selection: CanvasSelection,
  hasSelectedNodes: boolean
) => {
  const _datum = selection.datum()
  _datum.state.hasSelectedNodes = hasSelectedNodes
}
