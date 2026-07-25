import { describe, expect, test } from "bun:test"
import path from "node:path"
import {
	assertBuildGuideSlug,
	getBuildGuideSectionFile,
	isPathContained,
	resolveBuildGuidePath
} from "./files"
import { getBuildGuidePartId } from "../../build-guides/types"

describe("build guide filesystem paths", () => {
	test("rejects unsafe slugs", () => {
		expect(() => assertBuildGuideSlug("../escape")).toThrow("Invalid slug")
		expect(() => assertBuildGuideSlug("Uppercase")).toThrow("Invalid slug")
		expect(assertBuildGuideSlug("5inch-beginner")).toBe("5inch-beginner")
	})

	test("constructs contained paths safely", () => {
		const root = path.resolve("temporary-guide-root")
		const target = resolveBuildGuidePath(
			root,
			"5inch-beginner",
			"sections",
			"frames"
		)
		expect(isPathContained(root, target)).toBe(true)
		expect(() => resolveBuildGuidePath(root, "..", "escape")).toThrow(
			"Invalid build guide path"
		)
	})

	test("keeps section descriptors first in alphabetic file trees", () => {
		expect(
			path.basename(getBuildGuideSectionFile("5inch-beginner", "frames"))
		).toBe("_section.svx")
	})

	test("preserves stable persisted part identifiers", () => {
		expect(
			getBuildGuidePartId("5inch-beginner", "frames", "tbs-source-one-v5")
		).toBe("5inch-beginner-frames-tbs-source-one-v5")
	})
})
