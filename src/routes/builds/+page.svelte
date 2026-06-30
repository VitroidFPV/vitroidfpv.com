<script lang="ts">
	import FaqContent, { metadata } from "./builds-page.svx"
	import PageWrapper from "$components/PageWrapper.svelte"
</script>

<PageWrapper h1={metadata.title as string} h2={metadata.description as string} ghostTitleClass=" md:text-[20rem] text-[12rem]">
	{#snippet description()}
		<FaqContent />
	{/snippet}
</PageWrapper>