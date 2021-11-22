# Getting Started

> Real-world web application project built on top of NextJS framework and PayloadCMS as a headless CMS

## Abstracts

The purpose of this site is to update a catalog of houses with details, and to be able to put a little dynamic tweak to the storefront. This web application mostly works on NextJS ecosystem and the backend is fully secure by PayloadCMS. NextJS is a React framework that is loved by the community, and flawlessly works out of the box with ease. Payload is a headless CMS and application framework. It's meant to provide a massive boost to your development process, but importantly, stay out of the way as the apps get more complex. By that, I have used the few of dependencies which almost the most popular by itself. Here are some technology overview;

- React - For the UI
- NextJS - Framework for the Client/Server/Routing
- Payload - Headless CMS for minimal size web application backstore
- TypeScript: Typed JavaScript (necessary for any project you plan to maintain)
- Express: Node server framework
- MongoDB: The most popular NoSQL database
- Mongo Atlas: You will need this in case you do not want to hosting your site without a server
- SWR: Data fetching for the inconsistent layouts
- Tailwind CSS: Utility classes for consistent/maintainable styling
- HeadlessUI: A set of accessible UI components every app needs (accordion/tabs/dialog/etc...)
- Postcss: CSS processor (pretty much just use it for autoprefixer and tailwind)
- Sitemap: For SEO stuffs

And the list of services this project uses:

- S3 Amazon/Digital Ocean Spaces - For the backstore Cloud Storage (Optional)
- Heroku - For hosting platform
- Cloudfare - For service workers and basic Security Pattern
- PayloadCMS - For CMS platform

Moreover, as I mentioned, this is a real-world project built by integrating NextJS and a custom server (ExpressJS). Because we want Payload to be completely integrated without splitting the whole stuff to another server and handled by Docker/Etc (Too complicated for a frontend developer and unnecessary at the moment), we choose an optimal solution to this project to run our own server to integrate into an existing application. Although this is the easier way, but also takes a little frustation to the frontend developer who has no experience in working with Babel and basic NodeJS.

&nbsp;

## Installation guide

### Requirements

- you will need Mongo database to store your data (can be Mongo Atlas) [specific Mongo shell version 5.0.2]
- Node JS version 10+
- Add your own .env config by following .env.example

---

### You may need to initialize database by seeding using `npm run seed` or `yarn seed`

### Running by using `npm run dev` or `yarn dev`

- To access storefront you must use browser at address `http://localhost:3000`
- To access backstore require filling the 'admin' keyword to the url substring `http://localhost:3000/admin`

> Beware of the bug!! because this project use NextJS canary version and React Alpha

&nbsp;

## Walkthrough Custom Server

You need few dependencies to transform webpack of Payload backend integrating with NextJS x ExpressJS custom server, here the list;

1. ts-node
2. @babel/register
3. tsconfig-paths
4. a setup scripts in package.json

## References

- <https://payloadcms.com/docs/getting-started/what-is-payload>
- <https://nextjs.org/docs/getting-started>
- <https://github.com/vercel/next.js/tree/canary/examples/custom-server-express>
- <https://swr.vercel.app>
- <https://www.npmjs.com/package/@babel/register>
