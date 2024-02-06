import { MarkDown } from '../components/Markdown';
import content from '../snippets/slide1.md?raw';

export function Slide1() {
  return (
    <>
      <MarkDown content={content} />
    </>
  );
}
