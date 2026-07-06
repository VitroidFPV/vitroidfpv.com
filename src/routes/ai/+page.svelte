<script lang="ts">
	import FaqContent, { metadata } from "./ai-page.svx"
	import PageWrapper from "$components/PageWrapper.svelte"
</script>

<PageWrapper
	h1={metadata.title as string}
	h2={metadata.description as string}
>
	{#snippet description()}
		<FaqContent />
	{/snippet}
</PageWrapper>
