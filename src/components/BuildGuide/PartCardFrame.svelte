<script lang="ts">
	import {
		guidePartColors,
		type GuidePartColor
	} from "$lib/builds/guide-sections"
	import type { Snippet } from "svelte"

	let {
		color,
		children
	}: {
		color: GuidePartColor
		children: Snippet
	} = $props()

	const colors = $derived(guidePartColors[color])
</script>

<div class="flex h-fit min-w-0 gap-2">
	<div
		class="mt-1 mb-3 w-1 shrink-0 self-stretch rounded-full {colors.bar}"
	></div>
	<div class="flex min-w-0 flex-1 flex-col gap-2">
		{@render children()}
	</div>
</div>
