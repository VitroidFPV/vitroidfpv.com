<script lang="ts">
	import { dev } from "$app/environment"
	import { page } from "$app/state"
	import DevSectionHeading from "$components/BuildGuide/DevSectionHeading.svelte"
	import DevPartCard from "$components/BuildGuide/DevPartCard.svelte"
	import PartCard from "$components/BuildGuide/PartCard.svelte"
	import SectionHeading from "$components/BuildGuide/SectionHeading.svelte"
	import BuildIntro, { metadata } from "./5inch-beginner-page.svx"
	import PageWrapper from "$components/PageWrapper.svelte"
	import { getBuildGuideSections } from "$lib/builds/guide-sections"
	import ListPopup from "$components/BuildGuide/ListPopup.svelte"

	const buildSlug = "5inch-beginner"
	const guideSections = getBuildGuideSections(buildSlug)
	const showDevUi = $derived(dev && !page.url.searchParams.has("public"))

	let listState: "open" | "minimized" | "closed" = $state("open")
</script>

<PageWrapper
	h1={metadata.title as string}
	h2={metadata.description as string}
	seoDescription={metadata.seoDescription as string}
>
	{#snippet description()}
		<BuildIntro />
	{/snippet}
	
	<select name="list" id="list" bind:value={listState}>
		<option value="open">Open</option>
		<option value="minimized">Minimized</option>
		<option value="closed">Closed</option>
	</select>

	<div class="fixed top-0 right-0 z-10">
		<ListPopup state={listState} />
	</div>

	<div class="flex flex-col gap-8 px-2 pb-8 lg:px-4 xl:px-8">
		{#each guideSections as section (section.id)}
			<div>
				{#if showDevUi}
					<DevSectionHeading
						{buildSlug}
						sections={guideSections}
						{section}
					/>
				{:else}
					<SectionHeading {section} />
				{/if}
			</div>
			<div class="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
				{#each section.parts as part (part.id)}
					{#if showDevUi}
						<DevPartCard
							{buildSlug}
							sections={guideSections}
							{section}
							{part}
						/>
					{:else}
						<PartCard {part} />
					{/if}
				{/each}
				{#if showDevUi}
					<DevPartCard
						{buildSlug}
						sections={guideSections}
						{section}
					/>
				{/if}
			</div>
		{/each}
		{#if showDevUi}
			<DevSectionHeading
				{buildSlug}
				sections={guideSections}
			/>
		{/if}
	</div>
</PageWrapper>
