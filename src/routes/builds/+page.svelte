<script lang="ts">
	import { page } from "$app/state"
	import FaqContent, { metadata } from "./builds-page.svx"
	import ListShowcase from "$components/ListShowcase.svelte"
	import PageWrapper from "$components/PageWrapper.svelte"
	import { resolveBuildModelDepthMode } from "$lib/builds/depthTreatment"
	import { buildSections } from "$lib/builds/sections"

	const modelDepthMode = $derived(resolveBuildModelDepthMode(page.url.searchParams))
</script>

<PageWrapper
	h1={metadata.title as string}
	h2={metadata.description as string}
	ghostTitleClass=" md:text-[20rem] text-[12rem]"
>
	{#snippet description()}
		<FaqContent />
	{/snippet}
	<div class="flex flex-col gap-8 px-2 pb-8 lg:px-4 xl:px-8">
		{#each buildSections as build (build.slug)}
			<ListShowcase
				title={build.title}
				price={build.price}
				image={build.image}
				model={build.model}
				modelDepthMode={modelDepthMode}
				color={build.color}
				features={build.features}
				Description={build.component}
			/>
		{/each}
	</div>
</PageWrapper>
