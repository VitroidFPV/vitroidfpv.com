<script lang="ts">
	import PageWrapper from "$components/PageWrapper.svelte"
	import ArticleDate from "$components/content/ArticleDate.svelte"
	import { onMount } from "svelte"

	let { data }: import("./$types").PageProps = $props()

	const ArticleContent = $derived(data.article.Content)
	type TocHeading = { id: string; title: string; level: 1 | 2 }
	let headings = $state<TocHeading[]>([])
	let activeHeading = $state("")
	let progressHeight = $state(0)
	let mobileToc = $state<HTMLDetailsElement | undefined>()

	let heroImage = $state<HTMLImageElement | undefined>()
	let loadedImageSlug = $state<string | null>(null)
	const imageLoaded = $derived(loadedImageSlug === data.article.slug)

	onMount(() => {
		if (heroImage?.complete && heroImage.naturalWidth > 0) {
			loadedImageSlug = data.article.slug
		}
	})

	function headingId(title: string): string {
		return (
			title
				.toLowerCase()
				.normalize("NFKD")
				.replace(/[\u0300-\u036f]/g, "")
				.replace(/[^\p{Letter}\p{Number}]+/gu, "-")
				.replace(/^-|-$/g, "") || "section"
		)
	}

	function collectHeadings(article: HTMLElement) {
		const elements = [...article.querySelectorAll<HTMLHeadingElement>("h1, h2")]
		const usedIds: string[] = []

		headings = elements.map((element) => {
			const title = element.textContent?.trim() ?? ""
			const baseId = element.id || headingId(title)
			let id = baseId
			let suffix = 2
			while (usedIds.includes(id)) id = `${baseId}-${suffix++}`
			usedIds.push(id)
			element.id = id
			return { id, title, level: element.tagName === "H1" ? 1 : 2 }
		})

		const updateActiveHeading = () => {
			const current = elements.findLast(
				(element) => element.getBoundingClientRect().top <= 128
			)
			activeHeading = current?.id ?? elements[0]?.id ?? ""
		}

		updateActiveHeading()
		window.addEventListener("scroll", updateActiveHeading, { passive: true })
		window.addEventListener("resize", updateActiveHeading)

		if (location.hash) {
			const target = elements.find(
				(element) => `#${encodeURIComponent(element.id)}` === location.hash
			)
			target?.scrollIntoView()
		}

		return {
			destroy() {
				window.removeEventListener("scroll", updateActiveHeading)
				window.removeEventListener("resize", updateActiveHeading)
			}
		}
	}

	function trackProgress(list: HTMLDivElement, initialHeadingId: string) {
		let currentHeadingId = initialHeadingId
		let frame = 0
		const measure = () => {
			const current = [...list.querySelectorAll<HTMLAnchorElement>("a")].find(
				(link) => link.getAttribute("href") === `#${currentHeadingId}`
			)
			progressHeight = current ? current.offsetTop + current.offsetHeight : 0
		}
		const scheduleMeasure = () => {
			cancelAnimationFrame(frame)
			frame = requestAnimationFrame(measure)
		}
		const resizeObserver = new ResizeObserver(scheduleMeasure)
		resizeObserver.observe(list)
		scheduleMeasure()

		return {
			update(headingId: string) {
				currentHeadingId = headingId
				scheduleMeasure()
			},
			destroy() {
				cancelAnimationFrame(frame)
				resizeObserver.disconnect()
			}
		}
	}
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
					class="font-josefin-sans text-5xl leading-tight font-bold text-primary-500 sm:text-7xl xl:text-7xl 2xl:text-8xl"
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

	{#key data.article.slug}
		<div
			class="grid gap-8 px-4 pb-8 sm:px-6 lg:px-4 xl:grid-cols-[minmax(0,1fr)_15rem] xl:gap-12 xl:px-8"
		>
			<aside
				class="order-first min-w-0 xl:order-last"
				aria-label="Table of contents"
			>
				{#if headings.length > 0}
					<details
						bind:this={mobileToc}
						class="rounded-2xl border border-surface-200-800 bg-surface-100-900 xl:hidden"
					>
						<summary
							class="cursor-pointer px-4 py-3 font-semibold text-primary-500"
						>
							On this page
						</summary>
						<nav
							aria-label="Article sections"
							class="px-3 pb-3"
						>
							{#each headings as heading (heading.id)}
								<a
									href={`#${heading.id}`}
									aria-current={activeHeading === heading.id
										? "location"
										: undefined}
									onclick={() => mobileToc?.removeAttribute("open")}
									class="block rounded-lg px-2 py-1.5 text-sm transition-colors {heading.level ===
									2
										? 'pl-5'
										: 'font-medium'} {activeHeading === heading.id
										? 'bg-primary-500/10 text-primary-500'
										: 'text-surface-600-400 hover:text-primary-500'}"
									>{heading.title}</a
								>
							{/each}
						</nav>
					</details>
					<nav
						aria-label="Article sections"
						class="sticky top-8 hidden max-h-[calc(100dvh-4rem)] overflow-y-auto py-1 xl:block"
					>
						<!-- <p
							class="mb-3 pl-4 font-geist-mono text-xs font-semibold tracking-wide text-primary-500 uppercase"
						>
							On this page
						</p> -->
						<div
							class="relative"
							use:trackProgress={activeHeading}
						>
							<span
								aria-hidden="true"
								class="pointer-events-none absolute inset-y-0 left-0 w-0.5 bg-surface-200-800"
							></span>
							<span
								aria-hidden="true"
								class="pointer-events-none absolute top-0 left-0 w-0.5 bg-primary-500 transition-[height] duration-300 ease-out motion-reduce:transition-none"
								style:height={`${progressHeight}px`}
							></span>
							{#each headings as heading (heading.id)}
								<a
									href={`#${heading.id}`}
									aria-current={activeHeading === heading.id
										? "location"
										: undefined}
									class="block py-1.5 pr-2 text-sm transition-colors {heading.level ===
									2
										? 'pl-6'
										: 'pl-4 font-medium'} {activeHeading === heading.id
										? 'text-primary-500'
										: 'text-surface-600-400 hover:text-primary-500'}"
									>{heading.title}</a
								>
							{/each}
						</div>
					</nav>
				{/if}
			</aside>
			<div
				class="md article-prose prose min-w-0"
				use:collectHeadings
			>
				<ArticleContent />
			</div>
		</div>
	{/key}
</PageWrapper>
