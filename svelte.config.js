import adapter from "@sveltejs/adapter-netlify";
import { mdsvex } from "mdsvex";
import mdsvexConfig from "./mdsvex.config.js";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import("@sveltejs/kit").Config} */
const config = {
	kit: {
		adapter: adapter(),
		prerender: {
			crawl: true,
			entries: ["*"],
			handleMissingId: "warn"
		},
		alias: {
			$components: "./src/components",
			$lib: "./src/lib",
			$routes: "./src/routes",
		},
	},
	extensions: [".svelte", ...(mdsvexConfig.extensions || [])],
	preprocess: [
		vitePreprocess(),
		{
			markup: ({ content, filename = '' }) => {
				return mdsvex(mdsvexConfig).markup({ content, filename });
			}
		}
	],
};

export default config;
