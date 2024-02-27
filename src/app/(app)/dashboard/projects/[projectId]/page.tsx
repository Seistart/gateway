import { Suspense } from "react";
import { notFound } from "next/navigation";

import { getProjectById } from "@/lib/api/projects/queries";
import OptimisticProject from "./OptimisticProject";
import { checkAuth } from "@/lib/auth/utils";

import { BackButton } from "@/components/shared/BackButton";
import Loading from "@/app/loading";

export const revalidate = 0;

export default async function ProjectPage({
  params,
}: {
  params: { projectId: string };
}) {
  return (
    <main className="overflow-auto">
      <Project id={params.projectId} />
    </main>
  );
}

const Project = async ({ id }: { id: string }) => {
  await checkAuth();

  const { project } = await getProjectById(id);

  if (!project) notFound();
  return (
    <Suspense fallback={<Loading />}>
      <div className="relative">
        <BackButton currentResource="projects" />
        <OptimisticProject project={project} />
      </div>
    </Suspense>
  );
};
