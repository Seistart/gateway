import { NodeDatum } from '../types'

export type DetailsItem = {
  type: 'project'
  nodeId: string
  properties: {
    account: string
    accountHolder: string
    accountHolders: string[]
    caseNumber: string
    isSeizedproject: boolean
    nodeId: string
  }
}

export type HoverToolTipBodyData = { type: 'node'; node: NodeDatum }
