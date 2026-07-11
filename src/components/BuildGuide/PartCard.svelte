<script lang="ts">
	import ImageButton from "$components/BuildGuide/ImageButton.svelte"
	import TagTooltip from "$components/BuildGuide/TagTooltip.svelte"
	import {
		guidePartColors,
		type BuildGuidePart
	} from "$lib/builds/guide-sections"
	import { Plus } from "@lucide/svelte"

	let { part }: { part: BuildGuidePart } = $props()

	const colors = $derived(guidePartColors[part.color])
</script>

<div class="flex h-fit gap-2">
	<div
		class="w-1 shrink-0 self-stretch rounded-full {colors.bar} mt-1 mb-3"
	></div>
	<div class="flex flex-1 flex-col gap-2">
		<div class="flex items-center justify-between gap-2">
			<a
				href={part.url}
				class={colors.link}
				target="_blank"
				rel="external noopener noreferrer">{part.title}</a
			>

			<div class="flex gap-2 text-surface-500">
				<button
					type="button"
					class={colors.iconHover}
					aria-label="Add to build list"
				>
					<Plus class="size-8" />
				</button>
				{#if part.image}
					<ImageButton
						src={part.image}
						alt={part.imageAlt}
						class={colors.iconHover}
					/>
				{/if}
			</div>
		</div>
		<div class="flex flex-wrap gap-1">
			{#if part.price}
				<span class={colors.price}>{part.price}</span>
			{/if}
			{#each part.tags as tag (tag.label)}
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
		<div class="prose">
			<part.component />
		</div>
	</div>
</div>
