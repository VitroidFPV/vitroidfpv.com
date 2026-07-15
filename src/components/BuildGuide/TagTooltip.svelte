<script lang="ts">
	import { Portal, Tooltip } from "@skeletonlabs/skeleton-svelte"
	import { Info } from "@lucide/svelte"

	let {
		label,
		tooltip,
		durationMs = 150,
		elevated = false
	}: {
		label: string
		tooltip: string
		durationMs?: number
		elevated?: boolean
	} = $props()

	let tooltipClosing = $state(false)
	let open = $state(false)

	function handleOpenChange(details: { open: boolean }) {
		open = details.open
	}

	function toggleOpen() {
		open = !open
		tooltipClosing = !open
	}
</script>

<Tooltip
	{open}
	positioning={{ placement: "top" }}
	openDelay={0}
	closeDelay={durationMs}
	closeOnPointerDown={false}
	closeOnClick={false}
	onOpenChange={handleOpenChange}
>
	<Tooltip.Trigger
		class="rounded-full bg-surface-500/20 px-2 py-1 text-[11px] font-medium text-surface-900-100 md:text-xs"
		onclick={toggleOpen}
		onpointerenter={() => (tooltipClosing = false)}
		onpointerleave={() => (tooltipClosing = true)}
		onfocus={() => (tooltipClosing = false)}
		onblur={() => (tooltipClosing = true)}
	>
		<div class="flex items-center gap-1">
			{label}
			<Info class="size-4" />
		</div>
	</Tooltip.Trigger>
	<Portal>
		<Tooltip.Positioner class={elevated ? "z-20!" : undefined}>
			<Tooltip.Content
				class="build-tooltip-content origin-bottom rounded-full border border-surface-500/20 bg-surface-100-900/30 px-2 py-1 text-xs font-medium text-surface-900-100 backdrop-blur-sm {tooltipClosing
					? 'tooltip-closing'
					: ''}"
			>
				{tooltip}
			</Tooltip.Content>
		</Tooltip.Positioner>
	</Portal>
</Tooltip>

<style>
	:global(.build-tooltip-content:not([hidden]):not(.tooltip-closing)) {
		animation: build-tooltip-scale-in 150ms ease;
	}

	:global(.build-tooltip-content.tooltip-closing:not([hidden])) {
		opacity: 0;
		scale: 0.9;
		transition:
			transform 150ms ease,
			opacity 150ms ease;
	}

	@keyframes build-tooltip-scale-in {
		from {
			opacity: 0;
			scale: 0.9;
		}

		to {
			opacity: 1;
			scale: 1;
		}
	}
</style>
