import type { PreprocessorGroup } from "svelte/compiler"

// mdsvex 0.12.7 still emits <script context="module"> for frontmatter metadata.
// Svelte 5 expects <script module> instead.
export function mdsvexSvelte5ModuleScript(): PreprocessorGroup {
	return {
		markup: ({ content, filename }) => {
			if (!filename?.endsWith(".md") && !filename?.endsWith(".svx")) {
				return
			}

			return {
				code: content.replace(/<script context="module">/g, "<script module>")
			}
		}
	}
}
