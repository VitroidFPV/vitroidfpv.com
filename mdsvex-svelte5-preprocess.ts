import type { PreprocessorGroup } from "svelte/compiler"

// mdsvex 0.12.7 still emits <script context="module"> for frontmatter metadata.
// KaTeX annotations also contain TeX braces, which Svelte reads as expressions.
export function mdsvexSvelte5Preprocess(): PreprocessorGroup {
	return {
		markup: ({ content, filename }) => {
			if (!filename?.endsWith(".md") && !filename?.endsWith(".svx")) {
				return
			}

			return {
				code: content
					.replace(/<script context="module">/g, "<script module>")
					.replace(
						/(<annotation\b[^>]*>)([\s\S]*?)(<\/annotation>)/g,
						(_, open, tex, close) =>
							`${open}${tex.replaceAll("{", "&#123;").replaceAll("}", "&#125;")}${close}`
					)
			}
		}
	}
}
