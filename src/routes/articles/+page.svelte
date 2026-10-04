<script lang="ts">
	import { resolve } from "$app/paths"
	import ContentPage from "$components/content/ContentPage.svelte"
	import ArticleDate from "$components/content/ArticleDate.svelte"
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
			<article
				class="article-card group relative flex min-h-56 flex-col overflow-hidden rounded-3xl border-2 border-surface-200-800 bg-surface-50-950 transition-colors duration-150 sm:flex-row"
				data-category={article.category}
				id={article.slug}
			>
				<a
					href={resolve("/articles/[slug]", { slug: article.slug })}
					aria-label={article.title}
					class="absolute inset-0 z-10 rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--article-accent)"
				></a>
				<div
					class="relative aspect-video w-full shrink-0 overflow-hidden bg-surface-100-900 sm:aspect-auto sm:w-56"
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
							class="absolute inset-0 h-full w-full object-cover motion-safe:transition-all motion-safe:duration-300 motion-safe:group-focus-within:scale-105 motion-safe:group-hover:scale-105 {loadedImages[
								article.slug
							]
								? 'opacity-100'
								: 'opacity-0'}"
						/>
					{/if}
				</div>

				<div class="flex flex-1 flex-col justify-between gap-6 p-5 sm:p-6">
					<div
						class="font-geist-mono text-sm font-bold text-(--article-accent)"
					>
						{article.category}
					</div>
					<div class="flex flex-col gap-4">
						<h3
							class="font-josefin-sans text-3xl font-bold transition-colors duration-150 group-focus-within:text-(--article-accent) group-hover:text-(--article-accent)"
						>
							{article.title}
						</h3>
						<div>{article.description}</div>
					</div>
					<div class="flex flex-col gap-2 font-geist-mono text-xs">
						<div class="flex items-center justify-between text-surface-600-400">
							<div>{article.readingMinutes} min read</div>
							<ArticleDate
								date={article.date}
								updated={article.updated}
							/>
							<ArrowUpRight
								class="text-(--article-accent) transition-transform duration-150 group-focus-within:translate-x-1 group-focus-within:-translate-y-1 group-hover:translate-x-1 group-hover:-translate-y-1"
							/>
						</div>
					</div>
				</div>
			</article>
		{/each}
	</div>
</ContentPage>

<style>
	.article-card[data-category="Guide"] {
		--article-hue: var(--color-primary-500);
	}

	.article-card[data-category="Review"] {
		--article-hue: var(--color-yellow-400);
	}

	.article-card[data-category="News"] {
		--article-hue: var(--color-rose-500);
	}

	.article-card[data-category="Misc"] {
		--article-hue: var(--color-purple-500);
	}

	.article-card {
		--article-accent: color-mix(
			in oklab,
			var(--article-hue, var(--color-primary-500)) 65%,
			black
		);
	}

	:global([data-mode="dark"]) .article-card {
		--article-accent: var(--article-hue, var(--color-primary-500));
	}

	.article-card:is(:hover, :focus-within) {
		border-color: var(--article-accent);
	}
</style>
