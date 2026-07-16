<script lang="ts">
	import SplitCorner from "$components/graphics/SplitCorner.svelte"
	import PartImage from "$components/BuildGuide/PartImage.svelte"
	import PartTags from "$components/BuildGuide/PartTags.svelte"
	import {
		guidePartColors,
		type BuildGuidePart
	} from "$lib/builds/guide-sections"
	import { toastError, toastSuccess } from "$lib/toaster"
	import {
		ChevronUp,
		Copy,
		PanelTopClose,
		PanelTopOpen,
		X
	} from "@lucide/svelte"
	import { slide } from "svelte/transition"

	type BuildListItem = {
		part: BuildGuidePart
		quantity: number
	}

	let {
		items,
		pageTitle,
		state = "closed",
		ontoggle,
		onremove,
		onquantitychange
	}: {
		items: BuildListItem[]
		pageTitle: string
		state?: "open" | "minimized" | "closed"
		ontoggle: () => void
		onremove: (partId: string) => void
		onquantitychange: (partId: string, quantity: number) => void
	} = $props()

	const stateClasses = {
		open: "translate-y-0",
		minimized: "-translate-y-full",
		closed: "-translate-y-[calc(100%+4rem)]"
	}

	function parsePrice(price?: string): number | null {
		if (!price) return null

		const value = Number.parseFloat(price.replace(/[^0-9.-]/g, ""))
		return Number.isFinite(value) ? value : null
	}

	const total = $derived(
		items.reduce(
			(sum, item) => sum + (parsePrice(item.part.price) ?? 0) * item.quantity,
			0
		)
	)
	const formattedTotal = $derived(
		total.toLocaleString("en-US", {
			style: "currency",
			currency: "USD"
		})
	)

	async function copyBuildList() {
		const markdown = [
			`**${pageTitle} Build List**:`,
			...items.map(
				(item) =>
					`- ${item.part.title} (${item.quantity === 1 ? "" : `${item.quantity}x `}${item.part.price ?? "N/A"})`
			),
			`Total: **${formattedTotal}**`,
			`Shared from: ${window.location.href}`
		].join("\n")

		try {
			await navigator.clipboard.writeText(markdown)
			toastSuccess({ title: "Build list copied to clipboard" })
		} catch {
			toastError({ title: "Failed to copy build list" })
		}
	}

	function handleQuantityInput(event: Event, partId: string) {
		const quantity = (event.currentTarget as HTMLInputElement).valueAsNumber
		if (Number.isFinite(quantity)) onquantitychange(partId, quantity)
	}

	function tagsScrollFade(node: HTMLElement) {
		const scrollEl = node.querySelector<HTMLElement>(".tags-scroll")
		if (!scrollEl) return () => {}

		let showFade = false

		const update = () => {
			const hasOverflow = scrollEl.scrollWidth > scrollEl.clientWidth + 1
			const atEnd =
				scrollEl.scrollLeft + scrollEl.clientWidth >= scrollEl.scrollWidth - 1
			const shouldShow = hasOverflow && !atEnd

			if (shouldShow !== showFade) {
				showFade = shouldShow
				node.style.setProperty("--tags-fade-opacity", shouldShow ? "1" : "0")
			}
		}

		update()

		const resizeObserver = new ResizeObserver(update)
		resizeObserver.observe(scrollEl)

		const mutationObserver = new MutationObserver(update)
		mutationObserver.observe(scrollEl, { childList: true, subtree: true })

		scrollEl.addEventListener("scroll", update, { passive: true })

		return () => {
			resizeObserver.disconnect()
			mutationObserver.disconnect()
			scrollEl.removeEventListener("scroll", update)
		}
	}
</script>

<div
	class="relative h-fit w-2xl max-w-[100vw] rounded-bl-4xl border-b-2 border-l-2 border-surface-100-900 bg-surface-50-950 {stateClasses[
		state
	]} p-2 pb-2 transition-transform duration-300 md:p-4 md:pb-4"
>
	<div
		class="flex max-h-[50vh] max-w-full flex-col overflow-y-auto rounded-2xl"
	>
		{#each items as item (item.part.id)}
			<div
				class="flex shrink-0 gap-2 not-last:mb-2 md:not-last:mb-3"
				in:slide={{ duration: items.length === 1 ? 0 : 300 }}
				out:slide={{ duration: 300 }}
			>
				<div
					class="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-surface-100-900 md:size-16"
				>
					{#if item.part.image}
						<PartImage
							src={item.part.image}
							alt={item.part.imageAlt}
							sizes="64px"
						/>
					{/if}
				</div>
				<div
					class="flex min-w-0 flex-1 flex-col justify-between md:flex-row md:gap-2"
				>
					<div class="mr-4 flex min-w-0 flex-1 flex-col gap-1">
						<h3 class="md:text-lg">
							<a
								href={item.part.url}
								class="fancy-link font-semibold {guidePartColors[
									item.part.color
								].text}"
								target="_blank"
								rel="external noopener noreferrer">{item.part.title}</a
							>
						</h3>
						<div
							class="tags-fade-wrap relative hidden w-full min-w-0 md:block"
							{@attach tagsScrollFade}
						>
							<div class="tags-scroll w-full min-w-0 overflow-x-auto">
								<PartTags
									tags={item.part.tags}
									priceClass={guidePartColors[item.part.color].price}
									elevatedTooltips
									class="flex w-max flex-nowrap! gap-1 *:shrink-0 *:whitespace-nowrap"
								/>
							</div>
							<div
								class="tags-fade"
								aria-hidden="true"
							></div>
						</div>
					</div>
					<div
						class="flex shrink-0 items-center justify-end gap-2 md:justify-start"
					>
						<div class="flex shrink-0 items-center">
							<input
								type="number"
								min="1"
								max="69"
								value={item.quantity}
								aria-label={`${item.part.title} quantity`}
								oninput={(event) => handleQuantityInput(event, item.part.id)}
								class="no-spinner w-10 rounded-xl bg-surface-100-900 px-2 py-1 text-sm outline-none"
							/>
							<div class="ml-1 flex flex-col items-center">
								<button
									type="button"
									class="text-surface-500/40 disabled:opacity-30 {guidePartColors[
										item.part.color
									].iconHover}"
									aria-label={`Increase ${item.part.title} quantity`}
									disabled={item.quantity >= 69}
									onclick={() =>
										onquantitychange(item.part.id, item.quantity + 1)}
								>
									<ChevronUp class="size-4 stroke-3" />
								</button>
								<button
									type="button"
									class="rotate-180 text-surface-500/40 disabled:opacity-30 {guidePartColors[
										item.part.color
									].iconHover}"
									aria-label={`Decrease ${item.part.title} quantity`}
									disabled={item.quantity <= 1}
									onclick={() =>
										onquantitychange(item.part.id, item.quantity - 1)}
								>
									<ChevronUp class="size-4 stroke-3" />
								</button>
							</div>
						</div>
						{#if item.part.price}
							<span class="font-geist-mono font-semibold md:text-lg"
								>{item.part.price}</span
							>
						{/if}
						<button
							type="button"
							class="text-surface-500 transition-colors hover:text-error-500"
							aria-label={`Remove ${item.part.title} from build list`}
							onclick={() => onremove(item.part.id)}
						>
							<X class="size-6" />
						</button>
					</div>
				</div>
			</div>
		{/each}
	</div>
	<SplitCorner
		fillClass="fill-surface-50-950"
		class="pointer-events-none absolute top-full right-0 h-12 text-surface-100-900 md:h-16"
	/>
	<div
		class="absolute top-full right-0 flex h-12 items-center justify-end gap-2 px-2 md:h-16 md:gap-4 md:px-4"
	>
		{#if items.length > 0}
			<span
				class="font-geist-mono text-lg font-semibold text-success-500 md:text-2xl"
				>{formattedTotal}</span
			>
		{/if}
		<button
			type="button"
			class="btn-icon preset-filled-surface-100-900"
			aria-label="Copy build list to clipboard"
			disabled={items.length === 0}
			onclick={copyBuildList}
		>
			<Copy class="size-4" />
		</button>
		<button
			type="button"
			class="btn-icon preset-filled-surface-100-900"
			aria-label={state === "open" ? "Minimize build list" : "Open build list"}
			onclick={ontoggle}
		>
			{#if state === "open"}
				<PanelTopClose class="size-4" />
			{:else}
				<PanelTopOpen class="size-4" />
			{/if}
		</button>
	</div>
</div>

<style>
	.no-spinner::-webkit-outer-spin-button,
	.no-spinner::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	.no-spinner {
		-moz-appearance: textfield;
		appearance: textfield;
	}

	.tags-fade-wrap {
		--tags-fade-opacity: 0;
	}

	.tags-scroll {
		scrollbar-width: none;
		-ms-overflow-style: none;
	}

	.tags-scroll::-webkit-scrollbar {
		display: none;
	}

	.tags-fade {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		width: 2rem;
		pointer-events: none;
		background: linear-gradient(
			to left,
			var(--color-surface-50-950),
			transparent
		);
		opacity: var(--tags-fade-opacity);
		transition: opacity 200ms ease;
	}
</style>
