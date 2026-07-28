export const searchCollections = [
	"page",
	"faq",
	"build",
	"equipment",
	"blog"
] as const

export type SearchCollection = (typeof searchCollections)[number]

export const searchCollectionLabels: Record<SearchCollection, string> = {
	page: "Page",
	faq: "FAQ",
	build: "Build",
	equipment: "Gear",
	blog: "Article"
}

export type SearchDocument = {
	id: string
	title: string
	body: string
	description: string
	keywords: string
	section?: string
	url: string
	collection: SearchCollection
}

export type SearchHit = SearchDocument & {
	score: number
	terms: string[]
}
