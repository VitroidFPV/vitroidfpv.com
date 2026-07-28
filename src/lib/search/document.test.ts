import { describe, expect, test } from "bun:test"
import {
	buildGuidePartSearchDocumentId,
	buildGuidePartSearchUrl,
	buildGuideSectionSearchUrl,
	createSearchDocument,
	faqQuestionSearchUrl,
	faqSearchDocumentId
} from "./document"

describe("search documents", () => {
	test("creates stable content-based identifiers", () => {
		expect(faqSearchDocumentId("getting-started", "sims")).toBe(
			"faq:getting-started:sims"
		)
		expect(
			buildGuidePartSearchDocumentId(
				"5inch-beginner",
				"frames",
				"tbs-source-one-v6"
			)
		).toBe("build:part:5inch-beginner:frames:tbs-source-one-v6")
	})

	test("creates stable deep links", () => {
		expect(faqQuestionSearchUrl("getting-started-sims")).toBe(
			"/faq?question=getting-started-sims"
		)
		expect(buildGuideSectionSearchUrl("5inch-beginner", "frames")).toBe(
			"/builds/5inch-beginner#frames"
		)
		expect(
			buildGuidePartSearchUrl(
				"5inch-beginner",
				"5inch-beginner-frames-tbs-source-one-v6"
			)
		).toBe("/builds/5inch-beginner#5inch-beginner-frames-tbs-source-one-v6")
	})

	test("normalizes fields and rejects external destinations", () => {
		expect(
			createSearchDocument({
				id: " page:faq ",
				title: " FAQ ",
				body: " Many   answers ",
				description: "",
				keywords: " questions ",
				url: "/faq",
				collection: "page"
			})
		).toMatchObject({
			id: "page:faq",
			title: "FAQ",
			body: "Many answers",
			keywords: "questions"
		})

		expect(() =>
			createSearchDocument({
				id: "external",
				title: "External",
				body: "",
				description: "",
				keywords: "",
				url: "https://example.com",
				collection: "page"
			})
		).toThrow("site-relative URL")
	})
})
