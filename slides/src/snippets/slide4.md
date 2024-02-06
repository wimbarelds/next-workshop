# What is CSR, What is SSR?

There are actually a ton of rendering strategies. Very broadly though...

## CSR

CSR means Client Side Rendering. This is how most modern frontends are built (React, VueJS, Angular, Svelte, etc). The server sends some bare-bones HTML and a big pile of javascript to the browser, and the browser generates all the other HTML.

## SSR

SSR means Server Side Rendering. This is a new paradigm that some websites are already moving over to, but most are not and most probably wont.

## But really

Often, server side rendering is combined with client side rendering. Server side rendering ensures the page loads quickly, but client side rendering them helps enhance the interative elements of the page.
