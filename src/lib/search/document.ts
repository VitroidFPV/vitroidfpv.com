import { FAQ_QUESTION_QUERY_PARAM } from "../faq/links"
import type { SearchCollection, SearchDocument } from "./types"

function normalizeText(value: string | undefined): string {
	return value?.replace(/\s+/g, " ").trim() ?? ""
}

export function createSearchDocument(document: SearchDocument): SearchDocument {
	const normalized = {
		...document,
		id: normalizeText(document.id),
		title: normalizeText(document.title),
		body: normalizeText(document.body),
		description: normalizeText(document.description),
		keywords: normalizeText(document.keywords),
		section: normalizeText(document.section) || undefined,
		url: normalizeText(document.url)
	}

	if (!normalized.id) throw new Error("Search documents require a stable ID")
	if (!normalized.title) throw new Error("Search documents require a title")
	if (!normalized.url.startsWith("/")) {
		throw new Error(
			`Search document "${normalized.id}" requires a site-relative URL`
		)
	}

	return normalized
}

export function pageSearchDocumentId(slug: string): string {
	return `page:${slug}`
}

export function faqSearchDocumentId(
	sectionSlug: string,
	questionSlug: string
): string {
	return `faq:${sectionSlug}:${questionSlug}`
}

export function faqQuestionSearchUrl(questionId: string): string {
	return `/faq?${FAQ_QUESTION_QUERY_PARAM}=${encodeURIComponent(questionId)}`
}

export function catalogSearchDocumentId(
	collection: SearchCollection,
	slug: string
): string {
	return `${collection}:catalog:${slug}`
}

export function catalogSearchUrl(basePath: string, slug: string): string {
	return `${basePath}#${encodeURIComponent(slug)}`
}

export function guideSearchDocumentId(
	collection: SearchCollection,
	guideSlug: string
): string {
	return `${collection}:guide:${guideSlug}`
}

export function guideSectionSearchDocumentId(
	collection: SearchCollection,
	guideSlug: string,
	sectionSlug: string
): string {
	return `${collection}:section:${guideSlug}:${sectionSlug}`
}

export function guidePartSearchDocumentId(
	collection: SearchCollection,
	guideSlug: string,
	sectionSlug: string,
	partSlug: string
): string {
	return `${collection}:part:${guideSlug}:${sectionSlug}:${partSlug}`
}

export function guideSearchUrl(basePath: string, guideSlug: string): string {
	return `${basePath}/${encodeURIComponent(guideSlug)}`
}

export function guideSectionSearchUrl(
	basePath: string,
	guideSlug: string,
	sectionSlug: string
): string {
	return `${basePath}/${encodeURIComponent(guideSlug)}#${encodeURIComponent(sectionSlug)}`
}

export function guidePartSearchUrl(
	basePath: string,
	guideSlug: string,
	partId: string
): string {
	return `${basePath}/${encodeURIComponent(guideSlug)}#${encodeURIComponent(partId)}`
}
