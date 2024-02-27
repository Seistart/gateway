import { Projects } from '@/components/pages'
import { appMetadata } from '@/configs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  ...appMetadata.projects,
}

export default function ProjectsPage() {
  return <Projects />
}
