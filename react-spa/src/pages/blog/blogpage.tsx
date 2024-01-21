import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { FullBlogPost } from 'types';
import { CommentField } from '../../components/comment-field';

function getDate(dateStr: string) {
  const date = new Date(Date.parse(dateStr));
  return new Intl.DateTimeFormat(navigator.language, { dateStyle: 'long' }).format(date);
}

function getPostDate(post: FullBlogPost) {
  return post && getDate(post.date);
}

export function BlogPage() {
  const [post, setPost] = useState<FullBlogPost | null>(null);
  const [loading, setLoading] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const { id } = useParams<{ id: string }>();

  const loadContent = useCallback(() => {
    setLoading(true);
    fetch(`http://localhost:1234/blog/${id}`)
      .then((response) => response.json())
      .then((data: FullBlogPost) => setPost(data))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (post?.title) document.title = `Pentastic! - ${post.title}`;
  }, [post]);

  useEffect(loadContent, [loadContent]);

  if (loading && !post) return <div className="text-center">Loading...</div>;
  if (!post) return <div className="text-center">No post found.</div>;

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
      <div className="prose lg:prose-2xl prose-invert ml-[200px] p-4 mt-8 prose-p:mt-2">
        <h2 className="flex justify-between items-center">
          Comments
          {!showInput && (
            <button
              type="button"
              className="bg-gradient-to-br from-blue-600 to-purple-700 p-0.5 rounded-xl group"
              onClick={() => setShowInput(true)}
            >
              <div className="px-3 py-0.5 rounded-lg text-sm font-bold overflow-hidden relative isolate bg-gradient-to-br from-blue-900 to-purple-950">
                <div className="bg-gray-900 absolute inset-0 -z-10 transition-all group-hover:opacity-50 group-hover:translate-y-full"></div>
                Write comment
              </div>
            </button>
          )}
        </h2>
        {showInput && (
          <CommentField
            posturl={`http://localhost:1234/blog/${post.id}`}
            onSent={() => {
              loadContent();
              setShowInput(false);
            }}
          />
        )}
        <div className="">
          {post.comments.map((comment) => (
            <div key={comment.author + comment.date}>
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold text-white">{comment.author}</span>
                <span className="text-gray-400">{getDate(comment.date)}</span>
              </div>
              <div className="">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{comment.message}</ReactMarkdown>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
