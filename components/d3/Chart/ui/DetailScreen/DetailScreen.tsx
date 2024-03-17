import { ProjectCardDetails } from "@/components/project-card"
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
        {selectedItems.map((item: Project, key) => (
          <ProjectCardDetails key={key} item={item} />
        ))}
      </div>
    </div>
  )
}
