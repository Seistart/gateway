"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { type Project, CompleteProject } from "@/lib/db/schema/projects";
import Modal from "@/components/shared/Modal";

import { useOptimisticProjects } from "@/app/(app)/dashboard/projects/useOptimisticProjects";
import { Button } from "@/components/ui/button";
import ProjectForm from "./ProjectForm";
import { PlusIcon } from "lucide-react";

type TOpenModal = (project?: Project) => void;

export default function ProjectList({
  projects,
}: {
  projects: CompleteProject[];
}) {
  const { optimisticProjects, addOptimisticProject } =
    useOptimisticProjects(projects);
  const [open, setOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const openModal = (project?: Project) => {
    setOpen(true);
    project ? setActiveProject(project) : setActiveProject(null);
  };
  const closeModal = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={activeProject ? "Edit Project" : "Add Project"}
      >
        <ProjectForm
          project={activeProject}
          addOptimistic={addOptimisticProject}
          openModal={openModal}
          closeModal={closeModal}
        />
      </Modal>
      <div className="absolute right-0 top-0 ">
        <Button onClick={() => openModal()} variant={"outline"}>
          +
        </Button>
      </div>
      {optimisticProjects.length === 0 ? (
        <EmptyState openModal={openModal} />
      ) : (
        <ul>
          {optimisticProjects.map((project) => (
            <Project project={project} key={project.id} openModal={openModal} />
          ))}
        </ul>
      )}
    </div>
  );
}

const Project = ({
  project,
  openModal,
}: {
  project: CompleteProject;
  openModal: TOpenModal;
}) => {
  const optimistic = project.id === "optimistic";
  const deleting = project.id === "delete";
  const mutating = optimistic || deleting;
  const pathname = usePathname();
  const basePath = pathname.includes("projects")
    ? pathname
    : pathname + "/projects/";

  return (
    <li
      className={cn(
        "flex justify-between my-2",
        mutating ? "opacity-30 animate-pulse" : "",
        deleting ? "text-destructive" : ""
      )}
    >
      <div className="w-full">
        <div>{project.projectName}</div>
      </div>
      <Button variant={"link"} asChild>
        <Link href={basePath + "/" + project.id}>Edit</Link>
      </Button>
    </li>
  );
};

const EmptyState = ({ openModal }: { openModal: TOpenModal }) => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No projects
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by adding a new project.
      </p>
      <div className="mt-6">
        <Button onClick={() => openModal()}>
          <PlusIcon className="h-4" /> Add Project
        </Button>
      </div>
    </div>
  );
};
