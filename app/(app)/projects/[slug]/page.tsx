import { getProjectBySlugAction } from "@/server-actions/projects/projects.actions"

// export async function generateStaticParams() {
//   const { projects } = await getAllProjectsAction()
//   return projects.map((project) => ({
//     slug: project.slug,
//   }))
// }

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  const { project } = await getProjectBySlugAction(params.slug)
  return {
    title: project.name,
    description: project.description,
    keywords: project.tags,
  }
}

export default async function ProjectPage({
  params,
}: {
  params: { slug: string }
}) {
  const { project } = await getProjectBySlugAction(params.slug)
  return <>{project.name}</>
}
