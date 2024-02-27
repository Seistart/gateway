import { Suspense } from "react";

import Loading from "@/app/loading";
import ProjectList from "@/components/projects/ProjectList";
import { getProjects } from "@/lib/api/projects/queries";

import { checkAuth } from "@/lib/auth/utils";

export const revalidate = 0;

export default async function ProjectsPage() {
  return (
    <main>
      <div className="relative">
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl my-2">Projects</h1>
        </div>
        <Projects />
      </div>
    </main>
  );
}

const Projects = async () => {
  await checkAuth();

  const { projects } = await getProjects();

  return (
    <Suspense fallback={<Loading />}>
      <ProjectList projects={projects} />
    </Suspense>
  );
};
