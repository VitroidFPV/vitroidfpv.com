<script lang="ts">
	import type { Snippet } from "svelte"
	import {
		CircleAlert,
		Flame,
		Info,
		Lightbulb,
		TriangleAlert
	} from "@lucide/svelte"
	import Corner from "$components/graphics/Corner.svelte"

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
	const icons = {
		note: Info,
		caution: TriangleAlert,
		danger: Flame,
		info: CircleAlert,
		tip: Lightbulb
	}
	let Icon = $derived(icons[type])
	const colors = {
		note: {
			background: "bg-yellow-500",
			containerBackground: "bg-yellow-500/10",
			border: "border-yellow-500",
			text: "text-yellow-500"
		},
		caution: {
			background: "bg-orange-500",
			containerBackground: "bg-orange-500/10",
			border: "border-orange-500",
			text: "text-orange-500"
		},
		danger: {
			background: "bg-red-500",
			containerBackground: "bg-red-500/10",
			border: "border-red-500",
			text: "text-red-500"
		},
		info: {
			background: "bg-cyan-500",
			containerBackground: "bg-cyan-500/10",
			border: "border-cyan-500",
			text: "text-cyan-500"
		},
		tip: {
			background: "bg-primary-500",
			containerBackground: "bg-primary-500/10",
			border: "border-primary-500",
			text: "text-primary-500"
		}
	}
</script>

<aside
	class="relative my-5 rounded-2xl border-2 px-4 py-3 pt-10 {colors[type]
		.containerBackground} {colors[type].border}"
>
	<div
		class="absolute top-0 left-0 flex items-center gap-2 rounded-tl-xl rounded-br-2xl px-3 py-2 {colors[
			type
		].background} text-black"
	>
		<Icon
			size={24}
			aria-hidden="true"
		/>
		{title || labels[type]}
		<Corner class="absolute top-0 left-full rotate-180 {colors[type].text}" />
		<Corner class="absolute top-full left-0 rotate-180 {colors[type].text}" />
	</div>
	<div>
		{@render children?.()}
	</div>
</aside>
