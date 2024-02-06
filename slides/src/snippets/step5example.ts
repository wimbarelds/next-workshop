// @ts-nocheck
'use server';

import MockDB from 'mock-db';
import { BlogPost } from 'types';

const dbPromise = MockDB.connect('localhost', 'admin', 'Hunter2');

export async function getBlogPosts() {
  const db = await dbPromise;
  if (db instanceof Error) throw db;

  const table = 'blog';
  const filter: Record<string, any> = {};
  const columns = ['id', 'author', 'title', 'date', 'shortDescription', 'tags'];

  const result = await db.getList(table, filter, columns);
  if (result instanceof Error) throw result;
  return result as BlogPost[];
}
