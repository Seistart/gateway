import { Tag } from "@/database/schemas/tags.schema"
import { DashboardTagItem } from "./dashboard-tag-item"
import { DashboardTagNewItem } from "./dashboard-tag-new-item"

interface DashboardTagListProps {
  tags: Tag[]
}

export const DashboardTagList = ({ tags }: DashboardTagListProps) => {
  return (
    <>
      <ul>
        {tags.map((tag) => (
          <DashboardTagItem
            tag={tag}
            key={tag.id + tag.name}
          ></DashboardTagItem>
        ))}
        <DashboardTagNewItem></DashboardTagNewItem>
      </ul>
      {tags.length === 0 && (
        <div className="text-ld my-4 text-center">Create your first tag</div>
      )}
    </>
  )
}
