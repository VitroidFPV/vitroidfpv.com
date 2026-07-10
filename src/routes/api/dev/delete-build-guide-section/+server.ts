import { dev } from "$app/environment"
import { error, json } from "@sveltejs/kit"
import { access, rm } from "node:fs/promises"
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

	const { buildSlug, sectionSlug } = (await request.json()) as {
		buildSlug?: string
		sectionSlug?: string
	}

	if (!buildSlug || !sectionSlug) {
		error(400, "Missing required fields")
	}

	assertSafeSegment(buildSlug, "build slug")
	assertSafeSegment(sectionSlug, "section slug")

	const contentRoot = path.join(process.cwd(), "src", "content", "builds")
	const sectionDir = path.join(contentRoot, buildSlug, sectionSlug)

	if (!sectionDir.startsWith(contentRoot)) {
		error(400, "Invalid path")
	}

	try {
		await access(sectionDir)
	} catch {
		error(404, "Section not found")
	}

	await rm(sectionDir, { recursive: true, force: true })

	return json({
		success: true,
		path: `src/content/builds/${buildSlug}/${sectionSlug}`
	})
}
