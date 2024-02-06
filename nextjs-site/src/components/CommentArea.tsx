'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { CommentField } from '@/components/CommentField';
import { useState } from 'react';
import { Comment } from 'types';

import { postComment } from '@/actions/db-actions';

interface CommentAreaProps {
  comments: Comment[];
  type: 'blog' | 'pen';
  id: string;
}

function getDate(dateStr: string) {
  const date = new Date(Date.parse(dateStr));
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(date);
}

export function CommentArea({ type, id, comments }: CommentAreaProps) {
  const [showInput, setShowInput] = useState(false);

  return (
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
          send={(name, comment) => postComment(type, id, { name, comment })}
          onSent={() => {
            location.reload();
          }}
        />
      )}
      <div className="">
        {comments.map((comment) => (
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
  );
}
