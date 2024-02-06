import { MarkDown } from '../components/Markdown';
import content from '../snippets/step9.md?raw';

export function Step9() {
  return (
    <>
      <MarkDown content={content} />
    </>
  );
}
