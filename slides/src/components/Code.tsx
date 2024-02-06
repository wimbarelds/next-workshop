import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';

SyntaxHighlighter.registerLanguage('tsx', tsx);

interface CodeProps {
  code: string;
}

export default function Code({ code }: CodeProps) {
  return <SyntaxHighlighter language="tsx" style={vscDarkPlus} children={code} />;
}
