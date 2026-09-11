import { describe, expect, test } from "bun:test"
import {
	catalogSearchDocumentId,
	catalogSearchUrl,
	createSearchDocument,
	faqQuestionSearchUrl,
	faqSearchDocumentId,
	guidePartSearchDocumentId,
	guidePartSearchUrl,
	guideSectionSearchDocumentId,
	guideSectionSearchUrl
} from "./document"

describe("search documents", () => {
	test("creates stable content-based identifiers", () => {
		expect(faqSearchDocumentId("getting-started", "sims")).toBe(
			"faq:getting-started:sims"
		)
		expect(
			guidePartSearchDocumentId(
				"build",
				"5inch-beginner",
				"frames",
				"tbs-source-one-v6"
			)
		).toBe("build:part:5inch-beginner:frames:tbs-source-one-v6")
		expect(guideSectionSearchDocumentId("equipment", "video", "goggles")).toBe(
			"equipment:section:video:goggles"
		)
		expect(catalogSearchDocumentId("equipment", "video")).toBe(
			"equipment:catalog:video"
		)
	})

	test("creates stable deep links", () => {
		expect(faqQuestionSearchUrl("getting-started-sims")).toBe(
			"/faq?question=getting-started-sims"
		)
		expect(guideSectionSearchUrl("/builds", "5inch-beginner", "frames")).toBe(
			"/builds/5inch-beginner#frames"
		)
		expect(
			guidePartSearchUrl(
				"/builds",
				"5inch-beginner",
				"5inch-beginner-frames-tbs-source-one-v6"
			)
		).toBe("/builds/5inch-beginner#5inch-beginner-frames-tbs-source-one-v6")
		expect(catalogSearchUrl("/equipment", "video")).toBe("/equipment#video")
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
