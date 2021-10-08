<img src="https://notion-emojis.s3-us-west-2.amazonaws.com/v0/svg-twitter/1f485.svg" width="50" height="50" />

## Quick Start

### Build
$ yarn

### Run locally
$ yarn start

Note: you will need nx installed globally for this script to work. Alternatively you can make this amendment to the start script in package.json

"start": "npx nx serve"

### Deploy to Docker

$ yarn xylo

Note: you will need Docker installed on your machine for this to work.

## Deployment

Since this project builds into a Docker container, deployment to remote servers should be relatively straightforward. I experimented with Google Cloud and Heroku but there were deployment issues I have not yet resolved. There is a branch called google-cloud where some of this deployment investigation work for Google Cloud can be seen. Note, I would not normally include the project id in the repo, but this is just a test. The primary issue here is building a container with an Nx monorepo that runs after deployment. Google Cloud requires a handshake response on port 8080, and for some reason the stub Express node api for this purpose isn't launching. With more development I'm sure this could be resolved.

# Spill

Spill is a therapy product, users book therapy through Spill. Users often have requirements about how they can book therapy, eg counsellor specialism.

The challenge is to build a booking page that takes into account several different filters.

**User requirements**

- as a user I can view all upcoming appointments
- as a user I can see a single page per appointment type (one-off, consultation)
- as a user I can filter based on (counsellor specialisms, medium)
- as a user I can't see duplicate appointment times even if more than one therapist is available at that time
- as a user the UI should be simple and easy to understand
- as a user I can select the appointment time I want to book
- as a user I can see a confirmation screen of my booking

 

**Technical Requirements**

- build it using React - other technical choices and libraries are up to you
- written in TypeScript (or JavaScript)
- the site should be hosted

**Things to think about**

- separation of concerns
- component reusability
- responsiveness
- design and UX

**Assumptions**

- appointments last an hour

**Spill colours**

- teal `#35D0BA`
- blue `#041549`
- gray `#F3F4F6`
- dark gray `#374151`

*you can use other colours - this isn't our entire colour palette, but could be a good starting point*

We are not exposing an actual API for this exercise. Please use these JSON files as your data. When booking an appointment mock the logic. Please treat this in a similar way to how you would expect to work with an API.

The data is split into files: a counsellors array that contains all counsellors and their specialisms, and availability, that is normalised by counsellor id.

[counsellor-mock.json](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5a7137d0-871f-4561-a243-137b81c91222/counsellor-mock.json)

[availability-mock.json](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b8e5ecb4-f685-4292-9296-e6f311dd7ebe/availability-mock.json)

## Development Resources

* https://mherman.org/blog/dockerizing-a-react-app/
* https://tailwindcss.com/docs/guides/create-react-app

## Nx Workspace

# FrontEnd

This project was generated using [Nx](https://nx.dev).

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="450"></p>

🔎 **Smart, Extensible Build Framework**

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core plugins:

- [React](https://reactjs.org)
  - `npm install --save-dev @nrwl/react`
- Web (no framework frontends)
  - `npm install --save-dev @nrwl/web`
- [Angular](https://angular.io)
  - `npm install --save-dev @nrwl/angular`
- [Nest](https://nestjs.com)
  - `npm install --save-dev @nrwl/nest`
- [Express](https://expressjs.com)
  - `npm install --save-dev @nrwl/express`
- [Node](https://nodejs.org)
  - `npm install --save-dev @nrwl/node`

There are also many [community plugins](https://nx.dev/community) you could add.

## Generate an application

Run `nx g @nrwl/react:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `nx g @nrwl/react:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@front-end/mylib`.

## Development server

Run `nx serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `nx g @nrwl/react:component my-component --project=my-app` to generate a new component.

## Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.



## ☁ Nx Cloud

### Distributed Computation Caching & Distributed Task Execution

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-cloud-card.png"></p>

Nx Cloud pairs with Nx in order to enable you to build and test code more rapidly, by up to 10 times. Even teams that are new to Nx can connect to Nx Cloud and start saving time instantly.

Teams using Nx gain the advantage of building full-stack applications with their preferred framework alongside Nx’s advanced code generation and project dependency graph, plus a unified experience for both frontend and backend developers.

Visit [Nx Cloud](https://nx.app/) to learn more.

