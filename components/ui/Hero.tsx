import { mockProjects } from "@/mocks/projects.mocks"
import Image from "next/image"
import { Badge } from "./badge"
import { Button } from "./button"

function Hero() {
  const projects = mockProjects(4)

  return (
    <div className="mx-auto w-full max-w-[80rem] py-10">
      <div className="flex max-h-screen min-h-[60vh] max-w-[80rem] items-end justify-between border border-black bg-background p-4 shadow-bottom-right">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl">Your Gateway to the Sei Ecosystem</h1>
          <Button>Browse</Button>
        </div>
      </div>
      <div className="grid max-w-[80rem] grid-cols-2 gap-10 py-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
        {projects.map((project) => (
          <div
            className="border border-b-4 border-r-4 border-black p-4 shadow-faded-bottom-right"
            key={project.id}
          >
            <Image
              src={"/images/sei.jpg"}
              alt=""
              width={40}
              height={40}
              className="mb-2 rounded-full opacity-80"
            />
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                {/* <p>sth cool</p>
              <Badge className="bg-[#E9C0EA]">New</Badge> */}
              </div>
              <p className="text-sm">Small Description about it</p>
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium">Project Name</p>
                <Badge className="bg-[#E9C0EA]">New</Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Hero
