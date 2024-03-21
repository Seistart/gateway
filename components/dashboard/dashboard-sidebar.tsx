import { DashboardSidebarItems } from "./dashboard-sidebar-items"

export const DashboardSidebar = () => {
  return (
    <aside className="bg-tertiary hidden h-full min-w-52 border-r-2 border-border/10 p-4 pt-8 md:block">
      <div className="flex h-full flex-col justify-between">
        <div className="space-y-4">
          <h3 className="ml-4 text-lg font-semibold">Dashboard</h3>
          <DashboardSidebarItems />
        </div>
      </div>
    </aside>
  )
}
