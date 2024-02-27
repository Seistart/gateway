import { Blogs } from '@/components/pages'
import { appMetadata } from '@/configs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  ...appMetadata.blogs,
}

export default async function BlogsPage() {
  return <Blogs />
}
