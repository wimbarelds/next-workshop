import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import { MarkDown } from './Markdown';

SyntaxHighlighter.registerLanguage('tsx', tsx);

interface CodeProps {
  code: string;
  title?: string;
}

function removeNoCheck(str: string) {
  const lines = str
    .replace(/\r/g, '')
    .split('\n')
    .filter((line) => line.trim() !== '// @ts-nocheck');

  const start = lines.findIndex((line) => line.trim());
  const end = lines
    .slice()
    .reverse()
    .findIndex((line) => line.trim());

  return lines.slice(start, end * -1).join('\n');
}

export default function Code({ code, title }: CodeProps) {
  const content = (
    <SyntaxHighlighter language="tsx" style={vscDarkPlus} children={removeNoCheck(code)} />
  );
  if (!title) return content;
  return (
    <>
      <div className="mb-6">
        <MarkDown content={`## ${title}`} />
      </div>
      <SyntaxHighlighter language="tsx" style={vscDarkPlus} children={removeNoCheck(code)} />
    </>
  );
}
