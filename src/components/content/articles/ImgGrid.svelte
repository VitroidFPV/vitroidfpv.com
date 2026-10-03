<script lang="ts">
	import type { Snippet } from "svelte"
	let { cols = 2, children }: { cols?: number; children?: Snippet } = $props()
</script>

<div
	class="my-6 grid items-center gap-4 {cols === 3
		? 'sm:grid-cols-3'
		: cols === 4
			? 'sm:grid-cols-4'
			: 'sm:grid-cols-2'}"
>
	{@render children?.()}
</div>
