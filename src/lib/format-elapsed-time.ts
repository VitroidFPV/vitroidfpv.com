export function formatElapsedTime(
	startTime: string,
	currentTime = Date.now()
): string {
	const totalSeconds = Math.max(
		0,
		Math.floor((currentTime - new Date(startTime).getTime()) / 1000)
	)
	const days = Math.floor(totalSeconds / 86400)
	const hours = Math.floor((totalSeconds % 86400) / 3600)
	const minutes = Math.floor((totalSeconds % 3600) / 60)
	const seconds = totalSeconds % 60
	const parts: string[] = []

	if (days > 0) parts.push(`${days}d`)
	if (days > 0 || hours > 0) parts.push(`${hours}h`)
	if (days > 0 || hours > 0 || minutes > 0) parts.push(`${minutes}m`)
	parts.push(`${seconds}s`)

	return `${parts.join(" ")} ago`
}
