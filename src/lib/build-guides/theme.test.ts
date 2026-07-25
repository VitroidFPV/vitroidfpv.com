import { describe, expect, test } from "bun:test"
import {
	buildGuideAccentValues,
	buildGuideColors,
	resolveBuildGuideAccent
} from "./theme"

describe("build guide colors", () => {
	test("keeps the brand primary color when no color is supplied", () => {
		expect(resolveBuildGuideAccent(undefined, "guide.svx")).toBe("primary")
	})

	test("supports the success, warning, and error palettes", () => {
		expect(buildGuideColors).toEqual(["success", "warning", "error"])

		for (const color of buildGuideColors) {
			expect(resolveBuildGuideAccent(color, "guide.svx")).toBe(color)
			expect(buildGuideAccentValues[color].primary500).toBe(
				`var(--color-${color}-500)`
			)
			expect(buildGuideAccentValues[color].themeColor).toMatch(/^#[0-9A-F]{6}$/)
		}
	})

	test("rejects unknown guide colors", () => {
		expect(() => resolveBuildGuideAccent("secondary", "guide.svx")).toThrow(
			'unknown build guide color "secondary"'
		)
	})
})
