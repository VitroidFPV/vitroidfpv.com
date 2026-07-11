<script lang="ts">
	import ImageButton from "$components/BuildGuide/ImageButton.svelte"
	import PartCardFrame from "$components/BuildGuide/PartCardFrame.svelte"
	import PartTags from "$components/BuildGuide/PartTags.svelte"
	import {
		guidePartColors,
		type BuildGuidePartTag,
		type GuidePartColor
	} from "$lib/builds/guide-sections"
	import type { Picture } from "@sveltejs/enhanced-img"
	import { Plus } from "@lucide/svelte"
	import type { Component, Snippet } from "svelte"

	let {
		title,
		url,
		color,
		price,
		tags,
		image,
		imageAlt,
		Description,
		actions,
		footer
	}: {
		title: string
		url: string
		color: GuidePartColor
		price?: string
		tags: BuildGuidePartTag[]
		image: Picture | null
		imageAlt: string
		Description: Component
		actions?: Snippet
		footer?: Snippet
	} = $props()

	const colors = $derived(guidePartColors[color])
</script>

<PartCardFrame {color}>
	<div class="flex min-w-0 items-center justify-between gap-2">
		<a
			href={url}
			class={colors.link}
			target="_blank"
			rel="external noopener noreferrer">{title}</a
		>

		<div class="flex shrink-0 items-center gap-2 text-surface-500">
			<button
				type="button"
				class={colors.iconHover}
				aria-label="Add to build list"
			>
				<Plus class="size-7 stroke-[2.5]" />
			</button>
			{#if image}
				<ImageButton
					src={image}
					alt={imageAlt}
					class={colors.iconHover}
				/>
			{/if}
			{@render actions?.()}
		</div>
	</div>
	<PartTags
		{tags}
		{price}
		priceClass={colors.price}
	/>
	<div class="prose">
		<Description />
	</div>
	{@render footer?.()}
</PartCardFrame>
