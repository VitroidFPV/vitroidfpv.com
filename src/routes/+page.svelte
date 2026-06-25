<script lang="ts">
	import WorleyCanvas from "$components/WorleyCanvas.svelte"
	import type { FrameStats, WorleyMode } from "$lib/webgl/worley"
	import { page } from "$app/state"
	import { MediaQuery } from "svelte/reactivity"
	import TextScroller from "$components/TextScroller.svelte"

	const isMobile = new MediaQuery("(hover: none) and (pointer: coarse)", true)

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

	let age = $derived(() => {
		const now = new Date()
		const start = new Date(2005, 5, 19) // June is month 5 in JS Date (0-indexed)
		const diff = now.getTime() - start.getTime()
		const years = diff / (1000 * 60 * 60 * 24 * 365.2425) // average year length
		return years
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
		<div class="pb-56 pl-12 flex flex-col gap-4">
			<h1
				class="text-[12rem] -ml-8 -mb-12 font-bold font-caveat text-primary-500 text-shadow-[0px_0px_32px_var(--color-primary-500)] bold-text-effect text-shadow-primary-500/10"
			>
				Vitroid FPV
			</h1>
			<p class="text-2xl font-extralight">
				Making FPV <span class="text-primary-500 font-medium tracking-wide"
					>easier</span
				>. One line of code at a time.
			</p>
		</div>
	</div>
	<div
		class="pointer-events-none absolute top-0 right-4 h-full max-w-full flex gap-2"
	>
		<TextScroller />
		<TextScroller reverse />
	</div>
</div>

<div class="py-64 px-10">
	<div class="flex">
		<h2
			class="text-6xl w-fit font-semibold font-josefin-sans text-primary-500 [writing-mode:sideways-lr] text-end"
		>
			About...
		</h2>
		<div class="text-lg font-extralight max-w-[70ch] space-y-4">
			<p class="">
				Heyo! I'm a {age().toFixed(0)} year old FPV pilot turned developer mostly
				out of boredom and a little bit of spite.
			</p>
			<p>
				This site started all the way back in 2021 as my first programming
				project. It was essentially a fancy way to show part recommendations
				from a google sheet that me and my friends made and shared around at the
				time. Now it's... still mostly that, but even fancier and with actual
				added functionality here and there.
			</p>
			<p>
				I'm also working on a couple of other projects that you may or may not
				have heard of, like <a
					href="https://betaflight.com"
					class="text-primary-500 hover:underline font-normal">Betaflight</a
				>. Me and a good friend of mine started work on an alternative
				documentation website, and it eventually became official, with us now on
				the dev team! I mostly work on the documentation and the app itself,
				having helped taking it out of its old native wrapper and into the
				browser directly. The latest release of the app is built around a much
				more modern UI framework and architecture which I helped introduce.
			</p>
			<p>Enough about me, let's see what you can actually find here!</p>
		</div>
	</div>
</div>

<style>
	.bold-text-effect {
		-webkit-text-stroke: 2px var(--color-primary-500);
	}
</style>
