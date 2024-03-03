import { D3DragEvent, drag } from 'd3-drag'
import { BaseType, Selection, select, selectAll } from 'd3-selection'

import { CommandAction } from '../../../command/action'
import { getInstance as getCommandManagerInstance } from '../../../command/manager'
import { CommandActionVariant } from '../../../command/types'
import {
  CanvasDatum,
  CanvasSelection,
  NodeDatum,
  NodeGroupSelection,
  NodeSelection,
  Simulation,
  StageSelection,
} from '../../../types'
import { getNodeByDatum } from '../../Node'
import { fixNodePositionAction, moveNodeAction } from '../../Node/actions'
import {
  tickSimulationActionBackwardsOnly,
  tickSimulationActionForwardsOnly,
} from '../../Simulation/actions'
import { createDragSelection, destroyDragSelection } from '../../Stage'
import { updateCursor } from '../cursor'
import {
  applyReversedOffset,
  applyReversedScale,
  getOffsets,
  getScale,
} from '../geometry'

const isValidDragNodeTarget = (datum: CanvasDatum) => {
  const targetType = datum.state.hovered?.info.type
  return targetType !== undefined && ['project'].includes(targetType)
}

const isValidDragSelectTarget = (datum: CanvasDatum) =>
  datum.state.cursorMode === 'select' &&
  !datum.state.hovered &&
  !datum.state.dragged

const isLinkTarget = (datum: CanvasDatum) => {
  const targetType = datum.state.hovered?.info.type
  return targetType !== undefined && ['project'].includes(targetType)
}

const createDragNodeContext = function (
  simulation: Simulation
): DragNodeContext {
  return {
    type: 'dragnode',
    simulation: simulation,
    x1: undefined,
    y1: undefined,
    x2: undefined,
    y2: undefined,
    moved: false,
    nodeSelection: selectAll<SVGGElement, NodeDatum>(
      '.node'
    ) as unknown as NodeSelection,
    selectedNodeData: [],
    connectedNodes: [],
    nodeStartPositions: {},
    actions: [],
  }
}

type DragSelection = Selection<
  SVGPolygonElement,
  undefined,
  BaseType,
  undefined
>
const createDragSelectContext = function (): DragSelectContext {
  return {
    type: 'dragselect',
    x1: undefined,
    y1: undefined,
    x2: undefined,
    y2: undefined,
    dragSelection: undefined,
  }
}

type DragNodeContext = {
  type: 'dragnode'
  simulation: Simulation
  x1: number | undefined
  y1: number | undefined
  x2: number | undefined
  y2: number | undefined
  moved: boolean
  nodeSelection: NodeSelection
  connectedNodes: NodeDatum[]
  selectedNodeData: NodeDatum[]
  nodeStartPositions: Record<
    string,
    {
      positioned: boolean
      x: number
      y: number
      fx: number | null | undefined
      fy: number | null | undefined
    }
  >
  actions: CommandAction[]
}
type DragSelectContext = {
  type: 'dragselect'
  x1: number | undefined
  y1: number | undefined
  x2: number | undefined
  y2: number | undefined
  dragSelection: DragSelection | undefined
}
type DragContext = DragNodeContext | DragSelectContext
const createDragContext = function (
  selection: CanvasSelection,
  simulation: Simulation
): DragContext {
  const datum = selection.datum()
  if (isValidDragNodeTarget(datum)) {
    return createDragNodeContext(simulation)
  } else if (isValidDragSelectTarget(datum)) {
    return createDragSelectContext()
  } else {
    throw new Error('No valid drag context could be constructed')
  }
}

/* DragNode Handlers */

const isValidDragNodeEntity = (
  entity: NodeDatum | object | null
): entity is NodeDatum => {
  if (!entity || !('info' in entity) || !entity.info.type) {
    return false
  }

  return ['project'].includes(entity.info.type)
}

const onDragNodeStart = function (
  selection: CanvasSelection,
  event: D3DragEvent<HTMLCanvasElement, CanvasDatum, null>,
  datum: CanvasDatum,
  context: DragNodeContext
) {
  const entity = datum.state.hovered

  // We've already checked this, but the check
  // here satisfies typescript below.
  if (!isValidDragNodeEntity(entity)) {
    return
  }

  datum.state.dragged = entity
  const { x, y } = event
  const scale = getScale(selection)
  const { x: oX, y: oY } = getOffsets(selection)

  context.x1 = context.x2 = applyReversedScale(
    applyReversedOffset(x, oX),
    scale
  )
  context.y1 = context.y2 = applyReversedScale(
    applyReversedOffset(y, oY),
    scale
  )

  if (entity.selected) {
    context.selectedNodeData = context.nodeSelection
      .data()
      .filter((node) => node?.state?.selected)
  }

  context.selectedNodeData.forEach(
    (datum) =>
      (context.nodeStartPositions[datum.info.id] = {
        positioned: datum.state.positioned,
        x: datum.state.x as number,
        y: datum.state.y as number,
        fx: datum.state.fx,
        fy: datum.state.fy,
      })
  )

  if (!event.active) context.simulation.alphaTarget(1).restart()

  selection.dispatch('canvasnodedragstart')
}

const onDragNodeDrag = function (
  selection: CanvasSelection,
  event: D3DragEvent<HTMLCanvasElement, CanvasDatum, null>,
  datum: CanvasDatum,
  context: DragNodeContext
) {
  const nodeDatum = datum.state.dragged

  if (!nodeDatum) {
    return
  }

  const { x, y } = event
  const scale = getScale(selection)
  const { x: oX, y: oY } = getOffsets(selection)

  nodeDatum.fx = context.x2 = applyReversedScale(
    applyReversedOffset(x, oX),
    scale
  )
  nodeDatum.fy = context.y2 = applyReversedScale(
    applyReversedOffset(y, oY),
    scale
  )

  const { x1 = 0, y1 = 0, x2, y2 } = context
  const diffX = x2 - x1
  const diffY = y2 - y1

  context.selectedNodeData.forEach((datum) => {
    const { x, y } = context.nodeStartPositions[datum.info.id]
    datum.state.fx = x + diffX
    datum.state.fy = y + diffY
  })

  if (!context.moved && x1 !== x2 && y1 !== y2) {
    const group = select<SVGGElement, undefined>(
      '#nodeGroup'
    ) as unknown as NodeGroupSelection

    context.moved = true
    selection.style('cursor', 'grabbing')

    context.actions.push(
      fixNodePositionAction(getNodeByDatum(group, nodeDatum), nodeDatum)
    )
    nodeDatum.positioned = true

    context.selectedNodeData.forEach((datum) => {
      context.actions.push(
        fixNodePositionAction(getNodeByDatum(group, datum), datum)
      )
      datum.positioned = true
    })

    if (context.selectedNodeData.length <= 1) {
      context.connectedNodes.forEach((datum) => {
        // Activate all forces on nodes that are directly connected and not positioned
        if (!datum.positioned) {
          datum.idle = false
        }
      })
    }

    selection.dispatch('canvasnodedrag')
  }
}

const onDragNodeEnd = function (
  this: HTMLCanvasElement,
  selection: CanvasSelection,
  event: D3DragEvent<HTMLCanvasElement, CanvasDatum, null>,
  datum: CanvasDatum,
  context: DragNodeContext
) {
  if (context.moved) {
    // Track the changes made by dragging
    const group = select<SVGGElement, undefined>(
      '#nodeGroup'
    ) as unknown as NodeGroupSelection
    const nodeDatum = datum.state.dragged

    if (!nodeDatum) {
      throw new Error(
        'onDragNodeEnd was called but no node datum could be resolved'
      )
    }

    const impactedNodes = nodeDatum.selected
      ? context.selectedNodeData
      : [nodeDatum, ...context.connectedNodes]

    const actions: CommandActionVariant[] = [
      tickSimulationActionBackwardsOnly(context.simulation),
      ...context.actions,
    ]

    impactedNodes.forEach((entry) => {
      const node = getNodeByDatum(group, entry)
      actions.push(
        moveNodeAction(
          node,
          entry,
          context.nodeStartPositions[entry.info.id].x,
          context.nodeStartPositions[entry.info.id].y,
          entry.x as number,
          entry.y as number,
          context.nodeStartPositions[entry.info.id].fx,
          context.nodeStartPositions[entry.info.id].fy,
          entry.fx,
          entry.fy
        )
      )
    })

    actions.push(tickSimulationActionForwardsOnly(context.simulation))

    getCommandManagerInstance().register(actions)
  }

  // Go back to normal
  if (!event.active) context.simulation.alphaTarget(0)
  select(this).style('cursor', 'pointer')

  context.x1 = context.x2 = undefined
  context.y1 = context.y2 = undefined
  context.moved = false
  datum.state.dragged = null
  context.selectedNodeData.length = 0
  context.nodeStartPositions = {}
  context.connectedNodes = []
  context.actions = []

  selection.dispatch('canvasnodedragend')
}

/* DragSelect Handlers */

const applyDragSelectionCoords = <PT extends BaseType>(
  selection: Selection<SVGPolygonElement, undefined, PT, undefined>,
  x1: number,
  y1: number,
  x2: number,
  y2: number
) =>
  selection.attr(
    'points',
    `
        ${x1},${y1} 
        ${x2},${y1} 
        ${x2},${y2} 
        ${x1},${y2}
        `
  )

const onDragSelectStart = function (
  selection: CanvasSelection,
  event: D3DragEvent<HTMLCanvasElement, CanvasDatum, null>,
  datum: CanvasDatum,
  context: DragSelectContext
) {
  const { x, y } = event

  context.x1 = context.x2 = x
  context.y1 = context.y2 = y

  selection.style('cursor', 'crosshair')

  const { x1, y1, x2, y2 } = context
  const defsSelection = select<SVGDefsElement, undefined>('#defs')

  context.dragSelection = createDragSelection(defsSelection)
  context.dragSelection.call(applyDragSelectionCoords, x1, y1, x2, y2)
}

const onDragSelectDrag = function (
  selection: CanvasSelection,
  event: D3DragEvent<HTMLCanvasElement, CanvasDatum, null>,
  datum: CanvasDatum,
  context: DragSelectContext
) {
  const { x1, y1 } = context
  const { x: x2, y: y2 } = event

  if (!context.dragSelection) {
    throw new Error(
      'onDragSelectDrag was called but no dragSelection could be resolved'
    )
  }

  context.dragSelection.call(
    applyDragSelectionCoords,
    x1 as number,
    y1 as number,
    x2 as number,
    y2 as number
  )
}

const onDragSelectEnd = function (
  selection: CanvasSelection,
  event: D3DragEvent<HTMLCanvasElement, CanvasDatum, null>,
  datum: CanvasDatum,
  context: DragSelectContext
) {
  const { x1, y1 } = context
  const { x: x2, y: y2 } = event

  const scale = getScale(selection)
  const { x: oX, y: oY } = getOffsets(selection)

  const finalCoordinates = {
    x1: applyReversedOffset(Math.min(x1 as number, x2), oX),
    y1: applyReversedOffset(Math.min(y1 as number, y2), oY),
    x2: applyReversedOffset(Math.max(x1 as number, x2), oX),
    y2: applyReversedOffset(Math.max(y1 as number, y2), oY),
  }

  type Coordinates = typeof finalCoordinates
  type Coordinate = keyof typeof finalCoordinates
  const scaledCoordinates = Object.entries(
    finalCoordinates
  ).reduce<Coordinates>(
    (acc, [key, value]) => {
      acc[key as Coordinate] = applyReversedScale(value, scale)
      return acc
    },
    { ...finalCoordinates }
  )

  const stageSelection = select<SVGSVGElement, undefined>(
    '#stage'
  ) as StageSelection
  stageSelection.call(destroyDragSelection)

  selection.call(updateCursor).dispatch('canvasdragselect', {
    bubbles: false,
    cancelable: false,
    detail: {
      event,
      ...finalCoordinates,
      scaled: scaledCoordinates,
    },
  })
}

export const attachDragBehaviour = function (
  selection: CanvasSelection,
  simulation: Simulation
) {
  let context: DragContext | null

  function dragStarted(
    this: HTMLCanvasElement,
    event: D3DragEvent<HTMLCanvasElement, CanvasDatum, null>,
    datum: CanvasDatum
  ) {
    if (isLinkTarget(selection.datum())) {
      return
    }

    context = createDragContext(selection, simulation)

    switch (context.type) {
      case 'dragnode':
        selection.call(onDragNodeStart, event, datum, context)
        break

      case 'dragselect':
        selection.call(onDragSelectStart, event, datum, context)
        break
    }
  }
  function dragged(
    this: HTMLCanvasElement,
    event: D3DragEvent<HTMLCanvasElement, CanvasDatum, null>,
    datum: CanvasDatum
  ) {
    if (isLinkTarget(selection.datum())) {
      return
    }

    if (!context) {
      throw new Error('dragged was called but no context could be resolved')
    }

    switch (context.type) {
      case 'dragnode':
        selection.call(onDragNodeDrag, event, datum, context)
        break

      case 'dragselect':
        selection.call(onDragSelectDrag, event, datum, context)
        break
    }
  }
  function dragEnded(
    this: HTMLCanvasElement,
    event: D3DragEvent<HTMLCanvasElement, CanvasDatum, null>,
    datum: CanvasDatum
  ) {
    if (isLinkTarget(selection.datum())) {
      return
    }

    if (!context) {
      throw new Error('dragged was called but no context could be resolved')
    }

    switch (context.type) {
      case 'dragnode':
        selection.call(onDragNodeEnd, event, datum, context)
        break

      case 'dragselect':
        selection.call(onDragSelectEnd, event, datum, context)
        break
    }

    context = null
  }

  selection.call(
    drag<HTMLCanvasElement, CanvasDatum>()
      .on('start', dragStarted)
      .on('drag', dragged)
      .on('end', dragEnded)
  )
}

export const detachDragBehaviour = function (selection: CanvasSelection) {
  return selection.on('mousedown.drag', null)
}
