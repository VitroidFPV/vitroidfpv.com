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

export const buildCatalogEntries: BuildCatalogEntry[] = Object.entries(modules)
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

		return {
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
	})
	.sort((a, b) => a.order - b.order)
