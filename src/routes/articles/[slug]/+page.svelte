<script lang="ts">
	import PageWrapper from "$components/PageWrapper.svelte"
	import ArticleDate from "$components/content/ArticleDate.svelte"
	import { onMount } from "svelte"

	let { data }: import("./$types").PageProps = $props()

	const ArticleContent = $derived(data.article.Content)

	let heroImage = $state<HTMLImageElement | undefined>()
	let loadedImageSlug = $state<string | null>(null)
	const imageLoaded = $derived(loadedImageSlug === data.article.slug)

	onMount(() => {
		if (heroImage?.complete && heroImage.naturalWidth > 0) {
			loadedImageSlug = data.article.slug
		}
	})
</script>

<PageWrapper
	h1={data.article.title}
	h2={data.article.description}
	seoPath={`/articles/${data.article.slug}`}
	ghostTitleClass="text-[8rem] md:text-[13rem]"
>
	{#snippet hero()}
		<div
			class="hero relative flex w-full flex-col gap-8 p-4 pt-16 sm:p-6 sm:pt-20 xl:grid xl:grid-cols-2 xl:gap-16 xl:p-8 xl:pt-20"
		>
			<div
				class="flex min-w-0 flex-1 flex-col gap-5 xl:justify-center xl:gap-6 xl:py-8"
			>
				<h1
					class="font-josefin-sans text-5xl leading-tight font-bold text-primary-500 sm:text-7xl xl:text-8xl 2xl:text-9xl"
				>
					{data.article.title}
				</h1>
				<h2 class="text-lg font-medium sm:text-xl">
					{data.article.description}
				</h2>
				<div
					class="flex flex-wrap items-center gap-x-5 gap-y-2 font-geist-mono xl:justify-between"
				>
					<div class="flex gap-3 text-surface-600-400">
						<span class="font-bold text-primary-500"
							>{data.article.category}</span
						>
						{#if data.article.author}
							By
							<span class="font-bold text-primary-500"
								>{data.article.author}</span
							>
						{/if}
					</div>
					<div class="text-surface-600-400">
						{data.article.readingMinutes} minute read
					</div>
					<ArticleDate
						date={data.article.date}
						updated={data.article.updated}
					/>
				</div>
			</div>
			{#if data.article.image}
				<div
					class="aspect-square w-full shrink-0 overflow-hidden rounded-4xl border border-surface-200-800 bg-surface-100-900 p-1 sm:max-w-xl xl:self-center xl:justify-self-end"
				>
					<div class="relative h-full w-full overflow-hidden rounded-[28px]">
						<img
							src={data.article.imagePlaceholder}
							alt=""
							class="absolute inset-0 h-full w-full scale-110 object-cover blur-xl motion-safe:transition-opacity motion-safe:duration-300 {imageLoaded
								? 'opacity-0'
								: 'opacity-100'}"
						/>
						<enhanced:img
							bind:this={heroImage}
							src={data.article.image}
							alt={data.article.title}
							sizes="(min-width: 640px) 576px, 100vw"
							fetchpriority="high"
							loading="eager"
							onload={() => (loadedImageSlug = data.article.slug)}
							class="absolute inset-0 h-full w-full object-cover motion-safe:transition-opacity motion-safe:duration-300 {imageLoaded
								? 'opacity-100'
								: 'opacity-0'}"
						/>
					</div>
				</div>
			{:else}
				<div
					class="aspect-square w-full shrink-0 rounded-4xl bg-neutral-500/10 sm:max-w-xl xl:self-center xl:justify-self-end"
				></div>
			{/if}
		</div>
	{/snippet}

	<div class="flex flex-col gap-12 px-4 pb-8 sm:px-6 lg:px-4 xl:px-8">
		<div class="md article-prose prose"><ArticleContent /></div>
	</div>
</PageWrapper>
