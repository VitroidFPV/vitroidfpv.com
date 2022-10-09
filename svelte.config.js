import adapter from "@sveltejs/adapter-netlify";
import { mdsvex } from "mdsvex";
import mdsvexConfig from "./mdsvex.config.js";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			// default options are shown
			edge: true,
		}),
		prerender: {
			crawl: true,
			enabled: true,
			entries: ['*'],
			onError: "continue",
		},
	},
	extensions: [".svelte", ...mdsvexConfig.extensions],
	preprocess: [mdsvex(mdsvexConfig)]
};

export default config;
