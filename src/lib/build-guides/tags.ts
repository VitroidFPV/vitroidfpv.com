import type { BuildGuidePartTag } from "./types"

const parsedTagPattern = /^([^<>]+)<([^<>]+)>$/

export function parseBuildGuidePartTag(
	rawTag: string | number,
	source = "build guide tag"
): BuildGuidePartTag {
	const tag = String(rawTag)
	const match = tag.match(parsedTagPattern)
	if (match) return { label: match[1], tooltip: match[2] }
	if (tag.includes("<") || tag.includes(">") || tag.length === 0) {
		throw new Error(`Invalid build guide tag "${tag}" in "${source}"`)
	}
	return { label: tag }
}
