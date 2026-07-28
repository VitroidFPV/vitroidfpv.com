import { describe, expect, test } from "bun:test"
import { svxToPlainText } from "./svx"

describe("SVX search text", () => {
	test("keeps authored content and useful product details", () => {
		const source = `---
title: Example
price: $29.95
---

<script lang="ts">
	import { Image } from "@lucide/svelte"
</script>

## TBS Source One V6

Use the [30x30 stack](/builds) with **2207E motors** for about $29.95.

<Image class="size-4" />
`

		expect(svxToPlainText(source)).toBe(
			"TBS Source One V6 Use the 30x30 stack with 2207E motors for about $29.95."
		)
	})

	test("removes component and control syntax without rendering HTML", () => {
		expect(
			svxToPlainText(
				'{#if visible}<Widget value="hidden" />Safe &amp; searchable{/if}'
			)
		).toBe("Safe & searchable")
	})

	test("keeps wrapper component body before a self-closing tag", () => {
		const source = `# Heading
<Note>
Important safety warning about LiPo batteries.
</Note>
Regular paragraph with a TBS Source One frame.
<Image src="x.png" />
Trailing text after the image.`

		expect(svxToPlainText(source)).toBe(
			"Heading Important safety warning about LiPo batteries. Regular paragraph with a TBS Source One frame. Trailing text after the image."
		)
	})

	test("preserves underscores in model numbers", () => {
		expect(svxToPlainText("Model AE2207_V2")).toBe("Model AE2207_V2")
	})
})
