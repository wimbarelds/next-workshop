import { MarkDown } from '../components/Markdown';
import content from '../snippets/slide7.md?raw';

export function Slide7() {
  return (
    <>
      <MarkDown content={content} />
    </>
  );
}
