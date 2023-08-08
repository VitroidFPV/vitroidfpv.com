// import admonitions from "remark-admonitions";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

const config = {
	extensions: [".svelte.md", ".md", ".svx"],

	smartypants: {
		dashes: "oldschool"
	},
	remarkPlugins: [remarkGfm],
	rehypePlugins: [rehypeSlug],
	layout: {
		_: "/src/components/articlesPage/ArticleLayout.svelte"
	}
};

export default config;
