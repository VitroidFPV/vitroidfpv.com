<script lang="ts">
	import TagTooltip from "$components/BuildGuide/TagTooltip.svelte"
	import type { BuildGuidePartTag } from "$lib/builds/guide-sections"

	let {
		tags,
		price,
		priceClass,
		displayContents = false,
		elevatedTooltips = false,
		class: className = ""
	}: {
		tags: BuildGuidePartTag[]
		price?: string
		priceClass: string
		displayContents?: boolean
		elevatedTooltips?: boolean
		class?: string
	} = $props()
</script>

<div
	class="{displayContents ? 'contents' : 'flex flex-wrap gap-1'} {className}"
>
	{#if price}
		<span class={priceClass}>{price}</span>
	{/if}
	{#each tags as tag (tag.label)}
		{#if tag.tooltip}
			<TagTooltip
				label={tag.label}
				tooltip={tag.tooltip}
				elevated={elevatedTooltips}
			/>
		{:else}
			<span
				class="flex items-center justify-center rounded-full bg-surface-500/10 px-2 py-1 text-[11px] font-medium text-surface-900-100 md:text-xs dark:bg-surface-500/20"
				>{tag.label}</span
			>
		{/if}
	{/each}
</div>
