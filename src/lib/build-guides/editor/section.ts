import { quoteYamlScalar } from "./frontmatter"

export type BuildGuideSectionFormData = {
	title: string
	order: number
	body: string
}

export function serializeBuildGuideSection(
	data: BuildGuideSectionFormData
): string {
	const lines = [
		"---",
		`title: ${quoteYamlScalar(data.title)}`,
		`order: ${data.order}`,
		"---"
	]
	const body = data.body.trim()
	if (body) lines.push(body)
	return `${lines.join("\n")}\n`
}
