<script lang="ts">
	import { browser } from "$app/environment"
	import ImageDownloader from "$components/build-guides/editor/ImageDownloader.svelte"
	import PartCardFrame from "$components/build-guides/PartCardFrame.svelte"
	import PartCardView from "$components/build-guides/PartCardView.svelte"
	import PartTags from "$components/build-guides/PartTags.svelte"
	import {
		formatParsedBuildGuideTags,
		parseBuildGuideTagsInput,
		serializeBuildGuidePart,
		slugifyBuildGuideTitle
	} from "$lib/build-guides/editor/part"
	import { getBuildGuidePartSource } from "$lib/build-guides/editor/source"
	import {
		buildGuidePartAccentClasses,
		type BuildGuidePartAccent
	} from "$lib/build-guides/theme"
	import { parseBuildGuidePartTag } from "$lib/build-guides/tags"
	import type {
		BuildGuidePart,
		BuildGuidePartTag,
		BuildGuideSection
	} from "$lib/build-guides/types"
	import { toastError, toastSuccess } from "$lib/toaster"
	import { Dialog, Portal } from "@skeletonlabs/skeleton-svelte"
	import {
		ChevronUp,
		Download,
		Eye,
		Loader2,
		Pencil,
		Save,
		Settings2,
		X
	} from "@lucide/svelte"
	import { tick, untrack } from "svelte"
	import { slide } from "svelte/transition"

	const colorOptions = Object.keys(
		buildGuidePartAccentClasses
	) as BuildGuidePartAccent[]

	const imageFormats = ["webp", "png", "jpg", "jpeg", "avif", "gif"] as const
	type ImageFormat = (typeof imageFormats)[number]

	type NewPartDraft = {
		title: string
		url: string
		color: BuildGuidePartAccent
		imageFormat: ImageFormat | ""
		imageFilenameStem: string
		imageAlt: string
		sectionSlug: string
		price: string
		tagsInput: string
		body: string
		slug: string
	}

	type TagDraft = {
		id: number
		value: string
	}

	const lastAssignedOrderBySection: Record<string, number> = {}

	function sectionOrderKey(guideSlug: string, sectionSlug: string) {
		return `${guideSlug}:${sectionSlug}`
	}

	function parseImageFormat(filename: string): ImageFormat | "" {
		const match = filename.match(/\.([^.]+)$/)
		if (!match) return ""

		const ext = match[1].toLowerCase()
		return imageFormats.includes(ext as ImageFormat) ? (ext as ImageFormat) : ""
	}

	let {
		guideSlug,
		sections,
		section,
		part = null,
		onaddtolist
	}: {
		guideSlug: string
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
	let color = $state<BuildGuidePartAccent>("success")
	let imageFormat = $state<ImageFormat | "">("")
	let imageFilenameStem = $state("")
	let imageAlt = $state("")
	let manualImageUrl = $state("")
	let sectionSlug = $state("")
	let price = $state("")
	let tagDrafts = $state<TagDraft[]>([])
	let orderSectionSlug = $state<string | null>(null)
	let body = $state("")
	let slug = $state("")
	let originalSlug = $state("")
	let originalSectionSlug = $state("")
	let originalSnapshot = $state("")
	let saving = $state(false)
	let downloadingManualImage = $state(false)
	let settingsOpen = $state(false)
	let previewMode = $state(false)
	let tagsPreviewMode = $state(false)
	let nextTagId = 0

	const colors = $derived(buildGuidePartAccentClasses[color])

	const activeSectionSlug = $derived(sectionSlug || section.id)
	const newPartDraftKey = $derived(
		`build-guide-new-part:${guideSlug}:${section.id}`
	)
	const manualImageUrlId = $derived(
		`manual-image-url-${part?.id ?? `${guideSlug}-${section.id}-new`}`
	)
	const rawTags = $derived(
		tagDrafts.map((tag) => tag.value.trim()).filter(Boolean)
	)
	const tagsInput = $derived(rawTags.join("\n"))
	const newPartDraft = $derived(
		JSON.stringify({
			title,
			url,
			color,
			imageFormat,
			imageFilenameStem,
			imageAlt,
			sectionSlug,
			price,
			tagsInput,
			body,
			slug
		})
	)

	const invalidTagIds = $derived(
		new Set(
			tagDrafts
				.filter((tag) => tag.value.trim() && !tryParseTag(tag.value.trim()))
				.map((tag) => tag.id)
		)
	)
	const tagsValid = $derived(invalidTagIds.size === 0)
	const previewTags = $derived(
		rawTags.flatMap((tag) => {
			const parsed = tryParseTag(tag)
			return parsed ? [parsed] : []
		})
	)

	const previewPrice = $derived(price.trim() || undefined)

	const imageFilename = $derived(
		imageFormat && (imageFilenameStem || slug.trim())
			? `${imageFilenameStem || slug.trim()}.${imageFormat}`
			: undefined
	)
	const slugValid = $derived(/^[a-z0-9-]+$/.test(slug.trim()))
	const canDownloadManualImage = $derived(
		manualImageUrl.trim().length > 0 && slugValid && !downloadingManualImage
	)

	const currentSnapshot = $derived(
		JSON.stringify({
			title,
			url,
			order,
			color,
			imageFilename,
			imageAlt,
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
			slugValid &&
			tagsValid &&
			(isNew || currentSnapshot !== originalSnapshot)
	)
	const canPreview = $derived(tagsValid)

	const fieldClass =
		"rounded-md bg-surface-500/10 p-0! outline-4 outline-surface-500/10"

	const descriptionFieldClass = `${fieldClass} break-normal`

	const controlClass =
		"rounded-md bg-surface-500/10 text-sm break-all px-2 py-1"
	const dialogAnimation =
		"transition transition-discrete opacity-0 starting:data-[state=open]:opacity-0 data-[state=open]:opacity-100"

	function tryParseTag(rawTag: string): BuildGuidePartTag | null {
		try {
			return parseBuildGuidePartTag(rawTag)
		} catch {
			return null
		}
	}

	function createTagDraft(value: string): TagDraft {
		return { id: nextTagId++, value }
	}

	function resetTags(tagsInput: string) {
		tagDrafts = [
			...parseBuildGuideTagsInput(tagsInput).map(createTagDraft),
			createTagDraft("")
		]
		tagsPreviewMode = false
	}

	function finishTagEdit(tag: TagDraft) {
		const value = tag.value.trim()
		if (!value) {
			if (tag.id !== tagDrafts.at(-1)?.id) {
				tagDrafts = tagDrafts.filter((entry) => entry.id !== tag.id)
			}
			return
		}

		tag.value = value
	}

	function handleTagInput(tag: TagDraft, event: Event) {
		tag.value = (event.currentTarget as HTMLInputElement).value
		if (tag.value && tag.id === tagDrafts.at(-1)?.id) {
			tagDrafts.push(createTagDraft(""))
		}
	}

	async function handleTagKeydown(tag: TagDraft, event: KeyboardEvent) {
		if (
			event.key === "Backspace" &&
			event.altKey &&
			!event.ctrlKey &&
			!event.metaKey
		) {
			event.preventDefault()
			const currentInput = event.currentTarget as HTMLInputElement
			if (tag.id === tagDrafts.at(-1)?.id) {
				const previousTag = tagDrafts.at(-2)
				if (!previousTag) return

				tagDrafts = tagDrafts.filter((entry) => entry.id !== previousTag.id)
				await tick()
				currentInput.focus()
				return
			}

			const tagIndex = tagDrafts.findIndex((entry) => entry.id === tag.id)
			const previousInput = currentInput.previousElementSibling
			const nextInput = currentInput.nextElementSibling
			const focusTarget =
				tagIndex > 0 && tagIndex === tagDrafts.length - 2
					? previousInput
					: nextInput
			tagDrafts = tagDrafts.filter((entry) => entry.id !== tag.id)
			await tick()
			if (focusTarget instanceof HTMLInputElement) focusTarget.focus()
			return
		}

		if (event.key !== "Enter") return

		event.preventDefault()
		if (!(event.currentTarget as HTMLInputElement).value.trim()) return

		const nextInput = (event.currentTarget as HTMLInputElement)
			.nextElementSibling
		if (nextInput instanceof HTMLInputElement) nextInput.focus()
	}

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
				sectionOrderKey(guideSlug, targetSectionSlug)
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
				(draft.imageFilenameStem !== undefined &&
					typeof draft.imageFilenameStem !== "string") ||
				(draft.imageAlt !== undefined && typeof draft.imageAlt !== "string") ||
				typeof draft.sectionSlug !== "string" ||
				typeof draft.price !== "string" ||
				typeof draft.tagsInput !== "string" ||
				typeof draft.body !== "string" ||
				typeof draft.slug !== "string" ||
				!colorOptions.includes(draft.color as BuildGuidePartAccent) ||
				(!imageFormats.includes(draft.imageFormat as ImageFormat) &&
					draft.imageFormat !== "")
			) {
				return null
			}

			return {
				...draft,
				imageFilenameStem: draft.imageFilenameStem ?? "",
				imageAlt: draft.imageAlt ?? ""
			} as NewPartDraft
		} catch {
			return null
		}
	}

	function clearNewPartDraft() {
		if (browser) sessionStorage.removeItem(newPartDraftKey)
	}

	function resetFromPart(nextPart: BuildGuidePart | null) {
		settingsOpen = false
		manualImageUrl = ""
		previewMode = false

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
			imageFilenameStem = draft?.imageFilenameStem ?? ""
			imageAlt = draft?.imageAlt ?? ""
			price = draft?.price ?? ""
			resetTags(draft?.tagsInput ?? "")
			body = draft?.body ?? ""
			slug = draft?.slug ?? ""
			originalSlug = ""
			originalSectionSlug = section.id
			originalSnapshot = JSON.stringify({
				title: "",
				url: "",
				order,
				color: "success",
				imageFilename: undefined,
				imageAlt: "",
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
		color = nextPart.accent
		imageFormat = nextPart.imageFilename
			? parseImageFormat(nextPart.imageFilename)
			: ""
		imageFilenameStem = nextPart.imageFilename?.replace(/\.[^.]+$/, "") ?? ""
		imageAlt = nextPart.imageAlt
		price = nextPart.price ?? ""
		resetTags(formatParsedBuildGuideTags(nextPart.tags))
		body = getBuildGuidePartSource(
			nextPart.guideSlug,
			nextPart.sectionSlug,
			nextPart.slug
		)
		slug = nextPart.slug
		originalSlug = nextPart.slug
		originalSectionSlug = nextPart.sectionSlug
		originalSnapshot = JSON.stringify({
			title: nextPart.title,
			url: nextPart.url,
			order: nextPart.order,
			color: nextPart.accent,
			imageFilename: nextPart.imageFilename,
			imageAlt: nextPart.imageAlt,
			price: nextPart.price ?? "",
			tagsInput: formatParsedBuildGuideTags(nextPart.tags),
			body: getBuildGuidePartSource(
				nextPart.guideSlug,
				nextPart.sectionSlug,
				nextPart.slug
			),
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
		if (isNew && nextTitle) slug = slugifyBuildGuideTitle(nextTitle)
	}

	function handleSectionChange(event: Event) {
		sectionSlug = (event.currentTarget as HTMLSelectElement).value
		if (orderSectionSlug === sectionSlug) return

		orderSectionSlug = sectionSlug
		order = nextOrderForSection(sectionSlug)
	}

	async function enterEditMode() {
		previewMode = false
		editControlsVisible = false
		editMode = true
		await tick()
		editControlsVisible = true
	}

	let resetAfterExit = false
	let previewAfterExit = false

	function exitEditMode(reset = true, preview = false) {
		resetAfterExit = reset
		previewAfterExit = preview
		editControlsVisible = false
	}

	function previewPart() {
		if (canPreview) exitEditMode(false, true)
	}

	function finishExitEditMode() {
		if (resetAfterExit) resetFromPart(part)
		else {
			editMode = false
			previewMode = previewAfterExit
		}

		editControlsVisible = true
	}

	async function savePart() {
		if (!canSave) return

		const nextSlug = slug.trim()

		saving = true

		try {
			const content = serializeBuildGuidePart({
				title: title.trim(),
				url: url.trim(),
				order,
				color,
				price: price.trim() || undefined,
				image: imageFilename,
				imageAlt: imageAlt.trim() || undefined,
				tags: rawTags,
				body
			})

			const response = await fetch("/api/dev/save-build-guide-part", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					guideSlug,
					sectionSlug: activeSectionSlug,
					partSlug: nextSlug,
					previousPartSlug: originalSlug || undefined,
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
					sectionOrderKey(guideSlug, activeSectionSlug)
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
		imageFilenameStem = slug.trim()
		imageFormat = parseImageFormat(`image.${result.extension}`)

		if (isNew) {
			toastSuccess({
				title: `Downloaded ${result.path}. Save the part to use it.`
			})
			return
		}

		await tick()
		if (canSave) await savePart()
		else toastSuccess({ title: `Downloaded ${result.path}.` })
	}

	async function downloadManualImage() {
		if (!canDownloadManualImage) return

		downloadingManualImage = true

		try {
			const response = await fetch("/api/dev/download-build-image", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					guideSlug,
					partSlug: slug.trim(),
					imageUrl: manualImageUrl.trim()
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

			manualImageUrl = ""
			await handleImageDownload({
				extension: payload.extension,
				path: payload.path
			})
		} catch (reason) {
			toastError({
				title:
					reason instanceof Error ? reason.message : "Image download failed"
			})
		} finally {
			downloadingManualImage = false
		}
	}
</script>

{#if previewMode || (!editMode && !isNew && part)}
	<PartCardView
		{title}
		{url}
		accent={color}
		price={previewPrice}
		tags={previewTags}
		image={part?.image ?? null}
		imageAlt={imageAlt.trim() || title}
		Description={part?.Content}
		descriptionText={part ? undefined : body}
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
	<PartCardFrame accent={color}>
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

				<button
					type="button"
					class="{colors.iconHover} disabled:pointer-events-none disabled:opacity-40"
					aria-label="Preview part"
					disabled={!canPreview}
					onclick={previewPart}
				>
					<Eye class="size-6 md:size-7" />
				</button>
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
			{#if tagsPreviewMode}
				<PartTags
					tags={previewTags}
					priceClass={colors.price}
					displayContents
				/>
				<button
					type="button"
					class="rounded-full bg-surface-500/10 p-1 text-surface-500 transition-colors hover:bg-surface-500/20 hover:text-current"
					aria-label="Edit tags"
					onclick={() => (tagsPreviewMode = false)}
				>
					<Pencil class="size-3.5" />
				</button>
			{:else}
				{#each tagDrafts as tag, index (tag.id)}
					<input
						type="text"
						value={tag.value}
						spellcheck="false"
						aria-label={index === tagDrafts.length - 1
							? "Add tag. Use label<tooltip> for tooltips. Alt+Backspace removes the previous tag."
							: `Tag ${index + 1}. Use label<tooltip> for tooltips. Alt+Backspace removes this tag.`}
						aria-keyshortcuts="Alt+Backspace"
						aria-invalid={invalidTagIds.has(tag.id)}
						title={index === tagDrafts.length - 1
							? "Use label<tooltip> for tooltips. Alt+Backspace removes the previous tag."
							: "Use label<tooltip> for tooltips. Alt+Backspace removes this tag."}
						class="tag-chip-input rounded-full border-0 bg-surface-500/10 px-2 py-1 text-[11px] font-medium outline outline-surface-500/25 transition-[background-color,outline-color] focus:bg-surface-500/20 focus:outline-2 focus:outline-surface-500/75 md:text-xs dark:bg-surface-500/20 {invalidTagIds.has(
							tag.id
						)
							? 'text-error-500 outline-error-500/50 focus:outline-error-500'
							: 'text-surface-900-100'}"
						placeholder={index === tagDrafts.length - 1 ? "+ tag" : undefined}
						oninput={(event) => handleTagInput(tag, event)}
						onkeydown={(event) => handleTagKeydown(tag, event)}
						onblur={() => finishTagEdit(tag)}
					/>
				{/each}
				<button
					type="button"
					class="rounded-full bg-surface-500/10 p-1 text-surface-500 transition-colors hover:bg-surface-500/20 hover:text-current disabled:pointer-events-none disabled:opacity-40"
					aria-label="Preview tags"
					disabled={!tagsValid}
					onclick={() => (tagsPreviewMode = true)}
				>
					<Eye class="size-3.5" />
				</button>
			{/if}
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
				<div class="flex min-w-0 items-center gap-2">
					<input
						type="url"
						bind:value={url}
						spellcheck="false"
						class="{controlClass} min-w-0 flex-1"
						placeholder="https://example.com"
					/>
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
								class="size-6 rounded-md {buildGuidePartAccentClasses[option]
									.bar} outline-2 transition-colors {color === option
									? 'outline-current'
									: 'outline-transparent'}"
								onclick={() => (color = option)}
							></button>
						{/each}
					</div>

					<ImageDownloader
						{guideSlug}
						{title}
						partSlug={slug}
						ondownload={handleImageDownload}
					/>

					<Dialog
						open={settingsOpen}
						onOpenChange={(details: { open: boolean }) =>
							(settingsOpen = details.open)}
					>
						<Dialog.Trigger
							type="button"
							class="rounded-md bg-surface-500/10 p-1.5 text-surface-500 transition-colors hover:bg-surface-500/20 hover:text-current"
							aria-label="Part settings"
						>
							<Settings2 class="size-5" />
						</Dialog.Trigger>

						<Portal>
							<Dialog.Backdrop
								class="fixed inset-0 z-50 bg-surface-50-950/80 backdrop-blur-sm"
							/>
							<Dialog.Positioner
								class="fixed inset-0 z-50 flex items-center justify-center p-4"
							>
								<Dialog.Content
									class="flex max-h-[calc(100svh-2rem)] w-[min(48rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-surface-100-900 bg-surface-50-950 shadow-2xl {dialogAnimation}"
								>
									<header
										class="flex items-center justify-between gap-2 border-b border-surface-500/20 p-4"
									>
										<Dialog.Title class="text-lg font-semibold"
											>Part settings</Dialog.Title
										>
										<Dialog.CloseTrigger
											class="rounded-full p-1 text-surface-500 transition-colors hover:bg-surface-500/10 hover:text-current"
											aria-label="Close part settings"
										>
											<X class="size-6" />
										</Dialog.CloseTrigger>
									</header>

									<div
										class="grid gap-4 overflow-y-auto p-4 md:grid-cols-2 md:gap-0"
									>
										<fieldset class="flex flex-col gap-4 md:pr-4">
											<legend class="mb-2 font-semibold">General</legend>

											<label class="flex flex-col gap-1 text-sm font-medium">
												Category
												<select
													value={sectionSlug}
													onchange={handleSectionChange}
													class="{controlClass} w-full font-normal"
												>
													{#each sections as entry (entry.id)}
														<option value={entry.id}>{entry.title}</option>
													{/each}
												</select>
											</label>

											<label class="flex flex-col gap-1 text-sm font-medium">
												Slug
												<input
													type="text"
													bind:value={slug}
													spellcheck="false"
													pattern="[a-z0-9-]+"
													aria-invalid={!slugValid}
													class="{controlClass} w-full font-normal"
													placeholder="part-name"
												/>
												<span class="font-normal text-surface-500">
													Use lowercase letters, numbers, and hyphens. Changing
													an existing slug also changes its saved ID.
												</span>
											</label>

											<div class="flex flex-col gap-1 text-sm font-medium">
												<span>Order</span>
												<div class="flex items-center">
													<input
														type="number"
														min="1"
														max="69"
														bind:value={order}
														class="no-spinner h-8 w-16 rounded-md bg-surface-500/10 p-2 text-base font-normal outline-none focus-within:outline-2 focus-within:outline-current"
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
												<p class="font-normal text-surface-500">
													Assigned automatically for new parts.
												</p>
											</div>
										</fieldset>

										<fieldset
											class="flex flex-col gap-4 border-t border-surface-500/20 pt-4 md:border-t-0 md:border-l md:pt-0 md:pl-4"
										>
											<legend class="mb-2 font-semibold">Image</legend>

											<label class="flex flex-col gap-1 text-sm font-medium">
												Format
												<select
													bind:value={imageFormat}
													class="{controlClass} w-full font-normal"
												>
													<option value="">No image</option>
													{#each imageFormats as format (format)}
														<option value={format}>{format}</option>
													{/each}
												</select>
											</label>

											<label class="flex flex-col gap-1 text-sm font-medium">
												Alt text
												<input
													type="text"
													bind:value={imageAlt}
													class="{controlClass} w-full font-normal"
													placeholder={title.trim() || "Describe the image"}
												/>
												<span class="font-normal text-surface-500">
													Defaults to the part title.
												</span>
											</label>

											<div class="flex flex-col gap-1 text-sm font-medium">
												<label for={manualImageUrlId}>Source URL</label>
												<div class="flex min-w-0 gap-2">
													<input
														id={manualImageUrlId}
														type="url"
														bind:value={manualImageUrl}
														class="{controlClass} min-w-0 flex-1 font-normal"
														placeholder="https://example.com/image.jpg"
														onkeydown={(event) =>
															event.key === "Enter" && downloadManualImage()}
													/>
													<button
														type="button"
														class="btn shrink-0 gap-2 preset-filled-surface-100-900"
														disabled={!canDownloadManualImage}
														onclick={downloadManualImage}
													>
														{#if downloadingManualImage}
															<Loader2 class="size-4 animate-spin" />
														{:else}
															<Download class="size-4" />
														{/if}
														Replace
													</button>
												</div>
												<p class="font-normal text-surface-500">
													Downloads the image into this guide's local assets.
												</p>
											</div>
										</fieldset>
									</div>

									<footer
										class="flex justify-end border-t border-surface-500/20 p-4"
									>
										<Dialog.CloseTrigger
											class="btn preset-filled-surface-100-900"
										>
											Done
										</Dialog.CloseTrigger>
									</footer>
								</Dialog.Content>
							</Dialog.Positioner>
						</Portal>
					</Dialog>
				</div>
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

	.tag-chip-input {
		field-sizing: content;
		width: auto;
		min-width: 4ch;
		max-width: 100%;
	}
</style>
