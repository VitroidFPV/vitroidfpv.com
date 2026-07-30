import {
	readMetadataRecord,
	readOptionalBoolean,
	readOptionalString,
	readRequiredString,
	type CompiledSvxModule
} from "$lib/content/metadata"
import type { Component } from "svelte"

export type Article = {
	slug: string
	title: string
	description: string
	author?: string
	visible: boolean
	accessible: boolean
	Content: Component
}

function getArticleSlug(source: string): string {
	const match = source.match(/\/articles\/(.+)\.svx$/)
	if (!match) {
		throw new Error(`Could not read article identifier from "${source}"`)
	}

	return match[1].replaceAll("/", "-")
}

const articleModules = import.meta.glob<CompiledSvxModule>(
	"../../content/articles/**/*.svx",
	{ eager: true }
)

const articles = new Map<string, Article>()

for (const [source, module] of Object.entries(articleModules)) {
	const slug = getArticleSlug(source)
	if (articles.has(slug)) {
		throw new Error(`Duplicate article identifier "${slug}" in "${source}"`)
	}

	const metadata = readMetadataRecord(module.metadata, source)
	articles.set(slug, {
		slug,
		title: readRequiredString(metadata, "title", source),
		description: readRequiredString(metadata, "description", source),
		author: readOptionalString(metadata, "author", source),
		visible: readOptionalBoolean(metadata, "visible", source) ?? true,
		accessible: readOptionalBoolean(metadata, "accessible", source) ?? true,
		Content: module.default
	})
}

export function getArticle(slug: string): Article | undefined {
	return articles.get(slug)
}
