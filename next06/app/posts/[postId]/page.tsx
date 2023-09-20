import { getPostData, getSortedPostsData } from '@/lib/posts'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export function generateMetadata( { params }: { params : { postId: string } }) {

  const posts = getSortedPostsData()
  const { postId } = params

  const post = posts.find(post => postId === post.id)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post?.title
  }
}

export default async function Post( { params }: { params : { postId: string } }) {

  const posts = getSortedPostsData()
  const { postId } = params

  if(!posts.find(post => postId === post.id)) {
    notFound()
  }

  const { title, date, contentHtml } = await getPostData(postId)

  return (
    <main className="px-6 prose prose-xl prose-slate dark:prose-invert mx-auto">
        <h1 className="text-3xl mt-4 mb-0">{title}</h1>
        <p className="mt-0">
            {date}
        </p>
        <article>
            <section dangerouslySetInnerHTML={{ __html: contentHtml }} />
            <p>
                <Link href="/">← Back to home</Link>
            </p>
        </article>
    </main>
  )
}
