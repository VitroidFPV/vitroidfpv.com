const MAX_DESCRIPTION_LENGTH = 320

function truncateAtWord(value: string, maxLength: number): string {
	if (value.length <= maxLength) return value

	const truncated = value.slice(0, maxLength - 1)
	const lastSpace = truncated.lastIndexOf(" ")
	const end = lastSpace > maxLength * 0.75 ? lastSpace : truncated.length

	return `${truncated.slice(0, end).trimEnd()}…`
}

export function createFaqQuestionDescription(source: string): string {
	const plainText = source
		.replace(/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/, "")
		.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, " ")
		.replace(/<[A-Z][\w.]*\b[\s\S]*?\/>/g, " ")
		.replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
		.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
		.replace(/`([^`]+)`/g, "$1")
		.replace(/<[^>]+>/g, " ")
		.replace(/^\s*(?:[-+*]|\d+\.)\s+/gm, "")
		.replace(/[*_~>#]/g, "")
		.replace(/\s+/g, " ")
		.trim()

	return truncateAtWord(plainText, MAX_DESCRIPTION_LENGTH)
}
