import type { Picture } from "@sveltejs/enhanced-img"
import {
	readMetadataRecord,
	readOptionalArray,
	readOptionalString,
	readRequiredNumber,
	readRequiredString,
	type CompiledSvxModule
} from "$lib/content/metadata"
import { parseBuildGuidePartTag } from "./tags"
import { resolveBuildGuideAccent, resolveBuildGuidePartAccent } from "./theme"
import type { BuildGuide, BuildGuidePart, BuildGuideSection } from "./types"
import { getBuildGuidePartId } from "./types"
import {
	buildGuidePartSearchDocumentId,
	buildGuidePartSearchUrl,
	buildGuideSearchDocumentId,
	buildGuideSectionSearchDocumentId,
	buildGuideSectionSearchUrl,
	createSearchDocument
} from "$lib/search/document"
import { svxToPlainText } from "$lib/search/svx"
import type { SearchDocument } from "$lib/search/types"

function pathMatch(source: string, pattern: RegExp, label: string): string {
	const match = source.match(pattern)
	if (!match)
		throw new Error(`Could not read ${label} identifier from "${source}"`)
	return match[1]
}

function getGuideSlug(source: string) {
	return pathMatch(source, /\/guides\/([^/]+)\//, "build guide")
}

function getSectionSlug(source: string) {
	return pathMatch(source, /\/sections\/([^/]+)\//, "build guide section")
}

function getPartSlug(source: string) {
	return pathMatch(source, /\/([^/]+)\.svx$/, "build guide part")
}

const guideModules = import.meta.glob<CompiledSvxModule>(
	"../../content/builds/guides/*/guide.svx",
	{ eager: true }
)
const sectionModules = import.meta.glob<CompiledSvxModule>(
	"../../content/builds/guides/*/sections/*/_section.svx",
	{ eager: true }
)
const partModules = import.meta.glob<CompiledSvxModule>(
	[
		"../../content/builds/guides/*/sections/*/*.svx",
		"!../../content/builds/guides/*/sections/*/_section.svx"
	],
	{ eager: true }
)
const guideSources = import.meta.glob<string>(
	"../../content/builds/guides/*/guide.svx",
	{ eager: true, query: "?raw", import: "default" }
)
const sectionSources = import.meta.glob<string>(
	"../../content/builds/guides/*/sections/*/_section.svx",
	{ eager: true, query: "?raw", import: "default" }
)
const partSources = import.meta.glob<string>(
	[
		"../../content/builds/guides/*/sections/*/*.svx",
		"!../../content/builds/guides/*/sections/*/_section.svx"
	],
	{ eager: true, query: "?raw", import: "default" }
)
const imageModules = import.meta.glob<Picture>(
	"../../content/builds/guides/*/images/*.{avif,AVIF,gif,GIF,heif,HEIF,jpeg,JPEG,jpg,JPG,png,PNG,tiff,TIFF,webp,WEBP}",
	{
		eager: true,
		query: { enhanced: true, imgSizes: "100vw" },
		import: "default"
	}
)

const guides = new Map<string, BuildGuide>()
const sectionsByGuide = new Map<string, Map<string, BuildGuideSection>>()
const searchDocuments: SearchDocument[] = []

for (const [source, module] of Object.entries(guideModules)) {
	const slug = getGuideSlug(source)
	if (guides.has(slug)) {
		throw new Error(`Duplicate build guide identifier "${slug}" in "${source}"`)
	}
	const metadata = readMetadataRecord(module.metadata, source)
	const guide: BuildGuide = {
		slug,
		title: readRequiredString(metadata, "title", source),
		subtitle: readRequiredString(metadata, "subtitle", source),
		accent: resolveBuildGuideAccent(
			readOptionalString(metadata, "color", source),
			source
		),
		seoDescription: readOptionalString(metadata, "seoDescription", source),
		seoImage: readOptionalString(metadata, "seoImage", source),
		Intro: module.default,
		sections: []
	}
	guides.set(slug, guide)

	const rawSource = guideSources[source]
	if (typeof rawSource !== "string") {
		throw new Error(`Could not read build guide content from "${source}"`)
	}
	searchDocuments.push(
		createSearchDocument({
			id: buildGuideSearchDocumentId(slug),
			title: guide.title,
			description: guide.seoDescription ?? guide.subtitle,
			body: svxToPlainText(rawSource),
			keywords: `${guide.subtitle} ${slug.replaceAll("-", " ")}`,
			section: "Builds",
			url: `/builds/${encodeURIComponent(slug)}`,
			collection: "build"
		})
	)
}

for (const [source, module] of Object.entries(sectionModules)) {
	const guideSlug = getGuideSlug(source)
	const guide = guides.get(guideSlug)
	if (!guide) {
		throw new Error(
			`Orphan build guide section "${source}" has no guide metadata`
		)
	}
	const sectionSlug = getSectionSlug(source)
	let sections = sectionsByGuide.get(guideSlug)
	if (!sections) {
		sections = new Map()
		sectionsByGuide.set(guideSlug, sections)
	}
	if (sections.has(sectionSlug)) {
		throw new Error(
			`Duplicate build guide section identifier "${sectionSlug}" in "${source}"`
		)
	}
	const metadata = readMetadataRecord(module.metadata, source)
	const section: BuildGuideSection = {
		id: sectionSlug,
		guideSlug,
		title: readRequiredString(metadata, "title", source),
		order: readRequiredNumber(metadata, "order", source),
		Content: module.default,
		parts: []
	}
	sections.set(sectionSlug, section)

	const rawSource = sectionSources[source]
	if (typeof rawSource !== "string") {
		throw new Error(`Could not read build guide section from "${source}"`)
	}
	const sectionBody = svxToPlainText(rawSource)
	searchDocuments.push(
		createSearchDocument({
			id: buildGuideSectionSearchDocumentId(guideSlug, sectionSlug),
			title: section.title,
			description: sectionBody,
			body: sectionBody,
			keywords: `${guide.title} ${sectionSlug.replaceAll("-", " ")}`,
			section: guide.title,
			url: buildGuideSectionSearchUrl(guideSlug, sectionSlug),
			collection: "build"
		})
	)
}

const partIds = new Set<string>()

for (const [source, module] of Object.entries(partModules)) {
	const guideSlug = getGuideSlug(source)
	const sectionSlug = getSectionSlug(source)
	const section = sectionsByGuide.get(guideSlug)?.get(sectionSlug)
	if (!section) {
		throw new Error(
			`Orphan build guide part "${source}" references missing section "${sectionSlug}"`
		)
	}
	const slug = getPartSlug(source)
	const id = getBuildGuidePartId(guideSlug, sectionSlug, slug)
	if (partIds.has(id)) {
		throw new Error(
			`Duplicate build guide part identifier "${id}" in "${source}"`
		)
	}
	partIds.add(id)

	const metadata = readMetadataRecord(module.metadata, source)
	const imageFilename = readOptionalString(metadata, "image", source)
	const imagePath = imageFilename
		? `../../content/builds/guides/${guideSlug}/images/${imageFilename}`
		: undefined
	const image = imagePath ? imageModules[imagePath] : undefined
	if (imageFilename && !image) {
		throw new Error(
			`Invalid metadata in "${source}": referenced image "${imageFilename}" was not found`
		)
	}

	const title = readRequiredString(metadata, "title", source)
	const part: BuildGuidePart = {
		id,
		slug,
		guideSlug,
		sectionSlug,
		title,
		url: readRequiredString(metadata, "url", source),
		order: readRequiredNumber(metadata, "order", source),
		accent: resolveBuildGuidePartAccent(
			readRequiredString(metadata, "color", source),
			source
		),
		price: readOptionalString(metadata, "price", source),
		tags: (readOptionalArray(metadata, "tags", source) ?? []).map(
			(tag, index) => {
				if (typeof tag !== "string" && typeof tag !== "number") {
					throw new Error(
						`Invalid metadata in "${source}": field "tags[${index}]" must be a string or number`
					)
				}
				return parseBuildGuidePartTag(tag, source)
			}
		),
		image: image ?? null,
		imageFilename,
		imageAlt: readOptionalString(metadata, "imageAlt", source) ?? title,
		Content: module.default
	}
	section.parts.push(part)

	const rawSource = partSources[source]
	if (typeof rawSource !== "string") {
		throw new Error(`Could not read build guide part from "${source}"`)
	}
	const partBody = svxToPlainText(rawSource)
	searchDocuments.push(
		createSearchDocument({
			id: buildGuidePartSearchDocumentId(guideSlug, sectionSlug, slug),
			title: part.title,
			description: partBody,
			body: partBody,
			keywords: [
				guides.get(guideSlug)?.title,
				section.title,
				part.price,
				...part.tags.flatMap((tag) => [tag.label, tag.tooltip])
			]
				.filter(Boolean)
				.join(" "),
			section: `${guides.get(guideSlug)?.title ?? guideSlug} · ${section.title}`,
			url: buildGuidePartSearchUrl(guideSlug, part.id),
			collection: "build"
		})
	)
}

for (const [guideSlug, guide] of guides) {
	const sections = Array.from(sectionsByGuide.get(guideSlug)?.values() ?? [])
		.map((section) => ({
			...section,
			parts: [...section.parts].sort((a, b) => a.order - b.order)
		}))
		.sort((a, b) => a.order - b.order)
	guide.sections = sections
}

export function getBuildGuide(guideSlug: string): BuildGuide {
	const guide = guides.get(guideSlug)
	if (!guide) throw new Error(`No build guide found for "${guideSlug}"`)
	return guide
}

export const buildGuideSearchDocuments = searchDocuments
