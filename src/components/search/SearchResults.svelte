<script lang="ts">
	import { resolve } from "$app/paths"
	import { getSidebarIconForUrl } from "$lib/navigation/sidebar"
	import { createSearchExcerpt, highlightText } from "$lib/search/highlight"
	import { searchCollectionLabels, type SearchHit } from "$lib/search/types"
	import { ArrowUpRight } from "@lucide/svelte"

	let {
		results,
		compact = false,
		onselect
	}: {
		results: readonly SearchHit[]
		compact?: boolean
		onselect?: (result: SearchHit) => void
	} = $props()
</script>

<ol class="flex flex-col gap-2">
	{#each results as result (result.id)}
		{@const excerpt = createSearchExcerpt(
			result.description || result.body,
			result.terms,
			compact ? 140 : 220
		)}
		{@const PageIcon = getSidebarIconForUrl(result.url)}
		<li>
			<a
				href={resolve(result.url as "/")}
				data-search-result
				class="group/result block rounded-2xl border border-surface-500/20 bg-surface-50-950/70 p-3 transition outline-none hover:border-primary-500/50 hover:bg-primary-500/8 focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500/30 md:p-4"
				onclick={() => onselect?.(result)}
			>
				<div class="flex items-start justify-between gap-3">
					<div class="min-w-0">
						<div
							class="mb-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold tracking-wide text-primary-600 uppercase dark:text-primary-400"
						>
							<span class="inline-flex items-center gap-1">
								{#if PageIcon}
									<span aria-hidden="true">
										<PageIcon class="size-3.5 shrink-0" />
									</span>
								{/if}
								{searchCollectionLabels[result.collection]}
							</span>
							{#if result.section}
								<span
									aria-hidden="true"
									class="text-surface-400">·</span
								>
								<span class="truncate text-surface-500 normal-case"
									>{result.section}</span
								>
							{/if}
						</div>
						<h3
							class="text-base font-bold text-surface-950 group-hover/result:text-primary-600 md:text-lg dark:text-surface-50 dark:group-hover/result:text-primary-400"
						>
							{#each highlightText(result.title, result.terms) as part, index (`${index}:${part.text}`)}
								{#if part.matched}
									<mark class="rounded-sm bg-primary-500/25 px-0.5 text-inherit"
										>{part.text}</mark
									>
								{:else}
									{part.text}
								{/if}
							{/each}
						</h3>
					</div>
					<ArrowUpRight
						class="mt-1 size-4 shrink-0 text-surface-400 transition group-hover/result:translate-x-0.5 group-hover/result:-translate-y-0.5 group-hover/result:text-primary-500"
						aria-hidden="true"
					/>
				</div>

				{#if excerpt}
					<p
						class="mt-1 text-sm leading-relaxed text-surface-600 dark:text-surface-300 {compact
							? 'line-clamp-2'
							: ''}"
					>
						{#each highlightText(excerpt, result.terms) as part, index (`${index}:${part.text}`)}
							{#if part.matched}
								<mark class="rounded-sm bg-primary-500/20 px-0.5 text-inherit"
									>{part.text}</mark
								>
							{:else}
								{part.text}
							{/if}
						{/each}
					</p>
				{/if}
			</a>
		</li>
	{/each}
</ol>
