import { dev } from "$app/environment"
import { fetchPublicUrl } from "$lib/server/dev-image-fetch"
import { error, json } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"

type DuckDuckGoImage = {
	title?: string
	image?: string
	thumbnail?: string
	url?: string
	width?: number
	height?: number
	source?: string
}

type DuckDuckGoResponse = {
	results?: DuckDuckGoImage[]
}

const pageSize = 12

function findVqd(html: string): string | null {
	return html.match(/vqd=['"]?([^&'"\\]+)/)?.[1] ?? null
}

async function discoverFileSize(url: string): Promise<number | null> {
	try {
		const response = await fetchPublicUrl(url, {
			method: "HEAD",
			headers: { "User-Agent": "Mozilla/5.0 (vitroidfpv.com dev CMS)" },
			signal: AbortSignal.timeout(3_000)
		})
		const length = Number(response.headers.get("content-length"))
		return response.ok && Number.isFinite(length) && length > 0 ? length : null
	} catch {
		return null
	}
}

export const GET: RequestHandler = async ({ url, fetch }) => {
	if (!dev) error(404, "Not found")

	const query = url.searchParams.get("q")?.trim() ?? ""
	if (!query || query.length > 200) error(400, "Enter a search query")

	const page = Number(url.searchParams.get("page") ?? "1")
	if (!Number.isInteger(page) || page < 1 || page > 100) {
		error(400, "Invalid image search page")
	}

	const searchUrl = new URL("https://duckduckgo.com/")
	searchUrl.searchParams.set("q", query)
	searchUrl.searchParams.set("iax", "images")
	searchUrl.searchParams.set("ia", "images")

	const headers = { "User-Agent": "Mozilla/5.0 (vitroidfpv.com dev CMS)" }
	const searchPage = await fetch(searchUrl, { headers })
	if (!searchPage.ok) error(502, "Image search is currently unavailable")

	const vqd = findVqd(await searchPage.text())
	if (!vqd) error(502, "Image search did not return a token")

	const apiUrl = new URL("https://duckduckgo.com/i.js")
	apiUrl.searchParams.set("l", "us-en")
	apiUrl.searchParams.set("o", "json")
	apiUrl.searchParams.set("q", query)
	apiUrl.searchParams.set("vqd", vqd)
	apiUrl.searchParams.set("f", ",,,")
	apiUrl.searchParams.set("p", "1")
	apiUrl.searchParams.set("s", String((page - 1) * pageSize))

	const apiResponse = await fetch(apiUrl, {
		headers: { ...headers, Referer: "https://duckduckgo.com/" }
	})
	if (!apiResponse.ok) error(502, "Image search is currently unavailable")

	const payload = (await apiResponse.json()) as DuckDuckGoResponse
	const candidatesWithLookahead = (payload.results ?? [])
		.filter(
			(
				result
			): result is DuckDuckGoImage & { image: string; thumbnail: string } =>
				Boolean(result.image && result.thumbnail)
		)
		.slice(0, pageSize + 1)
	const candidates = candidatesWithLookahead.slice(0, pageSize)

	const sizes = await Promise.all(
		candidates.map((result) => discoverFileSize(result.image))
	)
	const results = candidates.map((result, index) => ({
		id: `${(page - 1) * pageSize + index}-${result.image}`,
		title: result.title?.trim() || query,
		imageUrl: result.image,
		thumbnailUrl: result.thumbnail,
		sourceUrl: result.url ?? result.image,
		source: new URL(result.url ?? result.image).hostname.replace(/^www\./, ""),
		width: result.width ?? null,
		height: result.height ?? null,
		fileSize: sizes[index]
	}))

	return json({
		results,
		page,
		pageSize,
		hasNext: candidatesWithLookahead.length > pageSize
	})
}
