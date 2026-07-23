<script lang="ts">
	import { Dialog, Portal } from "@skeletonlabs/skeleton-svelte"
	import { toastError, toastWarning } from "$lib/toaster"
	import {
		ChevronLeft,
		ChevronRight,
		Download,
		ExternalLink,
		ImageDown,
		Loader2,
		Search,
		X
	} from "@lucide/svelte"

	type ImageSearchResult = {
		id: string
		title: string
		imageUrl: string
		thumbnailUrl: string
		sourceUrl: string
		source: string
		width: number | null
		height: number | null
		fileSize: number | null
	}

	let {
		buildSlug,
		title,
		slug,
		ondownload
	}: {
		buildSlug: string
		title: string
		slug: string
		ondownload: (result: { extension: string; path: string }) => void
	} = $props()

	let query = $state("")
	let dialogOpen = $state(false)
	let results = $state.raw<ImageSearchResult[]>([])
	let page = $state(1)
	let hasNext = $state(false)
	let searching = $state(false)
	let downloadingId = $state<string | null>(null)

	const effectiveQuery = $derived(query.trim() || title.trim())
	const canSearch = $derived(effectiveQuery.length > 0 && !searching)
	const dialogAnimation =
		"transition transition-discrete opacity-0 starting:data-[state=open]:opacity-0 data-[state=open]:opacity-100"

	function formatBytes(bytes: number): string {
		if (bytes < 1024) return `${bytes} B`
		if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
		return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
	}

	async function searchImages(targetPage = 1) {
		if (!canSearch) return

		searching = true

		try {
			const response = await fetch(
				`/api/dev/search-build-images?q=${encodeURIComponent(effectiveQuery)}&page=${targetPage}`
			)
			const payload = (await response.json().catch(() => null)) as {
				results?: ImageSearchResult[]
				page?: number
				hasNext?: boolean
				message?: string
			} | null
			if (!response.ok)
				throw new Error(payload?.message ?? "Image search failed")

			results = payload?.results ?? []
			page = payload?.page ?? targetPage
			hasNext = payload?.hasNext ?? false
			if (results.length === 0) {
				toastWarning({ title: "No images found. Try a broader query." })
			}
		} catch (reason) {
			toastError({
				title: reason instanceof Error ? reason.message : "Image search failed"
			})
		} finally {
			searching = false
		}
	}

	function handleOpenChange(details: { open: boolean }) {
		dialogOpen = details.open
		if (details.open && results.length === 0 && canSearch) {
			void searchImages(1)
		}
	}

	async function downloadImage(result: ImageSearchResult) {
		if (!slug.trim() || downloadingId) return

		downloadingId = result.id

		try {
			const response = await fetch("/api/dev/download-build-image", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					buildSlug,
					slug: slug.trim(),
					imageUrl: result.imageUrl
				})
			})
			const payload = (await response.json().catch(() => null)) as {
				extension?: string
				path?: string
				message?: string
			} | null
			if (!response.ok || !payload?.extension || !payload.path) {
				throw new Error(payload?.message ?? "Image download failed")
			}

			ondownload({ extension: payload.extension, path: payload.path })
		} catch (reason) {
			toastError({
				title:
					reason instanceof Error ? reason.message : "Image download failed"
			})
		} finally {
			downloadingId = null
		}
	}
</script>

<Dialog
	open={dialogOpen}
	onOpenChange={handleOpenChange}
>
	<Dialog.Trigger
		type="button"
		class="rounded-md bg-surface-500/10 p-1.5 text-surface-500 transition-colors hover:bg-surface-500/20 hover:text-current disabled:opacity-40"
		aria-label="Find an image"
		disabled={!title.trim() || !slug.trim()}
	>
		<ImageDown class="size-5" />
	</Dialog.Trigger>

	<Portal>
		<Dialog.Backdrop
			class="fixed inset-0 z-50 bg-surface-50-950/80 backdrop-blur-sm"
		/>
		<Dialog.Positioner
			class="fixed inset-0 z-50 flex items-center justify-center p-4"
		>
			<Dialog.Content
				class="flex max-h-[calc(100svh-2rem)] w-[min(72rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-surface-100-900 bg-surface-50-950 shadow-2xl {dialogAnimation}"
			>
				<header
					class="flex items-center gap-2 border-b border-surface-500/20 p-4"
				>
					<Dialog.Title class="sr-only"
						>Find an image for {title.trim()}</Dialog.Title
					>
					<input
						type="search"
						bind:value={query}
						class="min-w-0 flex-1 rounded-md bg-surface-500/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-500"
						placeholder={title.trim() || "Search images"}
						onkeydown={(event) => event.key === "Enter" && searchImages(1)}
					/>
					<button
						type="button"
						class="btn gap-2 preset-filled-surface-100-900"
						disabled={!canSearch}
						onclick={() => searchImages(1)}
					>
						{#if searching}
							<Loader2 class="size-5 animate-spin" />
							Searching
						{:else}
							<Search class="size-5" />
							Search
						{/if}
					</button>
					<Dialog.CloseTrigger
						class="rounded-full p-1 text-surface-500 transition-colors hover:bg-surface-500/10 hover:text-current"
						aria-label="Close image search"
					>
						<X class="size-6" />
					</Dialog.CloseTrigger>
				</header>

				<div class="min-h-48 flex-1 overflow-y-auto p-4">
					{#if results.length > 0}
						<div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
							{#each results as result (result.id)}
								<article
									class="flex min-w-0 flex-col overflow-hidden rounded-xl border border-surface-500/15 bg-surface-500/5"
								>
									<img
										src={result.thumbnailUrl}
										alt={result.title}
										class="aspect-square w-full bg-surface-950/20 object-contain"
										loading="lazy"
									/>
									<div class="flex flex-1 flex-col gap-1 p-3 text-xs">
										<p
											class="line-clamp-2 font-medium"
											title={result.title}
										>
											{result.title}
										</p>
										<p class="text-surface-500">
											{#if result.width && result.height}
												{result.width} × {result.height}
											{:else}
												Unknown dimensions
											{/if}
											{#if result.fileSize}
												· {formatBytes(result.fileSize)}{/if}
										</p>
										<div
											class="mt-auto flex items-center justify-between gap-2 pt-2"
										>
											<a
												href={result.sourceUrl}
												target="_blank"
												rel="external noopener noreferrer"
												class="flex min-w-0 items-center gap-1 text-surface-500 hover:text-current"
												title={result.source}
											>
												<span class="truncate">{result.source}</span>
												<ExternalLink class="size-3 shrink-0" />
											</a>
											<button
												type="button"
												class="btn shrink-0 gap-1 preset-filled-surface-100-900 px-2 py-1"
												aria-label={`Use ${result.title}`}
												disabled={!slug.trim() || downloadingId !== null}
												onclick={() => downloadImage(result)}
											>
												{#if downloadingId === result.id}
													<Loader2 class="size-4 animate-spin" />
												{:else}
													<Download class="size-4" />
												{/if}
												Use
											</button>
										</div>
									</div>
								</article>
							{/each}
						</div>
					{:else if searching}
						<div
							class="flex min-h-48 items-center justify-center gap-2 text-surface-500"
						>
							<Loader2 class="size-5 animate-spin" />
							Searching for images…
						</div>
					{:else}
						<p
							class="flex min-h-48 items-center justify-center text-surface-500"
						>
							Search for an image above.
						</p>
					{/if}
				</div>

				<footer
					class="flex flex-col gap-2 border-t border-surface-500/20 p-4 text-xs"
				>
					{#if results.length > 0}
						<nav
							class="flex items-center justify-center gap-3"
							aria-label="Image search pages"
						>
							<button
								type="button"
								class="btn gap-1 preset-filled-surface-100-900 px-3 py-1.5"
								disabled={page <= 1 || searching}
								onclick={() => searchImages(page - 1)}
							>
								<ChevronLeft class="size-4" />
								Previous
							</button>
							<span class="min-w-16 text-center font-medium">Page {page}</span>
							<button
								type="button"
								class="btn gap-1 preset-filled-surface-100-900 px-3 py-1.5"
								disabled={!hasNext || searching}
								onclick={() => searchImages(page + 1)}
							>
								Next
								<ChevronRight class="size-4" />
							</button>
						</nav>
					{/if}
					<p class="text-surface-500">
						Results via DuckDuckGo. Check the source's usage rights before
						publishing.
					</p>
				</footer>
			</Dialog.Content>
		</Dialog.Positioner>
	</Portal>
</Dialog>
