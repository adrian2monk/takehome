# Pixel Takehome

As players interact with different games and metaverses, they leave a history of events that define who they are. Every single action might not say much, but the collection of them represents an entity's identity and reputation.

For this take-home, we want you to build a little piece of the platform that will help participants show who they are. We want you to build a web app that takes a Ronin address as input and  shows the set of relevant transactions for that account in the Axie ecosystem, as well as any aggregates that you deem informative. Here are some examples that are not meant to be exhaustive but just give you an idea: claimed SLP on a given period, the scholar's Axies, type of account.

For instance, this the address corresponding to a scholar: `ronin:4d51e82c92c5e89176f006d8425330aa5ff3a4c4`. Among others, it has several Claim SLP actions, only some of which will have a relevant amount (most of them are 0). Here's the address of an account that is likely an investor/breeder (can we infer that in an automated fashion?): `ronin:2b9fd5ebc7a6ce8539e2aec96774544b8d559732`.

Here's the link to the Ronin explorer: https://explorer.roninchain.com. Note that there is no documentation for the endpoints of this API. Go ahead and dig into the network console to find the relevant ones for this assigment. If you are stuck and cannot figure them out, please ping us so we can provide you with them.

Deliverable:
 - Please fork this repo and push your solution.
 - Runnable code + appropriate testing + documentation.

Evaluation Criteria:

We should be able to execute your solution without much hassle, and the app should be intuitive to use. We will evaluate your code based on clarity, performance, and maintainability. Make sure to include relevant tests and documentation. 

Let us know if you have any questions. Happy coding! 

# Create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm init svelte@next

# create a new project in my-app
npm init svelte@next my-app
```

> Note: the `@next` is temporary

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
