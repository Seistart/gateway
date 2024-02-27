import { appMetadata } from '@/config';
import { Projects } from '@/components/pages'
import { getProjects } from '@/lib/api/projects/queries';
import { getMockProjects } from '@/lib/mock-data';
import { Metadata } from 'next'

export const metadata: Metadata = {
  ...appMetadata.projects,
}

export default async function ProjectsPage() {
  const { projects } = await getProjects();

  const mockProjects = getMockProjects();

  console.log(mockProjects)
  
  return <Projects projects={mockProjects} />
}
