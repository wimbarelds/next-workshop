import { MarkDown } from '../components/Markdown';
import content from '../snippets/slide5.md?raw';

export function Slide5() {
  return (
    <>
      <MarkDown content={content} />
    </>
  );
}
