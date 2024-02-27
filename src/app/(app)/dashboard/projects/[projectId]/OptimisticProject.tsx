"use client";

import { useOptimistic, useState } from "react";
import { TAddOptimistic } from "@/app/(app)/dashboard/projects/useOptimisticProjects";
import { type Project } from "@/lib/db/schema/projects";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import Modal from "@/components/shared/Modal";
import ProjectForm from "@/components/projects/ProjectForm";

export default function OptimisticProject({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const openModal = (_?: Project) => {
    setOpen(true);
  };
  const closeModal = () => setOpen(false);
  const [optimisticProject, setOptimisticProject] = useOptimistic(project);
  const updateProject: TAddOptimistic = (input) =>
    setOptimisticProject({ ...input.data });

  return (
    <div className="m-4">
      <Modal open={open} setOpen={setOpen}>
        <ProjectForm
          project={optimisticProject}
          closeModal={closeModal}
          openModal={openModal}
          addOptimistic={updateProject}
        />
      </Modal>
      <div className="flex justify-between items-end mb-4">
        <h1 className="font-semibold text-2xl">
          {optimisticProject.projectName}
        </h1>
        <Button className="" onClick={() => setOpen(true)}>
          Edit
        </Button>
      </div>
      <pre
        className={cn(
          "bg-secondary p-4 rounded-lg break-all text-wrap",
          optimisticProject.id === "optimistic" ? "animate-pulse" : ""
        )}
      >
        {JSON.stringify(optimisticProject, null, 2)}
      </pre>
    </div>
  );
}
