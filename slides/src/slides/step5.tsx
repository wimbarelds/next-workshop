import Code from '../components/Code';
import { MarkDown } from '../components/Markdown';
import content from '../snippets/step5.md?raw';
import content2 from '../snippets/step5b.md?raw';
import code from '../snippets/step5example?raw';

export function Step5() {
  return (
    <>
      <MarkDown content={content} />
      <Code code={code} title="Might look like this" />
      <MarkDown content={content2} />
    </>
  );
}
