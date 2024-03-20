import { Permission } from "@/server-actions/entitlements/entitlements.models"

import {
  HomeIcon,
  LucideIcon,
  Pencil,
  PieChart,
  Plus,
  Tag,
  Wallet,
} from "lucide-react"

export interface SidebarLink {
  title: string
  href: string
  icon: LucideIcon
  permissions?: Permission[]
}

type AdditionalLinks = {
  title: string
  links: SidebarLink[]
  permissions?: Permission[]
}

export const defaultLinks: SidebarLink[] = [
  {
    href: "/dashboard",
    title: "Home",
    icon: HomeIcon,
  },
]

export const additionalLinks: AdditionalLinks[] = [
  {
    title: "Analytics",
    links: [
      {
        href: "/dashboard/analytics",
        title: "Analytics",
        icon: PieChart,
        permissions: [Permission.AnalyticsAllRead],
      },
    ],
    permissions: [Permission.AnalyticsAllRead],
  },
  {
    title: "Projects",
    links: [
      {
        href: "/dashboard/edit-projects",
        title: "Edit Projects",
        icon: Pencil,
        permissions: [Permission.ProjectSelfEdit],
      },
      {
        href: "/dashboard/create-project",
        title: "Create Project",
        icon: Plus,
        permissions: [Permission.ProjectSelfWrite],
      },
    ],
    permissions: [Permission.ProjectSelfEdit, Permission.ProjectSelfWrite],
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
    permissions: [
      Permission.TagAllDelete,
      Permission.TagAllWrite,
      Permission.TagAllEdit,
      Permission.TagAllRead,
    ],
  },
  {
    title: "Settings",
    links: [
      {
        href: "/dashboard/wallets",
        title: "Wallets",
        icon: Wallet,
      },
    ],
  },
]
