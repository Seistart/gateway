import type {
  BaseType,
  Selection,
  SimulationNodeDatum,
  ValueFn,
  ZoomBehavior,
} from "d3"
import type { ScaleContinuousNumeric } from "d3-scale"

export interface NodeInfo {
  id: number
  name: string
  type: string
  tag: string
  marketCap: number
  communitySize: number
  projectImageUrl: string
  x?: number
  y?: number
  radius?: number
  color?: string
}

export type NodeInfoMap<Info = NodeInfo> = {
  [Type in NodeInfo["type"]]: Info extends { type: Type } ? Info : never
}
export type NodeInfoMapKey = keyof NodeInfoMap
export type NodeInfoType<Type extends NodeInfoMapKey> = NodeInfoMap[Type]

export type ContextMenuType = {
  item: boolean
  x: number
  y: number
}

export type ChartData = {
  nodes: NodeInfo[]
}

// Canvas
export type CanvasCursorMode = "move" | "select"
export type CanvasScales = {
  zoom: ScaleContinuousNumeric<number, number>
}
export type CanvasDatum = {
  state: {
    cursorMode: CanvasCursorMode
    hovered: NodeDatum | null
    dragged: NodeDatum | null
    hasSelectedNodes: boolean
  }
  zoom: ZoomBehavior<HTMLCanvasElement, CanvasDatum> | null
  scales: CanvasScales
}
export type CanvasSelection = Selection<
  HTMLCanvasElement,
  CanvasDatum,
  HTMLElement | null,
  undefined
>
export type CreateCanvasFn = () => CanvasSelection
export type CanvasDrawOffsets = {
  x: number
  y: number
}
export type CanvasDrawOptions = {
  offsets?: CanvasDrawOffsets
  scale?: number
  hasSelectedNodes?: boolean
  performanceMode?: boolean
}

// Canvas Mask
export type MaskColor = [number, number, number]
export type MaskDatum = {
  state: {
    colorEntityMaps: {
      nodes: Record<string, NodeDatum>
    }
  }
}
export type MaskSelection = Selection<
  HTMLCanvasElement,
  MaskDatum,
  HTMLElement | null,
  undefined
>
export type CreateMaskFn = () => MaskSelection
export type GenerateMaskColorFn = <T extends NodeDatum>(
  colorEntityMap: Record<string, T> | Record<string, T>,
  entity: T
) => MaskColor
export type MapEntityToColorFn = (
  maskSelection: MaskSelection,
  entity: NodeDatum,
  color: MaskColor
) => void

// Simulation
export type CreateSimulationFn = (
  simulationNodeData: NodeDatum[],
  minimalIterations?: boolean
) => Simulation
export type Simulation = d3.Simulation<NodeDatum, undefined>

// Stage
export type StageSelection = Selection<
  SVGSVGElement,
  undefined,
  BaseType,
  undefined
>
export type CreateStageFn = () => StageSelection

// Defs
export type DefsSelection = Selection<
  SVGDefsElement,
  undefined,
  SVGSVGElement,
  undefined
>
export type CreateDefsFn = (selection: StageSelection) => DefsSelection

// NodeGroup
export type NodeGroupSelection = Selection<
  SVGSymbolElement,
  undefined,
  SVGDefsElement,
  undefined
>
export type CreateNodeGroupFn = (selection: DefsSelection) => NodeGroupSelection

// Node
export type NodeDatumState = SimulationNodeDatum & {
  maskColor: MaskColor
  selected: boolean
  hidden: boolean
  idle: boolean
  positioned: boolean
}
export type NodeScales = {
  setNodeData: (data: NodeDatum[]) => void
  updateScales: () => void
  project: {
    nodeSize: ScaleContinuousNumeric<number, number>
    nodeLabelSize: ScaleContinuousNumeric<number, number>
    nodeStrength: ScaleContinuousNumeric<number, number>
  }
}
export interface NodeDatumBase<I extends NodeInfo> extends NodeDatumState {
  info: I
  state: NodeDatumState
  scales?: NodeScales
  cache: {
    radius?: number
    labelSize?: number
    strokeWidth?: number
    collisionRadius?: number
    strength?: number
  }
}
export type NodeDatum = NodeDatumBase<NodeInfoType<"project">>
export type NodeDatumMap = {
  [InfoType in NodeInfoMapKey]: Extract<
    NodeDatum,
    NodeDatumBase<NodeInfoType<InfoType>>
  >
}
export type NodeDatumMapKey = keyof NodeDatumMap
export type NodeDatumType<Type extends NodeDatumMapKey> = NodeDatumMap[Type]
export type CreateSimulationNodeDataFn = (
  data: NodeInfo[],
  preparedStateMap?: Record<string, NodeDatumState> | null
) => NodeDatum[]
export type CreateNodesOptions = {
  onClick?: (event: MouseEvent, datum: NodeDatum, element: Element) => void
  onDoubleClick?: (
    event: MouseEvent,
    datum: NodeDatum,
    element: Element
  ) => void
  onDragStarted?: (
    event: MouseEvent,
    datum: NodeDatum,
    element: Element
  ) => void
  onDragged?: (event: MouseEvent, datum: NodeDatum, element: Element) => void
  onDragEnded?: (event: MouseEvent, datum: NodeDatum, element: Element) => void
}
export type NodeSelection<
  T extends BaseType = SVGGElement,
  PT extends BaseType = SVGSymbolElement,
> = Selection<T, NodeDatum, PT, undefined>
export type CreateNodesFn = (
  selection: NodeGroupSelection,
  data: NodeDatum[]
) => NodeSelection
export type NodeIdResolverFn = (
  datum: NodeDatum,
  i: number,
  data: NodeDatum[]
) => number
export type NodeCollisionRadiusFn = (
  datum: NodeDatum,
  i: number,
  data: NodeDatum[]
) => number
export type NodeValueFn<T extends BaseType, R> = ValueFn<T, NodeDatum, R>
export type NodeStrengthFn = (
  datum: NodeDatum,
  i: number,
  data: NodeDatum[]
) => number

export type NodeLabelSizeFn = (datum: NodeDatum) => number

export type NodeSizeFn = (
  datum: NodeDatum,
  i: number,
  data: NodeDatum[]
) => number
