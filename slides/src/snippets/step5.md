# Server functions / actions

In this step we're going to use server functions instead. They're a step even beyond route-handlers.

We can replace all of the mock-api routes with these server functions. When this step is done, we should not have any more `fetch(` in our nextjs application.

That is:

- `/blog/posts` (GET) - Retrieve list of blog posts
- `/blog/:id` (GET) - Retrieve a blog post
- `/blog/:id` (POST) - Add comment to a blog post
- `/pens/posts` (GET) - Retrieve list of pen posts
- `/pens/:id` (GET) - Retrieve a pen post
- `/pens/:id` (POST) - Add a comment to a blog post
- `/wiki` and `/wiki/:slug` (GET) - Retrieve a wiki page

You can find implementation help for this in `mock-api/server.ts`, but generally...
