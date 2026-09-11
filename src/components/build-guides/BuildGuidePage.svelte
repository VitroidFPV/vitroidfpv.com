<script lang="ts">
	import { browser, dev } from "$app/environment"
	import { page } from "$app/state"
	import EditablePartCard from "$components/build-guides/editor/EditablePartCard.svelte"
	import EditableSectionHeading from "$components/build-guides/editor/EditableSectionHeading.svelte"
	import GuideSectionNav from "$components/build-guides/GuideSectionNav.svelte"
	import GuideShoppingList from "$components/build-guides/GuideShoppingList.svelte"
	import PartCard from "$components/build-guides/PartCard.svelte"
	import SectionHeading from "$components/build-guides/SectionHeading.svelte"
	import PageWrapper from "$components/PageWrapper.svelte"
	import { buildGuideAccentValues } from "$lib/build-guides/theme"
	import type { BuildGuide, BuildGuidePart } from "$lib/build-guides/types"
	import { onMount } from "svelte"

	let { guide, editable = false }: { guide: BuildGuide; editable?: boolean } =
		$props()

	const guideSlug = $derived(guide.slug)
	const guideAccent = $derived(buildGuideAccentValues[guide.accent])
	const GuideIntro = $derived(guide.Intro)
	const guideSections = $derived(guide.sections)
	const guidePartsById = $derived(
		new Map(
			guideSections.flatMap((section) =>
				section.parts.map((part) => [part.id, part] as const)
			)
		)
	)
	const listStorageKey = $derived(`build-guide-list:${guide.slug}`)
	const showDevUi = $derived(
		editable && dev && !page.url.searchParams.has("public")
	)

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
	h1={guide.title}
	h2={guide.subtitle}
	seoDescription={guide.seoDescription}
	seoImage={guide.seoImage}
	primaryColor={guideAccent.primary500}
	themeColor={guideAccent.themeColor}
>
	{#snippet description()}
		<GuideIntro />
	{/snippet}

	<div class="fixed top-0 right-0 z-10">
		<GuideShoppingList
			items={listItems}
			pageTitle={guide.title}
			state={listState}
			ontoggle={toggleList}
			onremove={removePart}
			onquantitychange={changePartQuantity}
		/>
	</div>

	<GuideSectionNav sections={guideSections} />

	<div class="flex flex-col gap-12 px-2 pb-8 lg:px-4 xl:px-8">
		{#each guideSections as section (section.id)}
			<section
				id={section.id}
				class="flex scroll-mt-12 flex-col gap-8 lg:not-first:mt-16"
				aria-label={section.title}
			>
				<div>
					{#if showDevUi}
						<EditableSectionHeading
							{guideSlug}
							sections={guideSections}
							{section}
						/>
					{:else}
						<SectionHeading {section} />
					{/if}
				</div>
				<div class="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
					{#each section.parts as part (part.id)}
						<div
							id={part.id}
							class="scroll-mt-16"
						>
							{#if showDevUi}
								<EditablePartCard
									{guideSlug}
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
						</div>
					{/each}
					{#if showDevUi}
						<EditablePartCard
							{guideSlug}
							sections={guideSections}
							{section}
						/>
					{/if}
				</div>
			</section>
		{/each}
		{#if showDevUi}
			<EditableSectionHeading
				{guideSlug}
				sections={guideSections}
			/>
		{/if}
	</div>
</PageWrapper>
