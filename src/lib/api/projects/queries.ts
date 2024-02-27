import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type ProjectId, projectIdSchema, projects } from "@/lib/db/schema/projects";

export const getProjects = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(projects).where(eq(projects.userId, session?.user.id!));
  const p = rows
  return { projects: p };
};

export const getProjectById = async (id: ProjectId) => {
  const { session } = await getUserAuth();
  const { id: projectId } = projectIdSchema.parse({ id });
  const [row] = await db.select().from(projects).where(and(eq(projects.id, projectId), eq(projects.userId, session?.user.id!)));
  if (row === undefined) return {};
  const p = row;
  return { project: p };
};


