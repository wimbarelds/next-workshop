import { readFileSync, readdirSync } from 'fs';
import { resolve } from 'path';
import { WikiPage } from 'types';

export const wikipages: Record<string, WikiPage> = {};

const wikiRoot = resolve(__dirname, 'wiki');
const files = readdirSync(wikiRoot)
  .filter((file) => file.endsWith('.md'))
  .map(
    (file): WikiPage => ({
      slug: file.slice(0, -3),
      body: readFileSync(resolve(wikiRoot, file), 'utf-8'),
    }),
  )
  .forEach((page) => {
    wikipages[page.slug] = page;
  });
