'use client'

import { FC, useCallback, useEffect, useRef, useState } from 'react'

import { useRelationChartState } from '../hooks/useRelationChartState'
import { CanvasCursorMode } from '../types'

import Button from './ChartNavigationButton'
import { TOnStepChangeParams } from './ChartNavigationSlider'
import { CHART_NAVIGATION } from './constants'

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
          'setCursorModeHandler was called, but there is no chart'
        )
      }
      chart.getCanvasSelection().dispatch('canvascursormode', {
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
    () => setCursorModeHandler('move'),
    [setCursorModeHandler]
  )

  const setCursorModeSelectHandler = useCallback(
    () => setCursorModeHandler('select'),
    [setCursorModeHandler]
  )

  const zoomIn = useCallback(() => {
    if (!chart) {
      throw new Error('zoomIn was called, but there is no chart')
    }
    chart.getCanvasSelection().dispatch('canvaszoomin')
  }, [chart])

  const zoomOut = useCallback(() => {
    if (!chart) {
      throw new Error('zoomOut was called, but there is no chart')
    }
    chart.getCanvasSelection().dispatch('canvaszoomout')
  }, [chart])

  const onZoomLevelChange = useCallback(
    (params: TOnStepChangeParams) => {
      if (!chart) {
        throw new Error('onZoomLevelChange was called, but there is no chart')
      }
      chart.getCanvasSelection().dispatch('canvaszoomto', {
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
      throw new Error('resetChart was called, but there is no chart')
    }
    chart.getCanvasSelection().dispatch('canvasreset')
  }, [canReset, chart])

  const undoChart = useCallback(() => {
    if (!canUndo) return
    if (!chart) {
      throw new Error('undoChart was called, but there is no chart')
    }
    chart.getCanvasSelection().dispatch('canvasundo')
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
    <div className='absolute bottom-6 right-6 z-30 flex h-[30rem] w-[10rem] flex-col items-center rounded-md bg-white p-2.5 shadow-md'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        aria-hidden='true'
        focusable='false'
        className='clip-[rect(0,0,0,0)] absolute m-[-1px] h-10 w-10 overflow-hidden border-0 p-0'
      >
        <symbol id='icon-map-drag' width='22' height='22' viewBox='0 0 22 22'>
          <circle
            cx='11'
            cy='11'
            r='10'
            stroke='currentStroke'
            strokeWidth='2'
            fill='currentFill'
          />
          <path
            d='M11.6822 6.7154V10.2868H15.0913V7.9654L17.989 11.0011L15.0913 14.0368V11.7154H11.6822V15.2868H13.8981L11.0004 18.3225L8.10263 15.2868H10.3185V11.7154H6.90945V14.0368L4.01172 11.0011L6.90945 7.9654V10.2868H10.3185V6.7154H8.10263L11.0004 3.67969L13.8981 6.7154H11.6822Z'
            fill='currentColor'
            stroke='none'
          />
        </symbol>
        <symbol
          id='icon-map-pointer'
          width='22'
          height='22'
          viewBox='0 0 22 22'
        >
          <circle
            cx='11'
            cy='11'
            r='10'
            stroke='currentStroke'
            strokeWidth='2'
            fill='currentFill'
          />
          <path
            d='M16.455 9.44788L5.5459 5.54688L9.44686 16.456L11.6101 13.1128L13.9521 15.4548C14.3668 15.8695 15.0391 15.8695 15.4538 15.4548C15.8685 15.0401 15.8685 14.3678 15.4538 13.9531L13.1118 11.6111L16.455 9.44788Z'
            fill='currentColor'
            stroke='none'
          />
        </symbol>
        <symbol id='icon-zoomin' width='22' height='22' viewBox='0 0 22 22'>
          <circle
            cx='11'
            cy='11'
            r='10'
            stroke='currentStroke'
            strokeWidth='2'
            fill='currentFill'
          />
          <path
            d='M10.8915 5.55664L11.0004 5.54688C11.298 5.54688 11.5454 5.76127 11.5967 6.044L11.6065 6.15294V10.3954H15.8489C16.1465 10.3954 16.3939 10.6098 16.4452 10.8925L16.455 11.0014C16.455 11.2989 16.2406 11.5464 15.9579 11.5977L15.8489 11.6075H11.6065V15.8499C11.6065 16.1474 11.3921 16.3949 11.1094 16.4462L11.0004 16.456C10.7029 16.456 10.4555 16.2416 10.4041 15.9588L10.3944 15.8499V11.6075H6.15196C5.85443 11.6075 5.60698 11.3931 5.55566 11.1104L5.5459 11.0014C5.5459 10.7039 5.76029 10.4564 6.04302 10.4051L6.15196 10.3954H10.3944V6.15294C10.3944 5.85541 10.6088 5.60796 10.8915 5.55664L11.0004 5.54688L10.8915 5.55664Z'
            fill='currentColor'
            stroke='currentColor'
          />
        </symbol>
        <symbol id='icon-zoomout' width='22' height='22' viewBox='0 0 22 22'>
          <circle
            cx='11'
            cy='11'
            r='10'
            stroke='currentStroke'
            strokeWidth='2'
            fill='currentFill'
          />
          <path
            d='M6.04177 11.6875H15.9591C16.233 11.6875 16.455 11.4269 16.455 11.1054C16.455 10.784 16.233 10.5234 15.9591 10.5234H6.04177C5.76791 10.5234 5.5459 10.784 5.5459 11.1054C5.5459 11.4269 5.76791 11.6875 6.04177 11.6875Z'
            fill='currentColor'
            stroke='currentColor'
          />
        </symbol>
        <symbol id='icon-home' width='22' height='22' viewBox='0 0 22 22'>
          <circle
            cx='11'
            cy='11'
            r='10'
            stroke='currentStroke'
            strokeWidth='2'
            fill='currentFill'
          />
          <path
            d='M9.63619 16.2405V11.9548H12.3635V16.2405H15.7725V10.5262H17.818L10.9998 4.09766L4.18164 10.5262H6.2271V16.2405H9.63619Z'
            fill='currentColor'
            stroke='none'
          />
        </symbol>
        <symbol id='icon-previous' width='22' height='22' viewBox='0 0 22 22'>
          <circle
            cx='11'
            cy='11'
            r='10'
            stroke='currentStroke'
            strokeWidth='2'
            fill='currentFill'
          />
          <path
            d='M11.6422 16.4549H6.82932V13.9669H11.6422C12.8807 13.9669 13.8881 12.9903 13.8881 11.7898C13.8881 10.5894 12.8807 9.6128 11.6422 9.6128H10.0379V12.1008L5.5459 8.36878L10.0379 4.63672V7.12476H11.6422C14.2988 7.12476 16.455 9.21471 16.455 11.7898C16.455 14.3649 14.2988 16.4549 11.6422 16.4549Z'
            fill='currentColor'
            stroke='none'
          />
        </symbol>
      </svg>

      <Button
        icon='map-drag'
        className={mode === 'move' ? 'active' : ''}
        onClick={setCursorModeMoveHandler}
      >
        {CHART_NAVIGATION.MOVE}
      </Button>
      <Button
        icon='map-pointer'
        className={mode === 'select' ? 'active' : ''}
        onClick={setCursorModeSelectHandler}
      >
        {CHART_NAVIGATION.SELECT}
      </Button>
      <div className='my-2 border-t border-none border-primary' />
      <Button icon='zoomin' disabled={currentZoomLevel === 0} onClick={zoomIn}>
        {CHART_NAVIGATION.ZOOM_IN}
      </Button>
      <Button
        icon='zoomout'
        disabled={currentZoomLevel === 30}
        onClick={zoomOut}
      >
        {CHART_NAVIGATION.ZOOM_OUT}
      </Button>
      <div className='my-2 border-t border-none border-primary' />
      <Button icon='home' disabled={!canReset} onClick={resetChart}>
        {CHART_NAVIGATION.RESET}
      </Button>
      <Button icon='previous' disabled={!canUndo} onClick={undoChart}>
        {CHART_NAVIGATION.UNDO}
      </Button>
    </div>
  )
}
