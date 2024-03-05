"use client"

import { UserIcon } from "lucide-react"
import Image from "next/image"
import { Button } from "./button"

interface ProjectCardProps {
  title: string
  subtitle: string
  count: number
  imgSrc: string
  smallImgSrcs: string[]
  buttonLabel: string
}

export const ProjectCard = ({
  title,
  subtitle,
  count,
  imgSrc,
  smallImgSrcs,
  buttonLabel,
}: ProjectCardProps) => {
  return (
    <div className="flex space-x-4">
      {Array(4)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="bg-white">
            <div className="relative">
              <Image
                src={imgSrc}
                alt=""
                width={1000}
                height={1000}
                className="h-full w-full object-cover"
              />
              <div className="absolute left-4 top-4 flex -space-x-6 rtl:space-x-reverse">
                {smallImgSrcs.map((src, index) => (
                  <Image
                    key={index}
                    src={src}
                    alt=""
                    width={50}
                    height={50}
                    className={`dark:border-white-800 h-10 w-10 rounded-full border-2 border-white`}
                  />
                ))}
              </div>
            </div>
            <div className="p-4">
              <div className="mt-2 flex items-center justify-between">
                <h2 className="text-base font-semibold text-black">{title}</h2>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-gray-400">{count}</span>
                  <UserIcon className="h-4 w-4 text-gray-400" />
                </div>
              </div>
              <p className="mt-1 text-sm text-gray-400">{subtitle}</p>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex flex-col">
                  <h3 className="text-sm text-gray-400">Raised</h3>
                  <span className="text-base text-gray-800">200 sei</span>
                </div>
                <Button variant="outline" className="text-sm ">
                  {buttonLabel}
                </Button>
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}
