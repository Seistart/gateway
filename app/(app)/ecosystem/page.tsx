import { appMetadata } from "@/config/meteada.config"
import { Metadata } from "next"
import RelationsContainer from "./RelationsContainer"

export const metadata: Metadata = {
  ...appMetadata.projects,
}
export default async function ProjectsPage() {
  return (
    <div className='relative h-[80vh] w-[100%] items-center justify-center overflow-hidden bg-opacity-20 bg-[url("/images/Union.png")] bg-center bg-no-repeat '>
      <RelationsContainer />
    </div>
  )
}
