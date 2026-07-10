<script lang="ts">
	import { browser } from "$app/environment"
	import BuildPartImageButton from "$components/BuildPartImageButton.svelte"
	import BuildGuideImageDownloader from "$components/BuildGuideImageDownloader.svelte"
	import BuildTagTooltip from "$components/BuildTagTooltip.svelte"
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
	import { ChevronUp, Eye, Loader2, Pencil, Plus, Save } from "@lucide/svelte"
	import { slide } from "svelte/transition"

	const colorOptions = Object.keys(guidePartColors) as GuidePartColor[]

	const imageFormats = ["webp", "png", "jpg", "jpeg", "avif", "gif"] as const
	type ImageFormat = (typeof imageFormats)[number]

	type NewPartDraft = {
		title: string
		url: string
		order: number
		color: GuidePartColor
		imageFormat: ImageFormat | ""
		sectionSlug: string
		price: string
		tagsInput: string
		body: string
		slug: string
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
		part = null
	}: {
		buildSlug: string
		sections: BuildGuideSection[]
		section: BuildGuideSection
		part?: BuildGuidePart | null
	} = $props()

	const isNew = $derived(part === null)

	let editMode = $state(false)
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
	let saveMessage = $state<string | null>(null)
	let saveError = $state<string | null>(null)

	const colors = $derived(guidePartColors[color])

	const activeSectionSlug = $derived(sectionSlug || section.id)
	const newPartDraftKey = $derived(
		`build-guide-new-part:${buildSlug}:${section.id}`
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
		if (!targetSection) return 1

		return (
			targetSection.parts.reduce(
				(max, entry) => Math.max(max, entry.order),
				0
			) + 1
		)
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
				typeof draft.order !== "number" ||
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
		saveMessage = null
		saveError = null

		if (!nextPart) {
			const draft = getNewPartDraft()
			editMode = true
			title = draft?.title ?? ""
			url = draft?.url ?? ""
			sectionSlug = draft?.sectionSlug ?? section.id
			orderSectionSlug = sectionSlug
			order = draft?.order ?? nextOrderForSection(sectionSlug)
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

	$effect(() => {
		resetFromPart(part)
	})

	$effect(() => {
		if (!browser || !isNew) return

		const draft: NewPartDraft = {
			title,
			url,
			order,
			color,
			imageFormat,
			sectionSlug,
			price,
			tagsInput,
			body,
			slug
		}
		sessionStorage.setItem(newPartDraftKey, JSON.stringify(draft))
	})

	$effect(() => {
		if (title) {
			slug = slugifyGuidePartTitle(title)
		}
	})

	$effect(() => {
		if (orderSectionSlug === activeSectionSlug) return

		orderSectionSlug = activeSectionSlug
		order = nextOrderForSection(activeSectionSlug)
	})

	function exitEditMode() {
		editMode = false
		resetFromPart(part)
	}

	async function savePart() {
		saveMessage = null
		saveError = null

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
			saveMessage = `Saved ${payload.path}. Refresh to see updates.`
			editMode = false

			if (isNew) {
				clearNewPartDraft()
				resetFromPart(null)
			}
		} catch (err) {
			saveError = err instanceof Error ? err.message : "Failed to save part"
		} finally {
			saving = false
		}
	}

	function handleImageDownload(result: { extension: string }) {
		imageFormat = parseImageFormat(`image.${result.extension}`)
	}
</script>

<div class="flex h-fit min-w-0 gap-2">
	<div class="w-1 shrink-0 self-stretch rounded-full {colors.bar}"></div>

	<div class="part-content flex min-w-0 flex-1 flex-col">
		<div class="flex min-w-0 items-center justify-between gap-2">
			{#if !editMode && !isNew}
				<a
					href={url}
					class={colors.link}
					target="_blank"
					rel="external noopener noreferrer">{title}</a
				>
			{:else}
				<input
					type="text"
					bind:value={title}
					spellcheck="false"
					class="{fieldClass} {colors.link} min-w-0 flex-1 text-2xl! font-semibold"
					placeholder="Part title"
				/>
			{/if}

			<div class="flex shrink-0 items-center gap-2 text-surface-500">
				{#if !editMode}
					<button
						type="button"
						class={colors.iconHover}
						aria-label="Add to build list"
					>
						<Plus class="size-7 stroke-[2.5]" />
					</button>
				{/if}

				{#if part?.image && !editMode && !isNew}
					<BuildPartImageButton
						src={part.image}
						alt={part.imageAlt}
						class={colors.iconHover}
					/>
				{/if}

				{#if editMode || isNew}
					<button
						type="button"
						class="{colors.iconHover} disabled:pointer-events-none disabled:opacity-40"
						aria-label={saving ? "Saving part" : "Save part"}
						disabled={!canSave || saving}
						onclick={savePart}
					>
						{#if saving}
							<Loader2 class="size-7 animate-spin" />
						{:else}
							<Save class="size-7" />
						{/if}
					</button>
				{/if}

				{#if !isNew}
					{#if !editMode}
						<button
							type="button"
							class={colors.iconHover}
							aria-label="Edit part"
							onclick={() => (editMode = true)}
						>
							<Pencil class="size-7" />
						</button>
					{:else}
						<button
							type="button"
							class={colors.iconHover}
							aria-label="View part"
							onclick={exitEditMode}
						>
							<Eye class="size-7" />
						</button>
					{/if}
				{/if}
			</div>
		</div>

		{#if editMode || isNew}
			<div class="flex flex-wrap items-center gap-1">
				<input
					type="text"
					bind:value={price}
					spellcheck="false"
					class="{colors.price} price-tag-input border-0 outline outline-current"
					placeholder="$0.00"
				/>
				{#each previewTags as tag (tag.label)}
					{#if tag.tooltip}
						<BuildTagTooltip
							label={tag.label}
							tooltip={tag.tooltip}
						/>
					{:else}
						<span
							class="rounded-full bg-surface-500/20 px-2 py-1 text-xs font-medium text-surface-900-100"
							>{tag.label}</span
						>
					{/if}
				{/each}
			</div>
		{:else if !isNew}
			<div class="flex flex-wrap gap-1">
				{#if previewPrice}
					<span class={colors.price}>{previewPrice}</span>
				{/if}
				{#each previewTags as tag (tag.label)}
					{#if tag.tooltip}
						<BuildTagTooltip
							label={tag.label}
							tooltip={tag.tooltip}
						/>
					{:else}
						<span
							class="rounded-full bg-surface-500/20 px-2 py-1 text-xs font-medium text-surface-900-100"
							>{tag.label}</span
						>
					{/if}
				{/each}
			</div>
		{/if}

		{#if editMode || isNew}
			<textarea
				bind:value={body}
				rows={5}
				spellcheck="false"
				class="prose {descriptionFieldClass} min-h-24 w-full resize-y"
				placeholder="Part description"></textarea>
		{:else if !isNew}
			<div class="prose">
				{#if part}
					<part.component />
				{/if}
			</div>
		{/if}

		{#if editMode || isNew}
			<div
				class="flex flex-col gap-2 border-t border-surface-500/10 pt-2"
				transition:slide
			>
				<div class="flex min-w-0 flex-wrap items-center gap-2">
					<select
						bind:value={sectionSlug}
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
					<BuildGuideImageDownloader
						{buildSlug}
						{title}
						{slug}
						ondownload={handleImageDownload}
					/>
				</div>

				<textarea
					bind:value={tagsInput}
					rows={4}
					spellcheck="false"
					class="{controlClass} min-h-0 text-xs"
					placeholder="One tag per line. Use label&lt;tooltip&gt; for tooltips."
				></textarea>
			</div>
		{/if}

		{#if saveMessage}
			<p class="mt-2 text-sm text-success-500">{saveMessage}</p>
		{/if}

		{#if saveError}
			<p class="mt-2 text-sm text-error-500">{saveError}</p>
		{/if}
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

	.price-tag-input {
		field-sizing: content;
		width: auto;
		min-width: 5ch;
	}

	.part-content > :not(:first-child) {
		margin-top: 0.5rem;
	}
</style>
