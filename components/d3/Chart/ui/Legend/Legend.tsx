import { useEffect, useRef } from "react"

import { FaCircle } from "react-icons/fa"
import { LEGEND } from "../constants"
import { LegendButton } from "./LegendButton"

type Props = React.HTMLAttributes<HTMLElement> & {
  show: boolean
  onClickLegendButton: () => void
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

export const Legend = ({ onClickLegendButton, show, ...rest }: Props) => {
  const contentRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!show && contentRef.current && "scrollTo" in contentRef.current) {
      contentRef.current.scrollTo({ top: 0 })
    }
  }, [show])

  return (
    <>
      <div
        className={`flex h-60 flex-col bg-white py-5 transition-all duration-500 ease-out ${show ? "w-34 px-5 " : "w-0 px-0"} absolute left-0 z-20 flex flex-1 overflow-hidden`}
      >
        <div className="h-4 text-gray-900" ref={contentRef}>
          <h4 className="font-serif mt-6 text-base leading-5 first:mt-0">
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
      <LegendButton open={show} onClick={onClickLegendButton}></LegendButton>
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
