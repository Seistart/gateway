import { ProjectCardDetails } from "@/components/project-card"
import { Button } from "@/components/ui/button"
import { Project } from "@/database/schemas/projects.schema"
import { DoubleArrowRightIcon } from "@radix-ui/react-icons"
import * as React from "react"
import { useRelationChartState } from "../../hooks/useRelationChartState"

export type TProps = {
  nodes: Project[]
}

export const DetailScreen = ({ nodes }: TProps) => {
  const { selection, setSelection, details, setShowDetails, ready } =
    useRelationChartState()

  const items = React.useMemo(() => nodes, [nodes])

  const [selectedItems] = React.useMemo(() => {
    const selectedNodeIds = selection.map((entry) => entry.info.id)

    const selectedItems = items.filter((item) =>
      selectedNodeIds.includes(item.id)
    )

    return [selectedItems] as const
  }, [selection, items])

  const onClose = React.useCallback(() => {
    setShowDetails(false)
    setSelection([])
  }, [setShowDetails])

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

  console.log("selection", selection)

  return (
    <div
      className={`relative bg-white transition-all duration-300 ease-out ${details.show ? "max-w-[380px]" : "max-w-0"} relative right-0 z-20 flex h-full flex-1 `}
    >
      <div className="mt-2 h-full min-w-[min-content] overflow-y-scroll p-6 shadow-none">
        <Button
          variant={"ghost"}
          size="icon"
          className={`absolute left-[-2.25rem] z-10 m-0 self-start bg-gray-800 p-2 text-white ${details ? `visible` : `hidden`}`}
          onClick={onClose}
        >
          <DoubleArrowRightIcon className="h4 w-4" />
        </Button>
        {selectedItems.map((item: Project, key) => (
          <>
            <ProjectCardDetails item={item} />
            {key !== selectedItems.length - 1 && (
              <div className="mb-4 border-b-2 border-gray-300" />
            )}
          </>
        ))}
      </div>
    </div>
  )
}
