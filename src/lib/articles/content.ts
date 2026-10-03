import type { Picture } from "@sveltejs/enhanced-img"
import {
	readMetadataRecord,
	readOptionalBoolean,
	readOptionalString,
	readRequiredString,
	type CompiledSvxModule
} from "$lib/content/metadata"
import { svxToPlainText } from "$lib/search/svx"
import { createSearchDocument } from "$lib/search/document"
import type { SearchDocument } from "$lib/search/types"
import type { Component } from "svelte"

export type Article = {
	slug: string
	category: string
	title: string
	description: string
	author?: string
	readingMinutes: number
	image?: Picture
	imagePlaceholder?: string
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

function getArticleCategory(slug: string): string {
	const section = slug.split("-")[0]
	const singularCategories: Record<string, string> = {
		guides: "Guide",
		reviews: "Review"
	}
	return (
		singularCategories[section] ??
		section.replace(/^./, (letter) => letter.toUpperCase())
	)
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

const articleImagePlaceholders = import.meta.glob<string>(
	"../../content/articles/images/*.{avif,gif,jpeg,jpg,png,webp}",
	{
		eager: true,
		query: { w: "24", format: "webp", inline: true },
		import: "default"
	}
)

const articles = new Map<string, Article>()
export const articleSearchDocuments: SearchDocument[] = []

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
	const body = svxToPlainText(rawSource)
	const wordCount = body.split(/\s+/).filter(Boolean).length
	const imageFilename = readOptionalString(metadata, "image", source)
	const imagePath = imageFilename
		? `../../content/articles/images/${imageFilename}`
		: undefined
	const image = imagePath ? articleImages[imagePath] : undefined
	const imagePlaceholder = imagePath
		? articleImagePlaceholders[imagePath]
		: undefined
	if (imageFilename && !image) {
		throw new Error(
			`Invalid metadata in "${source}": referenced image "${imageFilename}" was not found`
		)
	}
	if (imageFilename && !imagePlaceholder) {
		throw new Error(
			`Could not create article image placeholder for "${source}"`
		)
	}
	const article: Article = {
		slug,
		category: getArticleCategory(slug),
		title: readRequiredString(metadata, "title", source),
		description: readRequiredString(metadata, "description", source),
		author: readOptionalString(metadata, "author", source),
		readingMinutes: Math.max(1, Math.ceil(wordCount / 200)),
		image,
		imagePlaceholder,
		date: readOptionalString(metadata, "date", source),
		updated: readOptionalString(metadata, "updated", source),
		visible: readOptionalBoolean(metadata, "visible", source) ?? true,
		accessible: readOptionalBoolean(metadata, "accessible", source) ?? true,
		Content: module.default
	}
	articles.set(slug, article)

	if (article.visible && article.accessible) {
		articleSearchDocuments.push(
			createSearchDocument({
				id: `blog:${slug}`,
				title: article.title,
				description: article.description,
				body,
				keywords: `${article.category} ${slug.replaceAll("-", " ")}`,
				section: article.category,
				url: `/articles/${encodeURIComponent(slug)}`,
				collection: "blog"
			})
		)
	}
}

export function getArticle(slug: string): Article | undefined {
	return articles.get(slug)
}

export function getVisibleArticles(): Article[] {
	return [...articles.values()]
		.filter((article) => article.visible && article.accessible)
		.sort((a, b) =>
			(b.updated ?? b.date ?? "").localeCompare(a.updated ?? a.date ?? "")
		)
}
