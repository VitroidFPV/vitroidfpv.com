<script lang="ts">
	import type { Snippet } from "svelte"
	let { children }: { children?: Snippet } = $props()
</script>

<div
	class="my-6 rounded-2xl border border-surface-500/20 bg-surface-500/5 p-2 sm:p-4"
>
	{@render children?.()}
</div>
