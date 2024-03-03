import { SidebarNode } from '@/components/SidebarItems'
import { Cog, Globe, HomeIcon } from 'lucide-react'

type AdditionalNodes = {
  title: string
  nodes: SidebarNode[]
}

export const defaultNodes: SidebarNode[] = [
  { href: '/dashboard', title: 'Home', icon: HomeIcon },
  { href: '/dashboard/account', title: 'Account', icon: Cog },
  { href: '/dashboard/settings', title: 'Settings', icon: Cog },
  { href: '/dashboard/analytics', title: 'Analytics', icon: Cog },
]

export const additionalNodes: AdditionalNodes[] = [
  {
    title: 'Entities',
    nodes: [
      {
        href: '/dashboard/projects',
        title: 'Projects',
        icon: Globe,
      },
    ],
  },
]
