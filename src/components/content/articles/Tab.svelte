<script lang="ts">
	import type { Snippet } from "svelte"
	let {
		tabTitle = "Tab",
		open = false,
		children
	}: {
		tabTitle?: string
		open?: boolean
		children?: Snippet
	} = $props()
</script>

<details
	{open}
	class="mb-2 rounded-xl border border-surface-500/20"
>
	<summary class="cursor-pointer px-3 py-2 font-semibold hover:text-primary-500"
		>{tabTitle}</summary
	>
	<div class="p-3">{@render children?.()}</div>
</details>
