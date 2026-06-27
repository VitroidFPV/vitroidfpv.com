<script lang="ts">
	import WorleyCanvas from "$components/WorleyCanvas.svelte"
	import type { FrameStats, WorleyMode } from "$lib/webgl/worley"
	import { page } from "$app/state"
	import { MediaQuery } from "svelte/reactivity"
	import TextScroller from "$components/TextScroller.svelte"
	import type { Attachment } from "svelte/attachments"
	import { fly } from "svelte/transition"
	import { homeSections } from "$lib/home/sections"

	const isMobile = new MediaQuery("(hover: none) and (pointer: coarse)", true)

	const scrollerEasterEgg = {
		label: "SECRET LINK",
		href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
	}

	const modes: { value: WorleyMode; label: string }[] = [
		{ value: "f1", label: "Distance — F1" },
		{ value: "f2", label: "Distance — F2" },
		{ value: "cellular", label: "Cellular — F2 − F1" },
		{ value: "inverted", label: "Inverted — 1 − F1" }
	]

	let scale = $state(90)
	let noiseScale = $state(2)
	let threshold = $state(0.26)
	let speed = $state(0.5)
	let mode = $state<WorleyMode>("f1")
	let mouseFalloff = $state(30)
	let mouseScaleBoost = $state(1.35)
	let mouseNoiseBoost = $state(1.65)
	let indicatorFill = $state(0.35)
	let indicatorRing = $state(0)
	let indicatorAlpha = $state(0.25)
	let frameStats = $state<FrameStats | null>(null)

	let url = $derived(page.url)
	// URL { href: "http://localhost:3000/experiments/worley?controls", origin: "http://localhost:3000", protocol: "http:", username: "", password: "", host: "localhost:3000", hostname: "localhost", port: "3000", pathname: "/experiments/worley", search: "?controls" }

	let controls = $derived(url.search.includes("controls"))

	let age = $derived.by(() => {
		const now = new Date()
		const start = new Date(2005, 5, 19) // June is month 5 in JS Date (0-indexed)
		const diff = now.getTime() - start.getTime()
		const years = diff / (1000 * 60 * 60 * 24 * 365.2425) // average year length
		return years
	})

	let activeSection = $state(homeSections[0]?.title ?? "")
	const sectionTitleSlotCount = 6
	const sectionTitleCharDelay = 45
	const sectionTitleCharDuration = 220

	function trackSection(title: string): Attachment<HTMLElement> {
		return (node) => {
			const observer = new IntersectionObserver(
				(entries) => {
					for (const entry of entries) {
						if (entry.isIntersecting) activeSection = title
					}
				},
				// Activate a section once it reaches the upper third of the viewport,
				// roughly where the sticky title sits
				{ rootMargin: "-25% 0px -60% 0px" }
			)
			observer.observe(node)
			return () => observer.disconnect()
		}
	}

	let activeSectionSlots = $derived.by(() => {
		const chars = activeSection.split("")
		const padding = sectionTitleSlotCount - chars.length

		return Array.from({ length: sectionTitleSlotCount }, (_, index) => {
			const charIndex = index - padding
			const char = charIndex >= 0 ? chars[charIndex] : null

			return {
				index,
				char,
				key: `${activeSection}-${index}-${char ?? ""}`,
				delay: (sectionTitleSlotCount - index - 1) * sectionTitleCharDelay
			}
		})
	})
</script>

<svelte:head>
	<title>VitroidFPV</title>
</svelte:head>

{#if controls}
	<div class="absolute top-0 right-0 z-10">
		<aside class="flex flex-col gap-4 overflow-y-auto p-4">
			<label class="flex flex-col gap-1 text-sm">
				<span>Noise Scale — {noiseScale.toFixed(2)}</span>
				<input
					type="range"
					min="0.1"
					max="4"
					step="0.05"
					bind:value={noiseScale}
				/>
			</label>

			<label class="flex flex-col gap-1 text-sm">
				<span>Voronoi Scale — {scale.toFixed(1)}</span>
				<input
					type="range"
					min="1"
					max="150"
					step="0.1"
					bind:value={scale}
				/>
			</label>

			<label class="flex flex-col gap-1 text-sm">
				<span>ColorRamp Threshold — {threshold.toFixed(3)}</span>
				<input
					type="range"
					min="0"
					max="1"
					step="0.001"
					bind:value={threshold}
				/>
			</label>

			<label class="flex flex-col gap-1 text-sm">
				<span>Speed — {speed.toFixed(1)}×</span>
				<input
					type="range"
					min="0"
					max="3"
					step="0.1"
					bind:value={speed}
				/>
			</label>

			<fieldset class="flex flex-col gap-2 text-sm">
				<legend class="mb-1">Mode</legend>
				{#each modes as option (option.value)}
					<label class="flex items-center gap-2">
						<input
							type="radio"
							name="worley-mode"
							value={option.value}
							bind:group={mode}
						/>
						{option.label}
					</label>
				{/each}
			</fieldset>

			<fieldset
				class="flex flex-col gap-3 border-t border-surface-200 pt-4 text-sm"
			>
				<legend class="mb-1">Cursor</legend>

				<label class="flex flex-col gap-1">
					<span>Falloff — {mouseFalloff.toFixed(1)}</span>
					<input
						type="range"
						min="0.5"
						max="100"
						step="1"
						bind:value={mouseFalloff}
					/>
				</label>

				<label class="flex flex-col gap-1">
					<span>Scale Boost — {mouseScaleBoost.toFixed(2)}×</span>
					<input
						type="range"
						min="1"
						max="6"
						step="0.05"
						bind:value={mouseScaleBoost}
					/>
				</label>

				<label class="flex flex-col gap-1">
					<span>Noise Boost — {mouseNoiseBoost.toFixed(2)}×</span>
					<input
						type="range"
						min="1"
						max="4"
						step="0.05"
						bind:value={mouseNoiseBoost}
					/>
				</label>

				<label class="flex flex-col gap-1">
					<span>Indicator Fill — {indicatorFill.toFixed(2)}</span>
					<input
						type="range"
						min="0"
						max="1"
						step="0.01"
						bind:value={indicatorFill}
					/>
				</label>

				<label class="flex flex-col gap-1">
					<span>Indicator Ring — {indicatorRing.toFixed(2)}</span>
					<input
						type="range"
						min="0"
						max="2"
						step="0.01"
						bind:value={indicatorRing}
					/>
				</label>

				<label class="flex flex-col gap-1">
					<span>Indicator Alpha — {indicatorAlpha.toFixed(2)}</span>
					<input
						type="range"
						min="0"
						max="1"
						step="0.01"
						bind:value={indicatorAlpha}
					/>
				</label>
			</fieldset>

			{#if frameStats}
				<dl
					class="space-y-1 border-t border-surface-200 pt-4 text-sm tabular-nums"
				>
					<div class="flex justify-between gap-4">
						<dt class="text-surface-500">Frame</dt>
						<dd>{frameStats.frameTime.toFixed(2)} ms</dd>
					</div>
					<div class="flex justify-between gap-4">
						<dt class="text-surface-500">FPS</dt>
						<dd>{frameStats.fps.toFixed(1)}</dd>
					</div>
				</dl>
			{/if}
		</aside>
	</div>
{/if}

<div class="max-w-screen h-screen relative">
	{#if !isMobile.current}
		<WorleyCanvas
			{scale}
			{noiseScale}
			{threshold}
			{speed}
			{mode}
			{mouseFalloff}
			{mouseScaleBoost}
			{mouseNoiseBoost}
			{indicatorFill}
			{indicatorRing}
			{indicatorAlpha}
			onframe={(stats) => (frameStats = stats)}
		/>
	{/if}
	<div
		class="absolute bottom-0 left-0 w-full h-full pointer-events-none flex items-end"
	>
		<div class="pb-56 md:pl-12 pl-2 flex flex-col gap-4">
			<h1
				class="text-[4rem] md:text-[6rem] lg:text-[12rem] md:-ml-8 -ml-2 md:-mb-12 -mb-8 font-bold font-caveat text-primary-500 text-shadow-[0px_0px_32px_var(--color-primary-500)] bold-text-effect text-shadow-primary-500/10"
			>
				Vitroid FPV
			</h1>
			<!-- 7rem roughly the width of the text scrollers -->
			<p
				class="text-2xl font-extralight md:max-w-[70ch] max-w-[calc(100vw-7rem)]"
			>
				Making FPV <span class="text-primary-500 font-medium tracking-wide"
					>easier</span
				>. One line of code at a time.
			</p>
		</div>
	</div>
	<div
		class="pointer-events-none fixed top-0 md:right-4 right-1 h-full max-w-full flex md:gap-2 gap-0"
	>
		<TextScroller easterEgg={scrollerEasterEgg} />
		<TextScroller reverse easterEgg={scrollerEasterEgg} />
	</div>
</div>

<div class="md:px-8 px-2 pt-64">
	<div class="flex">
		<h2
			class="md:text-[6rem] text-4xl w-[1.15em] font-geist-mono shrink-0 self-start overflow-hidden font-black text-primary-500 [writing-mode:sideways-lr] text-end sticky top-8 md:mr-6 mr-1 md:ml-0 -ml-2"
			aria-label={activeSection}
		>
			<div
				class="relative inline-flex w-[1.15em] shrink-0 justify-end overflow-hidden"
				style:height="{sectionTitleSlotCount}em"
				aria-hidden="true"
			>
				{#each activeSectionSlots as slot (slot.index)}
					<span
						class="relative inline-grid w-[1.15em] shrink-0 place-items-center overflow-hidden"
					>
						{#key slot.key}
							{#if slot.char}
								<span
									class="col-start-1 row-start-1 will-change-transform"
									in:fly|global={{
										duration: sectionTitleCharDuration,
										delay: slot.delay,
										x: 100
									}}
									out:fly|global={{
										duration: sectionTitleCharDuration,
										delay: slot.delay,
										x: -100
									}}>{slot.char}</span
								>
							{/if}
						{/key}
					</span>
				{/each}
			</div>
		</h2>
		<div class="flex-1 flex flex-col md:gap-64 gap-16">
			{#each homeSections as section (section.title)}
				<section
					{@attach trackSection(section.title)}
					class="home-section md:text-3xl text-sm font-extralight md:max-w-[calc(100%-7rem)] max-w-[calc(100%-2.25rem)] md:space-y-10 space-y-4 pb-64"
				>
					<section.component {age} />
				</section>
			{/each}
			<div class="h-1/2"></div>
		</div>
	</div>
</div>

<style>
	@media (min-width: 768px) {
		/* md breakpoint is 768px in Tailwind */
		.bold-text-effect {
			-webkit-text-stroke: 2px var(--color-primary-500);
		}
	}

	.home-section :global(a:hover) {
		text-decoration: underline;
	}
</style>
