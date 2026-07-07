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
	}
} as const

export type GuidePartColor = keyof typeof guidePartColors

export type BuildGuidePartTag = {
	label: string
	tooltip?: string
}

const buildGuideTagPattern = /^(.+)<([^>]+)>$/

export function parseBuildGuideTag(tag: string): BuildGuidePartTag {
	const match = tag.match(buildGuideTagPattern)
	if (match) {
		return { label: match[1], tooltip: match[2] }
	}

	return { label: tag }
}

export type BuildGuidePartMetadata = {
	title: string
	url: string
	order: number
	color: string
	price?: string
	tags?: string[]
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

export type BuildGuidePart = {
	id: string
	slug: string
	title: string
	url: string
	order: number
	color: GuidePartColor
	price?: string
	tags: BuildGuidePartTag[]
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
		title: module.metadata.title,
		url: module.metadata.url,
		order: module.metadata.order,
		color: resolveGuidePartColor(module.metadata.color),
		price: module.metadata.price,
		tags: (module.metadata.tags ?? []).map(parseBuildGuideTag),
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
