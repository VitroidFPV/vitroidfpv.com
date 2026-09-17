import { dev } from "$app/environment"
import {
	assertBuildGuideSlug,
	assertGuideRoot,
	directoryExists,
	getBuildGuideSectionDirectory,
	getBuildGuideSectionFile
} from "$lib/server/build-guides/files"
import { error, json } from "@sveltejs/kit"
import { mkdir, rename, writeFile } from "node:fs/promises"
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

	const { guideRoot, guideSlug, sectionSlug, content, previousSectionSlug } =
		(await request.json()) as {
			guideRoot?: string
			guideSlug?: string
			sectionSlug?: string
			content?: string
			previousSectionSlug?: string
		}

	if (!guideRoot || !guideSlug || !sectionSlug || !content) {
		error(400, "Missing required fields")
	}

	const validGuideRoot = validateGuideRoot(guideRoot)
	validateSlug(guideSlug, "guide slug")
	validateSlug(sectionSlug, "section slug")
	const sectionDir = getBuildGuideSectionDirectory(
		guideSlug,
		sectionSlug,
		validGuideRoot
	)

	if (previousSectionSlug) {
		validateSlug(previousSectionSlug, "previous section slug")
		const previousDir = getBuildGuideSectionDirectory(
			guideSlug,
			previousSectionSlug,
			validGuideRoot
		)

		if (previousSectionSlug !== sectionSlug) {
			if (!(await directoryExists(previousDir))) {
				error(404, "Previous section not found")
			}

			if (await directoryExists(sectionDir)) {
				error(409, "Section already exists")
			}

			await rename(previousDir, sectionDir)
		}
	} else if (await directoryExists(sectionDir)) {
		error(409, "Section already exists")
	} else {
		await mkdir(sectionDir, { recursive: true })
	}

	await writeFile(
		getBuildGuideSectionFile(guideSlug, sectionSlug, validGuideRoot),
		content,
		"utf-8"
	)

	return json({
		success: true,
		path: `src/content/${validGuideRoot}/guides/${guideSlug}/sections/${sectionSlug}/_section.svx`
	})
}
