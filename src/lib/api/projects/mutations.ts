import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  ProjectId, 
  NewProjectParams,
  UpdateProjectParams, 
  updateProjectSchema,
  insertProjectSchema, 
  projects,
  projectIdSchema 
} from "@/lib/db/schema/projects";
import { getUserAuth } from "@/lib/auth/utils";

export const createProject = async (project: NewProjectParams) => {
  const { session } = await getUserAuth();
  const newProject = insertProjectSchema.parse({ ...project, userId: session?.user.id! });
  try {
    const [p] =  await db.insert(projects).values(newProject).returning();
    return { project: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateProject = async (id: ProjectId, project: UpdateProjectParams) => {
  const { session } = await getUserAuth();
  const { id: projectId } = projectIdSchema.parse({ id });
  const newProject = updateProjectSchema.parse({ ...project, userId: session?.user.id! });
  try {
    const [p] =  await db
     .update(projects)
     .set({...newProject, updatedAt: new Date() })
     .where(and(eq(projects.id, projectId!), eq(projects.userId, session?.user.id!)))
     .returning();
    return { project: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteProject = async (id: ProjectId) => {
  const { session } = await getUserAuth();
  const { id: projectId } = projectIdSchema.parse({ id });
  try {
    const [p] =  await db.delete(projects).where(and(eq(projects.id, projectId!), eq(projects.userId, session?.user.id!)))
    .returning();
    return { project: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

