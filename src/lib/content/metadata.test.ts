import { describe, expect, test } from "bun:test"
import {
	parsePageMetadata,
	readMetadataRecord,
	readOptionalBoolean,
	readOptionalNumber,
	readOptionalRecord,
	readOptionalString,
	readRequiredArray,
	readRequiredBoolean,
	readRequiredNumber,
	readRequiredRecord,
	readRequiredString
} from "./metadata"

describe("SVX metadata readers", () => {
	const source = "src/content/example.svx"
	const raw = {
		title: "Example",
		count: 3,
		enabled: true,
		items: ["one"],
		details: { key: "value" }
	}
	const metadata = readMetadataRecord(raw, source)

	test("reads required values", () => {
		expect(readRequiredString(metadata, "title", source)).toBe("Example")
		expect(readRequiredNumber(metadata, "count", source)).toBe(3)
		expect(readRequiredBoolean(metadata, "enabled", source)).toBe(true)
		expect(readRequiredArray(metadata, "items", source)).toEqual(["one"])
		expect(readRequiredRecord(metadata, "details", source)).toEqual({
			key: "value"
		})
	})

	test("returns undefined for omitted optional values", () => {
		expect(readOptionalString(metadata, "missing", source)).toBeUndefined()
		expect(readOptionalNumber(metadata, "missing", source)).toBeUndefined()
		expect(readOptionalBoolean(metadata, "missing", source)).toBeUndefined()
		expect(readOptionalRecord(metadata, "missing", source)).toBeUndefined()
	})

	test("includes the source and field in validation errors", () => {
		expect(() => readRequiredNumber(metadata, "title", source)).toThrow(
			`Invalid metadata in "${source}": field "title"`
		)
	})

	test("parses page metadata", () => {
		expect(
			parsePageMetadata(
				{ title: "FAQ", description: "Answers", seoDescription: "SEO" },
				source
			)
		).toEqual({
			title: "FAQ",
			description: "Answers",
			seoDescription: "SEO"
		})
	})
})
