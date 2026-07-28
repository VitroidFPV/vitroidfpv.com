import { FAQ_QUESTION_QUERY_PARAM } from "../faq/links"
import type { SearchDocument } from "./types"

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

export function buildCatalogSearchDocumentId(slug: string): string {
	return `build:catalog:${slug}`
}

export function buildGuideSearchDocumentId(guideSlug: string): string {
	return `build:guide:${guideSlug}`
}

export function buildGuideSectionSearchDocumentId(
	guideSlug: string,
	sectionSlug: string
): string {
	return `build:section:${guideSlug}:${sectionSlug}`
}

export function buildGuidePartSearchDocumentId(
	guideSlug: string,
	sectionSlug: string,
	partSlug: string
): string {
	return `build:part:${guideSlug}:${sectionSlug}:${partSlug}`
}

export function buildCatalogSearchUrl(slug: string): string {
	return `/builds#${encodeURIComponent(slug)}`
}

export function buildGuideSectionSearchUrl(
	guideSlug: string,
	sectionSlug: string
): string {
	return `/builds/${encodeURIComponent(guideSlug)}#${encodeURIComponent(sectionSlug)}`
}

export function buildGuidePartSearchUrl(
	guideSlug: string,
	partId: string
): string {
	return `/builds/${encodeURIComponent(guideSlug)}#${encodeURIComponent(partId)}`
}
