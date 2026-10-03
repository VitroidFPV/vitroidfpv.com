<script lang="ts">
	import type { ArticleDateDisplay } from "$lib/format-article-date"
	import { Portal, Tooltip } from "@skeletonlabs/skeleton-svelte"

	let {
		postedDate,
		updatedDate
	}: {
		postedDate?: ArticleDateDisplay
		updatedDate?: ArticleDateDisplay
	} = $props()

	let tooltipClosing = $state(false)
</script>

{#if updatedDate}
	{#if postedDate}
		<Tooltip
			positioning={{ placement: "top" }}
			openDelay={300}
			closeDelay={150}
		>
			<Tooltip.Trigger
				type="button"
				class="relative z-10 flex cursor-default flex-wrap gap-x-2 text-left font-geist-mono"
				onpointerenter={() => (tooltipClosing = false)}
				onpointerleave={() => (tooltipClosing = true)}
				onfocus={() => (tooltipClosing = false)}
				onblur={() => (tooltipClosing = true)}
			>
				<span class="text-surface-600-400"
					>{updatedDate.relative ? "Updated" : "Updated On"}</span
				>
				<span class="font-bold text-surface-950-50">{updatedDate.text}</span>
			</Tooltip.Trigger>
			<Portal>
				<Tooltip.Positioner>
					<Tooltip.Content
						class="article-date-tooltip origin-bottom rounded-md border border-surface-500/30 bg-surface-50-950 px-2 py-1 text-xs text-surface-950-50 shadow-sm {tooltipClosing
							? 'tooltip-closing'
							: ''}"
					>
						Originally posted {postedDate.text}
					</Tooltip.Content>
				</Tooltip.Positioner>
			</Portal>
		</Tooltip>
	{:else}
		<div class="flex flex-wrap gap-x-2 font-geist-mono">
			<span class="text-surface-600-400"
				>{updatedDate.relative ? "Updated" : "Updated On"}</span
			>
			<span class="font-bold text-surface-950-50">{updatedDate.text}</span>
		</div>
	{/if}
{:else if postedDate}
	<div class="flex flex-wrap gap-x-2 font-geist-mono">
		<span class="text-surface-600-400"
			>{postedDate.relative ? "Posted" : "Posted On"}</span
		>
		<span class="font-bold text-surface-950-50">{postedDate.text}</span>
	</div>
{/if}

<style>
	:global(.article-date-tooltip:not([hidden]):not(.tooltip-closing)) {
		animation: article-date-tooltip-in 150ms ease;
	}

	:global(.article-date-tooltip.tooltip-closing:not([hidden])) {
		opacity: 0;
		scale: 0.9;
		transition:
			transform 150ms ease,
			opacity 150ms ease;
	}

	@keyframes article-date-tooltip-in {
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
