<script lang="ts">
	import PageWrapper from "$components/PageWrapper.svelte"
	import { Portal, Tooltip } from "@skeletonlabs/skeleton-svelte"

	let { data }: import("./$types").PageProps = $props()

	const ArticleContent = $derived(data.article.Content)
	const category = $derived(
		data.article.slug
			.split("-")[0]
			.replace(/s$/, "")
			.replace(/^./, (letter) => letter.toUpperCase())
	)

	let tooltipClosing = $state(false)
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
						<span class="font-bold text-primary-500">{category}</span>
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
					{#if data.updatedDate}
						{#if data.postedDate}
							<Tooltip
								positioning={{ placement: "top" }}
								openDelay={300}
								closeDelay={150}
							>
								<Tooltip.Trigger
									type="button"
									class="flex cursor-default gap-3 font-geist-mono"
									onpointerenter={() => (tooltipClosing = false)}
									onpointerleave={() => (tooltipClosing = true)}
									onfocus={() => (tooltipClosing = false)}
									onblur={() => (tooltipClosing = true)}
								>
									<span class="text-surface-600-400"
										>{data.updatedDate.relative
											? "Updated"
											: "Updated On"}</span
									>
									<span class="font-bold">{data.updatedDate.text}</span>
								</Tooltip.Trigger>
								<Portal>
									<Tooltip.Positioner>
										<Tooltip.Content
											class="article-date-tooltip origin-bottom rounded-md border border-surface-500/30 bg-surface-50-950 px-2 py-1 text-xs text-surface-500 shadow-sm {tooltipClosing
												? 'tooltip-closing'
												: ''}"
										>
											Originally posted {data.postedDate.text}
										</Tooltip.Content>
									</Tooltip.Positioner>
								</Portal>
							</Tooltip>
						{:else}
							<div class="flex gap-3">
								<span class="text-surface-600-400"
									>{data.updatedDate.relative ? "Updated" : "Updated On"}</span
								>
								<span class="font-bold">{data.updatedDate.text}</span>
							</div>
						{/if}
					{:else if data.postedDate}
						<div class="flex gap-3">
							<span class="text-surface-600-400"
								>{data.postedDate.relative ? "Posted" : "Posted On"}</span
							>
							<span class="font-bold">{data.postedDate.text}</span>
						</div>
					{/if}
				</div>
			</div>
			{#if data.article.image}
				<div
					class="aspect-square w-full shrink-0 overflow-hidden rounded-4xl sm:max-w-xl xl:self-center xl:justify-self-end p-1 bg-surface-100-900 border-surface-200-800 border"
				>
					<enhanced:img
						src={data.article.image}
						alt={data.article.title}
						sizes="(min-width: 1024px) 66vh, 100vw"
						class="h-full w-full object-cover rounded-[28px]"
					/>
				</div>
			{:else}
				<div
					class="aspect-square w-full shrink-0 rounded-4xl bg-neutral-500/10 sm:max-w-xl xl:self-center xl:justify-self-end"
				></div>
			{/if}
		</div>
	{/snippet}

	<div class="flex flex-col gap-12 px-4 pb-8 sm:px-6 lg:px-4 xl:px-8">
		<div class="md faq prose"><ArticleContent /></div>
	</div>
</PageWrapper>

<style>
	:global(.article-date-tooltip:not([hidden]):not(.tooltip-closing)) {
		animation: article-date-tooltip-in 150ms ease;
	}

	:global(.article-date-tooltip.tooltip-closing:not([hidden])) {
		opacity: 0;
		scale: 0.9;
		transition:
			transform 150ms ease,
			opacity 150ms ease;
	}

	@keyframes article-date-tooltip-in {
		from {
			opacity: 0;
			scale: 0.9;
		}

		to {
			opacity: 1;
			scale: 1;
		}
	}
</style>
