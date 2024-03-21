import { AspectRatio } from "@/components/ui/aspect-ratio"
import { getProjectBySlugAction } from "@/server-actions/projects/projects.actions"
import { TwitterIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { FaDiscord, FaTelegram } from "react-icons/fa"
import { GoDotFill } from "react-icons/go"
import { IoBookOutline } from "react-icons/io5"
import ProjectLinks from "./ProjectLinks"

export const dynamic = "force-dynamic"

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  const { project } = await getProjectBySlugAction(params.slug)
  return {
    title: project.name,
    description: project.description,
    keywords: project.tags,
  }
}

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

export default async function ProjectPage({
  params,
}: {
  params: { slug: string }
}) {
  const { project } = await getProjectBySlugAction(params.slug)
  return (
    <main className="min-h-screen flex-col px-4 py-6 md:p-24">
      <div className="flex flex-col gap-5 border-b pb-5 sm:pb-10">
        <Link
          href={"/projects"}
          className="text-sm text-muted-foreground sm:text-base"
        >{`< All Projects`}</Link>
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-7">
          <Image
            src={"/images/sei.jpg"}
            alt={project.name}
            width={150}
            height={150}
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
                  className="borde bg-[#1c1f2a] p-2 text-sm font-medium"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 sm:mt-5">
          <div className="flex items-center gap-4">
            <div
              className={`flex items-center border px-2 py-1 text-sm ${project.isLive ? "text-green-500" : "text-red-500"}`}
            >
              <GoDotFill color={project.isLive ? "#00D26A" : "red"} size={20} />
              <span>{project.isLive ? "Live" : "Offline"}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <p className="mr-2 hidden sm:flex">Official Links:</p>
            <div className="flex gap-4">
              <ProjectLinks url={project.whitepaper}>
                <IoBookOutline size={23} />
              </ProjectLinks>
              <ProjectLinks url={project.twitter}>
                <TwitterIcon size={23} />
              </ProjectLinks>
              <ProjectLinks url={project.discord}>
                <FaDiscord size={23} />
              </ProjectLinks>
              <ProjectLinks url={project.telegram}>
                <FaTelegram size={23} />
              </ProjectLinks>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 py-5 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => (
          <AspectRatio ratio={1} key={index}>
            <Image
              src={image.url}
              alt={`image`}
              fill
              className="object-cover"
            />
          </AspectRatio>
        ))}
      </div>
    </main>
  )
}
