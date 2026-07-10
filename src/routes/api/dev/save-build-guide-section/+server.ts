import { dev } from "$app/environment"
import { error, json } from "@sveltejs/kit"
import { access, mkdir, rename, writeFile } from "node:fs/promises"
import path from "node:path"
import type { RequestHandler } from "./$types"

const slugPattern = /^[a-z0-9-]+$/

function assertSafeSegment(value: string, label: string) {
	if (!slugPattern.test(value)) {
		error(400, `Invalid ${label}`)
	}
}

async function directoryExists(dirPath: string): Promise<boolean> {
	try {
		await access(dirPath)
		return true
	} catch {
		return false
	}
}

export const POST: RequestHandler = async ({ request }) => {
	if (!dev) {
		error(404, "Not found")
	}

	const { buildSlug, sectionSlug, content, previousSectionSlug } =
		(await request.json()) as {
			buildSlug?: string
			sectionSlug?: string
			content?: string
			previousSectionSlug?: string
		}

	if (!buildSlug || !sectionSlug || !content) {
		error(400, "Missing required fields")
	}

	assertSafeSegment(buildSlug, "build slug")
	assertSafeSegment(sectionSlug, "section slug")

	const contentRoot = path.join(process.cwd(), "src", "content", "builds")
	const sectionDir = path.join(contentRoot, buildSlug, sectionSlug)

	if (!sectionDir.startsWith(contentRoot)) {
		error(400, "Invalid path")
	}

	if (previousSectionSlug) {
		assertSafeSegment(previousSectionSlug, "previous section slug")

		const previousDir = path.join(contentRoot, buildSlug, previousSectionSlug)
		if (!previousDir.startsWith(contentRoot)) {
			error(400, "Invalid path")
		}

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

	await writeFile(path.join(sectionDir, "metadata.json"), content, "utf-8")

	return json({
		success: true,
		path: `src/content/builds/${buildSlug}/${sectionSlug}/metadata.json`
	})
}
