import { dev } from "$app/environment"
import { error, json } from "@sveltejs/kit"
import { writeFile, unlink } from "node:fs/promises"
import path from "node:path"
import type { RequestHandler } from "./$types"

const slugPattern = /^[a-z0-9-]+$/

function assertSafeSegment(value: string, label: string) {
	if (!slugPattern.test(value)) {
		error(400, `Invalid ${label}`)
	}
}

export const POST: RequestHandler = async ({ request }) => {
	if (!dev) {
		error(404, "Not found")
	}

	const { buildSlug, sectionSlug, slug, content, previousSlug, previousSectionSlug } =
		(await request.json()) as {
			buildSlug?: string
			sectionSlug?: string
			slug?: string
			content?: string
			previousSlug?: string
			previousSectionSlug?: string
		}

	if (!buildSlug || !sectionSlug || !slug || !content) {
		error(400, "Missing required fields")
	}

	assertSafeSegment(buildSlug, "build slug")
	assertSafeSegment(sectionSlug, "section slug")
	assertSafeSegment(slug, "part slug")

	const filePath = path.join(
		process.cwd(),
		"src",
		"content",
		"builds",
		buildSlug,
		sectionSlug,
		`${slug}.svx`
	)

	const contentRoot = path.join(process.cwd(), "src", "content", "builds")
	if (!filePath.startsWith(contentRoot)) {
		error(400, "Invalid path")
	}

	await writeFile(filePath, content, "utf-8")

	const shouldDeletePrevious =
		previousSlug &&
		slugPattern.test(previousSlug) &&
		(previousSlug !== slug ||
			(previousSectionSlug &&
				previousSectionSlug !== sectionSlug &&
				slugPattern.test(previousSectionSlug)))

	if (shouldDeletePrevious) {
		const deleteSectionSlug = previousSectionSlug ?? sectionSlug
		const previousPath = path.join(
			process.cwd(),
			"src",
			"content",
			"builds",
			buildSlug,
			deleteSectionSlug,
			`${previousSlug}.svx`
		)

		if (previousPath.startsWith(contentRoot) && previousPath !== filePath) {
			await unlink(previousPath).catch(() => undefined)
		}
	}

	return json({
		success: true,
		path: `src/content/builds/${buildSlug}/${sectionSlug}/${slug}.svx`
	})
}
