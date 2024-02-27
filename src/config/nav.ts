import { SidebarLink } from "@/components/SidebarItems";
import { Cog, Globe, HomeIcon } from "lucide-react";

type AdditionalLinks = {
  title: string;
  links: SidebarLink[];
};

export const defaultLinks: SidebarLink[] = [
  { href: "/dashboard", title: "Home", icon: HomeIcon },
  { href: "/dashboard/account", title: "Account", icon: Cog },
  { href: "/dashboard/settings", title: "Settings", icon: Cog },
  { href: "/dashboard/analytics", title: "Analytics", icon: Cog },
];

export const additionalLinks: AdditionalLinks[] = [
  {
    title: "Entities",
    links: [
      {
        href: "/dashboard/projects",
        title: "Projects",
        icon: Globe,
      },
    ],
  },
];
