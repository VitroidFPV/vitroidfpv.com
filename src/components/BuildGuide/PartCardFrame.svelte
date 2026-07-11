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
		class="w-1 shrink-0 self-stretch rounded-full md:my-1 {colors.bar}"
	></div>
	<div class="flex min-w-0 flex-1 flex-col gap-1 md:gap-2">
		{@render children()}
	</div>
</div>
