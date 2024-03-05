import { useEffect, useRef } from "react"

import { LEGEND } from "../constants"
import { LegendButton } from "./LegendButton"

type Props = React.HTMLAttributes<HTMLElement> & {
  show: boolean
  onClickLegendButton: () => void
}

const getTypeColor = (type: "Gamefi" | "Dex" | "NFT" | "Finance") => {
  switch (type) {
    case "Gamefi":
      return "#A5DFAB"
    case "Dex":
      return "#FFA9A9"
    case "NFT":
      return "#BDBDBD"
    case "Finance":
      return "#A9DAFF"
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
        className={`flex h-60 flex-col bg-white py-5 transition-all duration-300 ease-out ${show ? "w-34 px-5 " : "w-0 px-0"} absolute left-0 z-20 flex flex-1 overflow-hidden`}
      >
        <div className="h-4 text-gray-900" ref={contentRef}>
          <h4 className="font-serif mt-6 text-base leading-5 first:mt-0">
            {LEGEND.NODES}
          </h4>
          <ul className="mt-1 flex flex-col gap-2 p-0 text-sm first:mt-0">
            <li className="flex list-none flex-row gap-4">
              <div className="flex h-10 flex-none items-center">
                <svg width="30" height="30" viewBox="0 0 40 40" aria-hidden>
                  <circle
                    r="18"
                    cx="20"
                    cy="20"
                    fill="#d0021b"
                    stroke="#ffffff"
                    strokeOpacity="1"
                    strokeWidth="2"
                  ></circle>
                  <use
                    fill="#ffffff"
                    x="10"
                    y="10"
                    width="20"
                    height="20"
                    xlinkHref="#icon-project"
                  ></use>
                </svg>
              </div>
              <span className="flex flex-auto items-center">
                {LEGEND.NODE_NFT}
              </span>
            </li>
            <li className="flex list-none flex-row gap-4">
              <div className="flex h-10 flex-none items-center">
                <svg width="30" height="30" viewBox="0 0 40 40" aria-hidden>
                  <circle
                    r="18"
                    cx="20"
                    cy="20"
                    fill="#029ECF"
                    stroke="#ffffff"
                    strokeOpacity="1"
                    strokeWidth="2"
                  ></circle>
                  <use
                    fill="#ffffff"
                    x="10"
                    y="10"
                    width="20"
                    height="20"
                    xlinkHref="#icon-project"
                  ></use>
                </svg>
              </div>
              <span className="flex flex-auto items-center">
                {LEGEND.NODE_GAMEFI}
              </span>
            </li>
            <li className="flex list-none flex-row gap-4">
              <div className="flex h-10 flex-none items-center">
                <svg width="30" height="30" viewBox="0 0 40 40" aria-hidden>
                  <circle
                    r="18"
                    cx="20"
                    cy="20"
                    fill="orange"
                    stroke="#ffffff"
                    strokeOpacity="1"
                    strokeWidth="2"
                  ></circle>
                  <use
                    fill="#ffffff"
                    x="10"
                    y="10"
                    width="20"
                    height="20"
                    xlinkHref="#icon-project"
                  ></use>
                </svg>
              </div>
              <span className="flex flex-auto items-center">
                {LEGEND.NODE_DAO}
              </span>
            </li>
            <li className="flex list-none flex-row gap-4">
              <div className="flex h-10 flex-none items-center">
                <svg width="30" height="30" viewBox="0 0 40 40" aria-hidden>
                  <circle
                    r="18"
                    cx="20"
                    cy="20"
                    fill="green"
                    stroke="#ffffff"
                    strokeOpacity="1"
                    strokeWidth="2"
                  ></circle>
                  <use
                    fill="#ffffff"
                    x="10"
                    y="10"
                    width="20"
                    height="20"
                    xlinkHref="#icon-project"
                  ></use>
                </svg>
              </div>
              <span className="flex flex-auto items-center">
                {LEGEND.NODE_DEFI}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <LegendButton open={show} onClick={onClickLegendButton}></LegendButton>
    </>
  )
}
