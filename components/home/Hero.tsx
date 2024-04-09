import { mockProjects } from "@/mocks/projects.mocks"
import Image from "next/image"
import Link from "next/link"
import LandingCont from "../containers/LandingCont"
import { Badge } from "../ui/badge"
import { buttonVariants } from "../ui/button"

export function Hero() {
  const projects = mockProjects(4)

  return (
    <LandingCont className="py-4">
      <div className="flex max-h-screen min-h-[40vh] max-w-[80rem] items-end justify-between border border-black bg-card p-4 shadow-bottom-right">
        <div className="flex w-full flex-col items-center justify-between sm:flex-row">
          <h1 className="text-2xl">Your Gateway to the Sei Ecosystem</h1>
          <Link href={"/"} className={buttonVariants({ variant: "default" })}>
            View
          </Link>
        </div>
      </div>
      <div className="grid max-w-[80rem] grid-cols-2 gap-4 py-10 pt-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {projects.map((project) => (
          <div
            className="border border-b-4 border-r-4 border-black bg-card p-4 shadow-faded-bottom-right"
            key={project.id}
          >
            <Image
              src={"/images/sei.jpg"}
              alt=""
              width={40}
              height={40}
              className="mb-2 rounded-full opacity-80"
            />
            <div className="relative h-12 flex-col gap-2">
              <div className="flex gap-2"></div>
              <Badge className="absolute right-1 top-[-3rem] bg-[#E9C0EA]">
                New
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </LandingCont>
  )
}
