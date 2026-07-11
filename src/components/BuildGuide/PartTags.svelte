<script lang="ts">
	import TagTooltip from "$components/BuildGuide/TagTooltip.svelte"
	import type { BuildGuidePartTag } from "$lib/builds/guide-sections"

	let {
		tags,
		price,
		priceClass,
		class: className = ""
	}: {
		tags: BuildGuidePartTag[]
		price?: string
		priceClass: string
		class?: string
	} = $props()
</script>

<div class="flex flex-wrap gap-1 {className}">
	{#if price}
		<span class={priceClass}>{price}</span>
	{/if}
	{#each tags as tag (tag.label)}
		{#if tag.tooltip}
			<TagTooltip
				label={tag.label}
				tooltip={tag.tooltip}
			/>
		{:else}
			<span
				class="rounded-full bg-surface-500/20 px-2 py-1 text-xs font-medium text-surface-900-100"
				>{tag.label}</span
			>
		{/if}
	{/each}
</div>
