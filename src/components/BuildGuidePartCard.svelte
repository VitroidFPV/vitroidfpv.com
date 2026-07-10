<script lang="ts">
	import BuildPartImageButton from "$components/BuildPartImageButton.svelte"
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
		"w-full rounded-md bg-surface-500/10 px-2 py-1 text-sm break-all focus-visible:outline-none focus-visible:outline-[3px] focus-visible:outline-surface-400/20"

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

	function resetFromPart(nextPart: BuildGuidePart | null) {
		saveMessage = null
		saveError = null

		if (!nextPart) {
			editMode = true
			title = ""
			url = ""
			sectionSlug = section.id
			orderSectionSlug = section.id
			order = nextOrderForSection(section.id)
			color = "success"
			imageFormat = ""
			price = ""
			tagsInput = ""
			body = ""
			slug = ""
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
				resetFromPart(null)
			}
		} catch (err) {
			saveError = err instanceof Error ? err.message : "Failed to save part"
		} finally {
			saving = false
		}
	}
</script>

<div class="flex h-fit gap-2">
	<div class="w-1 shrink-0 self-stretch rounded-full {colors.bar}"></div>

	<div class="flex flex-1 flex-col">
		<div class="flex items-start justify-between gap-2">
			<div class="flex w-full flex-col pr-2">
				{#if editMode || isNew}
					<div
						class="mb-4 flex items-center gap-2"
						transition:slide
					>
						<select
							bind:value={sectionSlug}
							class="{fieldClass} min-w-0 flex-1"
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
				{/if}

				{#if !editMode && !isNew}
					<a
						href={url}
						class={colors.link}
						target="_blank"
						rel="external noopener noreferrer">{title}</a
					>
				{:else}
					<div class="flex gap-2">
						<input
							type="text"
							bind:value={title}
							spellcheck="false"
							class="{fieldClass} {colors.link} w-full flex-1 text-2xl font-semibold focus-visible:outline-current"
							placeholder="Part title"
						/>
						<input
							type="text"
							bind:value={price}
							class="{fieldClass} {colors.price} flex-1"
							placeholder="$0.00"
						/>
					</div>
				{/if}
			</div>

			<div class="flex items-center gap-2 text-surface-500">
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
			<div
				class="mt-2 flex flex-col gap-2"
				transition:slide
			>
				<div class="flex gap-2 pt-2">
					<input
						type="url"
						bind:value={url}
						spellcheck="false"
						class="{fieldClass} w-full min-w-0"
						placeholder="https://example.com"
					/>
					<select
						bind:value={imageFormat}
						class="{fieldClass} w-min"
						aria-label="Image format"
					>
						<option value="">No image</option>
						{#each imageFormats as format (format)}
							<option value={format}>{format}</option>
						{/each}
					</select>
				</div>

				{#if previewPrice || previewTags.length > 0}
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

				<textarea
					bind:value={tagsInput}
					rows={4}
					spellcheck="false"
					class="{fieldClass} min-h-0 text-xs"
					placeholder="One tag per line. Use label&lt;tooltip&gt; for tooltips."
				></textarea>

				<textarea
					bind:value={body}
					rows={5}
					spellcheck="false"
					class="{fieldClass} min-h-24 resize-y"
					placeholder="Part description"></textarea>
			</div>
		{:else if !isNew}
			{#if previewPrice || previewTags.length > 0}
				<div class="mt-2 flex flex-wrap gap-1">
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

			<div class="prose mt-2">
				{#if part}
					<part.component />
				{/if}
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
</style>
