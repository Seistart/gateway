import { Project } from "@/database/schemas/projects.schema"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"

type Props = {
  key: number
  item: Project
}

export const ProjectCardDetails = ({ key, item }: Props) => {
  return (
    <div key={key}>
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold text-gray-900">
            {item.id} Details
          </h2>
          <h3 className="text-md font-normal text-gray-500">{item.name}</h3>
        </div>
      </div>
      <div className="flex justify-between">
        <Button
          variant="ghost"
          className="h-4 w-[50%] border-2 border-gray-700 px-3 py-5 font-semibold text-gray-700"
        >
          Content
        </Button>
        <Button
          variant="ghost"
          className="h-4 w-[50%] border-2 border-gray-200 px-3 py-5 font-semibold text-gray-500"
        >
          Details
        </Button>
      </div>
      <div>
        <span className="text-md text-gray-500">Labels</span>
        <div>
          {item.tags.map((label: any, index) => (
            <Badge
              key={`${index}_tag`}
              variant="outline"
              className="bg-orange-200 text-orange-600"
            >
              {label}
            </Badge>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-600">
          <strong>Id:</strong> {item.id}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Type:</strong> {item.mainTag}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Name:</strong> {item.name}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Community size:</strong> {item.communitySize}
        </p>
        {/* Add more node details here */}
      </div>
    </div>
  )
}
