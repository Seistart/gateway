import { Project, projectTag } from "@/database/schemas/projects.schema"
import { getColor } from "@/utils/colors.utils"
import { getDateMonthYear } from "@/utils/date.utils"
import { formatNumber } from "@/utils/number.utils"
import Link from "next/link"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"

type Props = {
  item: Project
}

export const ProjectCardDetails = ({ item }: Props) => {
  return (
    <div key={item.name} className="text-gray-600">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <div className="flex items-center">
            <h2 className="text-xl font-semibold text-gray-900">{item.id}</h2>
            <span
              style={{
                backgroundColor: getColor(item.mainTag as projectTag).darkColor,
                color: "white",
              }}
              className={`ml-2 p-1 px-2 text-sm text-white`}
            >
              {item.mainTag}
            </span>
          </div>
          <h3 className="text-md font-normal text-gray-500">{item.name}</h3>
        </div>
      </div>

      <div>
        <div>
          {item.tags.map((label: any, index) => (
            <Badge
              style={{
                backgroundColor: getColor(label as projectTag).darkColor,
                color: "white",
              }}
              key={`${index}_tag`}
              variant="outline"
              className="bg-orange-200 text-orange-600"
            >
              {label}
            </Badge>
          ))}
        </div>
      </div>
      <div className=" mt-2">
        <span className="text-md text-gray-500">Description</span>
        <p className="text-sm">{item.description}</p>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
        <div className="bg-grey-lighter flex flex-col items-center justify-center">
          <span className="font-bold">{item.communitySize}</span>
          <span>Community</span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <span className="font-bold">
            {formatNumber(item.tokenSupply! / 1000000)}
          </span>
          <span>Token Supply</span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <span className="font-bold">
            {getDateMonthYear(new Date(item.releaseDate!))}
          </span>
          <span>Release Date</span>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm ">
          <strong>Status:</strong> {item.stage}
        </p>
        <div className="flex justify-between">
          <Link
            href={`/projects/${item.id}`}
            className="w-[50%] border-none font-semibold text-gray-500"
          >
            <Button
              variant="ghost"
              className="border-2 border-gray-200 px-3 py-5 "
            >
              Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
