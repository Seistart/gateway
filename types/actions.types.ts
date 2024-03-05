import { Project } from "@/database/schemas/projects.schema"

export type Action = "create" | "update" | "delete"

export type OptimisticAction<T> = {
  action: Action
  data: T
}

export type TAddOptimistic = (action: OptimisticAction<Project>) => void
