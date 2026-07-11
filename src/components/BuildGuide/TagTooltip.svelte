<script lang="ts">
	import { Portal, Tooltip } from "@skeletonlabs/skeleton-svelte"

	let {
		label,
		tooltip,
		durationMs = 150
	}: {
		label: string
		tooltip: string
		durationMs?: number
	} = $props()

	let tooltipClosing = $state(false)
</script>

<Tooltip
	positioning={{ placement: "top" }}
	openDelay={0}
	closeDelay={durationMs}
>
	<Tooltip.Trigger
		class="rounded-full bg-surface-500/20 px-2 py-1 text-[11px] font-medium text-surface-900-100 md:text-xs"
		onpointerenter={() => (tooltipClosing = false)}
		onpointerleave={() => (tooltipClosing = true)}
		onfocus={() => (tooltipClosing = false)}
		onblur={() => (tooltipClosing = true)}
	>
		{label}
	</Tooltip.Trigger>
	<Portal>
		<Tooltip.Positioner>
			<Tooltip.Content
				class="build-tooltip-content origin-bottom rounded-full bg-surface-200-800/20 px-2 py-1 text-xs font-medium text-surface-900-100 backdrop-blur-xs {tooltipClosing
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
