import { MarkDown } from '../components/Markdown';
import content from '../snippets/slide6.md?raw';

export function Slide6() {
  return (
    <>
      <MarkDown content={content} />
    </>
  );
}
