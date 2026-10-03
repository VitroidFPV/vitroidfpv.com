<script lang="ts">
	import type { Snippet } from "svelte"
	let { tooltip, children }: { tooltip?: string; children?: Snippet } = $props()
</script>

<span
	title={tooltip}
	class="inline-flex rounded-full border border-surface-500/20 bg-surface-500/10 px-2 py-1 text-sm"
>
	{@render children?.()}
</span>
