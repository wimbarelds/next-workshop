# Middleware

In production this can be a rather big one actually!

Some examples:

- If your website is available in multiple languages, but the language is set through cookies or subdomain
- If your website has an authenticated section
- AB-Testing

Briefly summarized, you can do all of those things with file-based routing, butt that might not lead to URL's that you like.
With middleware you can intercept requests, look at cookies, domain name, HTTP-headers, and (invisibly) redirect the user to a different part of the application.

Alternatively, you might just prevent the user from accessing admin routes if they don't have a cookie.

Or perhaps one URL looks different depending on whether you're logged in or not? Or alternatively based on an AB test cookie. In that case you _could_ throw away all of the pre-rendering, but that could also be intercepted by middleware and users could be directed to two different pages (a member and guest page) that could then both be pre-rendered and cached.

In short, middleware is quite powerful.

Read more about the what and how:

- https://nextjs.org/docs/app/building-your-application/routing/middleware
