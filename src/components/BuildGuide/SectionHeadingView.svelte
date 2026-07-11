<script lang="ts">
	import type { Snippet } from "svelte"

	let {
		title,
		description,
		actions
	}: {
		title: string
		description: string
		actions?: Snippet
	} = $props()
</script>

<div class="flex items-start justify-between gap-2">
	<div class="flex min-w-0 flex-1 flex-col gap-2">
		<h3 class="h-18 font-josefin-sans text-5xl font-bold md:text-6xl">
			{title}
		</h3>
		<div class="prose min-h-[1.5em]">
			{#if description.trim()}
				<p>{description}</p>
			{/if}
		</div>
	</div>
	{#if actions}
		<div class="flex shrink-0 items-start gap-2 text-surface-500">
			{@render actions()}
		</div>
	{/if}
</div>
