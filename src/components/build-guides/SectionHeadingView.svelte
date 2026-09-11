<script lang="ts">
	import blob from "$lib/assets/blob.svg"
	import type { Component, Snippet } from "svelte"
	import type { Attachment } from "svelte/attachments"

	let {
		title,
		content: Content,
		heading,
		description,
		actions
	}: {
		title: string
		content?: Component
		heading?: Snippet
		description?: Snippet
		actions?: Snippet
	} = $props()

	let isViewportBelowHeading = $state(false)

	const trackHeadingPosition: Attachment = (element) => {
		let observer: IntersectionObserver

		const observeActivationLine = () => {
			observer?.disconnect()

			const activationLine = window.innerHeight * 0.6
			observer = new IntersectionObserver(
				([entry]) => {
					isViewportBelowHeading =
						entry.boundingClientRect.bottom <= activationLine
				},
				{ rootMargin: `-${activationLine}px 0px 0px` }
			)

			observer.observe(element)
		}

		observeActivationLine()
		window.addEventListener("resize", observeActivationLine)

		return () => {
			observer.disconnect()
			window.removeEventListener("resize", observeActivationLine)
		}
	}
</script>

<div
	class={[
		"section-heading relative isolate flex items-start justify-between gap-2 overflow-hidden py-10 md:py-12",
		{ "is-viewport-below-heading": isViewportBelowHeading }
	]}
>
	<div
		{@attach trackHeadingPosition}
		aria-hidden="true"
		class="pointer-events-none absolute top-1/2 left-0 size-px"
	></div>
	<div
		aria-hidden="true"
		class="heading-background pointer-events-none absolute inset-0 -z-10"
	>
		<div
			class="absolute inset-0 border-y border-surface-500/10 bg-surface-50-950"
		></div>
		<div class="heading-glow absolute inset-0"></div>
		<div
			class="heading-blob absolute inset-0 opacity-10"
			style:--heading-blob={`url("${blob}")`}
		></div>
	</div>

	<div class="flex min-w-0 flex-1 flex-col gap-3">
		<div class="flex w-fit max-w-full flex-col">
			{#if heading}
				{@render heading()}
			{:else}
				<h3
					class="h-fit font-josefin-sans text-5xl leading-none font-bold md:text-6xl"
				>
					{title}
				</h3>
			{/if}
			<div
				class={`h-1 w-full rounded-full duration-300 ${isViewportBelowHeading ? " bg-primary-500" : " bg-surface-500"}`}
			></div>
		</div>
		<div class="prose min-h-[1.5em] max-w-[100ch]">
			{#if description}
				{@render description()}
			{:else if Content}
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
	.heading-background {
		mask-image: linear-gradient(
			to right,
			transparent,
			black 6%,
			black 94%,
			transparent
		);
	}

	.heading-glow,
	.heading-blob {
		color: var(--color-surface-500);
		transition: color 300ms ease;
	}

	.section-heading.is-viewport-below-heading .heading-glow,
	.section-heading.is-viewport-below-heading .heading-blob {
		color: var(--color-primary-500);
	}

	.heading-glow {
		background:
			radial-gradient(
				circle at 24% 70%,
				color-mix(in oklab, currentColor 12%, transparent),
				transparent 28%
			),
			radial-gradient(
				circle at 78% 26%,
				color-mix(in oklab, currentColor 9%, transparent),
				transparent 24%
			);
	}

	.heading-blob {
		background: currentColor;
		mask-image: var(--heading-blob);
		mask-position: center;
		mask-repeat: no-repeat;
		mask-size: cover;
	}

	@media (prefers-reduced-motion: reduce) {
		.heading-glow,
		.heading-blob {
			transition: none;
		}
	}
</style>
