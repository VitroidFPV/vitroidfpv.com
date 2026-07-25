<script lang="ts">
	import ContentPage from "$components/content/ContentPage.svelte"
	import PageContent, { metadata } from "$content/pages/ai.svx"
</script>

<ContentPage
	{metadata}
	source="src/content/pages/ai.svx"
	Content={PageContent}
/>
