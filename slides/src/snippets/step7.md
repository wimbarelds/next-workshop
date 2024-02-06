# Cache invalidation

In Dev-mode, NextJS doesn't cache all that many things. Normally NextJS will cache page renders, and `fetch` calls. Granted, in Pentastic we no longer use `fetch`, but you might imagine using a headless CMS like Wordpress, Contentfull or Sanity where you retrieve content using fetch.

Though in development mode, caching would be very limited and things seem to just work; in production if you post a comment but don't tell NextJS that your data may have changed, the page won't be updated.

To resolve this, there are two main strategies we can use.

1. Time based revalidation
2. On-demand revalidation

Starting with on-demand revalidation, this allows you to attach a certain tag to a `fetch` request. When we then add a comment to the page, we can invalidate the tag that's associated with the request that fetched our comments. This way NextJS will know to clear it's cache and re-render the page.

We could create a route-handler that can be accessed by our headless-cms. Most CMS systems support such webhooks and this would allow you to very effectively re-render only the pages that may have been impacted.

... But that can be a bit complicated.

What if it's not super important that the content updates immediately? That's where time-based revalidation comes into play. If for example, when you post new content, you would be happy if it shows up on your website within the hour, or 15 minutes, you could just add the number of seconds to your fetch. Saves a lot of code, but would cost a bit more stress on the server and you wouldn't just immediately get your results.

## So what's the assignment?

Honestly I'll be surprised if we get this far. But maybe we do, or maybe you're diligent and finishing the remaining assignments at home?

The MockAPI actually has a `setWebhookUrl` function that can be called.

## Relevant links

- https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#caching-data
- https://nextjs.org/docs/app/api-reference/functions/unstable_cache
- https://nextjs.org/docs/app/building-your-application/caching#revalidatepath
- https://nextjs.org/docs/app/api-reference/functions/revalidatePath
