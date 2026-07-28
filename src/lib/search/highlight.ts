export type HighlightPart = {
	text: string
	matched: boolean
}

function escapeRegExp(value: string): string {
	return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function uniqueTerms(terms: readonly string[]): string[] {
	return [...new Set(terms.map((term) => term.trim()).filter(Boolean))].sort(
		(a, b) => b.length - a.length
	)
}

export function highlightText(
	value: string,
	terms: readonly string[]
): HighlightPart[] {
	const normalizedTerms = uniqueTerms(terms)
	if (!value || normalizedTerms.length === 0) {
		return value ? [{ text: value, matched: false }] : []
	}

	const matcher = new RegExp(
		`(${normalizedTerms.map(escapeRegExp).join("|")})`,
		"gi"
	)

	return value
		.split(matcher)
		.filter(Boolean)
		.map((text) => ({
			text,
			matched: normalizedTerms.some(
				(term) => term.toLowerCase() === text.toLowerCase()
			)
		}))
}

export function createSearchExcerpt(
	value: string,
	terms: readonly string[],
	maxLength = 180
): string {
	const text = value.replace(/\s+/g, " ").trim()
	if (text.length <= maxLength) return text

	const lowerText = text.toLowerCase()
	const firstMatch = uniqueTerms(terms).reduce((match, term) => {
		const index = lowerText.indexOf(term.toLowerCase())
		return index === -1 || (match !== -1 && index >= match) ? match : index
	}, -1)

	const idealStart =
		firstMatch === -1 ? 0 : Math.max(0, firstMatch - Math.floor(maxLength / 3))
	let start = idealStart
	if (start > 0) {
		const nextSpace = text.indexOf(" ", start)
		if (nextSpace !== -1) start = nextSpace + 1
	}

	let end = Math.min(text.length, start + maxLength)
	if (end < text.length) {
		const previousSpace = text.lastIndexOf(" ", end)
		if (previousSpace > start + maxLength * 0.7) end = previousSpace
	}

	return `${start > 0 ? "…" : ""}${text.slice(start, end).trim()}${
		end < text.length ? "…" : ""
	}`
}
