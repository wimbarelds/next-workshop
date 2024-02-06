import { MarkDown } from '../components/Markdown';
import content from '../snippets/step1.md?raw';

export function Step1() {
  return <MarkDown content={content} />;
}
