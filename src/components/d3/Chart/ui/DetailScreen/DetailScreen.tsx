import { Card } from '@/components/ui/card'
import * as React from 'react'
import { useRelationChartState } from '../../hooks/useRelationChartState'
import { NodeInfo } from '../../types'
import { DetailsItem } from '../types'

function getItem(items: DetailsItem[], nodeId: string) {
  const result = items.find((node) => node.nodeId === nodeId)

  if (!result) {
    throw new Error(`Detail item with id "${nodeId}" not found`)
  }

  return result
}

export type TProps = {
  nodes: NodeInfo[]
}

export const DetailScreen = ({ nodes }: TProps) => {
  const { selection, details, setShowDetails, ready } = useRelationChartState()

  console.log(nodes)

  const items = React.useMemo(() => nodes, [nodes])

  const [selectedItems] = React.useMemo(() => {
    const selectedNodeIds = selection.map((entry) => entry.info.id)

    const selectedItems = items.filter((item) =>
      selectedNodeIds.includes(item.id)
    )

    return [selectedItems] as const
  }, [selection, items])

  const onClose = React.useCallback(
    () => setShowDetails(false),
    [setShowDetails]
  )

  React.useEffect(() => {
    if (!selection.length) {
      setShowDetails(true)
    }
  }, [selection, setShowDetails])

  React.useEffect(() => {
    if (!ready) {
      setShowDetails(true)
    }
  }, [ready, setShowDetails])

  return (
    <div className='transition-max-width relative right-0 z-20 h-full max-w-[380px] flex-auto basis-1/3 overflow-hidden bg-primary shadow-md duration-300 ease-out'>
      <Card className='min-h-full min-w-min rounded-none pr-7 shadow-none'>
        <button className='h-5 w-5' onClick={onClose} type='button' />
        {selectedItems.map((item: NodeInfo) => (
          <div key={item.id}>test </div>
        ))}
      </Card>
    </div>
  )
}
