<script lang="ts">
	import FaqContent, { metadata } from "./articles-page.svx"
	import PageWrapper from "$components/PageWrapper.svelte"
</script>

<PageWrapper
	h1={metadata.title as string}
	h2={metadata.description as string}
	seoDescription={metadata.seoDescription as string}
	ghostTitleClass=" md:text-[16rem] text-[12rem]"
>
	{#snippet description()}
		<FaqContent />
	{/snippet}
</PageWrapper>
