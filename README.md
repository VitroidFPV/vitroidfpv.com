# Vitroid FPV

Your quick source of all FPV info, in a convenient place.

This site is a constantly evolving project of mine, started around June 2021 as a small thing for me to learn a bit of HTML, a year later completely rewritten in Svelte and Tailwind, to make it modular, and allow others to contribute easily, and then rewritten again with 5 more years of experience.

If you want to request content, please make a [Content Suggestion issue](https://github.com/VitroidFPV/VitroidFPV/issues/new/choose), or make a [direct content request](https://ko-fi.com/vitroid/commissions).

## What can you find here?

Right now, there are four main pages available:

- ❓ [FAQ](https://next.vitroidfpv.com/faq) - Quick answers to frequently asked questions in the world of FPV
- 🔧 [Builds](https://next.vitroidfpv.com/builds) - All different kinds of (not only) quadcopters, from beginner to advanced
- 🛠️ [Equipment](https://next.vitroidfpv.com/equipment) - All the things you will need to get flying - Batteries and chargers, video and radio equipment, and tools to put it all together
- 📰 [Articles](https://next.vitroidfpv.com/articles) - Reviews, FPV news, guides/tutorials, and more in something that's definitely not a blog

## Developing

Install dependencies and start the development server with Bun:

```sh
bun install
bun run dev

# or start the server and open the app in a new browser tab
bun run dev -- --open
```

## Building

To create a production version of your app:

```sh
bun run build
```

You can preview the production build with `bun run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Developer documentation

- [Content authoring](docs/content-authoring.md): add pages, home sections, FAQ
  entries, build cards, complete guides, parts, and images.
- [Content architecture](docs/content-architecture.md): understand loader
  ownership, validation, identifiers, and the editor/server boundary.
