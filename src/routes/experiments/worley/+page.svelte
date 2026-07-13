<script lang="ts">
	import WorleyCanvas from "$components/WorleyCanvas.svelte"
	import type { FrameStats, WorleyMode } from "$lib/webgl/worley"
	import { page } from "$app/state"
	import Seo from "$components/Seo.svelte"

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
</script>

<Seo
	title="Worley Noise · Experiments"
	description="An interactive WebGL experiment with animated Worley and Voronoi noise."
/>

<!-- <div class="flex h-[calc(100vh-2rem)] flex-col gap-4 p-4">
	<header class="space-y-1">
		<p class="text-sm text-surface-500">Experiments</p>
		<h1 class="text-2xl font-bold">Worley / Voronoi Noise</h1>
		<p class="text-surface-600">
			4D gradient noise feeds a Voronoi vector input, then a constant ColorRamp
			threshold inverts to white shapes on a transparent background.
		</p>
	</header>

	<div
		class="grid min-h-0 flex-1 gap-4 rounded-container border-2 border-surface-200 lg:grid-cols-[16rem_1fr]"
	>


		<div
			class="relative min-h-64 overflow-hidden rounded-container bg-surface-950"
		>
		</div>
	</div>
</div> -->
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
					<div class="flex justify-between gap-4">
						<dt class="text-surface-500">Draw CPU</dt>
						<dd>{frameStats.drawTime.toFixed(2)} ms</dd>
					</div>
					{#if frameStats.gpuTime !== undefined}
						<div class="flex justify-between gap-4">
							<dt class="text-surface-500">Draw GPU</dt>
							<dd>{frameStats.gpuTime.toFixed(2)} ms</dd>
						</div>
					{/if}
					<div class="flex justify-between gap-4">
						<dt class="text-surface-500">Render</dt>
						<dd>
							{frameStats.width}×{frameStats.height} @ {frameStats.pixelRatio.toFixed(
								2
							)}×
						</dd>
					</div>
				</dl>
			{/if}
		</aside>
	</div>
{/if}

<div class="h-screen max-w-screen">
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
		pixelRatioCap={2}
		onframe={(stats) => (frameStats = stats)}
	/>
</div>
