import { getArticle } from "$lib/articles/content"
import { formatArticleDate } from "$lib/format-article-date"
import { error } from "@sveltejs/kit"
import type { PageLoad } from "./$types"

export const load: PageLoad = ({ params }) => {
	const article = getArticle(params.slug)

	if (!article?.accessible) {
		error(404, "Article not found")
	}

	return {
		article,
		postedDate: article.date ? formatArticleDate(article.date) : undefined,
		updatedDate: article.updated
			? formatArticleDate(article.updated)
			: undefined
	}
}
