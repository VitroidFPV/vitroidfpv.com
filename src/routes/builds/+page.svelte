<script lang="ts">
	import BuildCatalogCard from "$components/build-catalog/BuildCatalogCard.svelte"
	import ContentPage from "$components/content/ContentPage.svelte"
	import PageContent, { metadata } from "$content/pages/builds.svx"
	import { buildCatalogEntries } from "$lib/build-catalog/content"
</script>

<ContentPage
	{metadata}
	source="src/content/pages/builds.svx"
	Content={PageContent}
	ghostTitleClass=" md:text-[20rem] text-[12rem]"
>
	<div class="flex flex-col gap-8 px-2 pb-8 lg:px-4 xl:px-8">
		{#each buildCatalogEntries as entry (entry.slug)}
			<div
				id={entry.slug}
				class="scroll-mt-8"
			>
				<BuildCatalogCard {entry} />
			</div>
		{/each}
	</div>
</ContentPage>
