import Marquee from "react-fast-marquee"

export function HomeMarquee() {
  return (
    <Marquee className="bg-[#1a1a1a] px-4 py-4 text-5xl font-bold text-white">
      <span className="ml-2">
        Seistart offers various projects that are currently getting built.
      </span>
    </Marquee>
  )
}
