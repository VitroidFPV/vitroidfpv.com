<script lang="ts">
	import blob from "$lib/assets/blob.svg"
	import type { Component, Snippet } from "svelte"

	let {
		title,
		content: Content,
		actions
	}: {
		title: string
		content?: Component
		actions?: Snippet
	} = $props()
</script>

<div
	class="relative isolate flex items-start justify-between gap-2 overflow-hidden border-y border-surface-500/10 bg-surface-50-950 py-10 md:py-12"
>
	<div
		aria-hidden="true"
		class="heading-glow pointer-events-none absolute inset-0 -z-10"
	></div>
	<div
		aria-hidden="true"
		class="heading-blob pointer-events-none absolute inset-0 -z-10 opacity-10"
		style:--heading-blob={`url("${blob}")`}
	></div>

	<div class="flex min-w-0 flex-1 flex-col gap-3">
		<h3
			class="h-fit font-josefin-sans text-5xl leading-none font-bold md:text-6xl"
		>
			{title}
		</h3>
		<div class="h-1 w-16 rounded-full bg-primary-500"></div>
		<div class="prose min-h-[1.5em] max-w-[100ch]">
			{#if Content}
				<Content />
			{/if}
		</div>
	</div>
	{#if actions}
		<div class="flex shrink-0 items-start gap-2 text-surface-500">
			{@render actions()}
		</div>
	{/if}
</div>

<style>
	.heading-glow {
		background:
			radial-gradient(
				circle at 24% 70%,
				color-mix(in oklab, var(--color-primary-500) 9%, transparent),
				transparent 28%
			),
			radial-gradient(
				circle at 78% 26%,
				color-mix(in oklab, var(--color-primary-500) 7%, transparent),
				transparent 24%
			);
	}

	.heading-blob {
		background: var(--color-primary-500);
		mask-image: var(--heading-blob);
		mask-position: center;
		mask-repeat: no-repeat;
		mask-size: cover;
	}
</style>
