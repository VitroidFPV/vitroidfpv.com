<script lang="ts">
	import { browser } from "$app/environment"
	import type { BuildGuideSection } from "$lib/build-guides/types"
	import type { Attachment } from "svelte/attachments"

	let { sections }: { sections: BuildGuideSection[] } = $props()

	let scrollY = $state(0)
	let viewportHeight = $state(0)
	let stickyNav: HTMLElement | undefined
	let stickyStart = $state(Infinity)
	const isStuck = $derived(browser && scrollY >= stickyStart)
	const activeSectionId = $derived.by(() => {
		if (!browser) return sections[0]?.id ?? ""

		const marker = scrollY + viewportHeight * 0.2
		for (let index = sections.length - 1; index >= 0; index--) {
			const section = sections[index]
			const element = document.getElementById(section.id)
			const sectionTop = element
				? element.getBoundingClientRect().top + scrollY
				: Infinity
			if (sectionTop <= marker) return section.id
		}

		return sections[0]?.id ?? ""
	})
	const scrollProgress = $derived.by(() => {
		if (!browser) return 0

		const end = document.documentElement.scrollHeight - viewportHeight
		return end > 0 ? Math.min(1, Math.max(0, scrollY / end)) : 0
	})

	function measureStickyStart() {
		if (!stickyNav) return

		const inlinePosition = stickyNav.style.position
		stickyNav.style.position = "static"
		stickyStart = stickyNav.getBoundingClientRect().top + window.scrollY
		stickyNav.style.position = inlinePosition
	}

	const registerStickyNav: Attachment<HTMLElement> = (node) => {
		stickyNav = node
		measureStickyStart()
		return () => (stickyNav = undefined)
	}
</script>

<svelte:window
	bind:scrollY
	bind:innerHeight={viewportHeight}
	onresize={measureStickyStart}
/>

<nav
	aria-label="Build guide sections"
	class={[
		"sticky top-0 z-20 px-2 pt-1 pb-2 lg:px-4 xl:px-8",
		isStuck && "bg-surface-50-950/65 backdrop-blur-xl"
	]}
	{@attach registerStickyNav}
>
	<div
		class="flex [scrollbar-width:none] gap-1 overflow-x-auto [&::-webkit-scrollbar]:hidden"
	>
		{#each sections as section (section.id)}
			<a
				href="#{section.id}"
				aria-current={activeSectionId === section.id ? "location" : undefined}
				class={[
					"shrink-0 rounded-md px-2.5 py-1 text-xs font-semibold transition-colors duration-200 md:text-sm",
					activeSectionId === section.id
						? "bg-primary-500/10 text-primary-500"
						: "text-surface-600-400 hover:text-primary-500"
				]}
			>
				{section.title}
			</a>
		{/each}
	</div>
	{#if isStuck}
		<div
			aria-hidden="true"
			class="absolute inset-x-0 bottom-0 h-0.5 overflow-hidden bg-surface-500/10"
		>
			<div
				class="progress-indicator h-full origin-left bg-primary-500 transition-transform duration-100 motion-reduce:transition-none"
				style:transform={`scaleX(${scrollProgress})`}
			></div>
		</div>
	{/if}
</nav>

<style>
	.progress-indicator {
		animation: reveal-progress 300ms ease-out both;
	}

	@keyframes reveal-progress {
		from {
			clip-path: inset(0 100% 0 0);
		}

		to {
			clip-path: inset(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.progress-indicator {
			animation: none;
		}
	}
</style>
