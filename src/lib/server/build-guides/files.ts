import { access } from "node:fs/promises"
import path from "node:path"

export const BUILD_GUIDES_CONTENT_ROOT = path.resolve(
	process.cwd(),
	"src",
	"content",
	"builds",
	"guides"
)

const slugPattern = /^[a-z0-9-]+$/

export function assertBuildGuideSlug(value: string, label = "slug"): string {
	if (!slugPattern.test(value)) throw new Error(`Invalid ${label}`)
	return value
}

export function isPathContained(root: string, target: string): boolean {
	const relative = path.relative(path.resolve(root), path.resolve(target))
	return (
		relative === "" ||
		(!relative.startsWith("..") && !path.isAbsolute(relative))
	)
}

export function resolveBuildGuidePath(
	root: string,
	...segments: string[]
): string {
	const target = path.resolve(root, ...segments)
	if (!isPathContained(root, target))
		throw new Error("Invalid build guide path")
	return target
}

export function getBuildGuideDirectory(guideSlug: string): string {
	return resolveBuildGuidePath(
		BUILD_GUIDES_CONTENT_ROOT,
		assertBuildGuideSlug(guideSlug, "guide slug")
	)
}

export function getBuildGuideImagesDirectory(guideSlug: string): string {
	return resolveBuildGuidePath(getBuildGuideDirectory(guideSlug), "images")
}

export function getBuildGuideSectionDirectory(
	guideSlug: string,
	sectionSlug: string
): string {
	return resolveBuildGuidePath(
		getBuildGuideDirectory(guideSlug),
		"sections",
		assertBuildGuideSlug(sectionSlug, "section slug")
	)
}

export function getBuildGuideSectionFile(
	guideSlug: string,
	sectionSlug: string
): string {
	return resolveBuildGuidePath(
		getBuildGuideSectionDirectory(guideSlug, sectionSlug),
		"_section.svx"
	)
}

export function getBuildGuidePartFile(
	guideSlug: string,
	sectionSlug: string,
	partSlug: string
): string {
	return resolveBuildGuidePath(
		getBuildGuideSectionDirectory(guideSlug, sectionSlug),
		`${assertBuildGuideSlug(partSlug, "part slug")}.svx`
	)
}

export async function directoryExists(directory: string): Promise<boolean> {
	try {
		await access(directory)
		return true
	} catch {
		return false
	}
}
