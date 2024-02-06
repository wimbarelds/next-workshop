import { MarkDown } from '../components/Markdown';
import content from '../snippets/step8.md?raw';

export function Step8() {
  return (
    <>
      <MarkDown content={content} />
    </>
  );
}
