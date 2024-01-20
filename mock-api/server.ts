import express, { Request, Response } from 'express';
import cors from 'cors';
import MockDB from 'mock-db';

const app = express();
app.use(cors());
app.use(express.json());
const port = 1234;

const dbPromise = MockDB.connect('localhost', 'admin', 'Hunter2');

app.get('/blog/posts', async (req: Request, res: Response) => {
  const db = await dbPromise;
  res.json(
    await db.getList('blog', {}, ['id', 'author', 'title', 'date', 'shortDescription', 'tags']),
  );
});

app.get('/blog/:id', async (req: Request, res: Response) => {
  const postId = req.params.id;
  if (!postId) return res.status(404).send('id missing');

  const db = await dbPromise;

  const [baseItem, comments] = await Promise.all([
    db.getItem('blog', postId),
    db.getList('comment', { fk: `blog.${postId}` }),
  ]);

  return res.json({ ...baseItem, comments });
});

app.post(`/blog/:id`, async (req: Request, res: Response) => {
  const postId = req.params.id;
  const { name, comment } = req.body;
  const commentObj = {
    author: name,
    message: comment,
    date: new Date().toISOString(),
    fk: `blog.${postId}`,
  };

  const db = await dbPromise;
  await db.addItem('comment', commentObj);
  res.status(200).send('Comment added');
});

app.post(`/pens/:id`, async (req: Request, res: Response) => {
  const postId = req.params.id;
  const { name, comment } = req.body;
  const commentObj = {
    author: name,
    message: comment,
    date: new Date().toISOString(),
    fk: `pen.${postId}`,
  };

  const db = await dbPromise;
  await db.addItem('comment', commentObj);
  res.status(200).send('Comment added');
});

app.get('/pens/posts', async (req: Request, res: Response) => {
  const db = await dbPromise;
  res.json(
    await db.getList('pen', {}, ['id', 'author', 'title', 'date', 'shortDescription', 'tags']),
  );
});

app.get('/pens/:id', async (req: Request, res: Response) => {
  const postId = req.params.id;
  if (!postId) return res.status(404).send('id missing');

  const db = await dbPromise;

  const [baseItem, comments] = await Promise.all([
    db.getItem('pen', postId),
    db.getList('comment', { fk: `pen.${postId}` }),
  ]);

  return res.json({ ...baseItem, comments });
});

app.get('/wiki', async (req: Request, res: Response) => {
  const db = await dbPromise;

  return res.json(await db.getItem('wiki', 'home'));
});

app.get('/wiki/:slug', async (req: Request, res: Response) => {
  const slug = req.params.slug as string;
  const db = await dbPromise;

  return res.json(await db.getItem('wiki', slug));
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
