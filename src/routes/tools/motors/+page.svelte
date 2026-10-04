<script lang="ts">
	import ContentPage from "$components/content/ContentPage.svelte"
	import PageContent, { metadata } from "$content/pages/tools/motors.svx"
	import { fade, slide } from "svelte/transition"
	import { flip } from "svelte/animate"
	import { afterNavigate, replaceState } from "$app/navigation"
	import { page } from "$app/state"
	import { onDestroy } from "svelte"
	import { statorVolume, statorSurfaceArea } from "$lib/tools/motor-size"
	import { Check, Copy, X } from "@lucide/svelte"

	const sortOptions = [
		{ value: "added", label: "Added order" },
		{ value: "size-asc", label: "Size (smallest first)" },
		{ value: "size-desc", label: "Size (largest first)" },
		{ value: "area-asc", label: "Surface area (smallest first)" },
		{ value: "area-desc", label: "Surface area (largest first)" },
		{ value: "volume-asc", label: "Volume (smallest first)" },
		{ value: "volume-desc", label: "Volume (largest first)" }
	] as const
	type SortOption = (typeof sortOptions)[number]["value"]

	function readSizes() {
		return [
			...new Set(
				(page.url.searchParams.get("motors") ?? "").split("-").filter(Boolean)
			)
		]
	}

	function readSort(): SortOption {
		const value = page.url.searchParams.get("sort")
		return (
			sortOptions.find((option) => option.value === value)?.value ?? "added"
		)
	}

	let inputSize = $state("")

	let sizes: string[] = $state(readSizes())
	let sortBy = $state<SortOption>(readSort())
	let copied = $state(false)
	let copyTimeout: ReturnType<typeof setTimeout>
	let rowCount = $derived(Math.ceil(sizes.length / 2))
	let sortedSizes = $derived.by(() => {
		if (sortBy === "added") return sizes

		const [field, order] = sortBy.split("-")
		const direction = order === "desc" ? -1 : 1
		return [...sizes].sort((a, b) => {
			if (field === "size")
				return a.localeCompare(b, undefined, { numeric: true }) * direction

			const measure = field === "area" ? statorSurfaceArea : statorVolume
			const aValue = measure(a)
			const bValue = measure(b)
			if (aValue === null) return bValue === null ? 0 : 1
			if (bValue === null) return -1
			return (aValue - bValue) * direction
		})
	})

	function syncUrl() {
		const url = new URL(window.location.href)
		if (sizes.length) url.searchParams.set("motors", sizes.join("-"))
		else url.searchParams.delete("motors")
		url.searchParams.set("sort", sortBy)
		if (url.href !== window.location.href) {
			copied = false
			replaceState(url, page.state)
		}
	}

	async function copyUrl() {
		try {
			await navigator.clipboard.writeText(window.location.href)
			copied = true
			clearTimeout(copyTimeout)
			copyTimeout = setTimeout(() => (copied = false), 1000)
		} catch {
			copied = false
		}
	}

	function addSize() {
		const size = inputSize.trim()
		if (size && !sizes.includes(size)) {
			sizes.push(size)
			syncUrl()
		}
		inputSize = ""
	}

	function removeSize(size: string) {
		sizes = sizes.filter((s) => s !== size)
		syncUrl()
	}

	afterNavigate(() => {
		sizes = readSizes()
		sortBy = readSort()
	})

	onDestroy(() => clearTimeout(copyTimeout))
</script>

<ContentPage
	{metadata}
	source="src/content/pages/tools.svx"
	Content={PageContent}
>
	<div class="flex flex-col gap-4 px-2 pb-8 lg:px-4 xl:px-8">
		<div class="flex items-center justify-end gap-2">
			<label class="flex items-center gap-2 text-sm">
				<span class="sr-only sm:not-sr-only">Sort by</span>
				<select
					value={sortBy}
					onchange={(event) => {
						sortBy = event.currentTarget.value as SortOption
						syncUrl()
					}}
					class="rounded-xl border-2 border-surface-200-800 bg-surface-50-950 px-3 py-2"
				>
					{#each sortOptions as option (option.value)}
						<option value={option.value}>{option.label}</option>
					{/each}
				</select>
			</label>
			<button
				type="button"
				onclick={copyUrl}
				aria-label={copied ? "URL copied" : "Copy current URL"}
				title={copied ? "URL copied" : "Copy current URL"}
				class="flex size-10 shrink-0 items-center justify-center rounded-xl border-2 border-surface-200-800 bg-surface-50-950 hover:border-primary-500 hover:text-primary-500"
			>
				{#if copied}<Check class="size-5 text-primary-500" />{:else}<Copy
						class="size-5"
					/>{/if}
			</button>
		</div>
		<div
			class="grid h-(--mobile-height) grid-cols-1 gap-4 overflow-hidden transition-[height] duration-300 ease-out motion-reduce:transition-none xl:h-(--desktop-height) xl:grid-cols-2"
			style:--mobile-height={`${sizes.length ? sizes.length * 5 - 1 : 0}rem`}
			style:--desktop-height={`${rowCount ? rowCount * 5 - 1 : 0}rem`}
		>
			{#each sortedSizes as size (size)}
				<div
					animate:flip={{ duration: 300 }}
					in:slide={{ duration: 300 }}
					out:fade={{ duration: 200 }}
					class="flex h-16 w-full items-center justify-between gap-1 rounded-2xl border-2 border-surface-200-800 bg-surface-50-950/50 p-2 backdrop-blur-sm md:gap-0 md:p-4"
				>
					<span
						class="shrink-0 text-sm font-semibold text-primary-500 min-[390px]:text-lg"
						>{size}</span
					>
					<div
						class="flex shrink-0 items-center gap-1 text-xs whitespace-nowrap min-[390px]:text-base md:gap-4"
					>
						<div class="flex items-center gap-0.5 md:gap-1">
							<span class="text-surface-500"
								><span class="md:hidden">Area:</span><span
									class="hidden md:inline">Surface Area:</span
								></span
							>
							<span class="font-bold">{statorSurfaceArea(size)}</span>
							<span>mm²</span>
						</div>
						<div class="flex items-center gap-0.5 md:gap-1">
							<span class="text-surface-500"
								><span class="md:hidden">Vol:</span><span
									class="hidden md:inline">Volume:</span
								></span
							>
							<span class="font-bold">{statorVolume(size)}</span>
							<span>mm³</span>
						</div>
						<button
							onclick={() => removeSize(size)}
							class="rounded-full bg-transparent p-1 text-surface-500 hover:bg-error-500/10 hover:text-error-500"
						>
							<X class="size-5 md:size-6" />
						</button>
					</div>
				</div>
			{/each}
		</div>

		<div
			class="dummy flex h-16 w-full items-center justify-between rounded-2xl border-2 border-dashed border-surface-200-800 bg-surface-50-950/50 p-4 backdrop-blur-sm"
		>
			<label class="flex items-center gap-1">
				<!-- <span>Stator Size:</span> -->
				<form
					onsubmit={(e) => {
						e.preventDefault()
						addSize()
					}}
				>
					<input
						type="text"
						bind:value={inputSize}
						placeholder="2207"
						class="input h-fit w-32 bg-surface-50-950 font-geist-mono outline-none focus:ring-primary-800 dark:focus:ring-primary-500"
					/>
				</form>
			</label>

			<div
				class="flex shrink-0 items-center gap-1 text-xs whitespace-nowrap text-surface-500 min-[390px]:text-base md:gap-4"
			>
				<div class="flex items-center gap-0.5 md:gap-1">
					<span class="text-surface-500"
						><span class="md:hidden">Area:</span><span class="hidden md:inline"
							>Surface Area:</span
						></span
					>
					<span class="font-bold">{statorSurfaceArea(inputSize)}</span>
					<span>mm²</span>
				</div>
				<div class="flex items-center gap-0.5 md:gap-1">
					<span class="text-surface-500"
						><span class="md:hidden">Vol:</span><span class="hidden md:inline"
							>Volume:</span
						></span
					>
					<span class="font-bold">{statorVolume(inputSize)}</span>
					<span>mm³</span>
				</div>
			</div>
		</div>
	</div>
</ContentPage>
