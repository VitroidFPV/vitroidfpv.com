import {
	readMetadataRecord,
	readOptionalBoolean,
	readOptionalString,
	readRequiredArray,
	readRequiredNumber,
	readRequiredString,
	type CompiledSvxModule
} from "$lib/content/metadata"
import { resolveBuildCatalogIcon } from "$lib/build-catalog/icons"
import { resolveBuildCatalogModel } from "$lib/build-catalog/models"
import { resolveBuildCatalogAccent } from "$lib/build-catalog/theme"
import type {
	BuildCatalogEntry,
	BuildCatalogSpec
} from "$lib/build-catalog/types"
import {
	catalogSearchDocumentId,
	catalogSearchUrl,
	createSearchDocument
} from "$lib/search/document"
import { svxToPlainText } from "$lib/search/svx"
import type { SearchCollection, SearchDocument } from "$lib/search/types"

export const catalogRoots = ["builds", "equipment"] as const

export type CatalogRoot = (typeof catalogRoots)[number]

const catalogRootConfigs: Record<
	CatalogRoot,
	{
		collection: SearchCollection
		searchSection: string
		basePath: string
		label: string
		defaultModelId?: string
	}
> = {
	builds: {
		collection: "build",
		searchSection: "Builds",
		basePath: "/builds",
		label: "build catalog",
		defaultModelId: "s1v5"
	},
	equipment: {
		collection: "equipment",
		searchSection: "Gear",
		basePath: "/equipment",
		label: "equipment catalog"
	}
}

function getCatalogRoot(source: string): CatalogRoot {
	const match = source.match(/\/content\/([^/]+)\/catalog\//)
	if (!match || !catalogRoots.includes(match[1] as CatalogRoot)) {
		throw new Error(`Could not read catalog root from "${source}"`)
	}
	return match[1] as CatalogRoot
}

function getSlug(source: string, label: string): string {
	const match = source.match(/\/([^/]+)\.svx$/)
	if (!match)
		throw new Error(`Could not read ${label} identifier from "${source}"`)
	return match[1]
}

const modules = import.meta.glob<CompiledSvxModule>(
	[
		"../../content/builds/catalog/*.svx",
		"../../content/equipment/catalog/*.svx"
	],
	{ eager: true }
)

const sources = import.meta.glob<string>(
	[
		"../../content/builds/catalog/*.svx",
		"../../content/equipment/catalog/*.svx"
	],
	{
		eager: true,
		query: "?raw",
		import: "default"
	}
)

const records = Object.entries(modules)
	.map(([source, module]) => {
		const root = getCatalogRoot(source)
		const rootConfig = catalogRootConfigs[root]
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
			slug: getSlug(source, rootConfig.label),
			title: readRequiredString(metadata, "title", source),
			price: readRequiredString(metadata, "price", source),
			order: readRequiredNumber(metadata, "order", source),
			image: readOptionalString(metadata, "image", source),
			href: readOptionalString(metadata, "href", source),
			description: readOptionalString(metadata, "description", source),
			seoDescription: readOptionalString(metadata, "seoDescription", source),
			model: resolveBuildCatalogModel(
				readOptionalString(metadata, "model", source),
				rootConfig.defaultModelId !== undefined &&
					(readOptionalBoolean(metadata, "useModel", source) ?? false),
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
			throw new Error(`Could not read catalog content from "${source}"`)
		}

		const searchDocument = createSearchDocument({
			id: catalogSearchDocumentId(rootConfig.collection, entry.slug),
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
			section: rootConfig.searchSection,
			url: catalogSearchUrl(rootConfig.basePath, entry.slug),
			collection: rootConfig.collection
		})

		return { root, entry, searchDocument }
	})
	.sort((a, b) => a.entry.order - b.entry.order)

export function getCatalogEntries(root: CatalogRoot): BuildCatalogEntry[] {
	return records
		.filter(({ root: entryRoot }) => entryRoot === root)
		.map(({ entry }) => entry)
}

export const catalogSearchDocuments: SearchDocument[] = records.map(
	({ searchDocument }) => searchDocument
)
