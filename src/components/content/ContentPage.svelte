<script lang="ts">
	import PageWrapper from "$components/PageWrapper.svelte"
	import { parsePageMetadata } from "$lib/content/metadata"
	import type { Component, Snippet } from "svelte"

	let {
		metadata,
		source,
		Content,
		ghostTitleClass,
		children
	}: {
		metadata: unknown
		source: string
		Content: Component
		ghostTitleClass?: string
		children?: Snippet
	} = $props()

	const pageMetadata = $derived(parsePageMetadata(metadata, source))
</script>

<PageWrapper
	h1={pageMetadata.title}
	h2={pageMetadata.description}
	seoDescription={pageMetadata.seoDescription}
	{ghostTitleClass}
>
	{#snippet description()}
		<Content />
	{/snippet}

	{@render children?.()}
</PageWrapper>
