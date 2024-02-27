import { getSortedBlogPosts } from '../lib/blog'

export default async function sitemap() {
  const blogPosts = await getSortedBlogPosts()
  const blogPostRoutes = blogPosts.map((blogPost) => ({
    url: `https://seistart.com//blog/${blogPost.id}`,
    lastModified: new Date(blogPost.date).toISOString().split('T')[0],
  }))

  const staticRoutes = ['', '/blog', '/projects', 'analytics'].map((route) => ({
    url: `https://seistart.com/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...staticRoutes, ...blogPostRoutes]
}
