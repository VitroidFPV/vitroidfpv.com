<script lang="ts">
	import BuildIntro, { metadata } from "./5inch-beginner-page.svx"
	import BuildPartImageButton from "$components/BuildPartImageButton.svelte"
	import BuildTagTooltip from "$components/BuildTagTooltip.svelte"
	import PageWrapper from "$components/PageWrapper.svelte"
	import {
		getBuildGuideSections,
		guidePartColors
	} from "$lib/builds/guide-sections"
	import { Plus } from "@lucide/svelte"

	const guideSections = getBuildGuideSections("5inch-beginner")
</script>

<PageWrapper
	h1={metadata.title as string}
	h2={metadata.description as string}
>
	{#snippet description()}
		<BuildIntro />
	{/snippet}

	<div class="flex flex-col gap-8 px-2 pb-8 lg:px-4 xl:px-8">
		{#each guideSections as section (section.id)}
			<div>
				<h3 class="font-josefin-sans text-6xl font-bold">{section.title}</h3>
				{#if section.description}
					<div class="prose">
						<p>{section.description}</p>
					</div>
				{/if}
			</div>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				{#each section.parts as part (part.id)}
					{@const colors = guidePartColors[part.color]}
					<div class="flex gap-2">
						<div class="h-full w-1 rounded-full {colors.bar}"></div>
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
										<BuildPartImageButton
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
										<BuildTagTooltip
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
				{/each}
			</div>
		{/each}
	</div>
</PageWrapper>
