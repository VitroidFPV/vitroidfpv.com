import { siteSearchDocuments } from "./documents"
import {
	createSearchIndex,
	searchIndex,
	type SiteSearchIndex,
	type SiteSearchOptions
} from "./engine"
import type { SearchHit } from "./types"

let index: SiteSearchIndex | undefined

export function prepareSiteSearch(): number {
	index ??= createSearchIndex(siteSearchDocuments)
	return siteSearchDocuments.length
}

export function searchSite(
	query: string,
	options: SiteSearchOptions = {}
): SearchHit[] {
	prepareSiteSearch()
	return searchIndex(index!, query, options)
}

export type { SiteSearchOptions } from "./engine"
export {
	searchCollectionLabels,
	searchCollections,
	type SearchCollection,
	type SearchHit
} from "./types"
