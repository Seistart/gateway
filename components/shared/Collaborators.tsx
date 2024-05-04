import Image from "next/image"
import LandingCont from "../containers/LandingCont"
import Heading from "../headers/Heading"
import { AspectRatio } from "../ui/aspect-ratio"

export function Collaborators() {
  const arrayToMap = new Array(6).fill(null)
  return (
    <LandingCont className="pb-20 pt-10">
      <Heading headingText="Seistarters" />
      <div className="mt-10 grid grid-cols-2 gap-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {arrayToMap.map(() => (
          <div className="border border-black shadow-bottom-right-2">
            <AspectRatio ratio={1}>
              <Image src={"/images/hax.jpg"} alt="hax" fill />
            </AspectRatio>
            <div className="flex flex-col gap-2 bg-card p-2 text-white">
              <p className="text-lg font-bold">Hax Haxo</p>
              <p className="self-end font-light">Head Collaborator</p>
            </div>
          </div>
        ))}
      </div>
    </LandingCont>
  )
}
