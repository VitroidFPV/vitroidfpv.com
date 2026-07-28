import { describe, expect, test } from "bun:test"
import { createSearchExcerpt, highlightText } from "./highlight"

describe("search result presentation", () => {
	test("splits matched text without creating HTML", () => {
		expect(highlightText("TBS Source One", ["source"])).toEqual([
			{ text: "TBS ", matched: false },
			{ text: "Source", matched: true },
			{ text: " One", matched: false }
		])
	})

	test("centers long excerpts around a matching term", () => {
		const excerpt = createSearchExcerpt(
			`${"intro ".repeat(50)}Velocidrone has excellent physics.${" end".repeat(50)}`,
			["Velocidrone"],
			100
		)

		expect(excerpt).toContain("Velocidrone")
		expect(excerpt.startsWith("…")).toBe(true)
		expect(excerpt.endsWith("…")).toBe(true)
	})
})
