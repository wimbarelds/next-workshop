'use server';

import MockDB from 'mock-db';
import { BlogPost, Comment, FullBlogPost, FullPenPost, PenPost, WikiPage } from 'types';

const dbPromise = MockDB.connect('localhost', 'admin', 'Hunter2');

export async function getIds(type: 'blog' | 'pen' | 'wiki') {
  const db = await dbPromise;
  if (db instanceof Error) throw db;

  const table = type;
  const filter: Record<string, any> = {};
  const columns = ['id'];

  const result = await db.getList(table, filter, columns);
  if (result instanceof Error) throw result;
  return result.map((item) => item.id as string);
}

export async function getPosts(type: 'blog'): Promise<BlogPost[]>;
export async function getPosts(type: 'pen'): Promise<PenPost[]>;
export async function getPosts(type: 'blog' | 'pen') {
  const db = await dbPromise;
  if (db instanceof Error) throw db;

  const table = type;
  const filter: Record<string, any> = {};
  const columns = ['id', 'author', 'title', 'date', 'shortDescription', 'tags'];

  const result = await db.getList(table, filter, columns);
  if (result instanceof Error) throw result;
  return result;
}

export async function getPost(type: 'blog', id: string): Promise<FullBlogPost>;
export async function getPost(type: 'pen', id: string): Promise<FullPenPost>;
export async function getPost(type: 'blog' | 'pen', id: string) {
  const db = await dbPromise;
  if (db instanceof Error) throw db;

  const [baseItem, comments] = await Promise.all([
    db.getItem(type, id),
    db.getList('comment', { fk: `${type}.${id}` }),
  ]);

  if (baseItem instanceof Error) throw baseItem;
  if (comments instanceof Error) throw comments;

  return { ...baseItem, comments };
}

interface PostComment {
  name: string;
  comment: string;
}

export async function postComment(
  type: 'blog' | 'pen',
  id: string,
  { name, comment }: PostComment,
) {
  const commentObj = {
    author: name,
    message: comment,
    date: new Date().toISOString(),
    fk: `${type}.${id}`,
  };

  const db = await dbPromise;
  if (db instanceof Error) throw db;

  const result = await db.addItem('comment', commentObj);
  if (result instanceof Error) throw result;
}

export async function getWiki(slug: string) {
  const db = await dbPromise;
  if (db instanceof Error) throw db;

  const result = await db.getItem('wiki', slug || 'home');
  if (result instanceof Error) throw result;

  return result as WikiPage;
}
