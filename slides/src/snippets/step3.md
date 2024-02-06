# Server components

In this step we're going to get rid of (some of) the `'use client'` that we've been adding.

That means turning what components we can from client components to server components.

But what are server components and client components?

## A client component:

- Can be interactive (can use hooks, like useState)
- Interactions are handled on the client (in the browser)
- (async) data is fetched on the client (in the browser)
- Cannot use a server component in it's JSX
- Can be passed props that are generated on the server (data but also jsx)

## A server component:

- Cannot be interactive, cannot use hooks (ignoring 'tricks' like server actions for the moment)
- (async) data is fetched on the server
- Can use server component in it's JSX
- Can use client components in it's JSX

## See also

- https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating
