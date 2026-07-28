import { parsePageMetadata, type CompiledSvxModule } from "./metadata"
import { createSearchDocument, pageSearchDocumentId } from "../search/document"
import { svxToPlainText } from "../search/svx"
import type { SearchCollection, SearchDocument } from "../search/types"

function getPageSlug(source: string): string {
	const match = source.match(/\/([^/]+)\.svx$/)
	if (!match) throw new Error(`Could not read page identifier from "${source}"`)
	return match[1]
}

const pageModules = import.meta.glob<CompiledSvxModule>(
	"../../content/pages/*.svx",
	{ eager: true }
)

const pageSources = import.meta.glob<string>("../../content/pages/*.svx", {
	eager: true,
	query: "?raw",
	import: "default"
})

export const pageSearchDocuments: SearchDocument[] = Object.entries(
	pageModules
).map(([source, module]) => {
	const slug = getPageSlug(source)
	const metadata = parsePageMetadata(module.metadata, source)
	const rawSource = pageSources[source]
	if (typeof rawSource !== "string") {
		throw new Error(`Could not read page content from "${source}"`)
	}

	const collection: SearchCollection =
		slug === "equipment" ? "equipment" : "page"

	return createSearchDocument({
		id: pageSearchDocumentId(slug),
		title: metadata.title,
		description: metadata.seoDescription ?? metadata.description,
		body: svxToPlainText(rawSource),
		keywords: `${slug.replaceAll("-", " ")} ${metadata.description}`,
		url: `/${slug}`,
		collection
	})
})
