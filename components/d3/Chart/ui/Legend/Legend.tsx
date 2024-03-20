import { useEffect, useRef, useState } from "react"

import { Project, projectTag } from "@/database/schemas/projects.schema"
import { getColor, projectTagSchema } from "@/utils/colors.utils"
import { FaCircle } from "react-icons/fa"
import { LEGEND } from "../constants"

type Props = React.HTMLAttributes<HTMLElement> & {
  show: boolean
  nodes: Project[]
}

type TagCounts = Record<string, number>

export const Legend = ({ show, nodes, ...rest }: Props) => {
  const contentRef = useRef<HTMLDivElement | null>(null)
  const [fullLegend, setFullLegend] = useState<Boolean>(false)

  // Convert the z.enum to an array
  const tags = projectTagSchema.options

  // Count the occurrences of each tag
  const tagCounts = nodes?.reduce<TagCounts>((acc, node) => {
    node.tags.forEach((tag) => {
      acc[tag] = (acc[tag] || 0) + 1
    })
    return acc
  }, {})

  // Sort tags by their counts in descending order
  const sortedTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .map((entry) => entry[0])

  useEffect(() => {
    if (!show && contentRef.current && "scrollTo" in contentRef.current) {
      contentRef.current.scrollTo({ top: 0 })
    }
  }, [show])

  return (
    <div
      className={`ml-4 mt-6 bg-white py-3 shadow-md transition-all duration-300 ease-out ${show ? "max-w-[10rem] p-3" : "max-w-0"} relative right-0 z-20 flex ${fullLegend ? "h-[42.5rem]" : "h-[18rem]"} flex-1 overflow-hidden`}
    >
      <div className="h-4 text-gray-900" ref={contentRef}>
        <h4 className="mt-6 w-[6rem] text-base leading-5 first:mt-0">
          {LEGEND.NODES}
        </h4>
        <ul className="mt-1 flex flex-col gap-2 p-0 text-sm first:mt-0">
          <div>
            {(fullLegend
              ? (sortedTags.slice(0, 15) as projectTag[])
              : (sortedTags.slice(0, 5) as projectTag[])
            ).map((tag) => (
              <LegendItem key={tag} type={tag}>
                {tag}
              </LegendItem>
            ))}
          </div>
          <button onClick={() => setFullLegend(!fullLegend)}>
            {fullLegend ? "Show Less" : "Show More"}
          </button>
        </ul>
      </div>
    </div>
  )
}

const LegendItem = ({
  type,
  children,
}: {
  type: projectTag
  children: React.ReactNode
}) => {
  return (
    <li className="flex list-none flex-row gap-4">
      <div className="flex h-10 flex-none items-center">
        <FaCircle size={24} color={getColor(type).lightColor} />
      </div>
      <span className="flex flex-auto items-center">{children}</span>
    </li>
  )
}
