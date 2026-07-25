<script lang="ts">
	import ContentPage from "$components/content/ContentPage.svelte"
	import PageContent, { metadata } from "$content/pages/equipment.svx"
</script>

<ContentPage
	{metadata}
	source="src/content/pages/equipment.svx"
	Content={PageContent}
/>
