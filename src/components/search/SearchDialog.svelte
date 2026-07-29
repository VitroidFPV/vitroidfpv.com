<script lang="ts">
	import { goto } from "$app/navigation"
	import { resolve } from "$app/paths"
	import SearchResults from "$components/search/SearchResults.svelte"
	import { SearchController } from "$lib/search/controller.svelte"
	import { ArrowRight, CircleX, Search, X } from "@lucide/svelte"
	import { Dialog, Portal, Tooltip } from "@skeletonlabs/skeleton-svelte"
	import { onDestroy } from "svelte"
	import type { Attachment } from "svelte/attachments"
	import { MediaQuery } from "svelte/reactivity"

	const minimumQueryLength = 2

	let open = $state(false)
	let inputElement: HTMLInputElement | undefined
	let resultsElement: HTMLDivElement | undefined
	const search = new SearchController({
		searchOptions: { limit: 5 },
		clearResultsWhileLoading: true
	})

	const allResultsPath = $derived(
		`/search?q=${encodeURIComponent(search.normalizedQuery)}`
	)
	const searchShortcutLabel = $derived.by(() => {
		if (typeof navigator === "undefined") return "Ctrl+K"
		return /Mac|iPhone|iPad/i.test(navigator.platform) ? "⌘K" : "Ctrl+K"
	})

	let tooltipClosing = $state(false)
	const desktop = new MediaQuery("(min-width: 768px)", true)
	const tooltipPlacement = $derived(desktop.current ? "right" : "left")

	function handleOpenChange(details: { open: boolean }) {
		open = details.open
		if (open) {
			void search.prepare()
			return
		}

		search.reset()
	}

	function openSearch() {
		open = true
		void search.prepare()
	}

	function handleShortcut(event: KeyboardEvent) {
		if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
			event.preventDefault()
			openSearch()
		}
	}

	function focusFirstResult() {
		resultsElement
			?.querySelector<HTMLAnchorElement>("[data-search-result]")
			?.focus()
	}

	function handleInputKeydown(event: KeyboardEvent) {
		if (event.key === "ArrowDown" && search.results.length > 0) {
			event.preventDefault()
			focusFirstResult()
			return
		}

		if (event.key !== "Enter" || search.normalizedQuery.length === 0) return

		event.preventDefault()
		open = false
		const destination =
			search.status === "ready" && search.results[0]?.url
				? search.results[0].url
				: allResultsPath
		void goto(resolve(destination as "/"))
	}

	function handleResultsKeydown(event: KeyboardEvent) {
		if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return
		if (!resultsElement) return

		const links = Array.from(
			resultsElement.querySelectorAll<HTMLAnchorElement>("[data-search-result]")
		)
		const currentIndex = links.indexOf(
			document.activeElement as HTMLAnchorElement
		)
		if (currentIndex === -1) return

		event.preventDefault()
		if (event.key === "ArrowUp" && currentIndex === 0) {
			inputElement?.focus()
			return
		}

		const nextIndex =
			event.key === "ArrowDown"
				? Math.min(currentIndex + 1, links.length - 1)
				: Math.max(currentIndex - 1, 0)
		links[nextIndex]?.focus()
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

	const captureResults: Attachment<HTMLDivElement> = (element) => {
		resultsElement = element
		element.addEventListener("keydown", handleResultsKeydown)
		return () => {
			element.removeEventListener("keydown", handleResultsKeydown)
			if (resultsElement === element) resultsElement = undefined
		}
	}

	onDestroy(() => search.destroy())
</script>

<svelte:window onkeydown={handleShortcut} />

<li class="relative z-10 h-12 rounded-l-3xl px-4 pr-6">
	<Tooltip
		positioning={{ placement: tooltipPlacement }}
		openDelay={300}
		closeDelay={50}
	>
		<Tooltip.Trigger
			type="button"
			class="flex h-full w-full items-center gap-2 text-surface-contrast-dark transition-colors hover:text-primary-500 dark:text-surface-contrast-light"
			aria-label="Search the site"
			aria-haspopup="dialog"
			aria-expanded={open}
			onclick={openSearch}
			onpointerenter={() => (tooltipClosing = false)}
			onpointerleave={() => (tooltipClosing = true)}
			onfocus={() => (tooltipClosing = false)}
			onblur={() => (tooltipClosing = true)}
		>
			<Search
				class="size-6"
				aria-hidden="true"
			/>
			<span class="font-medium">Search</span>
		</Tooltip.Trigger>
		<Portal>
			<Tooltip.Positioner class="z-40!">
				<Tooltip.Content
					class="search-shortcut-tooltip rounded-md border border-surface-500/30 bg-surface-50-950 px-2 py-1 text-xs text-surface-500 shadow-sm {tooltipPlacement ===
					'right'
						? 'origin-left'
						: 'origin-right'} {tooltipClosing ? 'tooltip-closing' : ''}"
				>
					<kbd class="font-geist-mono text-[10px] text-surface-500">
						{searchShortcutLabel}
					</kbd>
				</Tooltip.Content>
			</Tooltip.Positioner>
		</Portal>
	</Tooltip>

	<Dialog
		{open}
		initialFocusEl={() => inputElement}
		onOpenChange={handleOpenChange}
	>
		<Portal>
			<Dialog.Backdrop
				class="fixed inset-0 z-50 bg-surface-950/65 backdrop-blur-sm"
			/>
			<Dialog.Positioner
				class="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-2 pt-[8svh] md:p-8 md:pt-[12svh]"
			>
				<Dialog.Content
					class="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-surface-500/30 bg-surface-50-950 shadow-2xl outline-none"
				>
					<!-- <div class="flex items-start justify-between gap-4 p-4 pb-3 md:p-6">
						<div>
							<Dialog.Title
								class="font-josefin-sans text-2xl font-bold text-primary-500 md:text-3xl"
								>Search VitroidFPV</Dialog.Title
							>
							<Dialog.Description class="text-sm text-surface-500">
								Find guides, gear, parts, pages, and FAQ answers.
							</Dialog.Description>
						</div>
					</div> -->

					<div
						class="absolute top-0 flex w-full items-center justify-between gap-2 p-4"
					>
						<div
							class="flex flex-1 items-center gap-2 rounded-2xl border-2 border-surface-500/20 bg-surface-50-950 px-3 transition focus-within:border-primary-500 focus-within:ring-4 focus-within:ring-primary-500/10"
						>
							<Search
								class="size-5 shrink-0 text-surface-400"
								aria-hidden="true"
							/>
							<input
								{@attach captureInput}
								type="search"
								value={search.query}
								placeholder="Search for soldering, motors, simulators…"
								aria-label="Search the site"
								aria-controls="site-search-results"
								autocomplete="off"
								class="search-input h-12 min-w-0 flex-1 border-0 bg-transparent px-0 text-base outline-none placeholder:text-surface-400 md:h-14 md:text-lg"
								oninput={(event) => search.queue(event.currentTarget.value)}
								onkeydown={handleInputKeydown}
							/>
							{#if search.query}
								<button
									type="button"
									class="rounded-full p-1 text-surface-400 hover:bg-surface-500/10 hover:text-primary-500"
									aria-label="Clear search"
									onclick={clearSearch}
								>
									<CircleX
										class="size-4"
										aria-hidden="true"
									/>
								</button>
							{/if}
							<Dialog.CloseTrigger
								class="-mr-1 hidden w-fit rounded-full p-2 text-surface-500 transition hover:bg-surface-500/10 hover:text-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500 md:inline-flex"
								aria-label="Close search"
							>
								<X
									class="size-5"
									aria-hidden="true"
								/>
							</Dialog.CloseTrigger>
						</div>
					</div>

					<div
						id="site-search-results"
						{@attach captureResults}
						class="mt-16 max-h-[55svh] overflow-y-auto p-4 md:p-6"
						role="region"
						aria-label="Search results"
					>
						<div
							class="sr-only"
							aria-live="polite"
						>
							{#if search.status === "ready"}
								{search.results.length} search {search.results.length === 1
									? "result"
									: "results"}
							{:else if search.status === "loading"}
								Searching
							{/if}
						</div>

						{#if search.status === "loading"}
							<div
								class="flex min-h-32 items-center justify-center text-sm text-surface-500"
							>
								<span
									class="mr-2 size-2 animate-pulse rounded-full bg-primary-500"
								></span>
								Searching the site…
							</div>
						{:else if search.status === "error"}
							<p class="py-12 text-center text-sm text-error-500">
								Search could not be loaded. Please try again.
							</p>
						{:else if search.normalizedQuery.length < minimumQueryLength}
							<div class="py-10 text-center text-sm text-surface-500">
								<p>Type at least two characters to search.</p>
								<p class="mt-1 text-xs">
									Use <kbd class="font-geist-mono">↑</kbd> and
									<kbd class="font-geist-mono">↓</kbd> to move through results.
								</p>
							</div>
						{:else if search.results.length > 0}
							<SearchResults
								results={search.results}
								compact
								onselect={() => (open = false)}
							/>
						{:else}
							<div class="py-12 text-center">
								<p class="font-semibold">
									No results for “{search.normalizedQuery}”
								</p>
								<p class="mt-1 text-sm text-surface-500">
									Try a product name, guide topic, or broader term.
								</p>
							</div>
						{/if}
					</div>

					{#if search.normalizedQuery.length >= minimumQueryLength}
						<a
							href={resolve(allResultsPath as "/")}
							class="flex items-center justify-between border-t border-surface-500/20 px-4 py-3 text-sm font-semibold text-primary-600 transition hover:bg-primary-500/10 md:px-6 dark:text-primary-400"
							onclick={() => (open = false)}
						>
							<span>View all results for “{search.normalizedQuery}”</span>
							<ArrowRight
								class="size-4"
								aria-hidden="true"
							/>
						</a>
					{/if}
				</Dialog.Content>
			</Dialog.Positioner>
		</Portal>
	</Dialog>
</li>

<style>
	:global(.search-shortcut-tooltip:not([hidden]):not(.tooltip-closing)) {
		animation: search-shortcut-tooltip-in 150ms ease;
	}

	:global(.search-shortcut-tooltip.tooltip-closing:not([hidden])) {
		opacity: 0;
		scale: 0.95;
		transition:
			transform 150ms ease,
			opacity 150ms ease;
	}

	@keyframes search-shortcut-tooltip-in {
		from {
			opacity: 0;
			scale: 0.95;
		}

		to {
			opacity: 1;
			scale: 1;
		}
	}
</style>
