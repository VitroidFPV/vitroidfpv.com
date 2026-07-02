<script lang="ts">
	import { page } from "$app/state"
	import { afterNavigate } from "$app/navigation"
	import { Check, ChevronDownIcon, ClipboardPlus } from "@lucide/svelte"
	import { Accordion } from "@skeletonlabs/skeleton-svelte"
	import PageWrapper from "$components/PageWrapper.svelte"
	import { buildFaqQuestionUrl, faqSections, findFaqQuestionById } from "$lib/faq/sections"
	import type { HTMLAttributes } from "svelte/elements"
	import { onMount, tick } from "svelte"
	import { slide } from "svelte/transition"
	import FaqIntro, { metadata } from "./faq-page.svx"

	const SLIDE_DURATION = 150

	let copiedQuestionId = $state<string | null>(null)
	let copyTimeout: ReturnType<typeof setTimeout> | undefined
	let openBySection = $state<Record<string, string[]>>({})
	let handledDeepLink = $state<string | null>(null)

	async function openQuestionFromUrl() {
		const questionId = page.url.hash.slice(1)
		if (!questionId) {
			handledDeepLink = null
			return
		}

		if (handledDeepLink === questionId) return

		const match = findFaqQuestionById(questionId)
		if (!match) return

		handledDeepLink = questionId

		const { section, question } = match
		const current = openBySection[section.id] ?? []
		const wasOpen = current.includes(question.id)

		if (!wasOpen) {
			openBySection = { ...openBySection, [section.id]: [...current, question.id] }
		}

		await tick()
		if (!wasOpen) {
			await new Promise<void>((resolve) => setTimeout(resolve, SLIDE_DURATION))
		}
		await new Promise<void>((resolve) => {
			requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
		})

		if (document.activeElement instanceof HTMLElement) {
			document.activeElement.blur()
		}

		document.getElementById(questionId)?.scrollIntoView()
	}

	onMount(() => {
		if ("scrollRestoration" in history) {
			history.scrollRestoration = "manual"
		}

		void openQuestionFromUrl()
	})

	afterNavigate(() => {
		void openQuestionFromUrl()
	})

	async function copyToClipboard(questionId: string, url: string) {
		try {
			await navigator.clipboard.writeText(url)
			copiedQuestionId = questionId
			clearTimeout(copyTimeout)
			copyTimeout = setTimeout(() => {
				if (copiedQuestionId === questionId) {
					copiedQuestionId = null
				}
			}, 1000)
		} catch {
			// Clipboard access can fail in unsupported contexts.
		}
	}
</script>

<PageWrapper h1={metadata.title as string} h2={metadata.description as string}>
	{#snippet description()}
		<FaqIntro />
	{/snippet}

	<div class="relative z-0 flex flex-col gap-16 px-2 pb-16 [overflow-anchor:none] md:pl-8 md:pr-8">
		{#each faqSections as section (section.id)}
			<section class="flex flex-col gap-4">
				<div>
					<h2 class="text-2xl font-bold text-primary-500">{section.title}</h2>
					{#if section.description}
						<p class="text-surface-600-400">{section.description}</p>
					{/if}
				</div>

				<Accordion
					collapsible
					multiple
					value={openBySection[section.id] ?? []}
					onValueChange={(details: { value: string[] }) => {
						openBySection = { ...openBySection, [section.id]: details.value }
					}}
				>
					{#each section.questions as question, i (question.id)}
						{#if i !== 0}
							<hr class="hr" />
						{/if}
						<Accordion.Item value={question.id}>
							<span
								id={question.id}
								class="pointer-events-none block h-0 scroll-mt-32"
								aria-hidden="true"
							></span>
							<h3 class="group flex items-center gap-1">
								<Accordion.ItemTrigger
									class="flex flex-1 items-center justify-between gap-2 font-bold data-[state=open]:bg-primary-500/10 data-[state=open]:text-primary-500"
								>
									<span>{question.title}</span>
									<Accordion.ItemIndicator class="group/indicator shrink-0">
										<ChevronDownIcon
											class="h-5 w-5 transition group-data-[state=open]/indicator:rotate-180"
										/>
									</Accordion.ItemIndicator>
								</Accordion.ItemTrigger>
								<button
									type="button"
									aria-label="Copy link to this question"
									class="shrink-0 rounded-full p-2 hover:bg-primary-500/10 hover:text-primary-500 {copiedQuestionId ===
									question.id
										? 'visible'
										: 'md:invisible group-hover:visible'}"
									onclick={(event) => {
										event.stopPropagation()
										copyToClipboard(question.id, buildFaqQuestionUrl(page.url, question.id))
									}}
								>
									{#if copiedQuestionId === question.id}
										<Check class="size-5 text-primary-500" />
									{:else}
										<ClipboardPlus class="size-5" />
									{/if}
								</button>
							</h3>
							<Accordion.ItemContent>
								{#snippet element(attributes: HTMLAttributes<HTMLDivElement> & { hidden?: boolean })}
									{#if !attributes.hidden}
										<div
											{...attributes}
											class="md prose max-w-none"
											transition:slide={{ duration: SLIDE_DURATION }}
										>
											<question.component />
										</div>
									{/if}
								{/snippet}
							</Accordion.ItemContent>
						</Accordion.Item>
					{/each}
				</Accordion>
			</section>
		{/each}
	</div>
</PageWrapper>
