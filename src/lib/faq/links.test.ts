import { describe, expect, test } from "bun:test"
import { getFaqQuestionIdFromUrl, getFaqQuestionUrl } from "./links"

describe("FAQ question links", () => {
	test("reads a question identifier from the query string", () => {
		const url = new URL(
			"https://vitroidfpv.com/faq?question=building-soldering"
		)

		expect(getFaqQuestionIdFromUrl(url)).toBe("building-soldering")
	})

	test("returns null for a missing or empty question identifier", () => {
		expect(
			getFaqQuestionIdFromUrl(new URL("https://vitroidfpv.com/faq"))
		).toBeNull()
		expect(
			getFaqQuestionIdFromUrl(
				new URL("https://vitroidfpv.com/faq?question=%20")
			)
		).toBeNull()
	})

	test("creates a query-based link without other query or hash values", () => {
		const url = new URL(
			"https://vitroidfpv.com/faq?preview=true#building-soldering"
		)

		expect(getFaqQuestionUrl(url, "getting-started-costs")).toBe(
			"https://vitroidfpv.com/faq?question=getting-started-costs"
		)
	})
})
