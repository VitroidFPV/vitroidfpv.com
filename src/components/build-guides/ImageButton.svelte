<script lang="ts">
	import PartImage from "$components/build-guides/PartImage.svelte"
	import type { Picture } from "@sveltejs/enhanced-img"
	import { Dialog, Portal, Tooltip } from "@skeletonlabs/skeleton-svelte"
	import { Image, X } from "@lucide/svelte"
	import type { Snippet } from "svelte"

	let {
		src,
		alt,
		class: className = "",
		trigger,
		showTooltip = true
	}: {
		src: Picture
		alt: string
		class?: string
		trigger?: Snippet
		showTooltip?: boolean
	} = $props()

	let dialogOpen = $state(false)
	let dialogImageLoaded = $state(false)
	let previewLoaded = $state(false)
	let tooltipOpen = $state(false)
	let tooltipClosing = $state(false)

	function openDialog() {
		dialogImageLoaded = false
		dialogOpen = true
	}
</script>

<Tooltip
	positioning={{ placement: "top" }}
	openDelay={0}
	closeDelay={50}
	disabled={!showTooltip}
	onOpenChange={(details: { open: boolean }) => (tooltipOpen = details.open)}
>
	<Tooltip.Trigger
		type="button"
		class="relative {className}"
		aria-label="View image of {alt}"
		onclick={openDialog}
		onpointerenter={() => (tooltipClosing = false)}
		onpointerleave={() => (tooltipClosing = true)}
		onfocus={() => (tooltipClosing = false)}
		onblur={() => (tooltipClosing = true)}
	>
		{#if showTooltip}
			<span
				aria-hidden="true"
				class="pointer-events-none absolute inset-0 overflow-hidden opacity-0"
			>
				<PartImage
					{src}
					alt=""
					sizes="384px"
					loading="lazy"
					fetchpriority="low"
					onload={() => (previewLoaded = true)}
				/>
			</span>
		{/if}
		{#if trigger}
			{@render trigger()}
		{:else}
			<Image class="size-6 md:size-7" />
		{/if}
	</Tooltip.Trigger>
	<Portal>
		<Tooltip.Positioner class="z-40!">
			<Tooltip.Content
				class="build-part-image-tooltip origin-bottom overflow-hidden rounded-2xl border border-surface-100-900 bg-surface-50-950 p-1 shadow-xl backdrop-blur-xs {tooltipClosing
					? 'tooltip-closing'
					: ''}"
			>
				{#if tooltipOpen}
					<PartImage
						{src}
						{alt}
						class="max-h-96 w-96"
						sizes="384px"
					/>
				{/if}
			</Tooltip.Content>
		</Tooltip.Positioner>
	</Portal>
</Tooltip>

<Dialog
	open={dialogOpen}
	onOpenChange={(details: { open: boolean }) => (dialogOpen = details.open)}
>
	<Portal>
		<Dialog.Backdrop
			class="fixed inset-0 z-50 bg-surface-50-950/80 backdrop-blur-sm"
		/>
		<Dialog.Positioner
			class="fixed inset-0 z-50 flex items-center justify-center p-1 md:p-4"
		>
			<Dialog.Content
				class="relative flex max-h-svh max-w-svw items-center justify-center border-0 bg-transparent p-0 shadow-none"
				style="width: min(100svw, {src.img.w}px, {(90 * src.img.w) /
					src.img.h}svh); aspect-ratio: {src.img.w} / {src.img.h}"
			>
				<Dialog.Title class="sr-only">{alt}</Dialog.Title>
				<Dialog.CloseTrigger
					class="absolute top-2 right-2 z-10 rounded-full bg-surface-50-950/80 p-2 text-surface-600-400 backdrop-blur-sm transition-colors hover:text-surface-950-50 md:top-4 md:right-4"
					aria-label="Close image"
				>
					<X class="size-5 md:size-6" />
				</Dialog.CloseTrigger>
				{#if previewLoaded || dialogOpen}
					<div
						aria-hidden="true"
						class="pointer-events-none absolute inset-0 overflow-hidden rounded-xl motion-safe:transition-opacity motion-safe:duration-100 {dialogImageLoaded
							? 'opacity-0'
							: 'opacity-100'}"
					>
						<PartImage
							{src}
							alt=""
							class="max-h-[90svh]"
							sizes="384px"
							style="max-width: min(100svw, {src.img
								.w}px); max-height: min(90svh, {src.img.h}px)"
						/>
					</div>
				{/if}
				{#if dialogOpen}
					<PartImage
						{src}
						{alt}
						class="max-h-[90svh] motion-safe:transition-opacity motion-safe:duration-100 {dialogImageLoaded
							? 'opacity-100'
							: 'opacity-0'}"
						sizes="100vw"
						fetchpriority="high"
						onload={() => (dialogImageLoaded = true)}
						style="max-width: min(100svw, {src.img
							.w}px); max-height: min(90svh, {src.img.h}px)"
					/>
				{/if}
			</Dialog.Content>
		</Dialog.Positioner>
	</Portal>
</Dialog>

<style>
	:global(.build-part-image-tooltip:not([hidden]):not(.tooltip-closing)) {
		animation: build-part-image-tooltip-in 150ms ease;
	}

	:global(.build-part-image-tooltip.tooltip-closing:not([hidden])) {
		opacity: 0;
		scale: 0.95;
		transition:
			transform 150ms ease,
			opacity 150ms ease;
	}

	@keyframes build-part-image-tooltip-in {
		from {
			opacity: 0;
			scale: 0.95;
		}

		to {
			opacity: 1;
			scale: 1;
		}
	}
</style>
