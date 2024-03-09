import { getBlogPostByName, getSortedBlogPosts } from "@/blogs/blogs.utils"
import { MDX } from "@/components/markdown/mdx"
import { notFound } from "next/navigation"
import { Content } from "./content"

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
      <Content />
      <MDX markdown={markdown}></MDX>
    </>
  )
}
