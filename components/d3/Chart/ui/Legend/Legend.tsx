import { useEffect, useRef } from "react"

import { FaCircle } from "react-icons/fa"
import { LEGEND } from "../constants"

type Props = React.HTMLAttributes<HTMLElement> & {
  show: boolean
}

const getTypeColor = (type: "Gamefi" | "Finance" | "NFT" | "Dao") => {
  switch (type) {
    case "Gamefi":
      return "#029ECF"
    case "Finance":
      return "green"
    case "NFT":
      return "#d0021b"
    case "Dao":
      return "orange"
  }
}

export const Legend = ({ show, ...rest }: Props) => {
  const contentRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!show && contentRef.current && "scrollTo" in contentRef.current) {
      contentRef.current.scrollTo({ top: 0 })
    }
  }, [show])

  return (
    <>
      {/* <div
        className={`z-2 transition-padding absolute left-0 flex h-60 flex-1 flex-col overflow-hidden bg-white py-5 transition duration-500 ease-in-out ${show ? "w-[10rem] px-5 " : "w-0 px-5"} `}
      > */}
      <div
        className={`mt-6 bg-white py-3 transition-all duration-300 ease-out ${show ? "max-w-[10rem] p-3" : "max-w-0"} relative right-0 z-20 flex h-[14rem] flex-1 overflow-hidden`}
      >
        <div className="h-4 text-gray-900" ref={contentRef}>
          <h4 className="font-serif mt-6 w-[6rem] text-base leading-5 first:mt-0">
            {LEGEND.NODES}
          </h4>
          <ul className="mt-1 flex flex-col gap-2 p-0 text-sm first:mt-0">
            <LegendItem type="NFT">{LEGEND.NODE_NFT}</LegendItem>
            <LegendItem type="Gamefi">{LEGEND.NODE_GAMEFI}</LegendItem>
            <LegendItem type="Dao">{LEGEND.NODE_DAO}</LegendItem>
            <LegendItem type="Finance">{LEGEND.NODE_DEFI}</LegendItem>
          </ul>
        </div>
      </div>
    </>
  )
}

const LegendItem = ({
  type,
  children,
}: {
  type: "Gamefi" | "Finance" | "NFT" | "Dao"
  children: React.ReactNode
}) => {
  return (
    <li className="flex list-none flex-row gap-4">
      <div className="flex h-10 flex-none items-center">
        <FaCircle size={24} color={getTypeColor(type)} />
      </div>
      <span className="flex flex-auto items-center">{children}</span>
    </li>
  )
}
