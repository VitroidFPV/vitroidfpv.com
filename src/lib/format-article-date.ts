const RELATIVE_CUTOFF_MS = 30 * 24 * 60 * 60 * 1000

const absoluteFormatter = new Intl.DateTimeFormat("en-GB", {
	day: "numeric",
	month: "long",
	year: "numeric",
	timeZone: "Europe/Prague"
})

export type ArticleDateDisplay = {
	text: string
	relative: boolean
}

function unit(name: string, count: number): string {
	return count === 1 ? name : `${name}s`
}

export function formatArticleDate(
	value: string,
	now = Date.now()
): ArticleDateDisplay {
	const time = new Date(value).getTime()
	if (Number.isNaN(time)) {
		return { text: value, relative: false }
	}

	const elapsedSeconds = Math.max(0, Math.floor((now - time) / 1000))

	if (now - time >= RELATIVE_CUTOFF_MS) {
		return { text: absoluteFormatter.format(time), relative: false }
	}

	if (elapsedSeconds < 60) {
		return { text: "just now", relative: true }
	}

	const minutes = Math.floor(elapsedSeconds / 60)
	if (minutes < 60) {
		return { text: `${minutes} ${unit("minute", minutes)} ago`, relative: true }
	}

	const hours = Math.floor(minutes / 60)
	if (hours < 24) {
		return { text: `${hours} ${unit("hour", hours)} ago`, relative: true }
	}

	const days = Math.floor(hours / 24)
	if (days < 7) {
		return { text: `${days} ${unit("day", days)} ago`, relative: true }
	}

	const weeks = Math.floor(days / 7)
	return { text: `${weeks} ${unit("week", weeks)} ago`, relative: true }
}
