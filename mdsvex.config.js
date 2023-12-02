// import admonitions from "remark-admonitions";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex-svelte";
import { defineMDSveXConfig as defineConfig } from 'mdsvex';

const config = defineConfig({
	extensions: [".svelte.md", ".md", ".svx"],

	smartypants: {
		dashes: "oldschool"
	},
	remarkPlugins: [remarkGfm, remarkMath],
	rehypePlugins: [rehypeSlug, rehypeKatex],
	layout: {
		_: "/src/components/articlesPage/ArticleLayout.svelte"
	}
});

export default config;
