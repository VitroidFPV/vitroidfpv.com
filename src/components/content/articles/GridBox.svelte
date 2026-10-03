<script lang="ts">
	import type { Snippet } from "svelte"

	let {
		title,
		level,
		cols = 2,
		children
	}: {
		title?: string
		level?: number
		cols?: number
		classes?: string
		children?: Snippet
	} = $props()
</script>

<div class="my-4">
	{#if title}<svelte:element
			this={level ? `h${level}` : "h3"}
			class="mb-3 text-xl font-semibold">{title}</svelte:element
		>{/if}
	<div
		class="article-image-grid grid gap-4 {cols === 3
			? 'sm:grid-cols-3'
			: cols === 4
				? 'sm:grid-cols-4'
				: 'sm:grid-cols-2'}"
	>
		{@render children?.()}
	</div>
</div>
