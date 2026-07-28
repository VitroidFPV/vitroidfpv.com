import MiniSearch, {
	type Options as MiniSearchOptions,
	type SearchOptions as MiniSearchSearchOptions
} from "minisearch"
import type { SearchCollection, SearchDocument, SearchHit } from "./types"

export const searchFields = [
	"title",
	"keywords",
	"section",
	"description",
	"body"
] as const

export const searchFieldBoosts = {
	title: 5,
	keywords: 3.5,
	section: 2.5,
	description: 2,
	body: 1
} as const

const storeFields = [
	"title",
	"body",
	"description",
	"keywords",
	"section",
	"url",
	"collection"
]

export const miniSearchOptions: MiniSearchOptions<SearchDocument> = {
	fields: [...searchFields],
	storeFields,
	searchOptions: {
		boost: searchFieldBoosts,
		prefix: true,
		fuzzy: (term) => (term.length >= 5 ? 0.2 : false),
		maxFuzzy: 2,
		weights: { fuzzy: 0.35, prefix: 0.7 }
	}
}

export type SiteSearchIndex = MiniSearch<SearchDocument>

export type SiteSearchOptions = {
	collections?: readonly SearchCollection[]
	limit?: number
}

export function createSearchIndex(
	documents: readonly SearchDocument[]
): SiteSearchIndex {
	const index = new MiniSearch<SearchDocument>(miniSearchOptions)
	const seenIds = new Set<string>()

	for (const document of documents) {
		if (seenIds.has(document.id)) continue
		seenIds.add(document.id)

		try {
			index.add(document)
		} catch {
			// Skip malformed or conflicting documents instead of failing search.
		}
	}

	return index
}

function isSearchCollection(value: unknown): value is SearchCollection {
	return (
		value === "page" ||
		value === "faq" ||
		value === "build" ||
		value === "equipment" ||
		value === "blog"
	)
}

export function searchIndex(
	index: SiteSearchIndex,
	query: string,
	options: SiteSearchOptions = {}
): SearchHit[] {
	const normalizedQuery = query.trim()
	if (!normalizedQuery) return []

	const collections = options.collections
	const searchOptions: MiniSearchSearchOptions = collections?.length
		? {
				filter: (result) =>
					isSearchCollection(result.collection) &&
					collections.includes(result.collection)
			}
		: {}

	const seenUrls = new Set<string>()
	const results = index
		.search(normalizedQuery, searchOptions)
		.flatMap<SearchHit>((result) => {
			if (
				typeof result.title !== "string" ||
				typeof result.body !== "string" ||
				typeof result.description !== "string" ||
				typeof result.keywords !== "string" ||
				typeof result.url !== "string" ||
				!isSearchCollection(result.collection)
			) {
				return []
			}

			if (seenUrls.has(result.url)) return []
			seenUrls.add(result.url)

			return [
				{
					id: String(result.id),
					title: result.title,
					body: result.body,
					description: result.description,
					keywords: result.keywords,
					section:
						typeof result.section === "string" ? result.section : undefined,
					url: result.url,
					collection: result.collection,
					score: result.score,
					terms: result.terms
				}
			]
		})

	return options.limit === undefined ? results : results.slice(0, options.limit)
}
