'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { LucideIcon } from 'lucide-react'

import { additionalNodes, defaultNodes } from '@/config/nav'
import { cn } from '@/lib/utils'

export interface SideBarNodeType {
  title: string
  href: string
  icon: LucideIcon
}

const SidebarItems = () => {
  return (
    <>
      <SidebarNodeGroup nodes={defaultNodes} />
      {additionalNodes.length > 0
        ? additionalNodes.map((l) => (
            <SidebarNodeGroup
              nodes={l.nodes}
              title={l.title}
              border
              key={l.title}
            />
          ))
        : null}
    </>
  )
}
export default SidebarItems

const SidebarNodeGroup = ({
  nodes,
  title,
  border,
}: {
  nodes: SideBarNodeType[]
  title?: string
  border?: boolean
}) => {
  const fullPathname = usePathname()
  const pathname = '/' + fullPathname.split('/')[1]

  return (
    <div className={border ? 'my-8 border-t border-border pt-4' : ''}>
      {title ? (
        <h4 className='mb-2 px-2 text-xs uppercase tracking-wider text-muted-foreground'>
          {title}
        </h4>
      ) : null}
      <ul>
        {nodes.map((node) => (
          <li key={node.title}>
            <SidebarNode node={node} active={pathname === node.href} />
          </li>
        ))}
      </ul>
    </div>
  )
}
const SidebarNode = ({
  node,
  active,
}: {
  node: SideBarNodeType
  active: boolean
}) => {
  return (
    <Link
      href={node.href}
      className={`group inline-block rounded-md p-2 text-xs text-muted-foreground transition-colors hover:bg-popover hover:text-primary hover:shadow w-full${
        active ? ' font-semibold text-primary' : ''
      }`}
    >
      <div className='flex items-center'>
        <div
          className={cn(
            'absolute left-0 h-6 w-[4px] rounded-r-lg bg-primary opacity-0',
            active ? 'opacity-100' : ''
          )}
        />
        <node.icon className='mr-1 h-3.5' />
        <span>{node.title}</span>
      </div>
    </Link>
  )
}
