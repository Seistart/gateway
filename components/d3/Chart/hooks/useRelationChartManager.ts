"use client"

import { debounce } from "@/utils/debounce"
import { D3DragEvent } from "d3-drag"
import { Timer, timer } from "d3-timer"
import { useCallback, useEffect, useMemo, useRef } from "react"

import {
  CommandManager,
  getInstance as getCommandManagerInstance,
  OnHistoryChange,
} from "../command/manager"
import { CommandActionVariant } from "../command/types"
import {
  applyBoundaryMovement,
  attachClickBehaviour,
  attachContextMenu,
  attachDoubleClickBehaviour,
  attachDragBehaviour,
  attachMouseMoveBehaviour,
  attachZoomBehaviour,
  detachClickBehaviour,
  detachContextMenu,
  detachDoubleClickBehaviour,
  detachDragBehaviour,
  detachMouseMoveBehaviour,
  detachZoomBehaviour,
  draw,
  getZoomBoundaries,
  getZoomLevel,
  getZoomLevelRange,
  positionCanvas,
  setCursorMode as setCanvasCursorMode,
  setHasSelectedNodes,
  setPerfomanceMode,
  updateAndEnforceZoomLevels,
  updateCanvasZoomScaleMax,
  zoomToBoundaries,
  zoomToLevel,
} from "../entities/Canvas"
import {
  getNodeByDatum,
  getNodesFromLocalStorage,
  nodesToLocalStorage,
  setAttributes as setNodeAttributes,
} from "../entities/Node"
import {
  deselectNodeAction,
  hideNodeAction,
  resetNodeAction,
  selectNodeAction,
  unfixNodePositionAction,
} from "../entities/Node/actions"
import { destroySimulation } from "../entities/Simulation"
import {
  removeSimulationNodesAction,
  replaceSimulationNodesAction,
  restoreSimulationNodesAction,
  tickSimulationActionBackwardsOnly,
  tickSimulationActionForwardsOnly,
} from "../entities/Simulation/actions"
import type { ForceGraphInstance } from "../ForceGraph"
import { CanvasCursorMode, CanvasDatum, NodeDatum } from "../types"
import { isNodeDatum } from "../utils/node"

import { useFilterStore } from "@/stores/project-filter-store"
import { useRelationChartState } from "./useRelationChartState"
import { useSpaceMove } from "./useSpaceMove"

export type InitialisationOptions = {
  graph: ForceGraphInstance
}

export const useRelationChartManager = function () {
  const commandManager = useRef<CommandManager>(getCommandManagerInstance())
  const {
    chart,
    setChart,
    ready,
    setReady,
    performanceMode,
    selection,
    setSelection,
    setShowContextMenu,
    setPositionContextMenu,
    setCursorMode,
    setZoom,
    setHistory,
    setToolTip,
  } = useRelationChartState()
  const { filteredProjects } = useFilterStore()

  const contentRectRef = useRef<DOMRect | null>(null)
  const canvasRectRef = useRef<DOMRect | null>(null)
  const timerRef = useRef<Timer | null>(null)

  const clearDrawTimer = useCallback(() => {
    timerRef.current?.stop()
  }, [])

  const resetDrawTimer = useCallback(
    (chart: ForceGraphInstance | null) => {
      clearDrawTimer()

      if (!chart || !ready || !canvasRectRef.current) {
        return
      }

      const { height, width } = canvasRectRef.current
      const canvasSelection = chart.getCanvasSelection()
      const canvasMaskSelection = chart.getCanvasMaskSelection()

      function animate(time: number) {
        draw(canvasSelection, canvasMaskSelection, {
          height,
          width,
          performanceMode,
        })
      }

      if (timerRef.current) {
        timerRef.current.restart(animate)
      } else {
        timerRef.current = timer(animate)
      }
    },
    [clearDrawTimer, ready, performanceMode]
  )

  // Initialization and upkeep
  const init = useCallback(
    function (options: InitialisationOptions) {
      // Detach behaviours from old chart
      const canvasSelection = chart?.getCanvasSelection()
      if (chart && canvasSelection) {
        canvasSelection.call(detachZoomBehaviour)
        canvasSelection.call(detachMouseMoveBehaviour)
        canvasSelection.call(detachClickBehaviour)
        canvasSelection.call(detachDoubleClickBehaviour)
        canvasSelection.call(detachContextMenu)
        canvasSelection.call(detachDragBehaviour)
      }

      // Attach behaviours to new chart
      const newChart = options.graph
      const newCanvasSelection = newChart.getCanvasSelection()
      const newSimulation = options.graph.getSimulation()

      newCanvasSelection.call(attachZoomBehaviour)
      newCanvasSelection.call(attachMouseMoveBehaviour)
      newCanvasSelection.call(attachClickBehaviour)
      newCanvasSelection.call(attachDoubleClickBehaviour)
      newCanvasSelection.call(attachContextMenu)
      newCanvasSelection.call(attachDragBehaviour, newSimulation)

      setChart(options.graph)
    },
    [chart, setChart]
  )

  const destroy = useCallback(
    function () {
      clearDrawTimer()
      setReady(false)

      const canvasSelection = chart?.getCanvasSelection()
      if (chart && canvasSelection) {
        canvasSelection.call(detachZoomBehaviour)
        canvasSelection.call(detachMouseMoveBehaviour)
        canvasSelection.call(detachClickBehaviour)
        canvasSelection.call(detachDoubleClickBehaviour)
        canvasSelection.call(detachContextMenu)
        canvasSelection.call(detachDragBehaviour)

        const simulation = chart.getSimulation()
        destroySimulation(simulation)

        setChart(null)
      }
    },
    [chart, setChart, setReady, clearDrawTimer]
  )

  const updateSelectedNodes = useCallback(() => {
    if (!chart) {
      throw new Error("updateSelectedNodes was called, but there is no chart")
    }

    const canvasSelection = chart.getCanvasSelection()
    const nodeSelection = chart.getNodeSelection()
    const prevSelection = selection
    const currSelection: NodeDatum[] = []

    nodeSelection?.each((datum) => {
      if (datum.state.selected) {
        currSelection.push(datum)
      }
    })

    const prevString = prevSelection.map((entry) => entry.info.id).join(",")
    const currString = currSelection.map((entry) => entry.info.id).join(",")

    if (prevString !== currString) {
      setSelection(currSelection)
      canvasSelection.call(setHasSelectedNodes, currSelection.length > 0)
    }
  }, [chart, selection, setSelection])

  const resetChartState = useCallback(() => {
    if (!chart) {
      throw new Error("resetChartState was called, but there is no chart")
    }

    const canvasSelection = chart.getCanvasSelection()
    if (canvasSelection) {
      // Reset selected nodes
      updateSelectedNodes()
      // Make sure the canvas is properly positioned
      canvasSelection.call(positionCanvas)
      // Reset cursor mode
      setCursorMode("move")
      canvasSelection.call(setCanvasCursorMode, "move")
      // Reset history state
      setHistory({ canRedo: false, canUndo: false, length: 0, pointer: 0 })
    }
  }, [chart, updateSelectedNodes, setCursorMode, setHistory])

  const onReady = useCallback(() => {
    if (!chart) {
      throw new Error("onReady was called, but there is no chart")
    }

    const nodes = chart.getNodeSelection().data()

    nodesToLocalStorage(nodes)

    resetChartState()
    setReady(true)
  }, [chart, resetChartState, setReady])

  const onUpdateDimensions = useCallback<ResizeObserverCallback>(
    (entries) => {
      if (!chart) {
        throw new Error("onUpdateDimensions was called, but there is no chart")
      }

      for (const entry of entries) {
        const { contentRect } = entry

        if (contentRect) {
          const canvasSelection = chart.getCanvasSelection()
          const canvasSelectionNode = canvasSelection.node()

          if (!canvasSelection || !canvasSelectionNode) {
            return
          }

          const currRect = contentRectRef.current
          if (
            contentRect.width !== currRect?.width ||
            contentRect.height !== currRect?.height
          ) {
            const newRect = entry.target.getBoundingClientRect() // The contentRect from the callback has no correct x and y values

            canvasSelection
              .call(positionCanvas, newRect)
              .call(applyBoundaryMovement, currRect, newRect)
              .call(updateAndEnforceZoomLevels)

            contentRectRef.current = newRect
            canvasRectRef.current = canvasSelectionNode.getBoundingClientRect()

            resetDrawTimer(chart)
          }
          break
        }
      }
    },
    [chart, resetDrawTimer]
  )
  const debouncedOnUpdateDimensions = useMemo(() => {
    return debounce(onUpdateDimensions, 20)
  }, [onUpdateDimensions])
  const resizeObserver = useRef(
    typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(debouncedOnUpdateDimensions)
      : null
  )

  type SetCursorModeEvent = {
    detail: {
      mode: CanvasCursorMode
    }
  }
  const onSetCursorMode = useCallback(
    (event: SetCursorModeEvent) => {
      const { detail } = event
      const { mode } = detail
      const canvasSelection = chart?.getCanvasSelection()
      if (!canvasSelection) {
        return
      }
      setCursorMode(mode)
      canvasSelection.call(setCanvasCursorMode, mode)
    },
    [chart, setCursorMode]
  )

  const onZoomIn = useCallback(() => {
    const canvasSelection = chart?.getCanvasSelection()
    if (!canvasSelection) {
      return
    }
    const zoomLevel = getZoomLevel(canvasSelection)
    const [minZoomLevel] = getZoomLevelRange(canvasSelection)

    canvasSelection.call(zoomToLevel, Math.max(zoomLevel - 1, minZoomLevel))
  }, [chart])

  const onZoomOut = useCallback(() => {
    const canvasSelection = chart?.getCanvasSelection()
    if (!canvasSelection) {
      return
    }
    const zoomLevel = getZoomLevel(canvasSelection)
    const [, maxZoomLevel] = getZoomLevelRange(canvasSelection)

    canvasSelection.call(zoomToLevel, Math.min(zoomLevel + 1, maxZoomLevel))
  }, [chart])

  type ZoomToEvent = {
    detail: {
      zoomLevel: number
    }
  }
  const onZoomTo = useCallback(
    (event: ZoomToEvent) => {
      const { detail } = event
      const { zoomLevel } = detail
      const canvasSelection = chart?.getCanvasSelection()
      if (!canvasSelection) {
        return
      }

      canvasSelection.call(zoomToLevel, zoomLevel)
    },
    [chart]
  )

  type ZoomEvent = {
    detail: {
      minZoomLevel: number
      maxZoomLevel: number
      currentZoomLevel: number
    }
  }
  const onZoom = useCallback(
    function (event: ZoomEvent) {
      const { detail } = event
      const { minZoomLevel, maxZoomLevel, currentZoomLevel } = detail

      setZoom({
        minZoomLevel,
        maxZoomLevel,
        currentZoomLevel,
      })
    },
    [setZoom]
  )

  const onUndo = useCallback(function () {
    commandManager.current.undo()
  }, [])

  const onReset = useCallback(
    function () {
      if (!chart) {
        throw new Error("onReset was called, but there is no chart")
      }

      const canvas = chart.getCanvasSelection()
      const nodes = chart.getNodeSelection().data()
      const nodeGroup = chart.getNodeGroupSelection()
      const nodeData = nodes.map((entry) => entry.info)
      const localStorageNodeData = getNodesFromLocalStorage(nodeData)

      if (!localStorageNodeData) return

      const simulation = chart.getSimulation()

      const actions: CommandActionVariant[] = [
        tickSimulationActionBackwardsOnly(simulation),
      ]

      nodes.forEach((datum) => {
        const datumFromLocalStorage = localStorageNodeData[datum.info.id]
        const nodeSelection = getNodeByDatum(nodeGroup, datum)

        actions.push(resetNodeAction(nodeSelection, datumFromLocalStorage))
      })

      actions.push(replaceSimulationNodesAction(simulation, nodes))
      actions.push(tickSimulationActionForwardsOnly(simulation))

      commandManager.current.execute(actions)
      updateSelectedNodes()

      const zoomBoundaries = getZoomBoundaries(canvas)
      canvas
        .call(updateCanvasZoomScaleMax, zoomBoundaries)
        .call(zoomToBoundaries, zoomBoundaries)
    },
    [chart, updateSelectedNodes]
  )

  const onClickNothing = useCallback(
    function () {
      setShowContextMenu(false)
    },
    [setShowContextMenu]
  )

  type ClickNodeEvent = {
    detail: {
      event: MouseEvent
      datum: NodeDatum
    }
  }
  const onClickNode = useCallback(
    function (event: ClickNodeEvent) {
      if (!chart) {
        throw new Error("onClickNode was called, but there is no chart")
      }

      const { detail } = event
      const { event: originalEvent, datum } = detail

      const selected = datum.state.selected
      const group = chart.getNodeGroupSelection()
      const node = getNodeByDatum(group, datum)

      const actions: CommandActionVariant[] = []

      if (!originalEvent.shiftKey) {
        selection.forEach((entry) => {
          const selectedNode = getNodeByDatum(group, entry)
          actions.push(deselectNodeAction(selectedNode, entry))
        })
      }

      if (selected) {
        actions.push(deselectNodeAction(node, datum))
      } else {
        actions.push(selectNodeAction(node, datum))
      }

      commandManager.current.execute(actions)
    },
    [chart, selection]
  )

  type ClickEvent = {
    detail: {
      event: MouseEvent
      entity: NodeDatum
    }
  }
  const onClick = useCallback(
    function (event: ClickEvent) {
      const { detail } = event
      const { entity } = detail

      if (!entity) {
        onClickNothing()
        return
      }

      switch (entity.info.type) {
        case "project":
          onClickNode({
            ...event,
            detail: {
              event: detail.event,
              datum: detail.entity,
            },
          })
          break
      }
    },
    [onClickNothing, onClickNode]
  )

  type DoubleClickNodeEvent = {
    detail: {
      event: MouseEvent
      datum: NodeDatum
    }
  }
  const onDoubleClickNode = useCallback(
    function (event: DoubleClickNodeEvent) {
      if (!chart) {
        throw new Error("onDoubleClickNode was called, but there is no chart")
      }

      const { detail } = event
      const { datum } = detail

      const group = chart.getNodeGroupSelection()
      const node = getNodeByDatum(group, datum)

      const action = unfixNodePositionAction(node, datum)
      commandManager.current.execute(action)
    },
    [chart]
  )

  type DoubleClickEvent = {
    detail: {
      event: MouseEvent
      datum: CanvasDatum
    }
  }
  const onDoubleClick = useCallback(
    function (event: DoubleClickEvent) {
      const { detail } = event
      const hovered = detail.datum.state.hovered

      if (isNodeDatum(hovered)) {
        onDoubleClickNode({
          ...event,
          detail: {
            event: detail.event,
            datum: hovered,
          },
        })
      }
    },
    [onDoubleClickNode]
  )

  type DragSelectEvent = {
    detail: {
      event: D3DragEvent<HTMLCanvasElement, CanvasDatum, null>
      scaled: {
        x1: number
        x2: number
        y1: number
        y2: number
      }
    }
  }
  const onDragSelect = useCallback(
    (event: DragSelectEvent) => {
      if (!chart) {
        throw new Error("onDragSelect was called, but there is no chart")
      }
      const {
        detail: {
          event: { sourceEvent },
          scaled: { x1, y1, x2, y2 },
        },
      } = event

      const group = chart.getNodeGroupSelection()
      const actions: CommandActionVariant[] = []
      const inboundNodes: NodeDatum[] = []

      chart.getNodeSelection().each(function (datum) {
        if (datum.x === undefined || datum.y === undefined) {
          return
        }

        const isWithinXBounds = x1 <= datum.x && datum.x <= x2
        const isWithinYBounds = y1 <= datum.y && datum.y <= y2
        const isWithinBounds = isWithinXBounds && isWithinYBounds

        if (isWithinBounds) {
          inboundNodes.push(datum)
          if (!datum.state.selected) {
            const node = getNodeByDatum(group, datum)
            actions.push(selectNodeAction(node, datum))
          }
        }
      })

      if (!sourceEvent.shiftKey) {
        selection.forEach((entry) => {
          if (!inboundNodes.includes(entry)) {
            const selectedNode = getNodeByDatum(group, entry)
            actions.push(deselectNodeAction(selectedNode, entry))
          }
        })
      }

      commandManager.current.execute(actions)
    },
    [chart, selection]
  )

  type ContextMenuEvent = {
    detail: {
      datum: NodeDatum
      position: [number, number]
    }
  }
  const onContextMenu = useCallback(
    (event: ContextMenuEvent) => {
      const { detail } = event
      const {
        datum,
        position: [x, y],
      } = detail

      setPositionContextMenu(x, y)
      setShowContextMenu(Boolean(datum))
    },
    [setShowContextMenu, setPositionContextMenu]
  )

  type HideNodesEvent = {
    detail: {
      nodeData: NodeDatum[]
    }
  }
  const onHideNodes = useCallback(
    function (event: HideNodesEvent) {
      if (!chart) {
        throw new Error("onHideNodes was called, but there is no chart")
      }

      const { detail } = event
      const { nodeData } = detail

      const nodeGroup = chart.getNodeGroupSelection()
      const simulation = chart.getSimulation()

      const actions: CommandActionVariant[] = [
        restoreSimulationNodesAction(simulation),
      ]

      nodeData.forEach((datum) => {
        const node = getNodeByDatum(nodeGroup, datum)
        actions.push(deselectNodeAction(node, datum))
        actions.push(hideNodeAction(node, datum))
      })

      actions.push(removeSimulationNodesAction(simulation, nodeData))

      commandManager.current.execute(actions)
      updateSelectedNodes()
    },
    [chart, updateSelectedNodes]
  )

  type ReleaseNodesEvent = {
    detail: {
      nodeData: NodeDatum[]
    }
  }
  const onReleaseNodes = useCallback(
    (event: ReleaseNodesEvent) => {
      if (!chart) {
        throw new Error("onReleaseNodes was called, but there is no chart")
      }
      const { detail } = event
      const { nodeData } = detail

      const nodeGroup = chart.getNodeGroupSelection()
      const actions: CommandActionVariant[] = nodeData
        .filter((datum) => datum.positioned)
        .map((datum) => {
          const node = getNodeByDatum(nodeGroup, datum)
          return unfixNodePositionAction(node, datum)
        })

      commandManager.current.execute(actions)
    },
    [chart]
  )

  type MouseEnterEvent = {
    detail: {
      entity: NodeDatum | null
      entityPosition: {
        x: number | undefined
        y: number | undefined
      }
    }
  }
  const onMouseEnter = useCallback(
    (event: MouseEnterEvent) => {
      const { detail } = event
      const { entity, entityPosition } = detail

      setToolTip(entity, entityPosition)

      if (chart && isNodeDatum(entity)) {
        const node = getNodeByDatum(chart.getNodeGroupSelection(), entity)
        node.call(setNodeAttributes)
      }
    },
    [setToolTip, chart]
  )

  type MouseLeaveEvent = {
    detail: {
      entity: NodeDatum | null
      entityPosition: {
        x: number | undefined
        y: number | undefined
      }
    }
  }
  const onMouseLeave = useCallback(
    (event: MouseLeaveEvent) => {
      const { detail } = event
      const { entity } = detail

      setToolTip(null, { x: undefined, y: undefined })

      if (chart && isNodeDatum(entity)) {
        const node = getNodeByDatum(chart.getNodeGroupSelection(), entity)
        node.call(setNodeAttributes)
      }
    },
    [setToolTip, chart]
  )

  const onNodeDragStart = useCallback(() => {
    setToolTip(null, { x: undefined, y: undefined })
  }, [setToolTip])

  const { onSpaceDown, onSpaceUp } = useSpaceMove()

  const onKeyDown = useCallback(
    function (event: KeyboardEvent) {
      switch (event.key) {
        case " ":
          event.preventDefault()
          onSpaceDown()
          break
      }
    },
    [onSpaceDown]
  )

  const onKeyUp = useCallback(
    function (event: KeyboardEvent) {
      switch (event.key) {
        case " ":
          event.preventDefault()
          onSpaceUp()
          break
        case "z":
          if (event.ctrlKey) {
            event.preventDefault()
            commandManager.current.undo()
          }
          break
        case "y":
          if (event.ctrlKey) {
            event.preventDefault()
            commandManager.current.redo()
          }
          break
      }
    },
    [onSpaceUp]
  )

  const onHistoryChange = useCallback<OnHistoryChange>(
    (event) => {
      if (chart) {
        updateSelectedNodes() // The selected nodes might have changed
      }
      setHistory(event)
      if (chart) {
        updateAndEnforceZoomLevels(chart.getCanvasSelection()) // Nodes may have been removed or restored
      }
    },
    [chart, updateSelectedNodes, setHistory]
  )

  // Subscribe to incoming events
  useEffect(() => {
    const canvasSelection = chart?.getCanvasSelection()

    if (!chart || !canvasSelection) {
      return
    }

    const rsObserver = (resizeObserver.current =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(debouncedOnUpdateDimensions)
        : null)
    const cmdManager = commandManager.current

    const canvasNode = canvasSelection?.node()
    const canvasContainer = canvasNode?.parentElement

    canvasSelection.on("canvasready", onReady)
    canvasSelection.on("canvascursormode", onSetCursorMode)
    canvasSelection.on("canvaszoomin", onZoomIn)
    canvasSelection.on("canvaszoomout", onZoomOut)
    canvasSelection.on("canvaszoomto", onZoomTo)
    canvasSelection.on("canvaszoomed", onZoom)
    canvasSelection.on("canvasreset", onReset)
    canvasSelection.on("canvasundo", onUndo)
    canvasSelection.on("canvasclick", onClick)
    canvasSelection.on("canvasdoubleclick", onDoubleClick)
    canvasSelection.on("canvasdragselect", onDragSelect)
    canvasSelection.on("canvascontextmenu", onContextMenu)
    canvasSelection.on("canvashidenodes", onHideNodes)
    canvasSelection.on("canvasreleasenodes", onReleaseNodes)
    canvasSelection.on("canvasmouseenter", onMouseEnter)
    canvasSelection.on("canvasmouseleave", onMouseLeave)
    canvasSelection.on("canvasnodedragstart", onNodeDragStart)

    document.addEventListener("keydown", onKeyDown)
    document.addEventListener("keyup", onKeyUp)

    if (canvasContainer) {
      rsObserver?.observe(canvasContainer)
    }

    cmdManager.subscribe(onHistoryChange)

    return () => {
      if (!chart || !canvasSelection) {
        return
      }

      canvasSelection.on("canvasready", null)
      canvasSelection.on("canvascursormode", null)
      canvasSelection.on("canvaszoomin", null)
      canvasSelection.on("canvaszoomout", null)
      canvasSelection.on("canvaszoomto", null)
      canvasSelection.on("canvaszoomed", null)
      canvasSelection.on("canvasreset", null)
      canvasSelection.on("canvasundo", null)
      canvasSelection.on("canvasclick", null)
      canvasSelection.on("canvasdoubleclick", null)
      canvasSelection.on("canvasdragselect", null)
      canvasSelection.on("canvascontextmenu", null)
      canvasSelection.on("canvashidenodes", null)
      canvasSelection.on("canvasreleasenodes", null)
      canvasSelection.on("canvasmouseenter", null)
      canvasSelection.on("canvasmouseleave", null)
      canvasSelection.on("canvasnodedragstart", null)

      document.removeEventListener("keydown", onKeyDown)
      document.removeEventListener("keyup", onKeyUp)

      if (canvasContainer) {
        rsObserver?.unobserve(canvasContainer)
      }

      cmdManager.unsubscribe(onHistoryChange)
    }
  }, [
    chart,
    onReady,
    debouncedOnUpdateDimensions,
    onSetCursorMode,
    onZoomIn,
    onZoomOut,
    onZoomTo,
    onZoom,
    onUndo,
    onReset,
    onClick,
    onDoubleClick,
    onDragSelect,
    onContextMenu,
    onHideNodes,
    onReleaseNodes,
    onKeyDown,
    onKeyUp,
    onMouseEnter,
    onMouseLeave,
    onNodeDragStart,
    onHistoryChange,
  ])

  useEffect(() => {
    if (chart) {
      resetDrawTimer(chart)
    }
  }, [chart, ready, resetDrawTimer])

  useEffect(() => {
    const canvasSelection = chart?.getCanvasSelection()
    if (canvasSelection) {
      setPerfomanceMode(canvasSelection, performanceMode)
    }
  }, [chart, performanceMode])

  return useMemo(
    function () {
      return {
        init,
        destroy,
      }
    },
    [init, destroy]
  )
}

export type RelationChartManagerReturnType = ReturnType<
  typeof useRelationChartManager
>
