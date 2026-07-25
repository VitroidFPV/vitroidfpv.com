import { describe, expect, test } from "bun:test"
import { quoteYamlScalar } from "./frontmatter"
import {
	formatParsedBuildGuideTags,
	parseBuildGuideTagsInput,
	serializeBuildGuidePart
} from "./part"
import { serializeBuildGuideSection } from "./section"
import { parseBuildGuidePartTag } from "../tags"

describe("build guide tags", () => {
	test("parses labels and tooltips", () => {
		expect(parseBuildGuidePartTag("30x30<Mounting pattern>")).toEqual({
			label: "30x30",
			tooltip: "Mounting pattern"
		})
		expect(parseBuildGuidePartTag("5g")).toEqual({ label: "5g" })
	})

	test("rejects malformed tags", () => {
		expect(() => parseBuildGuidePartTag("broken<tag")).toThrow(
			"Invalid build guide tag"
		)
	})

	test("parses and formats editor input", () => {
		expect(parseBuildGuideTagsInput("- One\nTwo<Details>\n")).toEqual([
			"One",
			"Two<Details>"
		])
		expect(
			formatParsedBuildGuideTags([
				{ label: "One" },
				{ label: "Two", tooltip: "Details" }
			])
		).toBe("One\nTwo<Details>")
	})
})

describe("build guide serialization", () => {
	test("quotes YAML scalars consistently", () => {
		expect(quoteYamlScalar("simple")).toBe("simple")
		expect(quoteYamlScalar('a: "value"')).toBe('"a: \\"value\\""')
	})

	test("serializes parts in the established format", () => {
		expect(
			serializeBuildGuidePart({
				title: "TBS Source One",
				url: "https://example.com",
				order: 1,
				color: "success",
				price: "$29.99",
				tags: ["30x30<Mounting>"],
				body: "Durable frame."
			})
		).toBe(
			[
				"---",
				"title: TBS Source One",
				"url: https://example.com",
				"order: 1",
				"color: success",
				"price: $29.99",
				"tags:",
				'  - "30x30<Mounting>"',
				"---",
				"Durable frame.",
				""
			].join("\n")
		)
	})

	test("serializes sections in the established format", () => {
		expect(
			serializeBuildGuideSection({
				title: "Frames",
				order: 1,
				body: "Choose a frame."
			})
		).toBe("---\ntitle: Frames\norder: 1\n---\nChoose a frame.\n")
	})
})
