import { BaseType, Selection } from "d3-selection"

import { CommandAction } from "../../command/action"
import { NodeDatum, NodeDatumState, NodeSelection } from "../../types"
import {
  clearAttributes,
  renderNodeSelectedState,
  setAttributes,
} from "../Node"

export const selectNodeAction = (
  selection: NodeSelection,
  datum?: NodeDatum
) => {
  const _datum = datum ?? selection.datum()

  const execute = () => {
    _datum.selected = true
    selection.call(renderNodeSelectedState)
  }

  const undo = () => {
    _datum.selected = false
    selection.call(renderNodeSelectedState)
  }

  return new CommandAction("node-select", execute, undo)
}

export const deselectNodeAction = <PT extends BaseType>(
  selection: Selection<SVGGElement, NodeDatum, PT, unknown>,
  datum?: NodeDatum
) => {
  const _datum = datum ?? selection.datum()

  const execute = () => {
    _datum.selected = false
    selection.call(renderNodeSelectedState)
  }

  const undo = () => {
    _datum.selected = true
    selection.call(renderNodeSelectedState)
  }

  return new CommandAction("node-deselect", execute, undo)
}

export const moveNodeAction = (
  selection: NodeSelection<SVGGElement>,
  datum: NodeDatum,
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
  fromFX: number | null | undefined,
  fromFY: number | null | undefined,
  toFX: number | null | undefined,
  toFY: number | null | undefined
) => {
  const execute = () => {
    datum.x = toX
    datum.y = toY
    datum.fx = toFX
    datum.fy = toFY
  }

  const undo = () => {
    datum.x = fromX
    datum.y = fromY
    datum.fx = fromFX
    datum.fy = fromFY
  }

  return new CommandAction("node-move", execute, undo)
}

export const fixNodePositionAction = <PT extends BaseType>(
  selection: Selection<SVGGElement, NodeDatum, PT, unknown>,
  datum?: NodeDatum
) => {
  const _datum = datum ?? selection.datum()
  const { positioned, x, y, fx, fy } = _datum

  const execute = () => {
    _datum.positioned = true
    _datum.fx = _datum.x
    _datum.fy = _datum.y
  }

  const undo = () => {
    _datum.positioned = positioned
    _datum.x = x
    _datum.y = y
    _datum.fx = fx
    _datum.fy = fy
  }

  return new CommandAction("node-position-fix", execute, undo)
}

export const unfixNodePositionAction = <PT extends BaseType>(
  selection: Selection<SVGGElement, NodeDatum, PT, unknown>,
  datum?: NodeDatum
) => {
  const _datum = datum ?? selection.datum()
  const { positioned, fx, fy } = _datum

  const execute = () => {
    _datum.positioned = false
    _datum.fx = undefined
    _datum.fy = undefined
  }

  const undo = () => {
    _datum.positioned = positioned
    _datum.fx = fx
    _datum.fy = fy
  }

  return new CommandAction("node-position-unfix", execute, undo)
}

export const hideNodeAction = <PT extends BaseType>(
  selection: Selection<SVGGElement, NodeDatum, PT, unknown>,
  datum?: NodeDatum
) => {
  const _datum = datum ?? selection.datum()

  const execute = () => {
    _datum.hidden = true
    selection.attr("display", "none")
  }

  const undo = () => {
    _datum.hidden = false
    selection.attr("display", null)
  }

  return new CommandAction("node-hide", execute, undo)
}

export const resetNodeAction = <PT extends BaseType>(
  nodeSelection: Selection<SVGGElement, NodeDatum, PT, unknown>,
  nodeDatumFromLocalStorage: NodeDatumState
) => {
  const datum = nodeSelection.datum()
  const state = datum.state

  const execute = () => {
    datum.state = {
      ...nodeDatumFromLocalStorage,
    }
    nodeSelection.call(clearAttributes).call(setAttributes)
  }

  const undo = () => {
    datum.state = {
      ...state,
    }
    nodeSelection.call(clearAttributes).call(setAttributes)
  }

  return new CommandAction("node-reset", execute, undo)
}
