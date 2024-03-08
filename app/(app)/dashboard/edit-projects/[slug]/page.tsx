import { EditProject } from "@/components/pages/edit-project"
import { getProjectBySlugAction } from "@/server-actions/projects/projects.actions"
import { getAllTagsAction } from "@/server-actions/tags/tags.actions"

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

export default async function EditProjectPage({
  params,
}: {
  params: { slug: string }
}) {
  const { project } = await getProjectBySlugAction(params.slug)
  const { tags } = await getAllTagsAction()
  return <EditProject project={project} tags={tags}></EditProject>
}
