"use client"

import {
  additionalLinks,
  defaultLinks,
  type SidebarLink,
} from "@/config/navigation.config"
import { Entitlements } from "@/server-actions/entitlements/entitlements.models"
import { userStore } from "@/stores/user-store"
import { cn } from "@/utils/tailwind.utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const DashboardSidebarItems = () => {
  const entitlements = userStore().userProfile?.entitlements
  if (!entitlements) {
    return <></>
  }
  return (
    <>
      <SidebarLinkGroup links={defaultLinks} entitlements={entitlements} />
      {additionalLinks.length > 0
        ? additionalLinks
            .filter(({ permissions }) =>
              permissions
                ? permissions?.every(
                    (permission) => entitlements.permissions[permission]
                  )
                : true
            )
            .map((l) => (
              <SidebarLinkGroup
                entitlements={entitlements}
                links={l.links}
                title={l.title}
                border
                key={l.title}
              />
            ))
        : null}
    </>
  )
}

const SidebarLinkGroup = ({
  links,
  title,
  border,
  entitlements,
}: {
  links: SidebarLink[]
  title?: string
  border?: boolean
  entitlements: Entitlements
}) => {
  const fullPathname = usePathname()
  const pathname = "/" + fullPathname.split("/")[1]

  return (
    <div className={border ? "my-8 border-t border-border/10 pt-4" : ""}>
      {title ? (
        <h4 className="mb-2 px-2 text-xs uppercase tracking-wider text-muted-foreground">
          {title}
        </h4>
      ) : null}
      <ul>
        {links
          .filter(({ permissions }) =>
            permissions
              ? permissions?.every(
                  (permission) => entitlements.permissions[permission]
                )
              : true
          )
          .map((link) => (
            <li key={link.title}>
              <SidebarLink link={link} active={pathname === link.href} />
            </li>
          ))}
      </ul>
    </div>
  )
}
const SidebarLink = ({
  link,
  active,
}: {
  link: SidebarLink
  active: boolean
}) => {
  return (
    <Link
      href={link.href}
      className={`group inline-block rounded-md p-2 text-xs text-muted-foreground transition-colors hover:bg-popover hover:text-primary hover:shadow w-full${
        active ? " font-semibold text-primary" : ""
      }`}
    >
      <div className="flex items-center">
        <div
          className={cn(
            "absolute left-0 h-6 w-[4px] rounded-r-lg bg-primary opacity-0",
            active ? "opacity-100" : ""
          )}
        />
        <link.icon className="mr-1 h-3.5" />
        <span>{link.title}</span>
      </div>
    </Link>
  )
}
