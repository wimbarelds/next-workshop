import { Metadata } from 'next';
import Link from 'next/link';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

import type { WikiPage } from 'types';

const components: Components = {
  a: function (props) {
    return props.href?.startsWith('/') ? (
      <Link href={props.href}>{props.children}</Link>
    ) : (
      <a href={props.href}>{props.children}</a>
    );
  },
};

const baseUrl = `http://localhost:1234/wiki`;

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const content: WikiPage = await fetch(slug ? `${baseUrl}/${slug}` : baseUrl).then((response) =>
    response.json(),
  );

  const title = content.slug
    .split('-')
    .map((word, index) => (index > 0 ? word : word[0].toUpperCase() + word.slice(1)))
    .join(' ');

  return {
    title: `Pentastic! - Wiki: ${title}`,
  };
}

export default async function Page({ params: { slug } }: { params: { slug: string } }) {
  const content: WikiPage = await fetch(slug ? `${baseUrl}/${slug}` : baseUrl).then((response) =>
    response.json(),
  );

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
