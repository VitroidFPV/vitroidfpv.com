import { svxToPlainText } from "../search/svx"

const MAX_DESCRIPTION_LENGTH = 320

function truncateAtWord(value: string, maxLength: number): string {
	if (value.length <= maxLength) return value

	const truncated = value.slice(0, maxLength - 1)
	const lastSpace = truncated.lastIndexOf(" ")
	const end = lastSpace > maxLength * 0.75 ? lastSpace : truncated.length

	return `${truncated.slice(0, end).trimEnd()}…`
}

export function createFaqQuestionDescription(source: string): string {
	return truncateAtWord(svxToPlainText(source), MAX_DESCRIPTION_LENGTH)
}
