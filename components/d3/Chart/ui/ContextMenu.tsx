"use client"

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react"

import { Button } from "@/components/ui/button"
import { CONTEXTMENU, contextMenuEntries } from "../constants/Constants"
import { useRelationChartState } from "../hooks/useRelationChartState"

export const ContextMenu = () => {
  const { chart, selection, contextMenu, setShowContextMenu, setShowDetails } =
    useRelationChartState()
  const [[x, y], setCoords] = useState<
    [undefined, undefined] | [number, number]
  >([undefined, undefined])

  const contextMenuRef = useRef<HTMLUListElement | null>(null)

  const normalizeContextMenu = useCallback((x: number, y: number) => {
    let normalizedX: number | null = x
    let normalizedY: number | null = y
    const chartContainer = document.getElementById("canvas")

    if (contextMenuRef.current && chartContainer) {
      const {
        width: chartWidth,
        height: chartHeight,
        left: chartOffsetX,
        top: chartOffsetY,
      } = chartContainer.getBoundingClientRect()

      const {
        width: contextMenuWidth,
        height: contextMenuHeight,
        left: contextMenuOffsetX,
        top: contextMenuOffsetY,
      } = contextMenuRef.current.getBoundingClientRect()

      const xDiff =
        chartOffsetX + chartWidth - (contextMenuOffsetX + contextMenuWidth)
      const yDiff =
        chartOffsetY + chartHeight - (contextMenuOffsetY + contextMenuHeight)

      if (xDiff < 0) {
        normalizedX += xDiff
      }

      if (yDiff < 0) {
        normalizedY += yDiff
      }
    }

    return { normalizedX, normalizedY }
  }, [])

  const onContextMenu = useCallback(
    (e: ReactMouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault()
    },
    []
  )

  useEffect(() => {
    const { show, x, y } = contextMenu
    if (!show || !contextMenuRef) return
    const { normalizedX, normalizedY } = normalizeContextMenu(x, y)
    setCoords([normalizedX, normalizedY])
  }, [contextMenu, normalizeContextMenu])

  const hideSelectedHandler = useCallback(() => {
    if (!chart) return
    chart.getCanvasSelection().dispatch("canvashidenodes", {
      cancelable: false,
      bubbles: false,
      detail: {
        nodeData: selection,
      },
    })
  }, [chart, selection])

  const hideUnselectedHandler = useCallback(() => {
    if (!chart) return
    const unselected = chart
      .getNodeSelection()
      .data()
      .filter((datum) => !datum.hidden && !datum.selected)

    chart.getCanvasSelection().dispatch("canvashidenodes", {
      cancelable: false,
      bubbles: false,
      detail: {
        nodeData: unselected,
      },
    })
  }, [chart])

  const releasePositionedNodes = useCallback(() => {
    if (!chart) return
    chart.getCanvasSelection().dispatch("canvasreleasenodes", {
      cancelable: false,
      bubbles: false,
      detail: {
        nodeData: selection,
      },
    })
  }, [chart, selection])

  const handleClick = useCallback(
    (e: ReactMouseEvent<HTMLButtonElement>) => {
      setShowContextMenu(false)
      const id = (e.target as HTMLInputElement).id
      switch (id) {
        case CONTEXTMENU.SELECTED:
          e.preventDefault()
          hideSelectedHandler()
          break
        case CONTEXTMENU.UNSELECTED:
          e.preventDefault()
          hideUnselectedHandler()
          break
        case CONTEXTMENU.RELEASE_POSITIONED_NODES:
          e.preventDefault()
          releasePositionedNodes()
          break
        case CONTEXTMENU.SHORTEST:
          e.preventDefault()
          console.log("TODO: SHORTEST")
          break
        case CONTEXTMENU.DETAILS:
          e.preventDefault()
          setShowDetails(true)
          break
        case CONTEXTMENU.EXPAND:
          e.preventDefault()
          console.log("TODO: EXPAND")
          break
        default:
      }
    },
    [
      setShowContextMenu,
      hideSelectedHandler,
      hideUnselectedHandler,
      releasePositionedNodes,
      setShowDetails,
    ]
  )

  const listEntries = useMemo(() => {
    return contextMenuEntries.map((entry, index, entries) => {
      const disabled =
        entry.id === CONTEXTMENU.SHORTEST || entry.id === CONTEXTMENU.EXPAND
          ? true
          : entry.id === CONTEXTMENU.DETAILS
            ? selection.length === 0
            : false

      return (
        <div
          key={entry.id}
          className={`list-none ${index === entries.length - 1 ? "border-b-0" : "border-b border-primary"}`}
        >
          <Button
            id={entry.id}
            type="button"
            onClick={handleClick}
            className="block w-full cursor-pointer rounded-none border-0 bg-transparent p-2 text-left text-primary disabled:text-secondary"
          >
            {entry.text}
          </Button>
        </div>
      )
    })
  }, [selection, handleClick])

  const hasCoordinates = x !== undefined && y !== undefined

  return contextMenu.show && hasCoordinates ? (
    <div onContextMenu={onContextMenu}>
      <ul
        ref={contextMenuRef}
        role="menu"
        className={`role-menu top-[${y}px] left-[${x}px] absolute z-10 m-0 block min-w-[218px] rounded-md border border-primary bg-primary shadow-md`}
      >
        {listEntries}
      </ul>
    </div>
  ) : null
}
