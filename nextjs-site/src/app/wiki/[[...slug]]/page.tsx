import { getWiki } from '@/actions/db-actions';
import { Metadata } from 'next';
import Link from 'next/link';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

const components: Components = {
  a: function (props) {
    return props.href?.startsWith('/') ? (
      <Link href={props.href}>{props.children}</Link>
    ) : (
      <a href={props.href}>{props.children}</a>
    );
  },
};

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const content = await getWiki(slug);
  const title = content.slug
    .split('-')
    .map((word, index) => (index > 0 ? word : word[0].toUpperCase() + word.slice(1)))
    .join(' ');

  return {
    title: `Pentastic! - Wiki: ${title}`,
  };
}

export default async function Page({ params: { slug } }: { params: { slug: string } }) {
  const content = await getWiki(slug);

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
