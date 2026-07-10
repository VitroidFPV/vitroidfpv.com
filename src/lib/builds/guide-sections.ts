import type { Picture } from "@sveltejs/enhanced-img"
import type { Component } from "svelte"

export const guidePartColors = {
	success: {
		text: "text-success-500",
		bar: "bg-success-500",
		price:
			"rounded-full bg-success-500/20 px-2 py-1 text-xs font-semibold text-success-500",
		link: "fancy-link text-2xl font-semibold text-success-500",
		iconHover: "transition-colors duration-300 hover:text-success-500"
	},
	warning: {
		text: "text-warning-500",
		bar: "bg-warning-500",
		price:
			"rounded-full bg-warning-500/20 px-2 py-1 text-xs font-semibold text-warning-500",
		link: "fancy-link text-2xl font-semibold text-warning-500",
		iconHover: "transition-colors duration-300 hover:text-warning-500"
	},
	error: {
		text: "text-error-500",
		bar: "bg-error-500",
		price:
			"rounded-full bg-error-500/20 px-2 py-1 text-xs font-semibold text-error-500",
		link: "fancy-link text-2xl font-semibold text-error-500",
		iconHover: "transition-colors duration-300 hover:text-error-500"
	},
	secondary: {
		text: "text-secondary-500",
		bar: "bg-secondary-500",
		price:
			"rounded-full bg-secondary-500/20 px-2 py-1 text-xs font-semibold text-secondary-500",
		link: "fancy-link text-2xl font-semibold text-secondary-500",
		iconHover: "transition-colors duration-300 hover:text-secondary-500"
	}
} as const

export type GuidePartColor = keyof typeof guidePartColors

export type BuildGuidePartTag = {
	label: string
	tooltip?: string
}

const buildGuideTagPattern = /^(.+)<([^>]+)>$/

export function parseBuildGuideTag(tag: string | number): BuildGuidePartTag {
	const match = String(tag).match(buildGuideTagPattern)
	if (match) {
		return { label: match[1], tooltip: match[2] }
	}

	return { label: String(tag) }
}

export type BuildGuidePartMetadata = {
	title: string
	url: string
	order: number
	color: string
	price?: string
	tags?: string[]
	image?: string
	imageAlt?: string
}

export type BuildGuideSectionMetadata = {
	title: string
	description: string
	order: number
}

type BuildGuidePartModule = {
	default: Component
	metadata: BuildGuidePartMetadata
}

function getBuildSlug(path: string): string {
	const match = path.match(/\/builds\/([^/]+)\//)
	return match?.[1] ?? path
}

function getSectionSlug(path: string): string {
	const match = path.match(/\/builds\/[^/]+\/([^/]+)\//)
	return match?.[1] ?? path
}

function getPartSlug(path: string): string {
	const match = path.match(/\/([^/]+)\.svx$/)
	return match?.[1] ?? path
}

function resolveGuidePartColor(color: string): GuidePartColor {
	if (color in guidePartColors) {
		return color as GuidePartColor
	}

	throw new Error(`Unknown guide part color "${color}"`)
}

const sectionModules = import.meta.glob(
	"../../content/builds/*/*/metadata.json",
	{
		eager: true,
		import: "default"
	}
) as Record<string, BuildGuideSectionMetadata>

const partModules = import.meta.glob<BuildGuidePartModule>(
	"../../content/builds/*/*/*.svx",
	{ eager: true }
)

const partRawModules = import.meta.glob<string>(
	"../../content/builds/*/*/*.svx",
	{ eager: true, query: "?raw", import: "default" }
)

const partImageModules = import.meta.glob<Picture>(
	"../../content/builds/*/images/*.{avif,AVIF,gif,GIF,heif,HEIF,jpeg,JPEG,jpg,JPG,png,PNG,tiff,TIFF,webp,WEBP}",
	{
		eager: true,
		query: { enhanced: true, imgSizes: "100vw" },
		import: "default"
	}
)

function extractGuidePartBody(raw: string): string {
	const match = raw.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?([\s\S]*)$/)
	return match?.[1]?.trim() ?? ""
}

function resolvePartImage(
	buildSlug: string,
	imageFilename?: string
): Picture | null {
	if (!imageFilename) return null

	const imagePath = `../../content/builds/${buildSlug}/images/${imageFilename}`
	return partImageModules[imagePath] ?? null
}

export type BuildGuidePart = {
	id: string
	slug: string
	buildSlug: string
	sectionSlug: string
	title: string
	url: string
	order: number
	color: GuidePartColor
	price?: string
	tags: BuildGuidePartTag[]
	image: Picture | null
	imageFilename?: string
	imageAlt: string
	body: string
	component: Component
}

export type BuildGuideSection = {
	id: string
	buildSlug: string
	title: string
	description: string
	order: number
	parts: BuildGuidePart[]
}

const sectionsByBuild = new Map<string, Map<string, BuildGuideSection>>()

for (const [path, metadata] of Object.entries(sectionModules)) {
	const buildSlug = getBuildSlug(path)
	const sectionSlug = getSectionSlug(path)

	let buildSections = sectionsByBuild.get(buildSlug)
	if (!buildSections) {
		buildSections = new Map()
		sectionsByBuild.set(buildSlug, buildSections)
	}

	buildSections.set(sectionSlug, {
		id: sectionSlug,
		buildSlug,
		title: metadata.title,
		description: metadata.description,
		order: metadata.order,
		parts: []
	})
}

for (const [path, module] of Object.entries(partModules)) {
	const buildSlug = getBuildSlug(path)
	const sectionSlug = getSectionSlug(path)
	const section = sectionsByBuild.get(buildSlug)?.get(sectionSlug)
	if (!section) continue

	const partSlug = getPartSlug(path)

	section.parts.push({
		id: `${buildSlug}-${sectionSlug}-${partSlug}`,
		slug: partSlug,
		buildSlug,
		sectionSlug,
		title: module.metadata.title,
		url: module.metadata.url,
		order: module.metadata.order,
		color: resolveGuidePartColor(module.metadata.color),
		price: module.metadata.price,
		tags: (module.metadata.tags ?? []).map(parseBuildGuideTag),
		image: resolvePartImage(buildSlug, module.metadata.image),
		imageFilename: module.metadata.image,
		imageAlt: module.metadata.imageAlt ?? module.metadata.title,
		body: extractGuidePartBody(partRawModules[path] ?? ""),
		component: module.default
	})
}

export function getBuildGuideSections(buildSlug: string): BuildGuideSection[] {
	const buildSections = sectionsByBuild.get(buildSlug)
	if (!buildSections) return []

	return Array.from(buildSections.values())
		.map((section) => ({
			...section,
			parts: [...section.parts].sort((a, b) => a.order - b.order)
		}))
		.sort((a, b) => a.order - b.order)
}
