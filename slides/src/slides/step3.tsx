import Code from '../components/Code';
import { MarkDown } from '../components/Markdown';
import content from '../snippets/step3.md?raw';
import structureCode from '../snippets/step3structure?raw';
import clientCode from '../snippets/step3client-fetch?raw';
import serverCode from '../snippets/step3server-fetch?raw';

export function Step3() {
  return (
    <>
      <MarkDown content={content} />
      <Code code={structureCode} title="Structure examples" />
      <Code code={clientCode} title="Client component data fetching" />
      <Code code={serverCode} title="Server component data fetching" />
    </>
  );
}
