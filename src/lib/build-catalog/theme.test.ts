import { describe, expect, test } from "bun:test"
import { buildCatalogAccents, resolveBuildCatalogAccent } from "./theme"

describe("build catalog accents", () => {
	test("uses success as the default green range accent", () => {
		expect(buildCatalogAccents).toEqual(["success", "warning", "error"])
		expect(resolveBuildCatalogAccent(undefined, "catalog.svx")).toBe("success")
	})

	test("does not allow the brand-primary color as a range accent", () => {
		expect(() => resolveBuildCatalogAccent("primary", "catalog.svx")).toThrow(
			'unknown build accent "primary"'
		)
	})
})
