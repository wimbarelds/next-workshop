// @ts-nocheck
import MockDB from 'mock-db';

export async function generateStaticParams() {
  const db = await MockDB.connect('localhost', 'admin', 'Hunter2');
  if (db instanceof Error) return [];

  const result = await db.getList('blog', {}, ['id']);
  if (result instanceof Error) return [];

  return result.map((item) => ({ id: item.id }));
}
