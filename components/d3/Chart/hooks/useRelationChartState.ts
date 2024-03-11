import { create } from "zustand"

import type { ForceGraphInstance } from "../ForceGraph"
import { CanvasCursorMode, NodeDatum } from "../types"

export type ToolTipEntity = NodeDatum | null
export type ToolTipEntityPosition = {
  x: number | undefined
  y: number | undefined
}
export type ToolTip = {
  entity: ToolTipEntity
  entityPosition: ToolTipEntityPosition
}
type Cursor = {
  mode: CanvasCursorMode
}
type Zoom = {
  minZoomLevel: number
  maxZoomLevel: number
  currentZoomLevel: number
}
type History = {
  length: number
  pointer: number
  canUndo: boolean
  canRedo: boolean
}
type Details = {
  show: boolean
}
interface RelationChartState {
  chart: ForceGraphInstance | null
  setChart: (chart: ForceGraphInstance | null) => void

  ready: boolean
  setReady: (ready: boolean) => void

  performanceMode: boolean
  setPerformanceMode: (enabled: boolean) => void

  selection: NodeDatum[]
  setSelection: (selection: NodeDatum[]) => void

  toolTip: ToolTip
  setToolTip: (
    entity: ToolTipEntity,
    entityPosition: ToolTipEntityPosition
  ) => void

  contextMenu: {
    show: boolean
    x: number
    y: number
  }
  setShowContextMenu: (showContextMenu: boolean) => void
  setPositionContextMenu: (x: number, y: number) => void

  details: Details
  setShowDetails: (show: boolean) => void

  cursor: Cursor
  setCursorMode: (mode: CanvasCursorMode) => void

  zoom: Zoom
  setZoom: (zoom: Zoom) => void

  history: History
  setHistory: (history: History) => void
}

export const useRelationChartState = create<RelationChartState>()((set) => ({
  chart: null,
  setChart: (chart) => set(() => ({ chart })),

  ready: false,
  setReady: (ready) => set(() => ({ ready })),

  performanceMode: false,
  setPerformanceMode: (enabled: boolean) =>
    set(() => ({ performanceMode: enabled })),

  selection: [],
  setSelection: (selection) => set(() => ({ selection: [...selection] })),

  toolTip: {
    entity: null,
    entityPosition: {
      x: undefined,
      y: undefined,
    },
  },
  setToolTip: (entity, entityPosition) =>
    set(() => ({
      toolTip: {
        entity,
        entityPosition,
      },
    })),

  contextMenu: {
    show: false,
    x: 0,
    y: 0,
  },
  setShowContextMenu: (show) =>
    set(({ contextMenu }) => ({ contextMenu: { ...contextMenu, show } })),
  setPositionContextMenu: (x, y) =>
    set(({ contextMenu }) => ({ contextMenu: { ...contextMenu, x, y } })),

  details: {
    show: false,
  },
  setShowDetails: (show) =>
    set(({ details }) => ({ details: { ...details, show } })),

  cursor: {
    mode: "move",
  },
  setCursorMode: (mode) =>
    set(({ cursor }) => ({ cursor: { ...cursor, mode } })),

  zoom: {
    currentZoomLevel: 30,
    minZoomLevel: 30,
    maxZoomLevel: 0,
  },
  setZoom: (zoom) => set(() => ({ zoom })),

  history: {
    length: 0,
    pointer: -1,
    canUndo: false,
    canRedo: false,
  },
  setHistory: (history) => set(() => ({ history })),
}))
