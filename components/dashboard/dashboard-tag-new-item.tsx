"use client"

import { createTagAction } from "@/server-actions/tags/tags.actions"
import { Loader2, Plus } from "lucide-react"
import { useState } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

export const DashboardTagNewItem = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [newName, setNewName] = useState("")
  const formAction = async (newTagName: string) => {
    createTagAction(newTagName)
    setIsEditing(false)
    setNewName("")
  }
  return (
    <li>
      {isEditing ? (
        <form
          action={() => formAction(newName)}
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
              className="w-auto justify-end p-4"
              variant="destructive"
              onClick={() => {
                setIsEditing(false), setNewName("")
              }}
            >
              Cancel
            </Button>
            <SaveButton></SaveButton>
          </div>
        </form>
      ) : (
        <Button
          variant="ghost"
          type="button"
          className="m-0 flex w-full items-center justify-center rounded-sm border border-border"
          onClick={() => {
            setIsEditing(true)
          }}
        >
          <Plus></Plus>
        </Button>
      )}
    </li>
  )
}

function SaveButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" className="w-auto justify-end p-4" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Save"}
    </Button>
  )
}
