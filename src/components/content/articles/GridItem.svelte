<script lang="ts">
	import type { Snippet } from "svelte"
	let {
		title,
		children
	}: { title?: string; cols?: number; children?: Snippet } = $props()
</script>

<div class="rounded-2xl border border-surface-500/20 bg-surface-500/5 p-4">
	{#if title}<h4 class="mb-2 text-lg font-semibold">{title}</h4>{/if}
	{@render children?.()}
</div>
