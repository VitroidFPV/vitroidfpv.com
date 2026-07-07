<script lang="ts">
	import BuildPartImage from "$components/BuildPartImage.svelte"
	import type { Picture } from "@sveltejs/enhanced-img"
	import { Dialog, Portal, Tooltip } from "@skeletonlabs/skeleton-svelte"
	import { Image, X } from "@lucide/svelte"

	let {
		src,
		alt,
		class: className = ""
	}: {
		src: Picture
		alt: string
		class?: string
	} = $props()

	let dialogOpen = $state(false)
	let tooltipClosing = $state(false)

	const dialogAnimation =
		"transition transition-discrete opacity-0 starting:data-[state=open]:opacity-0 data-[state=open]:opacity-100"
</script>

<Tooltip
	positioning={{ placement: "top" }}
	openDelay={0}
	closeDelay={50}
>
	<Tooltip.Trigger
		type="button"
		class={className}
		aria-label="View image of {alt}"
		onclick={() => (dialogOpen = true)}
		onpointerenter={() => (tooltipClosing = false)}
		onpointerleave={() => (tooltipClosing = true)}
		onfocus={() => (tooltipClosing = false)}
		onblur={() => (tooltipClosing = true)}
	>
		<Image class="size-7" />
	</Tooltip.Trigger>
	<Portal>
		<Tooltip.Positioner>
			<Tooltip.Content
				class="build-part-image-tooltip origin-bottom overflow-hidden rounded-2xl border border-surface-100-900 bg-surface-50-950 p-1 shadow-xl backdrop-blur-xs {tooltipClosing
					? 'tooltip-closing'
					: ''}"
			>
				<BuildPartImage
					{src}
					{alt}
					class="max-h-96 w-96"
					sizes="384px"
				/>
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
			class="fixed inset-0 z-50 flex items-center justify-center p-4"
		>
			<Dialog.Content
				class="relative flex max-h-svh max-w-svw items-center justify-center border-0 bg-transparent p-0 shadow-none {dialogAnimation}"
			>
				<Dialog.Title class="sr-only">{alt}</Dialog.Title>
				<Dialog.CloseTrigger
					class="absolute top-4 right-4 z-10 rounded-full bg-surface-50-950/80 p-2 text-surface-600-400 backdrop-blur-sm transition-colors hover:text-surface-950-50"
					aria-label="Close image"
				>
					<X class="size-6" />
				</Dialog.CloseTrigger>
				<BuildPartImage
					{src}
					{alt}
					class="max-h-[90svh]"
					sizes="100vw"
					fetchpriority="high"
					style="max-width: min(90svw, {src.img
						.w}px); max-height: min(90svh, {src.img.h}px)"
				/>
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
