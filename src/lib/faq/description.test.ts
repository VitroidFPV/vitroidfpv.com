import { describe, expect, test } from "bun:test"
import { createFaqQuestionDescription } from "./description"

describe("FAQ question descriptions", () => {
	test("creates plain-text metadata from an SVX answer", () => {
		const source = `---
title: What should I get?
order: 1
---

<script lang="ts">
	import Example from "./Example.svelte"
</script>

Start with a [good radio](/equipment) and a simulator.

- Then add goggles.
- Finally, choose a drone.

<Example value="hidden" />
`

		expect(createFaqQuestionDescription(source)).toBe(
			"Start with a good radio and a simulator. Then add goggles. Finally, choose a drone."
		)
	})

	test("truncates long answers at a word boundary", () => {
		const description = createFaqQuestionDescription(
			`---\ntitle: Long\norder: 1\n---\n${"answer ".repeat(100)}`
		)

		expect(description.length).toBeLessThanOrEqual(320)
		expect(description.endsWith("…")).toBe(true)
	})
})
