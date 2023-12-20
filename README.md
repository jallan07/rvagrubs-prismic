# rvagrubs

- run `npm i` from the root directory to install the necessary packages
- run `npm run dev` from the root directory to run the application
  - this will run the frontend (Next.js) application on [http://localhost:3000](http://localhost:3000)
  - this will run the backend (Prismic) application on [http://localhost:9999](http://localhost:9999)

## slice machine

Active development for this repo begins with the Prismic `Slice Machine` application. This is where custom components are defined. The code for those components are then pulled into code where you can cusstomize them further and display content pulled from the Prismic API in the Next.js application.

Components defined created and pushed to production by the Prismic `Slice Machine` will then be available for use in the Prismic `Page Builder`.

## page builder

Blog content (articles, pages, etc) can be added by logging into the Prismic repository for the project: [https://rvagrubs-prsimic.prismic.io/](https://rvagrubs-prsimic.prismic.io/). This is where you can access the Prismic `Page Builder`.
