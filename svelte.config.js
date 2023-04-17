import adapter from "@sveltejs/adapter-netlify";
import { mdsvex } from "mdsvex";
import mdsvexConfig from "./mdsvex.config.js";
import { vitePreprocess } from "@sveltejs/kit/vite";

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
	extensions: [".svelte", ...mdsvexConfig.extensions],
	preprocess: [vitePreprocess(), mdsvex(mdsvexConfig)],
};

export default config;
