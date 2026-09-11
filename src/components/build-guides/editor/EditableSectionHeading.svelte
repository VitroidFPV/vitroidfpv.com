<script lang="ts">
	import SectionHeadingView from "$components/build-guides/SectionHeadingView.svelte"
	import { slugifyBuildGuideTitle } from "$lib/build-guides/editor/part"
	import { serializeBuildGuideSection } from "$lib/build-guides/editor/section"
	import { getBuildGuideSectionSource } from "$lib/build-guides/editor/source"
	import type { BuildGuideSection } from "$lib/build-guides/types"
	import { toastError, toastSuccess } from "$lib/toaster"
	import { ChevronUp, Eye, Loader2, Pencil, Save, Trash2 } from "@lucide/svelte"
	import { untrack } from "svelte"

	let {
		guideSlug,
		sections,
		section = null
	}: {
		guideSlug: string
		sections: BuildGuideSection[]
		section?: BuildGuideSection | null
	} = $props()

	const isNew = $derived(section === null)

	let editMode = $state(false)
	let title = $state("")
	let body = $state("")
	let order = $state(1)
	let slug = $state("")
	let originalSlug = $state("")
	let originalSnapshot = $state("")
	let saving = $state(false)
	let removing = $state(false)

	const currentSnapshot = $derived(
		JSON.stringify({
			title,
			body,
			order,
			slug
		})
	)

	const canSave = $derived(
		title.trim().length > 0 &&
			slug.trim().length > 0 &&
			(isNew || currentSnapshot !== originalSnapshot)
	)

	const fieldClass =
		"rounded-md bg-surface-500/10 p-0! ring-4 ring-surface-500/10"

	const descriptionFieldClass = `${fieldClass} break-normal`

	function nextOrder(): number {
		return sections.reduce((max, entry) => Math.max(max, entry.order), 0) + 1
	}

	function resetFromSection(nextSection: BuildGuideSection | null) {
		if (!nextSection) {
			editMode = true
			title = ""
			body = ""
			order = nextOrder()
			slug = ""
			originalSlug = ""
			originalSnapshot = JSON.stringify({
				title: "",
				body: "",
				order,
				slug: ""
			})
			return
		}

		editMode = false
		title = nextSection.title
		body = getBuildGuideSectionSource(nextSection.guideSlug, nextSection.id)
		order = nextSection.order
		slug = nextSection.id
		originalSlug = nextSection.id
		originalSnapshot = JSON.stringify({
			title: nextSection.title,
			body: getBuildGuideSectionSource(nextSection.guideSlug, nextSection.id),
			order: nextSection.order,
			slug: nextSection.id
		})
	}

	untrack(() => resetFromSection(section))

	function handleTitleInput(event: Event) {
		const nextTitle = (event.currentTarget as HTMLInputElement).value
		if (nextTitle) slug = slugifyBuildGuideTitle(nextTitle)
	}

	function exitEditMode() {
		editMode = false
		resetFromSection(section)
	}

	async function saveSection() {
		if (!canSave) return

		const nextSlug = slug.trim()
		saving = true

		try {
			const content = serializeBuildGuideSection({
				title: title.trim(),
				order,
				body
			})

			const response = await fetch("/api/dev/save-build-guide-section", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					guideSlug,
					sectionSlug: nextSlug,
					previousSectionSlug: originalSlug || undefined,
					content
				})
			})

			if (!response.ok) {
				const payload = (await response.json().catch(() => null)) as {
					message?: string
				} | null
				throw new Error(payload?.message ?? "Failed to save section")
			}

			const payload = (await response.json()) as { path: string }
			originalSlug = nextSlug
			originalSnapshot = currentSnapshot
			toastSuccess({
				title: `Saved ${payload.path}. Refresh to see updates.`
			})
			editMode = false

			if (isNew) {
				resetFromSection(null)
			}
		} catch (err) {
			toastError({
				title: err instanceof Error ? err.message : "Failed to save section"
			})
		} finally {
			saving = false
		}
	}

	async function removeSection() {
		if (!section || !originalSlug) return

		const confirmed = confirm(
			`Delete "${title}" and all of its parts? This cannot be undone.`
		)
		if (!confirmed) return

		removing = true

		try {
			const response = await fetch("/api/dev/delete-build-guide-section", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					guideSlug,
					sectionSlug: originalSlug
				})
			})

			if (!response.ok) {
				const payload = (await response.json().catch(() => null)) as {
					message?: string
				} | null
				throw new Error(payload?.message ?? "Failed to remove section")
			}

			const payload = (await response.json()) as { path: string }
			toastSuccess({
				title: `Removed ${payload.path}. Refresh to see updates.`
			})
			editMode = false
		} catch (err) {
			toastError({
				title: err instanceof Error ? err.message : "Failed to remove section"
			})
		} finally {
			removing = false
		}
	}
</script>

{#if !editMode && !isNew}
	<SectionHeadingView
		{title}
		content={section?.Content}
	>
		{#snippet actions()}
			<button
				type="button"
				class="transition-colors duration-300 hover:text-primary-500"
				aria-label="Edit section"
				onclick={() => (editMode = true)}
			>
				<Pencil class="size-6 md:size-7" />
			</button>
		{/snippet}
	</SectionHeadingView>
{:else}
	<SectionHeadingView {title}>
		{#snippet heading()}
			<input
				type="text"
				bind:value={title}
				oninput={handleTitleInput}
				spellcheck="false"
				class="{fieldClass} title-field h-fit max-w-full font-josefin-sans text-5xl leading-none font-bold md:text-6xl"
				placeholder="Section title"
			/>
		{/snippet}
		{#snippet description()}
			<textarea
				bind:value={body}
				rows={1}
				spellcheck="false"
				class="{descriptionFieldClass} body-field prose min-h-[1.5em] w-full max-w-[100ch] resize-none text-surface-900-100"
				placeholder="Section content (SVX)"></textarea>
		{/snippet}
		{#snippet actions()}
			<div class="flex shrink-0">
				<input
					type="number"
					min="1"
					max="69"
					bind:value={order}
					class="no-spinner h-8 w-12 rounded-md bg-surface-500/10 p-2 text-base outline-none focus-within:outline-2 focus-within:outline-primary-500"
				/>
				<div class="ml-1 flex h-8 flex-col justify-between text-surface-500/40">
					<button
						type="button"
						class="hover:text-primary-500"
						aria-label="Increase order"
						onclick={() => order++}
					>
						<ChevronUp class="size-3 stroke-3" />
					</button>
					<button
						type="button"
						class="rotate-180 hover:text-primary-500"
						aria-label="Decrease order"
						onclick={() => order > 1 && order--}
					>
						<ChevronUp class="size-3 stroke-3" />
					</button>
				</div>
			</div>
			<button
				type="button"
				class="transition-colors duration-300 hover:text-primary-500 disabled:pointer-events-none disabled:opacity-40"
				aria-label={saving ? "Saving section" : "Save section"}
				disabled={!canSave || saving}
				onclick={saveSection}
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
					class="transition-colors duration-300 hover:text-error-500 disabled:pointer-events-none disabled:opacity-40"
					aria-label={removing ? "Removing section" : "Remove section"}
					disabled={removing || saving}
					onclick={removeSection}
				>
					{#if removing}
						<Loader2 class="size-5 animate-spin md:size-6" />
					{:else}
						<Trash2 class="size-6 md:size-7" />
					{/if}
				</button>
			{/if}

			{#if !isNew}
				<button
					type="button"
					class="transition-colors duration-300 hover:text-primary-500"
					aria-label="View section"
					onclick={exitEditMode}
				>
					<Eye class="size-6 md:size-7" />
				</button>
			{/if}
		{/snippet}
	</SectionHeadingView>
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

	.body-field {
		field-sizing: content;
	}

	.title-field {
		min-width: 6ch;
		field-sizing: content;
	}
</style>
