"use client"

import { Tag } from "@/database/schemas/tags.schema"
import {
  deleteTagAction,
  updateTagAction,
} from "@/server-actions/tags/tags.actions"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { useFormStatus } from "react-dom"
import { ConfirmActionDialog } from "../confirm-action-dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

interface DashboardTagItemProps {
  tag: Tag
}

export const DashboardTagItem = ({ tag }: DashboardTagItemProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [newName, setNewName] = useState(tag.name)
  const formAction = async (tag: Tag) => {
    await updateTagAction(tag)
    setNewName(tag.name)
    setIsEditing(false)
  }
  return (
    <li>
      {isEditing ? (
        <form
          action={() => formAction({ id: tag.id, name: newName })}
          className="mb-4 flex w-full items-center justify-between rounded-sm border border-border px-4"
        >
          <Input
            type="text"
            value={newName}
            className="max-w-[200px] border-primary"
            onChange={(e) => setNewName(e.target.value)}
          />
          <div className="flex items-center justify-center">
            <Button
              type="button"
              className="w-[75px] p-4"
              variant="destructive"
              onClick={() => {
                setIsEditing(false), setNewName(tag.name)
              }}
            >
              Cancel
            </Button>
            <SaveButton></SaveButton>
          </div>
        </form>
      ) : (
        <div className="mb-4 flex w-full items-center justify-between rounded-sm border border-border px-4">
          {newName}
          <div className="flex items-center justify-center">
            <ConfirmActionDialog
              onConfirm={async () => {
                await deleteTagAction(tag)
              }}
              description={`Are you sure you want to delete this tag? ${tag.name}`}
            >
              <Button
                type="button"
                className="w-[75px] p-4"
                variant="destructive"
                onClick={() => {
                  setIsEditing(false), setNewName(tag.name)
                }}
              >
                Delete
              </Button>
            </ConfirmActionDialog>
            <Button
              type="button"
              variant="ghost"
              className="w-[75px] p-4 "
              onClick={() => setIsEditing(true)}
            >
              Edit Tag
            </Button>
          </div>
        </div>
      )}
    </li>
  )
}

function SaveButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" className="w-[75px] p-4" disabled={pending}>
      {" "}
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Save"}
    </Button>
  )
}
