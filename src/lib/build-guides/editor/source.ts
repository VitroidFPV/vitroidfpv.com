function extractBody(raw: string): string {
	const match = raw.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?([\s\S]*)$/)
	return match?.[1]?.trim() ?? ""
}

const sectionSources = import.meta.glob<string>(
	"../../../content/builds/guides/*/sections/*/_section.svx",
	{ eager: true, query: "?raw", import: "default" }
)
const partSources = import.meta.glob<string>(
	[
		"../../../content/builds/guides/*/sections/*/*.svx",
		"!../../../content/builds/guides/*/sections/*/_section.svx"
	],
	{ eager: true, query: "?raw", import: "default" }
)

export function getBuildGuideSectionSource(
	guideSlug: string,
	sectionSlug: string
): string {
	const path = `../../../content/builds/guides/${guideSlug}/sections/${sectionSlug}/_section.svx`
	return extractBody(sectionSources[path] ?? "")
}

export function getBuildGuidePartSource(
	guideSlug: string,
	sectionSlug: string,
	partSlug: string
): string {
	const path = `../../../content/builds/guides/${guideSlug}/sections/${sectionSlug}/${partSlug}.svx`
	return extractBody(partSources[path] ?? "")
}
