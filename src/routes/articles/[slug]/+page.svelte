<script lang="ts">
	import PageWrapper from "$components/PageWrapper.svelte"

	let { data }: import("./$types").PageProps = $props()

	const ArticleContent = $derived(data.article.Content)
</script>

<PageWrapper
	h1={data.article.title}
	h2={data.article.description}
	seoDescription={data.article.description}
>
	{#snippet description()}
		{#if data.article.author}
			<p>By {data.article.author}</p>
		{/if}
	{/snippet}

	<article class="prose max-w-3xl px-2 pb-16 md:px-8">
		<ArticleContent />
	</article>
</PageWrapper>
