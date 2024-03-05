import { getBlogPostByName, getSortedBlogPosts } from "@/blogs/blogs.utils"
import { MDX } from "@/components/markdown/mdx"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { notFound } from "next/navigation"

const getBlogPost = async (slug: string) => {
  const blogPost = await getBlogPostByName(slug)
  if (!blogPost) {
    notFound()
  }
  return blogPost
}

export async function generateStaticParams() {
  const blogPosts = await getSortedBlogPosts()
  return blogPosts.map((post) => ({
    slug: post.id,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  const blogPost = await getBlogPost(params.slug)
  return {
    title: blogPost.title,
    description: blogPost.description,
    keywords: blogPost.keywords,
  }
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string }
}) {
  const { markdown } = await getBlogPost(params.slug)
  return (
    <>
      <Link href="/blog">
        <Button variant="link" className="mb-4 pl-0 text-lg">
          Back
        </Button>
      </Link>
      <MDX markdown={markdown}></MDX>
    </>
  )
}
