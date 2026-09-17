import { access } from "node:fs/promises"
import path from "node:path"
import { guideRoots, type GuideRoot } from "$lib/build-guides/types"

export const BUILD_GUIDES_CONTENT_ROOT = path.resolve(
	process.cwd(),
	"src",
	"content",
	"builds",
	"guides"
)

const CONTENT_ROOT = path.resolve(process.cwd(), "src", "content")

const slugPattern = /^[a-z0-9-]+$/

export function assertBuildGuideSlug(value: string, label = "slug"): string {
	if (!slugPattern.test(value)) throw new Error(`Invalid ${label}`)
	return value
}

export function assertGuideRoot(value: string): GuideRoot {
	if (!guideRoots.includes(value as GuideRoot))
		throw new Error("Invalid guide root")
	return value as GuideRoot
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

function getGuidesContentRoot(guideRoot: GuideRoot): string {
	return resolveBuildGuidePath(CONTENT_ROOT, guideRoot, "guides")
}

export function getBuildGuideDirectory(
	guideSlug: string,
	guideRoot: GuideRoot = "builds"
): string {
	return resolveBuildGuidePath(
		getGuidesContentRoot(guideRoot),
		assertBuildGuideSlug(guideSlug, "guide slug")
	)
}

export function getBuildGuideImagesDirectory(
	guideSlug: string,
	guideRoot: GuideRoot = "builds"
): string {
	return resolveBuildGuidePath(
		getBuildGuideDirectory(guideSlug, guideRoot),
		"images"
	)
}

export function getBuildGuideSectionDirectory(
	guideSlug: string,
	sectionSlug: string,
	guideRoot: GuideRoot = "builds"
): string {
	return resolveBuildGuidePath(
		getBuildGuideDirectory(guideSlug, guideRoot),
		"sections",
		assertBuildGuideSlug(sectionSlug, "section slug")
	)
}

export function getBuildGuideSectionFile(
	guideSlug: string,
	sectionSlug: string,
	guideRoot: GuideRoot = "builds"
): string {
	return resolveBuildGuidePath(
		getBuildGuideSectionDirectory(guideSlug, sectionSlug, guideRoot),
		"_section.svx"
	)
}

export function getBuildGuidePartFile(
	guideSlug: string,
	sectionSlug: string,
	partSlug: string,
	guideRoot: GuideRoot = "builds"
): string {
	return resolveBuildGuidePath(
		getBuildGuideSectionDirectory(guideSlug, sectionSlug, guideRoot),
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
