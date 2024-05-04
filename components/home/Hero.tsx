"use client"

import { Project } from "@/database/schemas/projects.schema"
import { mockProjects } from "@/mocks/projects.mocks"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import LandingCont from "../containers/LandingCont"
import { Badge } from "../ui/badge"
import { buttonVariants } from "../ui/button"

export function Hero() {
  let projects: Project[] = []

  projects = mockProjects(4)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [fade, setFade] = useState(true) // New state to control the fade effect

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFade(false) // Begin with fading out
      setTimeout(() => {
        setCurrentIndex((currentIndex) => (currentIndex + 1) % projects.length)
        setFade(true) // Fade in the new image
      }, 500) // Half-second for fade transition, adjust timing as needed
    }, 5000) // Change image every 5000 ms (5 seconds)

    return () => clearInterval(intervalId) // Clear the interval on component unmount
  }, [])

  return (
    <LandingCont className="py-4">
      <div className="relative flex max-h-screen min-h-[40vh] max-w-[100vw] items-end justify-between border border-black bg-card p-4 shadow-bottom-right">
        <div
          style={{
            content: '""',
            // opacity: 0.1,
            backgroundImage: `url(${projects[currentIndex]?.backgroundImage})`,
            backgroundSize: "cover", // To ensure the background covers the div
            transition: "opacity 0.5s ease-in-out",
            opacity: fade ? 1 : 0,
          }}
          className="absolute left-0 top-0 z-0 h-full w-full"
        ></div>
        <div className="z-0 flex w-full flex-col items-center justify-between sm:flex-row">
          <h1 className="bg-[#ffe5ca] p-2 px-4 text-2xl text-black">
            Your Gateway to the Sei Ecosystem
          </h1>
          <Link href={"/"} className={buttonVariants({ variant: "default" })}>
            View Project
          </Link>
        </div>
      </div>
      <div className="grid max-w-[100vw] grid-cols-4 gap-4 py-10 pt-4  xl:grid-cols-4">
        {projects.map((project, id) => (
          <div
            style={{
              backgroundImage: `url(${project.backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderColor: `${id === currentIndex ? "yellow" : "black"}`,
              transition: "opacity 0.5s ease-in-out",
            }}
            className="border border-b-4 border-r-4 bg-card p-4 shadow-faded-bottom-right"
            key={project.id}
          >
            <Image
              src={"/images/sei.jpg"}
              alt=""
              width={30}
              height={30}
              className="mb-2 rounded-full opacity-80"
            />
            <div className="relative h-12 flex-col gap-2">
              <div className="flex gap-2"></div>
              <Badge className="absolute right-1 top-[-2.5rem] bg-[#E9C0EA]">
                New
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </LandingCont>
  )
}
