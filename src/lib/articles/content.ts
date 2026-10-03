import type { Picture } from "@sveltejs/enhanced-img"
import {
	readMetadataRecord,
	readOptionalBoolean,
	readOptionalString,
	readRequiredString,
	type CompiledSvxModule
} from "$lib/content/metadata"
import { svxToPlainText } from "$lib/search/svx"
import type { Component } from "svelte"

export type Article = {
	slug: string
	title: string
	description: string
	author?: string
	readingMinutes: number
	image?: Picture
	date?: string
	updated?: string
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

const articleSources = import.meta.glob<string>(
	"../../content/articles/**/*.svx",
	{ eager: true, query: "?raw", import: "default" }
)

const articleImages = import.meta.glob<Picture>(
	"../../content/articles/images/*.{avif,gif,jpeg,jpg,png,webp}",
	{
		eager: true,
		query: { enhanced: true, imgSizes: "100vw" },
		import: "default"
	}
)

const articles = new Map<string, Article>()

for (const [source, module] of Object.entries(articleModules)) {
	const slug = getArticleSlug(source)
	if (articles.has(slug)) {
		throw new Error(`Duplicate article identifier "${slug}" in "${source}"`)
	}

	const metadata = readMetadataRecord(module.metadata, source)
	const rawSource = articleSources[source]
	if (typeof rawSource !== "string") {
		throw new Error(`Could not read article content from "${source}"`)
	}
	const wordCount = svxToPlainText(rawSource)
		.split(/\s+/)
		.filter(Boolean).length
	const imageFilename = readOptionalString(metadata, "image", source)
	const image = imageFilename
		? articleImages[`../../content/articles/images/${imageFilename}`]
		: undefined
	if (imageFilename && !image) {
		throw new Error(
			`Invalid metadata in "${source}": referenced image "${imageFilename}" was not found`
		)
	}
	articles.set(slug, {
		slug,
		title: readRequiredString(metadata, "title", source),
		description: readRequiredString(metadata, "description", source),
		author: readOptionalString(metadata, "author", source),
		readingMinutes: Math.max(1, Math.ceil(wordCount / 200)),
		image,
		date: readOptionalString(metadata, "date", source),
		updated: readOptionalString(metadata, "updated", source),
		visible: readOptionalBoolean(metadata, "visible", source) ?? true,
		accessible: readOptionalBoolean(metadata, "accessible", source) ?? true,
		Content: module.default
	})
}

export function getArticle(slug: string): Article | undefined {
	return articles.get(slug)
}
