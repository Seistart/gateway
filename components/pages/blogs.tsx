import { getSortedBlogPosts } from "@/blogs/blogs.utils"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"

export const Blogs = async () => {
  const blogPosts = await getSortedBlogPosts()
  return (
    <>
      <ul>
        {blogPosts.map((post) => (
          <Link href={`blog/${post.id}`} key={post.id}>
            <li className="my-4">
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
