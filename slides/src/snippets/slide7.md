## What about all the others?

SSR, CSR, ISR, SSG, MPA, SPA, Hydration?

- **SSR**: Server renders the request when it happens
- **CSR**: Client renders the request when it happens
- **SSG**: Static Site Generation: Server / Build tool renders all pages at build time
- **ISR**: Incremental Static Regeneration: Server renders all pages at build time, and updates page-renders as needed
- **SPA**: Single Page Application, meaning that once you're in, all navigation and page transitions happen through Javascript without loading additional web-pages
- **MPA**: Though javascript might take over the page, when you navigate to a different page, a whole new page is loaded and the javascript starts from scratch again on that page.
- **Hydration**: When the server has already rendered the (react) code to HTML, but (react) javascript on the client takes over control of that HTML.
- **Partial Hydration**: Avoid hydrating everything immediately, hydrate the important things first, then hydrate the rest as needed
- **Islands**: Only hydrate parts of the HTML instead of the entire tree
- **Streaming**: When 'real-time' rendering on the server, dont wait for full everything to be done but start sending the parts that are already done, while loading the rest in the background and sending those as they complete

**See also:** https://www.youtube.com/watch?v=Dkx5ydvtpCA
