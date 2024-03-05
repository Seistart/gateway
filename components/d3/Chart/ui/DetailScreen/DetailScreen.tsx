import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Cross1Icon } from "@radix-ui/react-icons"
import * as React from "react"
import { useRelationChartState } from "../../hooks/useRelationChartState"
import { NodeInfo } from "../../types"
import { DetailsItem } from "../types"

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
      setShowDetails(false)
    } else {
      setShowDetails(true)
    }
  }, [selection, setShowDetails])

  React.useEffect(() => {
    if (!ready) {
      setShowDetails(false)
    }
  }, [ready, setShowDetails])

  return (
    <div
      className={`bg-white transition-all duration-300 ease-out ${details.show ? "max-w-[380px]" : "max-w-0"} relative right-0 z-20 flex h-full flex-1 overflow-hidden`}
    >
      <div className="mt-2 h-full min-w-[min-content] rounded-none p-6 shadow-none">
        <Button
          variant={"ghost"}
          size="icon"
          className="m-0 h-12 w-12 self-start p-2 text-gray-800"
          onClick={onClose}
        >
          <Cross1Icon className="h4 w-4" />
        </Button>
        {selectedItems.map((item: NodeInfo) => (
          <div key={item.id}>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <h2 className="text-xl font-semibold text-gray-900">
                  {item.id} Details
                </h2>
                <h3 className="text-md font-normal text-gray-500">
                  {item.name}
                </h3>
              </div>
            </div>
            <div className="flex justify-between">
              <Button
                variant="ghost"
                className="h-4 w-[50%] border-2 border-gray-700 py-5 font-semibold text-gray-700"
              >
                Content
              </Button>
              <Button
                variant="ghost"
                className="h-4 w-[50%] border-2 border-gray-200 py-5  font-semibold text-gray-500"
              >
                Details
              </Button>
            </div>
            <div>
              <span className="text-md text-gray-500">Labels</span>
              <div>
                <Badge
                  variant="outline"
                  className="rounded-md bg-blue-200 text-blue-600"
                >
                  Dex
                </Badge>
                <Badge
                  variant="outline"
                  className="rounded-md bg-green-200 text-green-600"
                >
                  Finance
                </Badge>
                <Badge
                  variant="outline"
                  className="rounded-md bg-orange-200 text-orange-600"
                >
                  NFT
                </Badge>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600">
                <strong>Id:</strong> {item.id}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Name:</strong> {item.name}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Marketcap:</strong> {item.marketCap}
              </p>
              {/* Add more node details here */}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
