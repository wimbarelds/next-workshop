import express, { Request, Response } from 'express';
import cors from 'cors';
import { blogposts, fullBlogposts } from './data/blogposts';
import { fullPenposts, penposts } from './data/penposts';
import { wikipages } from './data/wikipages';

const app = express();
app.use(cors());
app.use(express.json());
const port = 1234;

app.get('/blog/posts', (req: Request, res: Response) => {
  res.json(blogposts);
});

app.get('/blog/:id', (req: Request, res: Response) => {
  const postId = req.params.id;
  return res.json(fullBlogposts.find((post) => post.id === postId));
});

app.post(`/blog/:id`, (req: Request, res: Response) => {
  const postId = req.params.id;
  const { name, comment } = req.body;
  const blogpost = fullBlogposts.find((post) => post.id === postId);
  if (!blogpost) res.status(404).send('Blog not found');
  else {
    blogpost.comments.push({ author: name, message: comment, date: new Date().toISOString() });
    blogpost.comments.sort((c1, c2) => c2.date.localeCompare(c1.date));
    res.status(200).send('Comment added');
  }
});

app.post(`/pens/:id`, (req: Request, res: Response) => {
  const postId = req.params.id;
  const { name, comment } = req.body;
  const penPost = fullPenposts.find((post) => post.id === postId);
  if (!penPost) res.status(404).send('Pen not found');
  else {
    penPost.comments.push({ author: name, message: comment, date: new Date().toISOString() });
    penPost.comments.sort((c1, c2) => c2.date.localeCompare(c1.date));
    res.status(200).send('Comment added');
  }
});

app.get('/pens/posts', (req: Request, res: Response) => {
  res.json(penposts);
});

app.get('/pens/:id', (req: Request, res: Response) => {
  const postId = req.params.id;
  return res.json(fullPenposts.find((post) => post.id === postId));
});

app.get('/wiki', (req: Request, res: Response) => {
  return res.json(wikipages.home);
});

app.get('/wiki/:slug', (req: Request, res: Response) => {
  const slug = req.params.slug as string;
  return res.json(wikipages[slug]);
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
