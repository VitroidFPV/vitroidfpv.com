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

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Adding a build guide

Build-guide pages share the page shell, shopping list, and development editor in
`src/components/BuildGuide/BuildGuidePage.svelte`.

1. Add the build card and page metadata to `src/content/builds/<build>.svx`.
   Include `url`, `description`, and `seoDescription` when the guide is ready to
   publish.
2. Add sections under
   `src/content/builds/<guide-slug>/<section-slug>/metadata.svx` and parts beside
   each section's metadata file. Put product images in
   `src/content/builds/<guide-slug>/images`.
3. Add the route with only the shared page component:

```svelte
<script lang="ts">
	import BuildGuidePage from "$components/BuildGuide/BuildGuidePage.svelte"
</script>

<BuildGuidePage buildSlug="<guide-slug>" />
```

The guide slug must match the URL segment in the build metadata and the guide's
content directory. During development, append `?public` to preview the page
without editing controls.
