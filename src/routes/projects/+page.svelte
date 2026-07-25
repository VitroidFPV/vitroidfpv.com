<script lang="ts">
	import ContentPage from "$components/content/ContentPage.svelte"
	import PageContent, { metadata } from "$content/pages/projects.svx"
</script>

<ContentPage
	{metadata}
	source="src/content/pages/projects.svx"
	Content={PageContent}
	ghostTitleClass="md:text-[16rem] text-[12rem]"
/>
