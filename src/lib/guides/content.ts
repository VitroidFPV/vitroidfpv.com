import type { Picture } from "@sveltejs/enhanced-img"
import {
	readMetadataRecord,
	readOptionalArray,
	readOptionalString,
	readRequiredNumber,
	readRequiredString,
	type CompiledSvxModule
} from "$lib/content/metadata"
import { parseBuildGuidePartTag } from "$lib/build-guides/tags"
import {
	resolveBuildGuideAccent,
	resolveBuildGuidePartAccent
} from "$lib/build-guides/theme"
import type {
	BuildGuide,
	BuildGuidePart,
	BuildGuideSection
} from "$lib/build-guides/types"
import { getBuildGuidePartId } from "$lib/build-guides/types"
import {
	createSearchDocument,
	guidePartSearchDocumentId,
	guidePartSearchUrl,
	guideSearchDocumentId,
	guideSearchUrl,
	guideSectionSearchDocumentId,
	guideSectionSearchUrl
} from "$lib/search/document"
import { svxToPlainText } from "$lib/search/svx"
import type { SearchCollection, SearchDocument } from "$lib/search/types"

export const guideRoots = ["builds", "equipment"] as const

export type GuideRoot = (typeof guideRoots)[number]

const guideRootConfigs: Record<
	GuideRoot,
	{
		collection: SearchCollection
		searchSection: string
		basePath: string
		label: string
	}
> = {
	builds: {
		collection: "build",
		searchSection: "Builds",
		basePath: "/builds",
		label: "build guide"
	},
	equipment: {
		collection: "equipment",
		searchSection: "Gear",
		basePath: "/equipment",
		label: "equipment guide"
	}
}

function pathMatch(source: string, pattern: RegExp, label: string): string {
	const match = source.match(pattern)
	if (!match)
		throw new Error(`Could not read ${label} identifier from "${source}"`)
	return match[1]
}

function getGuideRoot(source: string): GuideRoot {
	const match = source.match(/\/content\/([^/]+)\/guides\//)
	if (!match || !guideRoots.includes(match[1] as GuideRoot)) {
		throw new Error(`Could not read guide root from "${source}"`)
	}
	return match[1] as GuideRoot
}

function getGuideSlug(source: string) {
	return pathMatch(source, /\/guides\/([^/]+)\//, "guide")
}

function getSectionSlug(source: string) {
	return pathMatch(source, /\/sections\/([^/]+)\//, "guide section")
}

function getPartSlug(source: string) {
	return pathMatch(source, /\/([^/]+)\.svx$/, "guide part")
}

const guideModules = import.meta.glob<CompiledSvxModule>(
	[
		"../../content/builds/guides/*/guide.svx",
		"../../content/equipment/guides/*/guide.svx"
	],
	{ eager: true }
)
const sectionModules = import.meta.glob<CompiledSvxModule>(
	[
		"../../content/builds/guides/*/sections/*/_section.svx",
		"../../content/equipment/guides/*/sections/*/_section.svx"
	],
	{ eager: true }
)
const partModules = import.meta.glob<CompiledSvxModule>(
	[
		"../../content/builds/guides/*/sections/*/*.svx",
		"!../../content/builds/guides/*/sections/*/_section.svx",
		"../../content/equipment/guides/*/sections/*/*.svx",
		"!../../content/equipment/guides/*/sections/*/_section.svx"
	],
	{ eager: true }
)
const guideSources = import.meta.glob<string>(
	[
		"../../content/builds/guides/*/guide.svx",
		"../../content/equipment/guides/*/guide.svx"
	],
	{ eager: true, query: "?raw", import: "default" }
)
const sectionSources = import.meta.glob<string>(
	[
		"../../content/builds/guides/*/sections/*/_section.svx",
		"../../content/equipment/guides/*/sections/*/_section.svx"
	],
	{ eager: true, query: "?raw", import: "default" }
)
const partSources = import.meta.glob<string>(
	[
		"../../content/builds/guides/*/sections/*/*.svx",
		"!../../content/builds/guides/*/sections/*/_section.svx",
		"../../content/equipment/guides/*/sections/*/*.svx",
		"!../../content/equipment/guides/*/sections/*/_section.svx"
	],
	{ eager: true, query: "?raw", import: "default" }
)
const imageModules = import.meta.glob<Picture>(
	[
		"../../content/builds/guides/*/images/*.{avif,AVIF,gif,GIF,heif,HEIF,jpeg,JPEG,jpg,JPG,png,PNG,tiff,TIFF,webp,WEBP}",
		"../../content/equipment/guides/*/images/*.{avif,AVIF,gif,GIF,heif,HEIF,jpeg,JPEG,jpg,JPG,png,PNG,tiff,TIFF,webp,WEBP}"
	],
	{
		eager: true,
		query: { enhanced: true, imgSizes: "100vw" },
		import: "default"
	}
)

const guides = new Map<string, BuildGuide>()
const sectionsByGuide = new Map<string, Map<string, BuildGuideSection>>()
const searchDocuments: SearchDocument[] = []

function guideKey(root: GuideRoot, slug: string): string {
	return `${root}:${slug}`
}

for (const [source, module] of Object.entries(guideModules)) {
	const root = getGuideRoot(source)
	const slug = getGuideSlug(source)
	if (guides.has(guideKey(root, slug))) {
		throw new Error(`Duplicate guide identifier "${slug}" in "${source}"`)
	}
	const rootConfig = guideRootConfigs[root]
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
	guides.set(guideKey(root, slug), guide)

	const rawSource = guideSources[source]
	if (typeof rawSource !== "string") {
		throw new Error(`Could not read guide content from "${source}"`)
	}
	searchDocuments.push(
		createSearchDocument({
			id: guideSearchDocumentId(rootConfig.collection, slug),
			title: guide.title,
			description: guide.seoDescription ?? guide.subtitle,
			body: svxToPlainText(rawSource),
			keywords: `${guide.subtitle} ${slug.replaceAll("-", " ")}`,
			section: rootConfig.searchSection,
			url: guideSearchUrl(rootConfig.basePath, slug),
			collection: rootConfig.collection
		})
	)
}

for (const [source, module] of Object.entries(sectionModules)) {
	const root = getGuideRoot(source)
	const guideSlug = getGuideSlug(source)
	const guide = guides.get(guideKey(root, guideSlug))
	if (!guide) {
		throw new Error(`Orphan guide section "${source}" has no guide metadata`)
	}
	const sectionSlug = getSectionSlug(source)
	const sections = sectionsByGuide.get(guideKey(root, guideSlug)) ?? new Map()
	sectionsByGuide.set(guideKey(root, guideSlug), sections)
	if (sections.has(sectionSlug)) {
		throw new Error(
			`Duplicate guide section identifier "${sectionSlug}" in "${source}"`
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
		throw new Error(`Could not read guide section from "${source}"`)
	}
	const sectionBody = svxToPlainText(rawSource)
	searchDocuments.push(
		createSearchDocument({
			id: guideSectionSearchDocumentId(
				guideRootConfigs[root].collection,
				guideSlug,
				sectionSlug
			),
			title: section.title,
			description: sectionBody,
			body: sectionBody,
			keywords: `${guide.title} ${sectionSlug.replaceAll("-", " ")}`,
			section: guide.title,
			url: guideSectionSearchUrl(
				guideRootConfigs[root].basePath,
				guideSlug,
				sectionSlug
			),
			collection: guideRootConfigs[root].collection
		})
	)
}

const partIds = new Set<string>()

for (const [source, module] of Object.entries(partModules)) {
	const root = getGuideRoot(source)
	const guideSlug = getGuideSlug(source)
	const guide = guides.get(guideKey(root, guideSlug))
	if (!guide) {
		throw new Error(`Orphan guide part "${source}" has no guide metadata`)
	}
	const sectionSlug = getSectionSlug(source)
	const section = sectionsByGuide
		.get(guideKey(root, guideSlug))
		?.get(sectionSlug)
	if (!section) {
		throw new Error(
			`Orphan guide part "${source}" references missing section "${sectionSlug}"`
		)
	}
	const slug = getPartSlug(source)
	const id = getBuildGuidePartId(guideSlug, sectionSlug, slug)
	if (partIds.has(id)) {
		throw new Error(`Duplicate guide part identifier "${id}" in "${source}"`)
	}
	partIds.add(id)

	const metadata = readMetadataRecord(module.metadata, source)
	const imageFilename = readOptionalString(metadata, "image", source)
	const imagePath = imageFilename
		? `../../content/${root}/guides/${guideSlug}/images/${imageFilename}`
		: undefined
	const image = imagePath ? imageModules[imagePath] : undefined
	if (imageFilename && !image) {
		throw new Error(
			`Invalid metadata in "${source}": referenced image "${imageFilename}" was not found`
		)
	}

	const title = readRequiredString(metadata, "title", source)
	const rootConfig = guideRootConfigs[root]
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
		throw new Error(`Could not read guide part from "${source}"`)
	}
	const partBody = svxToPlainText(rawSource)
	searchDocuments.push(
		createSearchDocument({
			id: guidePartSearchDocumentId(
				rootConfig.collection,
				guideSlug,
				sectionSlug,
				slug
			),
			title: part.title,
			description: partBody,
			body: partBody,
			keywords: [
				guide.title,
				section.title,
				part.price,
				...part.tags.flatMap((tag) => [tag.label, tag.tooltip])
			]
				.filter(Boolean)
				.join(" "),
			section: `${guide.title} · ${section.title}`,
			url: guidePartSearchUrl(rootConfig.basePath, guideSlug, part.id),
			collection: rootConfig.collection
		})
	)
}

for (const [key, guide] of guides) {
	const sections = Array.from(sectionsByGuide.get(key)?.values() ?? [])
		.map((section) => ({
			...section,
			parts: [...section.parts].sort((a, b) => a.order - b.order)
		}))
		.sort((a, b) => a.order - b.order)
	guide.sections = sections
}

export function getGuide(root: GuideRoot, guideSlug: string): BuildGuide {
	const guide = guides.get(guideKey(root, guideSlug))
	if (!guide) {
		throw new Error(
			`No ${guideRootConfigs[root].label} found for "${guideSlug}"`
		)
	}
	return guide
}

export function getBuildGuide(guideSlug: string): BuildGuide {
	return getGuide("builds", guideSlug)
}

export function getEquipmentGuide(guideSlug: string): BuildGuide {
	return getGuide("equipment", guideSlug)
}

export const guideSearchDocuments: SearchDocument[] = searchDocuments
