import { dev } from "$app/environment"
import { fetchPublicUrl } from "$lib/server/dev-image-fetch"
import {
	assertBuildGuideSlug,
	getBuildGuideImagesDirectory,
	resolveBuildGuidePath
} from "$lib/server/build-guides/files"
import { error, json } from "@sveltejs/kit"
import { mkdir, readdir, unlink, writeFile } from "node:fs/promises"
import type { RequestHandler } from "./$types"

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

	const { guideSlug, partSlug, imageUrl } = (await request.json()) as {
		guideSlug?: string
		partSlug?: string
		imageUrl?: string
	}

	if (!guideSlug || !partSlug || !imageUrl)
		error(400, "Missing required fields")
	try {
		assertBuildGuideSlug(guideSlug, "guide slug")
		assertBuildGuideSlug(partSlug, "image slug")
	} catch (reason) {
		error(
			400,
			reason instanceof Error ? reason.message : "Invalid guide or image slug"
		)
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

	const imageDirectory = getBuildGuideImagesDirectory(guideSlug)

	await mkdir(imageDirectory, { recursive: true })
	const filename = `${partSlug}.${extension}`
	const targetPath = resolveBuildGuidePath(imageDirectory, filename)

	// Remove existing variants before writing. On Windows, truncating an in-use
	// file (e.g. while Vite is serving it) fails with an opaque UNKNOWN error.
	const existingVariants = (await readdir(imageDirectory)).filter((entry) =>
		entry.startsWith(`${partSlug}.`)
	)
	for (const entry of existingVariants) {
		try {
			await unlink(resolveBuildGuidePath(imageDirectory, entry))
		} catch (reason) {
			error(
				409,
				reason instanceof Error
					? `Could not replace ${entry}: ${reason.message}`
					: `Could not replace ${entry}`
			)
		}
	}

	try {
		await writeFile(targetPath, bytes)
	} catch (reason) {
		error(
			500,
			reason instanceof Error
				? `Failed to save ${filename}: ${reason.message}`
				: `Failed to save ${filename}`
		)
	}

	return json({
		success: true,
		filename,
		extension,
		fileSize: bytes.byteLength,
		path: `src/content/builds/guides/${guideSlug}/images/${filename}`
	})
}
