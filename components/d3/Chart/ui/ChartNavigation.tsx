"use client"

import { FC, useCallback, useEffect, useRef, useState } from "react"

import { useRelationChartState } from "../hooks/useRelationChartState"
import { CanvasCursorMode } from "../types"

import { Button } from "@/components/ui/button"
import {
  CursorArrowIcon,
  MoveIcon,
  ReloadIcon,
  ResetIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from "@radix-ui/react-icons"
import { TOnStepChangeParams } from "./ChartNavigationSlider"

export const ChartNavigation: FC = () => {
  const { chart, cursor, zoom, history, ready } = useRelationChartState()
  const [canReset, setCanReset] = useState(false)
  const { mode } = cursor
  const { minZoomLevel, maxZoomLevel, currentZoomLevel } = zoom
  const { canUndo, length: historyLength } = history

  // Zoom state
  const sliderRef = useRef<HTMLInputElement | null>(null)

  const setCursorModeHandler = useCallback(
    (mode: CanvasCursorMode) => {
      if (!chart) {
        throw new Error(
          "setCursorModeHandler was called, but there is no chart"
        )
      }
      chart.getCanvasSelection().dispatch("canvascursormode", {
        cancelable: false,
        bubbles: false,
        detail: {
          mode,
        },
      })
    },
    [chart]
  )

  const setCursorModeMoveHandler = useCallback(
    () => setCursorModeHandler("move"),
    [setCursorModeHandler]
  )

  const setCursorModeSelectHandler = useCallback(
    () => setCursorModeHandler("select"),
    [setCursorModeHandler]
  )

  const zoomIn = useCallback(() => {
    if (!chart) {
      throw new Error("zoomIn was called, but there is no chart")
    }
    chart.getCanvasSelection().dispatch("canvaszoomin")
  }, [chart])

  const zoomOut = useCallback(() => {
    if (!chart) {
      throw new Error("zoomOut was called, but there is no chart")
    }
    chart.getCanvasSelection().dispatch("canvaszoomout")
  }, [chart])

  const onZoomLevelChange = useCallback(
    (params: TOnStepChangeParams) => {
      if (!chart) {
        throw new Error("onZoomLevelChange was called, but there is no chart")
      }
      chart.getCanvasSelection().dispatch("canvaszoomto", {
        cancelable: false,
        bubbles: false,
        detail: {
          zoomLevel: params.step,
        },
      })
    },
    [chart]
  )

  const resetChart = useCallback(() => {
    if (!canReset) return
    if (!chart) {
      throw new Error("resetChart was called, but there is no chart")
    }
    chart.getCanvasSelection().dispatch("canvasreset")
  }, [canReset, chart])

  const undoChart = useCallback(() => {
    if (!canUndo) return
    if (!chart) {
      throw new Error("undoChart was called, but there is no chart")
    }
    chart.getCanvasSelection().dispatch("canvasundo")
  }, [chart, canUndo])

  useEffect(() => {
    if (!canReset && historyLength > 0) {
      setCanReset(true)
    }
  }, [historyLength, canReset])

  useEffect(() => {
    if (!ready) {
      setCanReset(false)
    }
  }, [ready])

  return (
    <div className="absolute bottom-6 right-6 z-30 flex h-[21rem] w-[3rem] flex-col items-center bg-white shadow-md">
      <Button
        variant={"navigation"}
        selected={mode === "move"}
        size={"icon"}
        onClick={setCursorModeMoveHandler}
      >
        <MoveIcon className="h-5 w-5" />
      </Button>
      <Button
        variant={"navigation"}
        selected={mode === "select"}
        size={"icon"}
        onClick={setCursorModeSelectHandler}
      >
        <CursorArrowIcon className="h-4 w-4" />
      </Button>
      <Button
        variant={"navigation"}
        disabled={currentZoomLevel === 0}
        size={"icon"}
        onClick={zoomIn}
      >
        <ZoomInIcon className="h-5 w-5" />
      </Button>
      <Button
        variant={"navigation"}
        disabled={currentZoomLevel === 30}
        size={"icon"}
        onClick={zoomOut}
      >
        <ZoomOutIcon className="h-5 w-5" />
      </Button>
      <Button
        variant={"navigation"}
        disabled={!canUndo}
        size={"icon"}
        onClick={resetChart}
      >
        <ResetIcon className="h-4 w-4" />
      </Button>
      <Button
        variant={"navigation"}
        onClick={undoChart}
        size={"icon"}
        disabled={!canUndo}
      >
        <ReloadIcon className="h-4 w-4" />
      </Button>
    </div>
  )
}
