import { getVisibleArticles } from "$lib/articles/content"
import type { PageLoad } from "./$types"

export const load: PageLoad = () => ({
	articles: getVisibleArticles()
})
