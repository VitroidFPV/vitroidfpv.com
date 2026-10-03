<script lang="ts">
	import { resolve } from "$app/paths"
	import ContentPage from "$components/content/ContentPage.svelte"
	import PageContent, { metadata } from "$content/pages/articles.svx"
	import { ArrowUpRight } from "@lucide/svelte"
	import { onMount } from "svelte"
	import type { PageProps } from "./$types"

	let { data }: PageProps = $props()
	const articles = $derived(data.articles)
	let loadedImages = $state<Record<string, boolean>>({})

	onMount(() => {
		for (const image of document.querySelectorAll<HTMLImageElement>(
			"[data-article-image]"
		)) {
			const slug = image.dataset.articleImage
			if (slug && image.complete && image.naturalWidth > 0) {
				loadedImages[slug] = true
			}
		}
	})
</script>

<ContentPage
	{metadata}
	source="src/content/pages/articles.svx"
	Content={PageContent}
	ghostTitleClass=" md:text-[16rem] text-[12rem]"
>
	<div
		class="grid w-full grid-cols-1 gap-4 p-4 pb-16 sm:p-6 xl:grid-cols-2 xl:gap-8 xl:p-8 3xl:grid-cols-3"
	>
		{#each articles as article (article.slug)}
			<a
				href={resolve("/articles/[slug]", { slug: article.slug })}
				class="group flex min-h-56 flex-col overflow-hidden rounded-3xl border-2 border-surface-200-800 bg-surface-50-950 transition-colors duration-150 hover:border-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 sm:flex-row"
				id={article.slug}
			>
				<div
					class="relative aspect-[16/9] w-full shrink-0 overflow-hidden bg-surface-100-900 sm:aspect-auto sm:w-56"
				>
					{#if article.image}
						{#if article.imagePlaceholder}
							<img
								src={article.imagePlaceholder}
								alt=""
								class="pointer-events-none absolute inset-0 h-full w-full scale-110 object-cover blur-xl motion-safe:transition-opacity motion-safe:duration-300 {loadedImages[
									article.slug
								]
									? 'opacity-0'
									: 'opacity-100'}"
							/>
						{/if}
						<enhanced:img
							src={article.image}
							alt=""
							sizes="(min-width: 640px) 224px, 100vw"
							loading="lazy"
							data-article-image={article.slug}
							onload={() => (loadedImages[article.slug] = true)}
							class="absolute inset-0 h-full w-full object-cover motion-safe:transition-all motion-safe:duration-300 motion-safe:group-hover:scale-105 motion-safe:group-focus-visible:scale-105 {loadedImages[
								article.slug
							]
								? 'opacity-100'
								: 'opacity-0'}"
						/>
					{/if}
				</div>

				<div class="flex flex-1 flex-col justify-between gap-6 p-5 sm:p-6">
					<div class="font-geist-mono text-sm font-bold text-primary-500">
						{article.category}
					</div>
					<div class="flex flex-col gap-4">
						<h3
							class="font-josefin-sans text-3xl font-bold transition-colors duration-150 group-hover:text-primary-500 group-focus-visible:text-primary-500"
						>
							{article.title}
						</h3>
						<div>{article.description}</div>
					</div>
					<div
						class="flex items-center justify-between font-geist-mono text-xs text-surface-600-400"
					>
						<div>{article.readingMinutes} min read</div>
						<ArrowUpRight
							class="transition-transform duration-150 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary-500 group-focus-visible:translate-x-1 group-focus-visible:-translate-y-1 group-focus-visible:text-primary-500"
						/>
					</div>
				</div>
			</a>
		{/each}
	</div>
</ContentPage>
