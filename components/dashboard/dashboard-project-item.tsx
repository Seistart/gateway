"use client"

import { Project } from "@/database/schemas/projects.schema"
import { deleteProjectAction } from "@/server-actions/projects/projects.actions"
import Link from "next/link"
import { ConfirmActionDialog } from "../confirm-action-dialog"
import { Button } from "../ui/button"

interface DashboardProjectItemProps {
  project: Project
}

export const DashboardProjectItem = ({
  project,
}: DashboardProjectItemProps) => {
  return (
    <li>
      <div className="mb-4 flex w-full items-center justify-between rounded-sm border border-border px-4">
        {project.name}
        <div className="flex items-center justify-center">
          <ConfirmActionDialog
            onConfirm={async () => {
              await deleteProjectAction(project.id)
            }}
            description={`Are you sure you want to delete this project? ${project.name}`}
          >
            <Button
              type="button"
              className="w-[75px] p-4"
              variant="destructive"
            >
              Delete
            </Button>
          </ConfirmActionDialog>
          <Link href={`/dashboard/edit-projects/${project.slug}`}>
            <Button type="button" className="w-[75px] p-4">
              Edit
            </Button>
          </Link>
        </div>
      </div>
    </li>
  )
}
