import { Tag } from "@/database/schemas/tags.schema"
import { DashboardTagList } from "../dashboard/dashboard-tag-list"

interface DashboardTagsProps {
  tags: Tag[]
}

export const DashboardTags = ({ tags }: DashboardTagsProps) => {
  return (
    <main>
      <div className="relative">
        <h1 className="my-2 text-2xl font-semibold">Tags</h1>
        <DashboardTagList tags={tags}></DashboardTagList>
      </div>
    </main>
  )
}
