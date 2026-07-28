import {
	readMetadataRecord,
	readOptionalBoolean,
	readOptionalString,
	readRequiredArray,
	readRequiredNumber,
	readRequiredString,
	type CompiledSvxModule
} from "$lib/content/metadata"
import { resolveBuildCatalogIcon } from "./icons"
import { resolveBuildCatalogModel } from "./models"
import { resolveBuildCatalogAccent } from "./theme"
import type { BuildCatalogEntry, BuildCatalogSpec } from "./types"
import {
	buildCatalogSearchDocumentId,
	buildCatalogSearchUrl,
	createSearchDocument
} from "$lib/search/document"
import { svxToPlainText } from "$lib/search/svx"
import type { SearchDocument } from "$lib/search/types"

function getSlug(source: string): string {
	const match = source.match(/\/([^/]+)\.svx$/)
	if (!match)
		throw new Error(`Could not read build catalog identifier from "${source}"`)
	return match[1]
}

const modules = import.meta.glob<CompiledSvxModule>(
	"../../content/builds/catalog/*.svx",
	{ eager: true }
)

const sources = import.meta.glob<string>("../../content/builds/catalog/*.svx", {
	eager: true,
	query: "?raw",
	import: "default"
})

const records = Object.entries(modules)
	.map(([source, module]) => {
		const metadata = readMetadataRecord(module.metadata, source)
		const specs: BuildCatalogSpec[] = readRequiredArray(
			metadata,
			"specs",
			source
		).map((rawSpec, index) => {
			const specSource = `${source}#specs[${index}]`
			const spec = readMetadataRecord(rawSpec, specSource)
			return {
				title: readRequiredString(spec, "title", specSource),
				description: readRequiredString(spec, "description", specSource),
				icon: resolveBuildCatalogIcon(
					readOptionalString(spec, "icon", specSource),
					specSource
				)
			}
		})

		const entry: BuildCatalogEntry = {
			slug: getSlug(source),
			title: readRequiredString(metadata, "title", source),
			price: readRequiredString(metadata, "price", source),
			order: readRequiredNumber(metadata, "order", source),
			image: readOptionalString(metadata, "image", source),
			href: readOptionalString(metadata, "href", source),
			description: readOptionalString(metadata, "description", source),
			seoDescription: readOptionalString(metadata, "seoDescription", source),
			model: resolveBuildCatalogModel(
				readOptionalString(metadata, "model", source),
				readOptionalBoolean(metadata, "useModel", source) ?? false,
				source
			),
			accent: resolveBuildCatalogAccent(
				readOptionalString(metadata, "color", source),
				source
			),
			specs,
			Summary: module.default
		}

		const rawSource = sources[source]
		if (typeof rawSource !== "string") {
			throw new Error(`Could not read build catalog content from "${source}"`)
		}

		const searchDocument = createSearchDocument({
			id: buildCatalogSearchDocumentId(entry.slug),
			title: entry.title,
			description: entry.seoDescription ?? entry.description ?? "",
			body: svxToPlainText(rawSource),
			keywords: [
				entry.price,
				entry.description,
				...entry.specs.flatMap((spec) => [spec.title, spec.description])
			]
				.filter(Boolean)
				.join(" "),
			section: "Builds",
			url: buildCatalogSearchUrl(entry.slug),
			collection: "build"
		})

		return { entry, searchDocument }
	})
	.sort((a, b) => a.entry.order - b.entry.order)

export const buildCatalogEntries: BuildCatalogEntry[] = records.map(
	({ entry }) => entry
)

export const buildCatalogSearchDocuments: SearchDocument[] = records.map(
	({ searchDocument }) => searchDocument
)
