import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getSortedBlogPosts } from '@/lib/blog'
import Link from 'next/link'

export function generateMetadata() {
  return {
    title: 'Blog',
    description: '',
    keywords: [],
  }
}

export default async function Blogs() {
  const blogPosts = await getSortedBlogPosts()
  return (
    <>
      <ul>
        {blogPosts.map((post) => (
          <Link href={`blog/${post.id}`} key={post.id}>
            <li className='my-4'>
              <Card>
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription>{post.description}</CardDescription>
                </CardHeader>
                <CardFooter>{post.date}</CardFooter>
              </Card>
            </li>
          </Link>
        ))}
      </ul>
    </>
  )
}
