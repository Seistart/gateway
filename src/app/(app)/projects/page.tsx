import { Projects } from '@/components/pages'
import { appMetadata } from '@/config'
import { getProjects } from '@/lib/api/projects/queries'
import { Metadata } from 'next'

export const metadata: Metadata = {
  ...appMetadata.projects,
}

export default async function ProjectsPage() {
  const { projects } = await getProjects()

  return <Projects projects={projects} />
}
