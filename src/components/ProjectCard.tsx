"use client";

import React from "react";
import { Button } from "./ui/button";

interface CardProps {
  title: string;
  subtitle: string;
  count: number;
  imgSrc: string;
  smallImgSrcs: string[];
  buttonLabel: string;
}

import Image from "next/image";
import { UserIcon } from "lucide-react";

const ProjectCard: React.FC<CardProps> = ({
  title,
  subtitle,
  count,
  imgSrc,
  smallImgSrcs,
  buttonLabel,
}) => {
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
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex -space-x-6 rtl:space-x-reverse">
                {smallImgSrcs.map((src, index) => (
                  <Image
                    key={index}
                    src={src}
                    alt=""
                    width={50}
                    height={50}
                    className={`w-10 h-10 border-2 border-white rounded-full dark:border-white-800`}
                  />
                ))}
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mt-2">
                <h2 className="text-base font-semibold text-black">{title}</h2>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-400">{count}</span>
                  <UserIcon className="w-4 h-4 text-gray-400" />
                </div>
              </div>
              <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
              <div className="flex justify-between items-center mt-2">
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
  );
};

export default ProjectCard;
