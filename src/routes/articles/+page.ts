import { getVisibleArticles } from "$lib/articles/content"
import { formatArticleDate } from "$lib/format-article-date"
import type { PageLoad } from "./$types"

export const load: PageLoad = () => ({
	articles: getVisibleArticles().map((article) => ({
		...article,
		postedDate: article.date ? formatArticleDate(article.date) : undefined,
		updatedDate: article.updated
			? formatArticleDate(article.updated)
			: undefined
	}))
})
