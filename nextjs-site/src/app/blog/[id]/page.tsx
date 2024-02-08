import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { FullBlogPost } from 'types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CommentArea } from '@/components/CommentArea';

function getDate(dateStr: string) {
  const date = new Date(Date.parse(dateStr));
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(date);
}

function getPostDate(post: FullBlogPost) {
  return post && getDate(post.date);
}

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string };
}): Promise<Metadata> {
  const post: FullBlogPost = await fetch(`http://localhost:1234/blog/${id}`).then((response) =>
    response.json(),
  );
  return {
    title: `Pentastic! - ${post.title}`,
  };
}

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const post: FullBlogPost = await fetch(`http://localhost:1234/blog/${id}`).then((response) =>
    response.json(),
  );

  if (!post) return notFound();

  return (
    <div className="p-4">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="lg:w-[200px] flex justify-center items-start">
          <div className="text-vertical flex rotate-180 items-center gap-8 text-nowrap py-8">
            <div>
              <div className="text-gray-400">Posted:</div>
              <div className="text-lg py-4">{getPostDate(post)}</div>
            </div>
            <div>
              <div className="text-gray-400">Author:</div>
              <div className="text-3xl py-4">{post.author}</div>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <div className="flex space-x-2 p-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-200 text-gray-800 text-sm font-semibold px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          <ReactMarkdown
            className="prose lg:prose-2xl prose-invert mt-8"
            remarkPlugins={[remarkGfm]}
          >
            {post.body}
          </ReactMarkdown>
        </div>
      </div>
      <CommentArea comments={post.comments} apiUrl={`http://localhost:1234/blog/${post.id}`} />
    </div>
  );
}
