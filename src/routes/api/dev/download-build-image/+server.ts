import { dev } from "$app/environment"
import { fetchPublicUrl } from "$lib/server/dev-image-fetch"
import { error, json } from "@sveltejs/kit"
import { mkdir, readdir, unlink, writeFile } from "node:fs/promises"
import path from "node:path"
import type { RequestHandler } from "./$types"

const slugPattern = /^[a-z0-9-]+$/
const maxImageBytes = 20 * 1024 * 1024
const extensionsByContentType: Record<string, string> = {
	"image/avif": "avif",
	"image/gif": "gif",
	"image/jpeg": "jpg",
	"image/png": "png",
	"image/webp": "webp"
}

export const POST: RequestHandler = async ({ request }) => {
	if (!dev) error(404, "Not found")

	const { buildSlug, slug, imageUrl } = (await request.json()) as {
		buildSlug?: string
		slug?: string
		imageUrl?: string
	}

	if (!buildSlug || !slug || !imageUrl) error(400, "Missing required fields")
	if (!slugPattern.test(buildSlug) || !slugPattern.test(slug)) {
		error(400, "Invalid build or image slug")
	}

	let response: Response
	try {
		response = await fetchPublicUrl(imageUrl, {
			headers: { "User-Agent": "Mozilla/5.0 (vitroidfpv.com dev CMS)" },
			signal: AbortSignal.timeout(30_000)
		})
	} catch (reason) {
		error(
			502,
			reason instanceof Error ? reason.message : "Failed to download image"
		)
	}

	if (!response.ok) error(502, `Image host returned ${response.status}`)

	const contentType =
		response.headers.get("content-type")?.split(";")[0].toLowerCase() ?? ""
	const extension = extensionsByContentType[contentType]
	if (!extension) error(415, "The selected URL is not a supported image")

	const declaredSize = Number(response.headers.get("content-length"))
	if (Number.isFinite(declaredSize) && declaredSize > maxImageBytes) {
		error(413, "Image is larger than 20 MB")
	}

	const bytes = new Uint8Array(await response.arrayBuffer())
	if (bytes.byteLength > maxImageBytes) error(413, "Image is larger than 20 MB")

	const imageDirectory = path.join(
		process.cwd(),
		"src",
		"content",
		"builds",
		buildSlug,
		"images"
	)
	const contentRoot = path.join(process.cwd(), "src", "content", "builds")
	if (!imageDirectory.startsWith(contentRoot)) error(400, "Invalid image path")

	await mkdir(imageDirectory, { recursive: true })
	const filename = `${slug}.${extension}`
	await writeFile(path.join(imageDirectory, filename), bytes)

	const oldVariants = (await readdir(imageDirectory)).filter(
		(entry) => entry !== filename && entry.startsWith(`${slug}.`)
	)
	await Promise.all(
		oldVariants.map((entry) =>
			unlink(path.join(imageDirectory, entry)).catch(() => undefined)
		)
	)

	return json({
		success: true,
		filename,
		extension,
		fileSize: bytes.byteLength,
		path: `src/content/builds/${buildSlug}/images/${filename}`
	})
}
