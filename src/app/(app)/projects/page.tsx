import { Projects } from '@/components/pages'
import { appMetadata } from '@/config'
import { Metadata } from 'next'

export const metadata: Metadata = {
  ...appMetadata.projects,
}

export default function ProjectsPage() {
  return <Projects />
}
