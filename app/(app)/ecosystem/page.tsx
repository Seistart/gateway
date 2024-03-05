import { appMetadata } from "@/config/meteada.config"
import { Metadata } from "next"
import RelationsContainer from "./RelationsContainer"

export const metadata: Metadata = {
  ...appMetadata.projects,
}
interface ProjectType {
  name: string
  color: string // Representing the color in a web-friendly format (e.g., HEX, RGB)
}

const projectTypes: ProjectType[] = [
  { name: "DEX", color: "bg-orange-400" }, // A vibrant orange
  { name: "GameFi", color: "bg-green-400" }, // A lively green
  { name: "Finance", color: "bg-blue-400" }, // A deep blue
  { name: "NFT", color: "bg-purple-400" }, // A bright purple
]

export default async function ProjectsPage() {
  return (
    <div className='relative h-[80vh] w-[100%] items-center justify-center overflow-hidden bg-opacity-20 bg-[url("/images/Union.png")] bg-center bg-no-repeat '>
      <RelationsContainer />
    </div>
  )
}
