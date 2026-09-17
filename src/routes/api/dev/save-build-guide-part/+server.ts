import { dev } from "$app/environment"
import {
	assertBuildGuideSlug,
	assertGuideRoot,
	getBuildGuidePartFile
} from "$lib/server/build-guides/files"
import { error, json } from "@sveltejs/kit"
import { unlink, writeFile } from "node:fs/promises"
import type { RequestHandler } from "./$types"

function validateSlug(value: string, label: string): string {
	try {
		return assertBuildGuideSlug(value, label)
	} catch (reason) {
		error(400, reason instanceof Error ? reason.message : `Invalid ${label}`)
	}
}

function validateGuideRoot(value: string) {
	try {
		return assertGuideRoot(value)
	} catch (reason) {
		error(400, reason instanceof Error ? reason.message : "Invalid guide root")
	}
}

export const POST: RequestHandler = async ({ request }) => {
	if (!dev) {
		error(404, "Not found")
	}

	const {
		guideRoot,
		guideSlug,
		sectionSlug,
		partSlug,
		content,
		previousPartSlug,
		previousSectionSlug
	} = (await request.json()) as {
		guideRoot?: string
		guideSlug?: string
		sectionSlug?: string
		partSlug?: string
		content?: string
		previousPartSlug?: string
		previousSectionSlug?: string
	}

	if (!guideRoot || !guideSlug || !sectionSlug || !partSlug || !content) {
		error(400, "Missing required fields")
	}

	const validGuideRoot = validateGuideRoot(guideRoot)
	validateSlug(guideSlug, "guide slug")
	validateSlug(sectionSlug, "section slug")
	validateSlug(partSlug, "part slug")
	const filePath = getBuildGuidePartFile(
		guideSlug,
		sectionSlug,
		partSlug,
		validGuideRoot
	)

	await writeFile(filePath, content, "utf-8")

	const shouldDeletePrevious =
		previousPartSlug &&
		(previousPartSlug !== partSlug ||
			(previousSectionSlug && previousSectionSlug !== sectionSlug))

	if (shouldDeletePrevious) {
		const deleteSectionSlug = previousSectionSlug ?? sectionSlug
		validateSlug(deleteSectionSlug, "previous section slug")
		validateSlug(previousPartSlug, "previous part slug")
		const previousPath = getBuildGuidePartFile(
			guideSlug,
			deleteSectionSlug,
			previousPartSlug,
			validGuideRoot
		)
		if (previousPath !== filePath)
			await unlink(previousPath).catch(() => undefined)
	}

	return json({
		success: true,
		path: `src/content/${validGuideRoot}/guides/${guideSlug}/sections/${sectionSlug}/${partSlug}.svx`
	})
}
