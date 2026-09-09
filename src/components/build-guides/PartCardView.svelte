<script lang="ts">
	import ImageButton from "$components/build-guides/ImageButton.svelte"
	import PartCardFrame from "$components/build-guides/PartCardFrame.svelte"
	import PartTags from "$components/build-guides/PartTags.svelte"
	import {
		buildGuidePartAccentClasses,
		type BuildGuidePartAccent
	} from "$lib/build-guides/theme"
	import type { BuildGuidePartTag } from "$lib/build-guides/types"
	import type { Picture } from "@sveltejs/enhanced-img"
	import { Plus } from "@lucide/svelte"
	import type { Component, Snippet } from "svelte"

	let {
		title,
		url,
		accent,
		price,
		tags,
		image,
		imageAlt,
		Description,
		descriptionText,
		onaddtolist,
		actions,
		footer
	}: {
		title: string
		url: string
		accent: BuildGuidePartAccent
		price?: string
		tags: BuildGuidePartTag[]
		image: Picture | null
		imageAlt: string
		Description?: Component
		descriptionText?: string
		onaddtolist?: () => void
		actions?: Snippet
		footer?: Snippet
	} = $props()

	const colors = $derived(buildGuidePartAccentClasses[accent])
</script>

<PartCardFrame {accent}>
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
				onclick={onaddtolist}
			>
				<Plus class="size-5 stroke-[2.5] md:size-6" />
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
		{#if Description}
			<Description />
		{:else if descriptionText}
			<p class="whitespace-pre-wrap">{descriptionText}</p>
		{/if}
	</div>
	{@render footer?.()}
</PartCardFrame>
