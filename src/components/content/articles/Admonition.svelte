<script lang="ts">
	import type { Snippet } from "svelte"
	let {
		type = "note",
		title,
		children
	}: {
		type?: "note" | "caution" | "danger" | "info" | "tip"
		title?: string
		children?: Snippet
	} = $props()
	const labels = {
		note: "Note",
		caution: "Caution",
		danger: "Danger",
		info: "Info",
		tip: "Tip"
	}
</script>

<aside
	class="my-5 rounded-2xl border-l-4 bg-surface-500/10 px-4 py-3 {type ===
	'danger'
		? 'border-red-500'
		: type === 'caution'
			? 'border-orange-500'
			: type === 'tip'
				? 'border-green-500'
				: type === 'info'
					? 'border-cyan-500'
					: 'border-yellow-500'}"
>
	<div class="font-semibold">{title || labels[type]}</div>
	<div class="mt-2">{@render children?.()}</div>
</aside>
