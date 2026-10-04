import { mdsvex } from "mdsvex"
import { mdsvexSvelte5Preprocess } from "./mdsvex-svelte5-preprocess"
import rehypeKatex from "rehype-katex"
import remarkMath from "remark-math"
import tailwindcss from "@tailwindcss/vite"
import adapter from "@sveltejs/adapter-auto"
import { enhancedImages } from "@sveltejs/enhanced-img"
import { sveltekit } from "@sveltejs/kit/vite"
import { defineConfig } from "vite"

export default defineConfig({
	ssr: {
		noExternal: ["@skeletonlabs/skeleton-svelte"]
	},
	plugins: [
		enhancedImages(),
		tailwindcss(),
		sveltekit({
			alias: {
				$components: "src/components",
				$content: "src/content"
			},
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }: { filename: string }) =>
					filename.split(/[/\\]/).includes("node_modules") ? undefined : true
			},

			// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
			// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
			// See https://svelte.dev/docs/kit/adapters for more information about adapters.
			adapter: adapter(),
			preprocess: [
				mdsvex({
					extensions: [".svx", ".md"],
					remarkPlugins: [remarkMath],
					rehypePlugins: [rehypeKatex]
				}),
				mdsvexSvelte5Preprocess()
			],
			extensions: [".svelte", ".svx", ".md"]
		})
	],
	server: {
		port: 3000
	}
})
