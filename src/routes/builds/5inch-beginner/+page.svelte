<script lang="ts">
	import { browser, dev } from "$app/environment"
	import { page } from "$app/state"
	import DevSectionHeading from "$components/BuildGuide/DevSectionHeading.svelte"
	import DevPartCard from "$components/BuildGuide/DevPartCard.svelte"
	import PartCard from "$components/BuildGuide/PartCard.svelte"
	import SectionHeading from "$components/BuildGuide/SectionHeading.svelte"
	import BuildIntro, { metadata } from "./5inch-beginner-page.svx"
	import PageWrapper from "$components/PageWrapper.svelte"
	import { getBuildGuideSections } from "$lib/builds/guide-sections"
	import type { BuildGuidePart } from "$lib/builds/guide-sections"
	import ListPopup from "$components/BuildGuide/ListPopup.svelte"
	import { onMount } from "svelte"

	const buildSlug = "5inch-beginner"
	const guideSections = getBuildGuideSections(buildSlug)
	const guidePartsById = new Map(
		guideSections.flatMap((section) =>
			section.parts.map((part) => [part.id, part] as const)
		)
	)
	const listStorageKey = `build-guide-list:${buildSlug}`
	const showDevUi = $derived(dev && !page.url.searchParams.has("public"))

	type BuildListItem = {
		part: BuildGuidePart
		quantity: number
	}

	let listState: "open" | "minimized" | "closed" = $state("closed")
	let listItems = $state.raw<BuildListItem[]>([])

	function saveList(items: BuildListItem[]) {
		if (!browser) return

		try {
			if (items.length === 0) {
				localStorage.removeItem(listStorageKey)
				return
			}

			localStorage.setItem(
				listStorageKey,
				JSON.stringify(
					items.map((item) => ({
						partId: item.part.id,
						quantity: item.quantity
					}))
				)
			)
		} catch {
			// localStorage can be unavailable in restricted browsing contexts.
		}
	}

	function restoreList(): BuildListItem[] {
		if (!browser) return []

		try {
			const rawList = localStorage.getItem(listStorageKey)
			if (!rawList) return []

			const storedItems = JSON.parse(rawList) as unknown
			if (!Array.isArray(storedItems)) return []

			const restoredItems: Record<string, BuildListItem> = {}
			for (const storedItem of storedItems) {
				if (!storedItem || typeof storedItem !== "object") continue

				const { partId, quantity } = storedItem as Record<string, unknown>
				if (
					typeof partId !== "string" ||
					typeof quantity !== "number" ||
					!Number.isFinite(quantity)
				) {
					continue
				}

				const part = guidePartsById.get(partId)
				if (!part) continue

				restoredItems[partId] = {
					part,
					quantity: Math.min(69, Math.max(1, Math.round(quantity)))
				}
			}

			return Object.values(restoredItems)
		} catch {
			return []
		}
	}

	function updateListItems(items: BuildListItem[]) {
		listItems = items
		saveList(items)
	}

	onMount(() => {
		const restoredItems = restoreList()
		if (restoredItems.length === 0) {
			saveList([])
			return
		}

		listItems = restoredItems
		listState = "open"
		saveList(restoredItems)
	})

	function addPart(part: BuildGuidePart) {
		const existingItem = listItems.find((item) => item.part.id === part.id)
		const defaultQuantity = part.sectionSlug === "motors" ? 5 : 1

		const nextItems = existingItem
			? listItems.map((item) =>
					item.part.id === part.id
						? { ...item, quantity: Math.min(item.quantity + 1, 69) }
						: item
				)
			: [...listItems, { part, quantity: defaultQuantity }]
		updateListItems(nextItems)
		listState = "open"
	}

	function removePart(partId: string) {
		const nextItems = listItems.filter((item) => item.part.id !== partId)
		updateListItems(nextItems)
		if (nextItems.length === 0) listState = "closed"
	}

	function changePartQuantity(partId: string, quantity: number) {
		const nextQuantity = Math.min(69, Math.max(1, Math.round(quantity)))
		updateListItems(
			listItems.map((item) =>
				item.part.id === partId ? { ...item, quantity: nextQuantity } : item
			)
		)
	}

	function toggleList() {
		listState = listState === "open" ? "minimized" : "open"
	}
</script>

<PageWrapper
	h1={metadata.title as string}
	h2={metadata.description as string}
	seoDescription={metadata.seoDescription as string}
>
	{#snippet description()}
		<BuildIntro />
	{/snippet}

	<div class="fixed top-0 right-0 z-10">
		<ListPopup
			items={listItems}
			pageTitle={metadata.title as string}
			state={listState}
			ontoggle={toggleList}
			onremove={removePart}
			onquantitychange={changePartQuantity}
		/>
	</div>

	<div class="flex flex-col gap-8 px-2 pb-8 lg:px-4 xl:px-8">
		{#each guideSections as section (section.id)}
			<div>
				{#if showDevUi}
					<DevSectionHeading
						{buildSlug}
						sections={guideSections}
						{section}
					/>
				{:else}
					<SectionHeading {section} />
				{/if}
			</div>
			<div class="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
				{#each section.parts as part (part.id)}
					{#if showDevUi}
						<DevPartCard
							{buildSlug}
							sections={guideSections}
							{section}
							{part}
							onaddtolist={() => addPart(part)}
						/>
					{:else}
						<PartCard
							{part}
							onaddtolist={() => addPart(part)}
						/>
					{/if}
				{/each}
				{#if showDevUi}
					<DevPartCard
						{buildSlug}
						sections={guideSections}
						{section}
					/>
				{/if}
			</div>
		{/each}
		{#if showDevUi}
			<DevSectionHeading
				{buildSlug}
				sections={guideSections}
			/>
		{/if}
	</div>
</PageWrapper>
