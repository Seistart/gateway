import { SidebarLink } from "@/types/navigation.types"
import { HomeIcon, Pencil, PieChart, Plus, Tag } from "lucide-react"

type AdditionalLinks = {
  title: string
  links: SidebarLink[]
}

export const defaultLinks: SidebarLink[] = [
  { href: "/dashboard", title: "Home", icon: HomeIcon },
]

export const additionalLinks: AdditionalLinks[] = [
  {
    title: "Analytics",
    links: [
      { href: "/dashboard/analytics", title: "Analytics", icon: PieChart },
    ],
  },
  {
    title: "Projects",
    links: [
      {
        href: "/dashboard/edit-projects",
        title: "Edit Projects",
        icon: Pencil,
      },
      {
        href: "/dashboard/create-project",
        title: "Create Project",
        icon: Plus,
      },
    ],
  },
  {
    title: "Tags",
    links: [
      {
        href: "/dashboard/tags",
        title: "Tags",
        icon: Tag,
      },
    ],
  },
]
