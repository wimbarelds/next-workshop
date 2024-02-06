# Pre-render what?

Ideally when you visit a page in a NextJS website, that page would already be rendered and cached.

But given our dynamic routes, how does NextJS know which blog posts, wiki pages or pen-posts exist?

To help NextJS with this, we can export a function named `generateStaticParams`.

This function is located alongside our page components with dynamic routes, and returns an array of what the `params` for every route at the given location is. NextJS uses these to prerender the pages (for production builds).

## Resources

- https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#generating-static-params
