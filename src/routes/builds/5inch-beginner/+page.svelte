<script lang="ts">
	import { dev } from "$app/environment"
	import BuildGuidePart from "$components/BuildGuidePart.svelte"
	import BuildGuidePartCard from "$components/BuildGuidePartCard.svelte"
	import BuildIntro, { metadata } from "./5inch-beginner-page.svx"
	import PageWrapper from "$components/PageWrapper.svelte"
	import { getBuildGuideSections } from "$lib/builds/guide-sections"

	const buildSlug = "5inch-beginner"
	const guideSections = getBuildGuideSections(buildSlug)
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
			<div class="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
				{#each section.parts as part (part.id)}
					{#if dev}
						<BuildGuidePartCard
							{buildSlug}
							sections={guideSections}
							{section}
							{part}
						/>
					{:else}
						<BuildGuidePart {part} />
					{/if}
				{/each}
				{#if dev}
					<BuildGuidePartCard
						{buildSlug}
						sections={guideSections}
						{section}
					/>
				{/if}
			</div>
		{/each}
	</div>
</PageWrapper>
