import { describe, expect, test } from "bun:test"
import { createSearchDocument } from "./document"
import { createSearchIndex, searchFieldBoosts, searchIndex } from "./engine"
import type { SearchDocument } from "./types"

const documents: SearchDocument[] = [
	createSearchDocument({
		id: "faq:soldering",
		title: "Soldering tools",
		body: "Choose a temperature-controlled iron.",
		description: "Tools for clean joints.",
		keywords: "iron flux",
		section: "Building",
		url: "/faq?question=building-soldering-tools",
		collection: "faq"
	}),
	createSearchDocument({
		id: "page:workshop",
		title: "Workshop",
		body: "A soldering bench with storage.",
		description: "How the workspace is organized.",
		keywords: "",
		url: "/workshop",
		collection: "page"
	}),
	createSearchDocument({
		id: "build:motor",
		title: "Axisflying AE2207 V2",
		body: "A durable freestyle motor.",
		description: "A smooth 2207 motor.",
		keywords: "motor 5 inch",
		section: '5" Beginner · Motors',
		url: "/builds/5inch-beginner#axisflying-ae2207-v2",
		collection: "build"
	})
]

describe("MiniSearch configuration", () => {
	const index = createSearchIndex(documents)

	test("boosts title matches above body matches", () => {
		expect(searchFieldBoosts.title).toBeGreaterThan(searchFieldBoosts.body)
		expect(searchIndex(index, "soldering").map((result) => result.id)).toEqual([
			"faq:soldering",
			"page:workshop"
		])
	})

	test("supports prefix and conservative fuzzy matching", () => {
		expect(searchIndex(index, "axisf").at(0)?.id).toBe("build:motor")
		expect(searchIndex(index, "sodlering").at(0)?.id).toBe("faq:soldering")
	})

	test("filters by collection", () => {
		expect(
			searchIndex(index, "soldering", { collections: ["page"] }).map(
				(result) => result.id
			)
		).toEqual(["page:workshop"])
	})

	test("skips malformed stored fields instead of failing the query", () => {
		const brokenIndex = createSearchIndex([
			...documents,
			createSearchDocument({
				id: "broken:field",
				title: "Broken",
				body: "",
				description: "",
				keywords: "",
				url: "/broken",
				collection: "page"
			})
		])
		brokenIndex.replace({
			...createSearchDocument({
				id: "broken:field",
				title: "Broken",
				body: "",
				description: "",
				keywords: "",
				url: "/broken",
				collection: "page"
			}),
			title: 42 as unknown as string
		})

		expect(() => searchIndex(brokenIndex, "broken")).not.toThrow()
		expect(searchIndex(brokenIndex, "broken")).toEqual([])
	})

	test("skips duplicate document ids when building the index", () => {
		const duplicateIndex = createSearchIndex([
			...documents,
			documents[0],
			createSearchDocument({
				id: "faq:soldering",
				title: "Duplicate soldering",
				body: "Should be ignored.",
				description: "",
				keywords: "",
				url: "/faq?question=duplicate",
				collection: "faq"
			})
		])

		expect(searchIndex(duplicateIndex, "soldering").map((result) => result.id)).toEqual(
			["faq:soldering", "page:workshop"]
		)
	})
})
