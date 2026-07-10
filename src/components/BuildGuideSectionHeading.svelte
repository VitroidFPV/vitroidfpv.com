<script lang="ts">
	import type { BuildGuideSection } from "$lib/builds/guide-sections"
	import { serializeGuideSection } from "$lib/builds/serialize-guide-section"
	import { slugifyGuidePartTitle } from "$lib/builds/serialize-guide-part"
	import { ChevronUp, Eye, Loader2, Pencil, Save, Trash2 } from "@lucide/svelte"

	let {
		buildSlug,
		sections,
		section = null
	}: {
		buildSlug: string
		sections: BuildGuideSection[]
		section?: BuildGuideSection | null
	} = $props()

	const isNew = $derived(section === null)

	let editMode = $state(false)
	let title = $state("")
	let description = $state("")
	let order = $state(1)
	let slug = $state("")
	let originalSlug = $state("")
	let originalSnapshot = $state("")
	let saving = $state(false)
	let removing = $state(false)
	let saveMessage = $state<string | null>(null)
	let saveError = $state<string | null>(null)

	const currentSnapshot = $derived(
		JSON.stringify({
			title,
			description,
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
		"w-full rounded-md bg-surface-500/10 p-0! break-all ring-4 ring-surface-500/10"

	function nextOrder(): number {
		return sections.reduce((max, entry) => Math.max(max, entry.order), 0) + 1
	}

	function resetFromSection(nextSection: BuildGuideSection | null) {
		saveMessage = null
		saveError = null

		if (!nextSection) {
			editMode = true
			title = ""
			description = ""
			order = nextOrder()
			slug = ""
			originalSlug = ""
			originalSnapshot = JSON.stringify({
				title: "",
				description: "",
				order,
				slug: ""
			})
			return
		}

		editMode = false
		title = nextSection.title
		description = nextSection.description
		order = nextSection.order
		slug = nextSection.id
		originalSlug = nextSection.id
		originalSnapshot = JSON.stringify({
			title: nextSection.title,
			description: nextSection.description,
			order: nextSection.order,
			slug: nextSection.id
		})
	}

	$effect(() => {
		resetFromSection(section)
	})

	$effect(() => {
		if (title) {
			slug = slugifyGuidePartTitle(title)
		}
	})

	function exitEditMode() {
		editMode = false
		resetFromSection(section)
	}

	async function saveSection() {
		saveMessage = null
		saveError = null

		if (!canSave) return

		const nextSlug = slug.trim()
		saving = true

		try {
			const content = serializeGuideSection({
				title: title.trim(),
				description,
				order
			})

			const response = await fetch("/api/dev/save-build-guide-section", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					buildSlug,
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
			saveMessage = `Saved ${payload.path}. Refresh to see updates.`
			editMode = false

			if (isNew) {
				resetFromSection(null)
			}
		} catch (err) {
			saveError = err instanceof Error ? err.message : "Failed to save section"
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

		saveMessage = null
		saveError = null
		removing = true

		try {
			const response = await fetch("/api/dev/delete-build-guide-section", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					buildSlug,
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
			saveMessage = `Removed ${payload.path}. Refresh to see updates.`
			editMode = false
		} catch (err) {
			saveError = err instanceof Error ? err.message : "Failed to remove section"
		} finally {
			removing = false
		}
	}
</script>

<div class="flex flex-col gap-2">
	<div class="flex items-start justify-between gap-2">
		<div class="flex min-w-0 flex-1 flex-col gap-2">
			{#if !editMode && !isNew}
				<h3 class="h-18 font-josefin-sans text-6xl font-bold">{title}</h3>
				<div class="prose min-h-[1.5em]">
					{#if description.trim()}
						<p>{description}</p>
					{/if}
				</div>
			{:else}
				<input
					type="text"
					bind:value={title}
					spellcheck="false"
					class="{fieldClass} -mt-0.5 mb-0.5 h-18 font-josefin-sans text-6xl font-bold"
					placeholder="Section title"
				/>
				<textarea
					bind:value={description}
					rows={1}
					spellcheck="false"
					class="{fieldClass} prose mb-2 min-h-[1.5em] resize-none text-surface-900-100"
					placeholder="Section description"></textarea>
			{/if}
		</div>

		<div class="flex shrink-0 items-start gap-2 text-surface-500">
			{#if editMode || isNew}
				<div class="flex shrink-0">
					<input
						type="number"
						min="1"
						max="69"
						bind:value={order}
						class="no-spinner h-8 w-12 rounded-md bg-surface-500/10 p-2 text-base outline-none focus-within:outline-2 focus-within:outline-primary-500"
					/>
					<div
						class="ml-1 flex h-8 flex-col justify-between text-surface-500/40"
					>
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
						<Loader2 class="size-7 animate-spin" />
					{:else}
						<Save class="size-7" />
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
							<Loader2 class="size-7 animate-spin" />
						{:else}
							<Trash2 class="size-7" />
						{/if}
					</button>
				{/if}
			{/if}

			{#if !isNew}
				{#if !editMode}
					<button
						type="button"
						class="transition-colors duration-300 hover:text-primary-500"
						aria-label="Edit section"
						onclick={() => (editMode = true)}
					>
						<Pencil class="size-7" />
					</button>
				{:else}
					<button
						type="button"
						class="transition-colors duration-300 hover:text-primary-500"
						aria-label="View section"
						onclick={exitEditMode}
					>
						<Eye class="size-7" />
					</button>
				{/if}
			{/if}
		</div>
	</div>

	{#if saveMessage}
		<p class="text-sm text-success-500">{saveMessage}</p>
	{/if}

	{#if saveError}
		<p class="text-sm text-error-500">{saveError}</p>
	{/if}
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
