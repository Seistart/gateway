import { NodeDatum } from "../../types"
import { HoverToolTipBodyData } from "../types"

const unexpectedType = (_: never): never => {
  throw new Error("Unexpected type")
}

type NodeBodyProps = {
  node: NodeDatum
}
const NodeBody = ({ node }: NodeBodyProps) => {
  const nodeInfo = node.info
  const type = nodeInfo.type
  let title = undefined
  let subtitle = undefined

  switch (type) {
    case "project":
      title = nodeInfo.id
      subtitle = nodeInfo.id
      break
    default:
      unexpectedType(type as never)
  }

  return (
    <>
      {title && (
        <h1>
          {Array.isArray(title)
            ? title.map((holder, index) => <div key={index}>{holder}</div>)
            : title}
        </h1>
      )}
      {subtitle && <span>{subtitle}</span>}
    </>
  )
}

export type Props = {
  data: HoverToolTipBodyData
}
export const Body = ({ data }: Props) => {
  switch (data.type) {
    case "node":
      return <NodeBody {...data} />
  }
}
