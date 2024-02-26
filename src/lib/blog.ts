import { Blog, FrontMatter } from '@/types/blogs'
import fs from 'fs/promises'
import matter from 'gray-matter'
import path from 'path'

const postsDirectory = path.join(process.cwd(), 'src/blogs/posts')

export async function getSortedBlogPosts(): Promise<Blog[]> {
  const fileNames = await fs.readdir(postsDirectory)
  const posts = fileNames
    .map(async (fileName) => {
      const id = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = await fs.readFile(fullPath, 'utf8')
      const matterResult = matter(fileContents)
      const frontMatter = matterResult.data as FrontMatter
      return {
        id,
        ...frontMatter,
      }
    })
    .sort((a: any, b: any) => {
      if (a.date < b.date) {
        return 1
      } else {
        return -1
      }
    })
  return Promise.all(posts)
}

export async function getBlogPostByName(name: string) {
  try {
    const fullPath = path.join(postsDirectory, `${name}.md`)
    const fileContents = await fs.readFile(fullPath, 'utf8')
    const matterResult = matter(fileContents)
    const frontMatter = matterResult.data as FrontMatter
    return {
      markdown: matterResult.content,
      id: name,
      ...frontMatter,
    }
  } catch {
    return undefined
  }
}
