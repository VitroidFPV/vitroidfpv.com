<script lang="ts">
	import { browser } from "$app/environment"
	import ImageDownloader from "$components/BuildGuide/ImageDownloader.svelte"
	import PartCardFrame from "$components/BuildGuide/PartCardFrame.svelte"
	import PartCardView from "$components/BuildGuide/PartCardView.svelte"
	import PartTags from "$components/BuildGuide/PartTags.svelte"
	import {
		guidePartColors,
		parseBuildGuideTag,
		type BuildGuidePart,
		type BuildGuideSection,
		type GuidePartColor
	} from "$lib/builds/guide-sections"
	import {
		formatGuidePartTagsFromParsed,
		parseGuidePartTagsInput,
		serializeGuidePart,
		slugifyGuidePartTitle
	} from "$lib/builds/serialize-guide-part"
	import { ChevronUp, Eye, Loader2, Pencil, Save } from "@lucide/svelte"
	import { toastError, toastSuccess } from "$lib/toaster"
	import { tick, untrack } from "svelte"
	import { slide } from "svelte/transition"

	const colorOptions = Object.keys(guidePartColors) as GuidePartColor[]

	const imageFormats = ["webp", "png", "jpg", "jpeg", "avif", "gif"] as const
	type ImageFormat = (typeof imageFormats)[number]

	type NewPartDraft = {
		title: string
		url: string
		color: GuidePartColor
		imageFormat: ImageFormat | ""
		sectionSlug: string
		price: string
		tagsInput: string
		body: string
		slug: string
	}

	const lastAssignedOrderBySection: Record<string, number> = {}

	function sectionOrderKey(buildSlug: string, sectionSlug: string) {
		return `${buildSlug}:${sectionSlug}`
	}

	function parseImageFormat(filename: string): ImageFormat | "" {
		const match = filename.match(/\.([^.]+)$/)
		if (!match) return ""

		const ext = match[1].toLowerCase()
		return imageFormats.includes(ext as ImageFormat) ? (ext as ImageFormat) : ""
	}

	let {
		buildSlug,
		sections,
		section,
		part = null,
		onaddtolist
	}: {
		buildSlug: string
		sections: BuildGuideSection[]
		section: BuildGuideSection
		part?: BuildGuidePart | null
		onaddtolist?: () => void
	} = $props()

	const isNew = $derived(part === null)

	let editMode = $state(false)
	let editControlsVisible = $state(true)
	let title = $state("")
	let url = $state("")
	let order = $state(1)
	let color = $state<GuidePartColor>("success")
	let imageFormat = $state<ImageFormat | "">("")
	let sectionSlug = $state("")
	let price = $state("")
	let tagsInput = $state("")
	let orderSectionSlug = $state<string | null>(null)
	let body = $state("")
	let slug = $state("")
	let originalSlug = $state("")
	let originalSectionSlug = $state("")
	let originalSnapshot = $state("")
	let saving = $state(false)

	const colors = $derived(guidePartColors[color])

	const activeSectionSlug = $derived(sectionSlug || section.id)
	const newPartDraftKey = $derived(
		`build-guide-new-part:${buildSlug}:${section.id}`
	)
	const newPartDraft = $derived(
		JSON.stringify({
			title,
			url,
			color,
			imageFormat,
			sectionSlug,
			price,
			tagsInput,
			body,
			slug
		})
	)

	const previewTags = $derived(
		parseGuidePartTagsInput(tagsInput).map(parseBuildGuideTag)
	)

	const previewPrice = $derived(price.trim() || undefined)

	const imageFilename = $derived(
		imageFormat && slug.trim() ? `${slug.trim()}.${imageFormat}` : undefined
	)

	const currentSnapshot = $derived(
		JSON.stringify({
			title,
			url,
			order,
			color,
			imageFormat,
			price,
			tagsInput,
			body,
			slug,
			sectionSlug: activeSectionSlug
		})
	)

	const canSave = $derived(
		title.trim().length > 0 &&
			url.trim().length > 0 &&
			slug.trim().length > 0 &&
			(isNew || currentSnapshot !== originalSnapshot)
	)

	const fieldClass =
		"rounded-md bg-surface-500/10 p-0! outline-4 outline-surface-500/10"

	const descriptionFieldClass = `${fieldClass} break-normal`

	const controlClass =
		"rounded-md bg-surface-500/10 text-sm break-all px-2 py-1"

	function nextOrderForSection(targetSectionSlug: string): number {
		const targetSection = sections.find(
			(entry) => entry.id === targetSectionSlug
		)
		const fromData = targetSection
			? targetSection.parts.reduce(
					(max, entry) => Math.max(max, entry.order),
					0
				) + 1
			: 1
		const lastAssigned =
			lastAssignedOrderBySection[
				sectionOrderKey(buildSlug, targetSectionSlug)
			] ?? 0

		return Math.max(fromData, lastAssigned + 1)
	}

	function getNewPartDraft(): NewPartDraft | null {
		if (!browser) return null

		try {
			const raw = sessionStorage.getItem(newPartDraftKey)
			if (!raw) return null

			const draft = JSON.parse(raw) as Partial<NewPartDraft>
			if (
				typeof draft.title !== "string" ||
				typeof draft.url !== "string" ||
				typeof draft.color !== "string" ||
				typeof draft.imageFormat !== "string" ||
				typeof draft.sectionSlug !== "string" ||
				typeof draft.price !== "string" ||
				typeof draft.tagsInput !== "string" ||
				typeof draft.body !== "string" ||
				typeof draft.slug !== "string" ||
				!colorOptions.includes(draft.color as GuidePartColor) ||
				(!imageFormats.includes(draft.imageFormat as ImageFormat) &&
					draft.imageFormat !== "")
			) {
				return null
			}

			return draft as NewPartDraft
		} catch {
			return null
		}
	}

	function clearNewPartDraft() {
		if (browser) sessionStorage.removeItem(newPartDraftKey)
	}

	function resetFromPart(nextPart: BuildGuidePart | null) {
		if (!nextPart) {
			const draft = getNewPartDraft()
			editMode = true
			title = draft?.title ?? ""
			url = draft?.url ?? ""
			sectionSlug = draft?.sectionSlug ?? section.id
			orderSectionSlug = sectionSlug
			order = nextOrderForSection(sectionSlug)
			color = draft?.color ?? "success"
			imageFormat = draft?.imageFormat ?? ""
			price = draft?.price ?? ""
			tagsInput = draft?.tagsInput ?? ""
			body = draft?.body ?? ""
			slug = draft?.slug ?? ""
			originalSlug = ""
			originalSectionSlug = section.id
			originalSnapshot = JSON.stringify({
				title: "",
				url: "",
				order,
				color: "success",
				imageFormat: "",
				price: "",
				tagsInput: "",
				body: "",
				slug: "",
				sectionSlug: section.id
			})
			return
		}

		editMode = false
		title = nextPart.title
		url = nextPart.url
		sectionSlug = nextPart.sectionSlug
		orderSectionSlug = nextPart.sectionSlug
		order = nextPart.order
		color = nextPart.color
		imageFormat = nextPart.imageFilename
			? parseImageFormat(nextPart.imageFilename)
			: ""
		price = nextPart.price ?? ""
		tagsInput = formatGuidePartTagsFromParsed(nextPart.tags)
		body = nextPart.body
		slug = nextPart.slug
		originalSlug = nextPart.slug
		originalSectionSlug = nextPart.sectionSlug
		originalSnapshot = JSON.stringify({
			title: nextPart.title,
			url: nextPart.url,
			order: nextPart.order,
			color: nextPart.color,
			imageFormat: nextPart.imageFilename
				? parseImageFormat(nextPart.imageFilename)
				: "",
			price: nextPart.price ?? "",
			tagsInput: formatGuidePartTagsFromParsed(nextPart.tags),
			body: nextPart.body,
			slug: nextPart.slug,
			sectionSlug: nextPart.sectionSlug
		})
	}

	untrack(() => resetFromPart(part))

	$effect(() => {
		if (!browser || !isNew) return

		sessionStorage[newPartDraftKey] = newPartDraft
	})

	function handleTitleInput(event: Event) {
		const nextTitle = (event.currentTarget as HTMLInputElement).value
		if (nextTitle) slug = slugifyGuidePartTitle(nextTitle)
	}

	function handleSectionChange(event: Event) {
		sectionSlug = (event.currentTarget as HTMLSelectElement).value
		if (orderSectionSlug === sectionSlug) return

		orderSectionSlug = sectionSlug
		order = nextOrderForSection(sectionSlug)
	}

	async function enterEditMode() {
		editControlsVisible = false
		editMode = true
		await tick()
		editControlsVisible = true
	}

	let resetAfterExit = false

	function exitEditMode(reset = true) {
		resetAfterExit = reset
		editControlsVisible = false
	}

	function finishExitEditMode() {
		if (resetAfterExit) resetFromPart(part)
		else editMode = false

		editControlsVisible = true
	}

	async function savePart() {
		if (!canSave) return

		const nextSlug = slug.trim()
		const tags = parseGuidePartTagsInput(tagsInput)

		saving = true

		try {
			const content = serializeGuidePart({
				title: title.trim(),
				url: url.trim(),
				order,
				color,
				price: price.trim() || undefined,
				image: imageFilename,
				tags,
				body
			})

			const response = await fetch("/api/dev/save-build-guide-part", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					buildSlug,
					sectionSlug: activeSectionSlug,
					slug: nextSlug,
					previousSlug: originalSlug || undefined,
					previousSectionSlug: originalSectionSlug || undefined,
					content
				})
			})

			if (!response.ok) {
				const payload = (await response.json().catch(() => null)) as {
					message?: string
				} | null
				throw new Error(payload?.message ?? "Failed to save part")
			}

			const payload = (await response.json()) as { path: string }
			originalSlug = nextSlug
			originalSectionSlug = activeSectionSlug
			originalSnapshot = currentSnapshot
			toastSuccess({
				title: `Saved ${payload.path}. Refresh to see updates.`
			})
			if (isNew) {
				lastAssignedOrderBySection[
					sectionOrderKey(buildSlug, activeSectionSlug)
				] = order
				clearNewPartDraft()
				resetFromPart(null)
			} else exitEditMode(false)
		} catch (err) {
			toastError({
				title: err instanceof Error ? err.message : "Failed to save part"
			})
		} finally {
			saving = false
		}
	}

	async function handleImageDownload(result: {
		extension: string
		path: string
	}) {
		imageFormat = parseImageFormat(`image.${result.extension}`)

		if (isNew) {
			toastSuccess({
				title: `Downloaded ${result.path}. Save the part to use it.`
			})
			return
		}

		await tick()
		await savePart()
	}
</script>

{#if !editMode && !isNew && part}
	<PartCardView
		{title}
		{url}
		{color}
		price={previewPrice}
		tags={previewTags}
		image={part.image}
		imageAlt={part.imageAlt}
		Description={part.component}
		{onaddtolist}
	>
		{#snippet actions()}
			<button
				type="button"
				class={colors.iconHover}
				aria-label="Edit part"
				onclick={enterEditMode}
			>
				<Pencil class="size-6 md:size-7" />
			</button>
		{/snippet}
	</PartCardView>
{:else}
	<PartCardFrame {color}>
		<div class="flex min-w-0 items-center justify-between gap-2">
			<input
				type="text"
				bind:value={title}
				oninput={handleTitleInput}
				spellcheck="false"
				class="{fieldClass} {colors.link} min-w-0 flex-1 text-xl! font-semibold md:text-2xl!"
				placeholder="Part title"
			/>

			<div class="flex shrink-0 items-center gap-2 text-surface-500">
				<button
					type="button"
					class="{colors.iconHover} disabled:pointer-events-none disabled:opacity-40"
					aria-label={saving ? "Saving part" : "Save part"}
					disabled={!canSave || saving}
					onclick={savePart}
				>
					{#if saving}
						<Loader2 class="size-5 animate-spin md:size-6" />
					{:else}
						<Save class="size-6 md:size-7" />
					{/if}
				</button>

				{#if !isNew}
					<button
						type="button"
						class={colors.iconHover}
						aria-label="View part"
						onclick={() => exitEditMode()}
					>
						<Eye class="size-6 md:size-7" />
					</button>
				{/if}
			</div>
		</div>

		<div class="flex flex-wrap items-center gap-1">
			<input
				type="text"
				bind:value={price}
				spellcheck="false"
				class="{colors.price} price-tag-input border-0 outline outline-current"
				placeholder="$0.00"
			/>
			<PartTags
				tags={previewTags}
				priceClass={colors.price}
				displayContents
			/>
		</div>

		<textarea
			bind:value={body}
			rows={5}
			spellcheck="false"
			class="prose {descriptionFieldClass} min-h-24 w-full resize-y"
			placeholder="Part description"></textarea>

		{#if editControlsVisible}
			<div
				class="flex flex-col gap-2 border-t border-surface-500/10 pt-2"
				transition:slide
				onoutroend={finishExitEditMode}
			>
				<div class="flex min-w-0 flex-wrap items-center gap-2">
					<select
						value={sectionSlug}
						onchange={handleSectionChange}
						class="{controlClass} min-w-0 flex-1"
					>
						{#each sections as entry (entry.id)}
							<option value={entry.id}>{entry.title}</option>
						{/each}
					</select>

					<div
						class="flex shrink-0 gap-1"
						role="radiogroup"
						aria-label="Part color"
					>
						{#each colorOptions as option (option)}
							<button
								type="button"
								role="radio"
								aria-checked={color === option}
								aria-label={option}
								class="size-6 rounded-md {guidePartColors[option]
									.bar} outline-2 transition-colors {color === option
									? 'outline-current'
									: 'outline-transparent'}"
								onclick={() => (color = option)}
							></button>
						{/each}
					</div>

					<div class="flex shrink-0">
						<input
							type="number"
							min="1"
							max="69"
							bind:value={order}
							class="no-spinner h-8 w-12 rounded-md bg-surface-500/10 p-2 text-base outline-none focus-within:outline-2 focus-within:outline-current"
						/>
						<div
							class="ml-1 flex h-8 flex-col justify-between text-surface-500/40"
						>
							<button
								type="button"
								class="hover:text-current {colors.text}"
								aria-label="Increase order"
								onclick={() => order++}
							>
								<ChevronUp class="size-3 stroke-3" />
							</button>
							<button
								type="button"
								class="rotate-180 hover:text-current {colors.text}"
								aria-label="Decrease order"
								onclick={() => order > 1 && order--}
							>
								<ChevronUp class="size-3 stroke-3" />
							</button>
						</div>
					</div>
				</div>

				<div class="flex min-w-0 gap-2">
					<input
						type="url"
						bind:value={url}
						spellcheck="false"
						class="{controlClass} min-w-0 flex-1"
						placeholder="https://example.com"
					/>
					<select
						bind:value={imageFormat}
						class="{controlClass} shrink-0"
						aria-label="Image format"
					>
						<option value="">No image</option>
						{#each imageFormats as format (format)}
							<option value={format}>{format}</option>
						{/each}
					</select>
					<ImageDownloader
						{buildSlug}
						{title}
						{slug}
						ondownload={handleImageDownload}
					/>
				</div>

				<textarea
					bind:value={tagsInput}
					rows={5}
					spellcheck="false"
					class="{controlClass} tags-input min-h-[1.5em] w-full resize-y text-xs"
					placeholder="One tag per line. Use label&lt;tooltip&gt; for tooltips."
				></textarea>
			</div>
		{/if}
	</PartCardFrame>
{/if}

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

	.price-tag-input {
		field-sizing: content;
		width: auto;
		min-width: 5ch;
	}

	.tags-input {
		field-sizing: content;
	}
</style>
