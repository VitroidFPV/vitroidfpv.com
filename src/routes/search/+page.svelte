<script lang="ts">
	import { afterNavigate, replaceState } from "$app/navigation"
	import { resolve } from "$app/paths"
	import { page } from "$app/state"
	import PageWrapper from "$components/PageWrapper.svelte"
	import SearchResults from "$components/search/SearchResults.svelte"
	import { SearchController } from "$lib/search/controller.svelte"
	import {
		searchCollectionLabels,
		searchCollections,
		type SearchCollection
	} from "$lib/search/types"
	import { CircleX, Search } from "@lucide/svelte"
	import { onDestroy } from "svelte"
	import type { Attachment } from "svelte/attachments"

	type CollectionFilter = SearchCollection | "all"

	const searchPath = resolve("/search")
	const minimumQueryLength = 2

	let selectedCollection = $state<CollectionFilter>("all")
	let inputElement: HTMLInputElement | undefined

	function syncQueryToUrl(value: string) {
		const trimmedValue = value.trim()
		const url = new URL(page.url)

		if (trimmedValue.length >= minimumQueryLength) {
			url.searchParams.set("q", trimmedValue)
		} else {
			url.searchParams.delete("q")
		}

		const next = `${url.pathname}${url.search}`
		const current = `${page.url.pathname}${page.url.search}`
		if (next === current) return

		replaceState(resolve(next as "/"), page.state)
	}

	const search = new SearchController({
		onBeforeSearch: syncQueryToUrl,
		onReset: (value) => {
			selectedCollection = "all"
			syncQueryToUrl(value)
		},
		onResults: (results) => {
			if (
				selectedCollection !== "all" &&
				!results.some((result) => result.collection === selectedCollection)
			) {
				selectedCollection = "all"
			}
		}
	})

	const visibleResults = $derived(
		selectedCollection === "all"
			? search.results
			: search.results.filter(
					(result) => result.collection === selectedCollection
				)
	)
	const availableCollections = $derived(
		searchCollections.filter((collection) =>
			search.results.some((result) => result.collection === collection)
		)
	)

	function collectionCount(collection: SearchCollection): number {
		return search.results.filter((result) => result.collection === collection)
			.length
	}

	function clearSearch() {
		search.reset()
		inputElement?.focus()
	}

	const captureInput: Attachment<HTMLInputElement> = (element) => {
		inputElement = element
		return () => {
			if (inputElement === element) inputElement = undefined
		}
	}

	afterNavigate(() => {
		const routeQuery = page.url.searchParams.get("q") ?? ""
		search.queue(routeQuery, 0)
	})

	onDestroy(() => search.destroy())
</script>

<PageWrapper
	h1="Search"
	// h2="Find anything on the site"
	// seoDescription="Search VitroidFPV guides, FPV gear, build parts, pages, and frequently asked questions."
	ghostTitleClass="md:text-[15rem] text-[9rem]"
>
	<!-- {#snippet description()}
		<p>
			Search guides, product recommendations, model numbers, and answers from
			across VitroidFPV.
		</p>
	{/snippet} -->

	<div class="px-2 pb-16 md:px-8">
		<form
			method="GET"
			action={searchPath}
			class="mx-auto flex max-w-5xl flex-col gap-6"
		>
			<div
				class="flex items-center gap-3 rounded-3xl border-2 border-surface-500/20 bg-surface-50-950/80 px-4 shadow-lg backdrop-blur-sm transition focus-within:border-primary-500 focus-within:ring-4 focus-within:ring-primary-500/10 md:px-6"
			>
				<Search
					class="size-6 shrink-0 text-surface-400 md:size-7"
					aria-hidden="true"
				/>
				<input
					{@attach captureInput}
					type="search"
					name="q"
					value={search.query}
					placeholder="Search for soldering, motors, simulators…"
					aria-label="Search the site"
					autocomplete="off"
					class="search-input h-16 min-w-0 flex-1 border-0 bg-transparent px-0 text-lg outline-none placeholder:text-surface-400 md:h-20 md:text-2xl"
					oninput={(event) => search.queue(event.currentTarget.value)}
				/>
				{#if search.query}
					<button
						type="button"
						class="rounded-full p-2 text-surface-400 hover:bg-surface-500/10 hover:text-primary-500"
						aria-label="Clear search"
						onclick={clearSearch}
					>
						<CircleX
							class="size-5"
							aria-hidden="true"
						/>
					</button>
				{/if}
				<button
					type="submit"
					class="btn hidden preset-filled-primary-500 md:flex"
				>
					Search
				</button>
			</div>
		</form>

		<div class="mx-auto mt-8 max-w-5xl">
			<div
				class="sr-only"
				aria-live="polite"
			>
				{#if search.status === "ready"}
					{visibleResults.length} search {visibleResults.length === 1
						? "result"
						: "results"}
				{:else if search.status === "loading"}
					Searching
				{/if}
			</div>

			{#if search.status === "ready" && search.results.length > 0}
				<div
					class="mb-5 flex flex-wrap items-center gap-2"
					aria-label="Filter search results"
				>
					<button
						type="button"
						class="rounded-full border px-3 py-1.5 text-sm font-semibold transition {selectedCollection ===
						'all'
							? 'border-primary-500 bg-primary-500 text-primary-contrast-dark'
							: 'border-surface-500/30 hover:border-primary-500 hover:text-primary-500'}"
						aria-pressed={selectedCollection === "all"}
						onclick={() => (selectedCollection = "all")}
					>
						All <span class="opacity-70">{search.results.length}</span>
					</button>
					{#each availableCollections as collection (collection)}
						<button
							type="button"
							class="rounded-full border px-3 py-1.5 text-sm font-semibold transition {selectedCollection ===
							collection
								? 'border-primary-500 bg-primary-500 text-primary-contrast-dark'
								: 'border-surface-500/30 hover:border-primary-500 hover:text-primary-500'}"
							aria-pressed={selectedCollection === collection}
							onclick={() => (selectedCollection = collection)}
						>
							{searchCollectionLabels[collection]}
							<span class="opacity-70">{collectionCount(collection)}</span>
						</button>
					{/each}
				</div>
			{/if}

			{#if search.status === "loading"}
				<div class="flex min-h-64 items-center justify-center text-surface-500">
					<span class="mr-3 size-2 animate-pulse rounded-full bg-primary-500"
					></span>
					Searching the site…
				</div>
			{:else if search.status === "error"}
				<div class="py-24 text-center text-error-500">
					<p class="font-semibold">Search could not be loaded.</p>
					<p class="mt-1 text-sm">Please try again.</p>
				</div>
			{:else if search.normalizedQuery.length < minimumQueryLength}
				<div class="py-24 text-center text-surface-500">
					<Search
						class="mx-auto mb-4 size-10 opacity-40"
						aria-hidden="true"
					/>
					<p class="font-semibold">What are you looking for?</p>
					<p class="mt-1 text-sm">
						Type at least two characters to search the entire site.
					</p>
				</div>
			{:else if visibleResults.length > 0}
				<div class="mb-4 flex items-baseline justify-between gap-4">
					<h2 class="text-xl font-bold">
						{visibleResults.length}
						{visibleResults.length === 1 ? "result" : "results"}
					</h2>
					<p class="truncate text-sm text-surface-500">
						for “{search.normalizedQuery}”
					</p>
				</div>
				<SearchResults results={visibleResults} />
			{:else}
				<div class="py-24 text-center">
					<p class="text-lg font-semibold">
						No results for “{search.normalizedQuery}”
					</p>
					<p class="mt-1 text-sm text-surface-500">
						Try a product name, guide topic, or broader term.
					</p>
				</div>
			{/if}
		</div>
	</div>
</PageWrapper>
