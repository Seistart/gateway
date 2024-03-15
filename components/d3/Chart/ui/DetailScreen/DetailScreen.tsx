import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Project } from "@/database/schemas/projects.schema"
import { Cross1Icon } from "@radix-ui/react-icons"
import * as React from "react"
import { useRelationChartState } from "../../hooks/useRelationChartState"

export type TProps = {
  nodes: Project[]
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
      <div className="mt-2 h-full min-w-[min-content] p-6 shadow-none">
        <Button
          variant={"ghost"}
          size="icon"
          className="m-0 self-start p-2 text-gray-800"
          onClick={onClose}
        >
          <Cross1Icon className="h4 w-4" />
        </Button>
        {selectedItems.map((item: Project) => (
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
                className="h-4 w-[50%] border-2 border-gray-700 px-3 py-5 font-semibold text-gray-700"
              >
                Content
              </Button>
              <Button
                variant="ghost"
                className="h-4 w-[50%] border-2 border-gray-200 px-3 py-5 font-semibold text-gray-500"
              >
                Details
              </Button>
            </div>
            <div>
              <span className="text-md text-gray-500">Labels</span>
              <div>
                {item.tags.map((label: any) => (
                  <Badge
                    variant="outline"
                    className="bg-orange-200 text-orange-600"
                  >
                    {label}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600">
                <strong>Id:</strong> {item.id}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Type:</strong> {item.projectType}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Name:</strong> {item.name}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Community size:</strong> {item.communitySize}
              </p>
              {/* Add more node details here */}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}