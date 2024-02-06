# Optimizations

Since NextJS is effectively the webserver for your website, there are come things it _can_ optimize, and other things that can only really be done from the server.

For example, When porting over pages you might have run into an issue with setting the page title, setting meta descript/keywords, how to set thumbnails, open graph data, etc.

If you've had a look at the step1/2/3/4/5... branches, you might have already seen Metadata being exported.

NextJS offers a variety of utilities to help you optimize your website.

## Metadata

Link: https://nextjs.org/docs/app/building-your-application/optimizing/metadata

This is primarily aimed at helping you show up as desired in search results.

## Image optimization

Link: https://nextjs.org/docs/app/building-your-application/optimizing/images

This is a recommended utility for showing images on your website. It automatically optimizes the images, resizes as needed/wanted, and helps to prevent layout shift.

## Font

Link: https://nextjs.org/docs/app/building-your-application/optimizing/fonts

This provides an optimized way to ship your fonts to the user. There are many ways to get fonts wrong, therefor it is recommended to use this if you're not using default fonts.
