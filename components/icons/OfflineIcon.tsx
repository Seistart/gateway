import { SVGProps } from "react"

export function OfflineIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 72 72"
      {...props}
    >
      <circle cx="36" cy="36" r="28" fill="#d22f27"></circle>
      <circle
        cx="36"
        cy="36"
        r="28"
        fill="none"
        stroke="#000"
        stroke-linejoin="round"
        stroke-width="2"
      ></circle>
    </svg>
  )
}
