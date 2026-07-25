import { dev } from "$app/environment"
import {
	assertBuildGuideSlug,
	directoryExists,
	getBuildGuideSectionDirectory
} from "$lib/server/build-guides/files"
import { error, json } from "@sveltejs/kit"
import { rm } from "node:fs/promises"
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

	const { guideSlug, sectionSlug } = (await request.json()) as {
		guideSlug?: string
		sectionSlug?: string
	}

	if (!guideSlug || !sectionSlug) {
		error(400, "Missing required fields")
	}

	validateSlug(guideSlug, "guide slug")
	validateSlug(sectionSlug, "section slug")
	const sectionDir = getBuildGuideSectionDirectory(guideSlug, sectionSlug)
	if (!(await directoryExists(sectionDir))) {
		error(404, "Section not found")
	}

	await rm(sectionDir, { recursive: true, force: true })

	return json({
		success: true,
		path: `src/content/builds/guides/${guideSlug}/sections/${sectionSlug}`
	})
}
