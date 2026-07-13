<script lang="ts">
	import FaqContent, { metadata } from "./builds-page.svx"
	import ListShowcase from "$components/ListShowcase.svelte"
	import PageWrapper from "$components/PageWrapper.svelte"
	import { buildSections } from "$lib/builds/sections"
</script>

<PageWrapper
	h1={metadata.title as string}
	h2={metadata.description as string}
	seoDescription={metadata.seoDescription as string}
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
				url={build.url}
				model={build.model}
				color={build.color}
				features={build.features}
				Description={build.component}
			/>
		{/each}
	</div>
</PageWrapper>
