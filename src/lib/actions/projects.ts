"use server";

import { revalidatePath } from "next/cache";
import {
  createProject,
  deleteProject,
  updateProject,
} from "@/lib/api/projects/mutations";
import {
  ProjectId,
  NewProjectParams,
  UpdateProjectParams,
  projectIdSchema,
  insertProjectParams,
  updateProjectParams,
} from "@/lib/db/schema/projects";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateProjects = () => revalidatePath("/projects");

export const createProjectAction = async (input: NewProjectParams) => {
  try {
    const payload = insertProjectParams.parse(input);
    await createProject(payload);
    revalidateProjects();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateProjectAction = async (input: UpdateProjectParams) => {
  try {
    const payload = updateProjectParams.parse(input);
    await updateProject(payload.id, payload);
    revalidateProjects();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteProjectAction = async (input: ProjectId) => {
  try {
    const payload = projectIdSchema.parse({ id: input });
    await deleteProject(payload.id);
    revalidateProjects();
  } catch (e) {
    return handleErrors(e);
  }
};