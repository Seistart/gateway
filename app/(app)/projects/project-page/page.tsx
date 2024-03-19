import { mockProject } from "@/mocks/projects.mocks"
import { TwitterIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { FaDiscord, FaTelegram } from "react-icons/fa"
import { GoDotFill } from "react-icons/go"
import { IoBookOutline } from "react-icons/io5"
import ProjectLinks from "./ProjectLinks"

const images = [
  {
    url: "/images/noimage.webp",
  },

  {
    url: "/images/noimage.webp",
  },

  {
    url: "/images/noimage.webp",
  },
]

export default function Home() {
  const project = mockProject // Mocked project with predefined data

  return (
    <main className=" min-h-screen flex-col px-4 py-6 md:p-24">
      <div className="flex flex-col gap-5 border-b pb-5 sm:pb-10">
        <h4 className="text-sm text-muted-foreground sm:text-base">{`< All Projects`}</h4>
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-7">
          <Image
            src={"/images/sei.jpg"}
            alt={""}
            width={150}
            height={150}
            className="rounded-md"
          />
          <div className="flex flex-col justify-between gap-2">
            <h1 className="text-xl font-semibold capitalize sm:text-3xl">
              {project.tokenName}
            </h1>
            <h2 className="text-base font-extralight sm:w-2/3 sm:text-lg">
              {project.description}
            </h2>
            <div className="flex gap-2">
              {project.tags.map((tag, index) => (
                <Link
                  key={index}
                  href={tag.toLowerCase()}
                  className="borde rounded-md bg-[#1c1f2a] p-2 text-sm font-medium"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 sm:mt-5">
          <div className="flex items-center gap-4 rounded-md">
            {project.isLive ? (
              <div className="flex items-center rounded-md border px-2 py-1 text-sm">
                <GoDotFill color="#00D26A" size={20} />
                <span>Live</span>
              </div>
            ) : (
              <div className="flex items-center rounded-md border px-2 py-1 text-sm">
                <GoDotFill color="red" size={20} />
                <span>Offline</span>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <p className="mr-2 hidden sm:flex">Official Links:</p>
            <div className="flex gap-4">
              {project.whitepaper && (
                <ProjectLinks url={project.whitepaper}>
                  <IoBookOutline size={23} />
                </ProjectLinks>
              )}
              {project.twitter && (
                <ProjectLinks url={project.twitter}>
                  <TwitterIcon size={23} />
                </ProjectLinks>
              )}
              {project.discord && (
                <ProjectLinks url={project.discord}>
                  <FaDiscord size={23} />
                </ProjectLinks>
              )}
              {project.telegram && (
                <ProjectLinks url={project.telegram}>
                  <FaTelegram size={23} />
                </ProjectLinks>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center py-5 sm:items-stretch">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => (
            <div key={index} className="">
              <Image
                src={image.url}
                alt={`image`}
                width={400}
                height={400}
                className="rounded-md object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
