import { useEffect, useState } from 'react';

import { Link, useParams } from 'react-router-dom';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

import type { WikiPage } from 'types';

const components: Components = {
  a: function (props) {
    return props.href?.startsWith('/') ? (
      <Link to={props.href}>{props.children}</Link>
    ) : (
      <a href={props.href}>{props.children}</a>
    );
  },
};

const baseUrl = `http://localhost:1234/wiki`;

export function WikiPage() {
  const [content, setContent] = useState<WikiPage | null>(null);
  const [loading, setLoading] = useState(false);
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    setLoading(true);
    fetch(slug ? `${baseUrl}/${slug}` : baseUrl)
      .then((response) => response.json())
      .then((data: WikiPage) => setContent(data))
      .finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    if (!content?.slug) return;
    const title = content.slug
      .split('-')
      .map((word, index) => (index > 0 ? word : word[0].toUpperCase() + word.slice(1)))
      .join(' ');

    document.title = `Pentastic! - Wiki: ${title}`;
  }, [content?.slug]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (!content) return <div className="text-center">No post found.</div>;

  return (
    <div className="p-4">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <ReactMarkdown
            className="prose lg:prose-2xl prose-invert"
            components={components}
            remarkPlugins={[remarkGfm]}
          >
            {content.body}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
