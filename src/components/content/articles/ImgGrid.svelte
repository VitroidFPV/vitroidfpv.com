<script lang="ts">
	import type { Snippet } from "svelte"
	let { cols = 2, children }: { cols?: number; children?: Snippet } = $props()
</script>

<div
	class="article-image-grid my-4 grid items-center gap-4 {cols === 3
		? 'sm:grid-cols-3'
		: cols === 4
			? 'sm:grid-cols-4'
			: 'sm:grid-cols-2'}"
>
	{@render children?.()}
</div>
