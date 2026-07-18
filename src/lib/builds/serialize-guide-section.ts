export type GuideSectionFormData = {
	title: string
	order: number
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

export function serializeGuideSection(data: GuideSectionFormData): string {
	const lines = [
		"---",
		`title: ${yamlQuote(data.title)}`,
		`order: ${data.order}`,
		"---"
	]
	const body = data.body.trim()

	if (body) lines.push(body)

	return `${lines.join("\n")}\n`
}
