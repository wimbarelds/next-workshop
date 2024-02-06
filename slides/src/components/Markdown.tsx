import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkDownProps {
  content: string;
}

function LinkRenderer(props: any) {
  return (
    <a href={props.href} target="_blank" rel="noreferrer">
      {props.children}
    </a>
  );
}

export function MarkDown({ content }: MarkDownProps) {
  return (
    <ReactMarkdown
      components={{ a: LinkRenderer }}
      className="prose lg:prose-xl prose-invert mt-8"
      remarkPlugins={[remarkGfm]}
    >
      {content}
    </ReactMarkdown>
  );
}
