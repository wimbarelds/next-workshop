# Route handlers

In this step we're going to move one of the endpoints currently hosted by our mock-api, to ournextjs application.

NextJS allows us to execute code on the server, meaning that we no longer need an API server.

In this step we're going to do a fairly simple substitution, exchanging one URL with another. But in the next step we'll see we can simplify this even further.

The API endpoint to replace will be: `http://localhost:1234/api/email`

**Note:** This API endpoint doesn't _really_ do anything. It has a bit of basic validation and then returns success.
The assignment is simple, simply create a POST endpoint, read the post's body (name, email, message) and return success.

## Useful resources

- https://nextjs.org/docs/app/building-your-application/routing/route-handlers
