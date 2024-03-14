import { NodeDatum } from "../types"

export type DetailsItem = {
  type: "project"
  nodeId: string
  properties: {
    id: number
    name: string
    nodeId: string
  }
}

export type HoverToolTipBodyData = { type: "node"; node: NodeDatum }
