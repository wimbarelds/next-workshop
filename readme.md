# NextJS: Blending Frontend and Backend in Modern Web Development

This repository was created for a workshop. In this workshop, we will rebuild a React Single Page Application (SPA), using NextJS. Going over what changes we can make and some of the benefits.

## Project Structure

Originally there will be three workspaces:

1. `mock-db`, this is a mock database system. This workspace is used as a module and does not need to be run.
2. `mock-api`, this is a REST API server, using `mock-db` as its datasource. This does need to be run.
3. `react-spa`, this is the React frontend application, it fetches data from the REST API.

## `npm run` commands

To run the website, you will need to execute the following commands:

1. `npm install` or `npm ci`
2. `npm run mock-api` (keep this terminal open)
3. `npm run spa:dev` (in a second terminal window)
