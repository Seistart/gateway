import { type Project, type CompleteProject } from "@/lib/db/schema/projects";
import { OptimisticAction } from "@/lib/utils";
import { useOptimistic } from "react";

export type TAddOptimistic = (action: OptimisticAction<Project>) => void;

export const useOptimisticProjects = (projects: CompleteProject[]) => {
  const [optimisticProjects, addOptimisticProject] = useOptimistic(
    projects,
    (
      currentState: CompleteProject[],
      action: OptimisticAction<Project>
    ): CompleteProject[] => {
      const { data } = action;

      const optimisticProject = {
        ...data,

        id: "optimistic",
      };

      switch (action.action) {
        case "create":
          return currentState.length === 0
            ? [optimisticProject]
            : [...currentState, optimisticProject];
        case "update":
          return currentState.map((item) =>
            item.id === data.id ? { ...item, ...optimisticProject } : item
          );
        case "delete":
          return currentState.map((item) =>
            item.id === data.id ? { ...item, id: "delete" } : item
          );
        default:
          return currentState;
      }
    }
  );

  return { addOptimisticProject, optimisticProjects };
};
