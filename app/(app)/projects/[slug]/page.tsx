import { getProjectBySlugAction } from "@/server-actions/projects/projects.actions"

export const dynamic = "force-dynamic"

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
