"use client"

import LandingCont from "../containers/LandingCont"

import { Project } from "@/database/schemas/projects.schema"
import { mockProjects } from "@/mocks/projects.mocks"
import Image from "next/image"
import Heading from "../headers/Heading"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"

export const PopularProjects = () => {
  let projects: Project[] = []
  projects = mockProjects(8)

  return (
    <LandingCont className="mb-10 py-2 sm:py-12">
      <Heading
        highlighted={"Most Popular"}
        headingText={"Projects"}
        desc={"Discover Seis Popular Projects"}
      />
      <div className="grid grid-cols-2 gap-5 py-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
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
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <p>sth cool</p>
                <Badge className="bg-[#E9C0EA]">New</Badge>
              </div>
              <p className="text-sm">Small Description about it</p>
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium">Project Name</p>
              </div>
            </div>
          </div>
        ))}
        <Button className="mt-0 shadow-faded-bottom-right">Load More</Button>
      </div>
    </LandingCont>
  )
}