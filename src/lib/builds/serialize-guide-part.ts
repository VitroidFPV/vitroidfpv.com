import type { GuidePartColor } from "$lib/builds/guide-sections"

export type GuidePartFormData = {
	title: string
	url: string
	order: number
	color: GuidePartColor
	price?: string
	image?: string
	imageAlt?: string
	tags: string[]
	body: string
}

function yamlQuote(value: string): string {
	if (
		/[:#{}[\],&*?|>!%@`"'\\]/.test(value) ||
		value.startsWith(" ") ||
		value.endsWith(" ")
	) {
		return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`
	}

	return value
}

export function slugifyGuidePartTitle(title: string): string {
	return title
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-")
}

export function parseGuidePartTagsInput(input: string): string[] {
	return input
		.split("\n")
		.map((line) => line.trim())
		.filter(Boolean)
		.map((line) => (line.startsWith("- ") ? line.slice(2).trim() : line))
}

export function formatGuidePartTagsInput(tags: string[]): string {
	return tags.join("\n")
}

export function formatGuidePartTagsFromParsed(
	tags: { label: string; tooltip?: string }[]
): string {
	return tags
		.map((tag) => (tag.tooltip ? `${tag.label}<${tag.tooltip}>` : tag.label))
		.join("\n")
}

export function serializeGuidePart(data: GuidePartFormData): string {
	const lines = ["---"]

	lines.push(`title: ${yamlQuote(data.title)}`)
	lines.push(`url: ${data.url}`)
	lines.push(`order: ${data.order}`)
	lines.push(`color: ${data.color}`)

	if (data.price?.trim()) {
		lines.push(`price: ${yamlQuote(data.price.trim())}`)
	}

	if (data.image?.trim()) {
		lines.push(`image: ${data.image.trim()}`)
	}

	if (data.imageAlt?.trim() && data.imageAlt.trim() !== data.title.trim()) {
		lines.push(`imageAlt: ${yamlQuote(data.imageAlt.trim())}`)
	}

	if (data.tags.length > 0) {
		lines.push("tags:")
		for (const tag of data.tags) {
			lines.push(`  - ${yamlQuote(tag)}`)
		}
	}

	lines.push("---")

	const body = data.body.trim()
	if (body) {
		lines.push(body)
	}

	return `${lines.join("\n")}\n`
}
