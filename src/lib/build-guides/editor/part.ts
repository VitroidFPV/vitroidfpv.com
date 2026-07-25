import type { BuildGuidePartAccent } from "../theme"
import type { BuildGuidePartTag } from "../types"
import { quoteYamlScalar } from "./frontmatter"

export type BuildGuidePartFormData = {
	title: string
	url: string
	order: number
	color: BuildGuidePartAccent
	price?: string
	image?: string
	imageAlt?: string
	tags: string[]
	body: string
}

export function slugifyBuildGuideTitle(title: string): string {
	return title
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-")
}

export function parseBuildGuideTagsInput(input: string): string[] {
	return input
		.split("\n")
		.map((line) => line.trim())
		.filter(Boolean)
		.map((line) => (line.startsWith("- ") ? line.slice(2).trim() : line))
}

export function formatBuildGuideTagsInput(tags: string[]): string {
	return tags.join("\n")
}

export function formatParsedBuildGuideTags(tags: BuildGuidePartTag[]): string {
	return tags
		.map((tag) => (tag.tooltip ? `${tag.label}<${tag.tooltip}>` : tag.label))
		.join("\n")
}

export function serializeBuildGuidePart(data: BuildGuidePartFormData): string {
	const lines = ["---"]
	lines.push(`title: ${quoteYamlScalar(data.title)}`)
	lines.push(`url: ${data.url}`)
	lines.push(`order: ${data.order}`)
	lines.push(`color: ${data.color}`)
	if (data.price?.trim())
		lines.push(`price: ${quoteYamlScalar(data.price.trim())}`)
	if (data.image?.trim()) lines.push(`image: ${data.image.trim()}`)
	if (data.imageAlt?.trim() && data.imageAlt.trim() !== data.title.trim()) {
		lines.push(`imageAlt: ${quoteYamlScalar(data.imageAlt.trim())}`)
	}
	if (data.tags.length > 0) {
		lines.push("tags:")
		for (const tag of data.tags) lines.push(`  - ${quoteYamlScalar(tag)}`)
	}
	lines.push("---")
	const body = data.body.trim()
	if (body) lines.push(body)
	return `${lines.join("\n")}\n`
}
