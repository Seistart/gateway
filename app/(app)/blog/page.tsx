import { Blogs } from "@/components/pages/blogs"
import { appMetadata } from "@/config/meteada.config"

export function generateMetadata() {
  return {
    ...appMetadata.blogs,
  }
}

export default async function BlogsPage() {
  return <Blogs></Blogs>
}
