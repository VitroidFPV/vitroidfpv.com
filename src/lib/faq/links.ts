export function getFaqQuestionUrl(url: URL, questionId: string): string {
	const link = new URL(url)
	link.search = ""
	link.hash = questionId
	return link.toString()
}
