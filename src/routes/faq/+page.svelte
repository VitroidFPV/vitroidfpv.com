<script lang="ts">
	import { page } from "$app/state"
	import { afterNavigate } from "$app/navigation"
	import { Check, ChevronDownIcon, ClipboardPlus } from "@lucide/svelte"
	import { Accordion } from "@skeletonlabs/skeleton-svelte"
	import ContentPage from "$components/content/ContentPage.svelte"
	import { faqSections, findFaqQuestionById } from "$lib/faq/content"
	import {
		FAQ_QUESTION_QUERY_PARAM,
		getFaqQuestionIdFromUrl,
		getFaqQuestionUrl
	} from "$lib/faq/links"
	import type { HTMLAttributes } from "svelte/elements"
	import { onMount, tick } from "svelte"
	import { slide } from "svelte/transition"
	import PageContent, { metadata } from "$content/pages/faq.svx"

	const SLIDE_DURATION = 150

	let copiedQuestionId = $state<string | null>(null)
	let copyTimeout: ReturnType<typeof setTimeout> | undefined
	let openBySection = $state<Record<string, string[]>>({})
	let handledDeepLink = $state<string | null>(null)
	const selectedFaqQuestion = $derived(
		findFaqQuestionById(getFaqQuestionIdFromUrl(page.url) ?? "")
	)
	const selectedFaqPath = $derived(
		selectedFaqQuestion
			? `${page.url.pathname}?${FAQ_QUESTION_QUERY_PARAM}=${encodeURIComponent(
					selectedFaqQuestion.question.id
				)}`
			: undefined
	)

	async function openQuestionFromUrl() {
		const questionId = getFaqQuestionIdFromUrl(page.url)
		if (!questionId) {
			handledDeepLink = null
			return
		}

		if (handledDeepLink === questionId) return

		const match = findFaqQuestionById(questionId)
		if (!match) {
			handledDeepLink = null
			return
		}

		handledDeepLink = questionId

		const { section, question } = match
		const current = openBySection[section.id] ?? []
		const wasOpen = current.includes(question.id)

		if (!wasOpen) {
			openBySection = {
				...openBySection,
				[section.id]: [...current, question.id]
			}
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

		document.getElementById(questionId)?.scrollIntoView({
			behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
				? "auto"
				: "smooth",
			block: "start"
		})
	}

	onMount(() => {
		const previousScrollRestoration = history.scrollRestoration
		if ("scrollRestoration" in history) {
			history.scrollRestoration = "manual"
		}

		void openQuestionFromUrl()

		return () => {
			clearTimeout(copyTimeout)
			history.scrollRestoration = previousScrollRestoration
		}
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

<ContentPage
	{metadata}
	source="src/content/pages/faq.svx"
	Content={PageContent}
	seoTitle={selectedFaqQuestion?.question.title}
	seoDescription={selectedFaqQuestion?.question.description}
	seoPath={selectedFaqPath}
>
	<div
		class="relative z-0 flex flex-col gap-16 px-2 pb-16 [overflow-anchor:none] md:pr-8 md:pl-8"
	>
		{#each faqSections as section (section.id)}
			<section class="flex flex-col gap-4">
				<div>
					<h2 class="text-2xl font-bold text-primary-500">{section.title}</h2>
					<div class="faq prose max-w-none text-surface-600-400">
						<section.Content />
					</div>
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
										: 'group-hover:visible md:invisible'}"
									onclick={(event) => {
										event.stopPropagation()
										copyToClipboard(
											question.id,
											getFaqQuestionUrl(page.url, question.id)
										)
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
								{#snippet element(
									attributes: HTMLAttributes<HTMLDivElement> & {
										hidden?: boolean
									}
								)}
									{#if !attributes.hidden}
										<div class="flex h-fit min-w-0 gap-0 pl-2">
											<div
												class="w-1 shrink-0 self-stretch rounded-full bg-primary-500 md:my-1"
											></div>
											<div
												{...attributes}
												class="md faq prose max-w-none"
												transition:slide={{ duration: SLIDE_DURATION }}
											>
												<question.Content />
											</div>
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
</ContentPage>
