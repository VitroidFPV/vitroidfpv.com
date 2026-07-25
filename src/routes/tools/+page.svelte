<script lang="ts">
	import ContentPage from "$components/content/ContentPage.svelte"
	import PageContent, { metadata } from "$content/pages/tools.svx"
</script>

<ContentPage
	{metadata}
	source="src/content/pages/tools.svx"
	Content={PageContent}
/>
