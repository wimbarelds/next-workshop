import Code from '../components/Code';
import { MarkDown } from '../components/Markdown';
import content from '../snippets/step6.md?raw';
import code from '../snippets/step6example?raw';

export function Step6() {
  return (
    <>
      <MarkDown content={content} />
      <Code code={code} title="Example" />
    </>
  );
}
