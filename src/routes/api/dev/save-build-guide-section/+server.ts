import { dev } from "$app/environment"
import {
	assertBuildGuideSlug,
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

export const POST: RequestHandler = async ({ request }) => {
	if (!dev) {
		error(404, "Not found")
	}

	const { guideSlug, sectionSlug, content, previousSectionSlug } =
		(await request.json()) as {
			guideSlug?: string
			sectionSlug?: string
			content?: string
			previousSectionSlug?: string
		}

	if (!guideSlug || !sectionSlug || !content) {
		error(400, "Missing required fields")
	}

	validateSlug(guideSlug, "guide slug")
	validateSlug(sectionSlug, "section slug")
	const sectionDir = getBuildGuideSectionDirectory(guideSlug, sectionSlug)

	if (previousSectionSlug) {
		validateSlug(previousSectionSlug, "previous section slug")
		const previousDir = getBuildGuideSectionDirectory(
			guideSlug,
			previousSectionSlug
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
		getBuildGuideSectionFile(guideSlug, sectionSlug),
		content,
		"utf-8"
	)

	return json({
		success: true,
		path: `src/content/builds/guides/${guideSlug}/sections/${sectionSlug}/_section.svx`
	})
}
