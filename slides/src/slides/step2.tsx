import { MarkDown } from '../components/Markdown';
import content from '../snippets/step2.md?raw';

export function Step2() {
  return <MarkDown content={content} />;
}
