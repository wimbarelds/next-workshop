'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { FullPenPost } from 'types';
import { CommentField } from '@/components/CommentField';

function getDate(dateStr: string) {
  const date = new Date(Date.parse(dateStr));
  return new Intl.DateTimeFormat(navigator.language, { dateStyle: 'long' }).format(date);
}

function getPenDate(post: FullPenPost) {
  return post && getDate(post.date);
}

export default function Page({ params: { id } }: { params: { id: string } }) {
  const [post, setPost] = useState<FullPenPost | null>(null);
  const [loading, setLoading] = useState(false);
  const [showInput, setShowInput] = useState(false);

  const loadContent = useCallback(() => {
    setLoading(true);
    fetch(`http://localhost:1234/pens/${id}`)
      .then((response) => response.json())
      .then((data: FullPenPost) => setPost(data))
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
              <div className="text-lg py-4">{getPenDate(post)}</div>
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
          <div
            className={`p-10 h-40 flex items-center justify-center relative isolate overflow-hidden rounded-full my-4`}
          >
            <img
              src={`https://codepen.io/wimbarelds/pen/${post.id}/image/large.png`}
              alt=""
              className="absolute -z-10 inset-0 max-h-full w-full object-cover object-center opacity-25"
            />
            <a
              href={`https://codepen.io/wimbarelds/pen/${post.id}`}
              target="_blank"
              className="bg-gradient-to-br from-blue-600 to-purple-700 block p-1 rounded-xl group"
            >
              <div className="px-8 py-4 rounded-lg text-3xl font-bold overflow-hidden relative isolate bg-gradient-to-br from-blue-900 to-purple-950">
                <div className="bg-gray-900 absolute inset-0 -z-10 transition-all group-hover:opacity-50 group-hover:translate-y-full"></div>
                Open Codepen
              </div>
            </a>
          </div>
          <ReactMarkdown className="prose lg:prose-2xl prose-invert" remarkPlugins={[remarkGfm]}>
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
            posturl={`http://localhost:1234/pens/${post.id}`}
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
