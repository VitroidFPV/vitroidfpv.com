# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project
npx sv create my-app
```

To recreate this project with the same configuration:

```sh
# recreate this project
bun x sv@0.16.1 create --template minimal --types ts --add prettier eslint tailwindcss="plugins:typography" sveltekit-adapter="adapter:auto" mdsvex mcp="ide:cursor+setup:local" --install bun ./
```

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
