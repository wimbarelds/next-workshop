import { MarkDown } from '../components/Markdown';
import content from '../snippets/slide4.md?raw';

export function Slide4() {
  return (
    <>
      <MarkDown content={content} />
    </>
  );
}
