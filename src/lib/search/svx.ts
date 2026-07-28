const htmlEntities: Record<string, string> = {
	amp: "&",
	apos: "'",
	gt: ">",
	lt: "<",
	nbsp: " ",
	quot: '"'
}

function decodeHtmlEntities(value: string): string {
	return value.replace(
		/&(#(?:x[\da-f]+|\d+)|[a-z]+);/gi,
		(entity, token: string) => {
			if (token.startsWith("#")) {
				const radix = token[1]?.toLowerCase() === "x" ? 16 : 10
				const digits = radix === 16 ? token.slice(2) : token.slice(1)
				const codePoint = Number.parseInt(digits, radix)
				return Number.isFinite(codePoint)
					? String.fromCodePoint(codePoint)
					: entity
			}

			return htmlEntities[token.toLowerCase()] ?? entity
		}
	)
}

export function svxToPlainText(source: string): string {
	const plainText = source
		.replace(/^\uFEFF?---[ \t]*\r?\n[\s\S]*?\r?\n---[ \t]*(?:\r?\n|$)/, " ")
		.replace(/<!--[\s\S]*?-->/g, " ")
		.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, " ")
		.replace(/```[\w-]*\r?\n([\s\S]*?)```/g, "$1")
		.replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
		.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
		.replace(/<((?:https?:\/\/|mailto:)[^>]+)>/gi, "$1")
		.replace(/<\/?[A-Za-z][^>]*>/g, " ")
		.replace(/\{[#/:@][^}]*\}/g, " ")
		.replace(/\{[^{}]*\}/g, " ")
		.replace(/`([^`]+)`/g, "$1")
		.replace(/^\s{0,3}#{1,6}\s+/gm, "")
		.replace(/^\s*(?:[-+*]|\d+[.)])\s+/gm, "")
		.replace(/^\s*>\s?/gm, "")
		.replace(/[*~]/g, "")
		.replace(/(?<![A-Za-z0-9])_|_(?![A-Za-z0-9])/g, "")

	return decodeHtmlEntities(plainText).replace(/\s+/g, " ").trim()
}
