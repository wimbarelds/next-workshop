import Code from '../components/Code';
import { MarkDown } from '../components/Markdown';
import content from '../snippets/step4.md?raw';
import code from '../snippets/step4example?raw';

export function Step4() {
  return (
    <>
      <MarkDown content={content} />
      <Code code={code} title="Example route handler" />
    </>
  );
}
