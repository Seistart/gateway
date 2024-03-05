import { useCallback, useMemo, useRef } from "react"

import { setCursorMode as setCanvasCursorMode } from "../entities/Canvas"
import { CanvasCursorMode } from "../types"

import { useRelationChartState } from "./useRelationChartState"

export const useSpaceMove = () => {
  const { chart, cursor, setCursorMode } = useRelationChartState()
  const spaceDown = useRef(false)
  const prevCursorState = useRef<CanvasCursorMode | undefined>(undefined)

  const onSpaceDown = useCallback(() => {
    if (!spaceDown.current) {
      if (!chart) {
        throw new Error("onSpaceDown was called, but there is no chart")
      }

      spaceDown.current = true
      prevCursorState.current = cursor.mode
      setCursorMode("move")
      const canvasSelection = chart.getCanvasSelection()
      canvasSelection.call(setCanvasCursorMode, "move")
    }
  }, [chart, cursor, setCursorMode])

  const onSpaceUp = useCallback(() => {
    if (spaceDown.current && prevCursorState.current) {
      if (!chart) {
        throw new Error("onSpaceUp was called, but there is no chart")
      }

      setCursorMode(prevCursorState.current)
      const canvasSelection = chart.getCanvasSelection()
      canvasSelection.call(setCanvasCursorMode, prevCursorState.current)
      prevCursorState.current = undefined
      spaceDown.current = false
    }
  }, [chart, setCursorMode])

  return useMemo(() => ({ onSpaceDown, onSpaceUp }), [onSpaceDown, onSpaceUp])
}
