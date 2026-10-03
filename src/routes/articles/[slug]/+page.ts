import { resolve } from "$app/paths"
import { getArticle } from "$lib/articles/content"
import { error, redirect } from "@sveltejs/kit"
import type { PageLoad } from "./$types"

export const load: PageLoad = ({ params }) => {
	if (params.slug.startsWith("tutorials-")) {
		redirect(
			308,
			resolve("/articles/[slug]", {
				slug: params.slug.replace(/^tutorials-/, "guides-")
			})
		)
	}

	const article = getArticle(params.slug)

	if (!article?.accessible) {
		error(404, "Article not found")
	}

	return {
		article
	}
}
