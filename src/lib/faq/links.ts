export const FAQ_QUESTION_QUERY_PARAM = "question"

export function getFaqQuestionIdFromUrl(url: URL): string | null {
	const questionId = url.searchParams.get(FAQ_QUESTION_QUERY_PARAM)?.trim()
	return questionId || null
}

export function getFaqQuestionUrl(url: URL, questionId: string): string {
	const link = new URL(url)
	link.search = ""
	link.searchParams.set(FAQ_QUESTION_QUERY_PARAM, questionId)
	link.hash = ""
	return link.toString()
}
