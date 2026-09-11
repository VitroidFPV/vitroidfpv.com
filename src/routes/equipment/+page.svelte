<script lang="ts">
	import BuildCatalogCard from "$components/build-catalog/BuildCatalogCard.svelte"
	import ContentPage from "$components/content/ContentPage.svelte"
	import PageContent, { metadata } from "$content/pages/equipment.svx"
	import { getCatalogEntries } from "$lib/catalog/content"

	const equipmentCatalogEntries = getCatalogEntries("equipment")
</script>

<ContentPage
	{metadata}
	source="src/content/pages/equipment.svx"
	Content={PageContent}
	ghostTitleClass=" md:text-[20rem] text-[12rem]"
>
	<div class="flex flex-col gap-8 px-2 pb-8 lg:px-4 xl:px-8">
		{#each equipmentCatalogEntries as entry (entry.slug)}
			<div
				id={entry.slug}
				class="scroll-mt-8"
			>
				<BuildCatalogCard {entry} />
			</div>
		{/each}
	</div>
</ContentPage>
