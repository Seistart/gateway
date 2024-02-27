import { appMetadata } from '@/config';
import { Projects } from '@/components/pages'
import { getProjects } from '@/lib/api/projects/queries';
import { mockProjects } from '@/lib/mock-data';
import { Metadata } from 'next'

export const metadata: Metadata = {
  ...appMetadata.projects,
}

export default async function ProjectsPage() {
  const { projects } = await getProjects();
  
  return <Projects projects={mockProjects} />
}
