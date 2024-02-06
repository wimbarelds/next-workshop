import { MarkDown } from '../components/Markdown';
import content from '../snippets/step7.md?raw';

export function Step7() {
  return (
    <>
      <MarkDown content={content} />
    </>
  );
}
