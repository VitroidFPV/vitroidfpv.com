import { describe, expect, test } from "bun:test"
import {
	createSearchExcerpt,
	createSearchResultExcerpt,
	highlightText
} from "./highlight"

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

	test("shows the matching article body when its description does not match", () => {
		const excerpt = createSearchResultExcerpt(
			"A guide to FPV batteries",
			`${"Introduction to batteries. ".repeat(20)}Balance charging protects the cells.`,
			["charging"],
			100
		)

		expect(excerpt).toContain("charging")
		expect(highlightText(excerpt, ["charging"])).toContainEqual({
			text: "charging",
			matched: true
		})
	})

	test("keeps the description when it contains the match", () => {
		expect(
			createSearchResultExcerpt(
				"Balance charging basics",
				"A much longer explanation of charging batteries",
				["charging"]
			)
		).toBe("Balance charging basics")
	})
})
