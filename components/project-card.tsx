import { Project, projectTag } from "@/database/schemas/projects.schema"
import { getColor } from "@/utils/colors.utils"
import { getDateMonthYear } from "@/utils/date.utils"
import { formatNumber } from "@/utils/number.utils"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"

type Props = {
  key: number
  item: Project
}

export const ProjectCardDetails = ({ key, item }: Props) => {
  return (
    <div key={key} className="text-gray-600">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <div className="flex items-center">
            <h2 className="text-xl font-semibold text-gray-900">{item.id}</h2>
            <span
              style={{
                backgroundColor: getColor(item.projectType as projectTag)
                  .darkColor,
                color: "white",
              }}
              className={`ml-2 p-1 px-2 text-sm text-white`}
            >
              {item.projectType}
            </span>
          </div>
          <h3 className="text-md font-normal text-gray-500">{item.name}</h3>
        </div>
      </div>

      <div>
        <div>
          {item.tags.map((label: string) => (
            <Badge
              style={{
                backgroundColor: getColor(label as projectTag).darkColor,
                color: "white",
              }}
              variant="outline"
              className={` text-white`}
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
          <Button
            variant="ghost"
            className="h-4 w-[50%] border-2 border-gray-200 px-3 py-5 font-semibold text-gray-500"
          >
            Details
          </Button>
        </div>
      </div>
    </div>
  )
}
