<script lang="ts">
	import type { Component, Snippet } from "svelte"

	let {
		title,
		content: Content,
		actions
	}: {
		title: string
		content?: Component
		actions?: Snippet
	} = $props()
</script>

<div class="flex items-start justify-between gap-2 pt-8 md:pt-16">
	<div class="flex min-w-0 flex-1 flex-col gap-2">
		<h3 class="h-fit font-josefin-sans text-5xl font-bold md:h-18 md:text-6xl">
			{title}
		</h3>
		<div class="prose min-h-[1.5em] max-w-[100ch]">
			{#if Content}
				<Content />
			{/if}
		</div>
	</div>
	{#if actions}
		<div class="flex shrink-0 items-start gap-2 text-surface-500">
			{@render actions()}
		</div>
	{/if}
</div>
