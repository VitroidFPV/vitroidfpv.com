<script lang="ts">
	import PartCardFrame from "$components/build-guides/PartCardFrame.svelte"
	import { statorSurfaceArea, statorVolume } from "$lib/tools/motor-size"
	import Content, { metadata } from "./MotorSize.svx"

	let inputSize = $state("")

	let volume = $derived(inputSize ? statorVolume(inputSize) : null)
	let surfaceArea = $derived(inputSize ? statorSurfaceArea(inputSize) : null)
</script>

<PartCardFrame accent="success">
	<div class="text-xl font-semibold text-success-500 md:text-2xl">
		{metadata.title}
	</div>

	<label class="flex items-center gap-1">
		<span>Stator Size:</span>
		<input
			type="text"
			bind:value={inputSize}
			placeholder="2207"
			class="input h-fit w-32 bg-surface-50-950 font-geist-mono outline-none focus:ring-primary-800 dark:focus:ring-primary-500"
		/>
	</label>

	<div class="flex items-center gap-4">
		<div class="flex items-center gap-1">
			Volume: <span
				class="inline-flex h-8 w-20 rounded-full bg-surface-100-900 px-2 py-1"
				>{volume}</span
			> mm³
		</div>
		<div class="flex items-center gap-1">
			Surface Area: <span
				class="inline-flex h-8 w-20 rounded-full bg-surface-100-900 px-2 py-1"
				>{surfaceArea}</span
			> mm²
		</div>
	</div>

	<div class="prose">
		<Content />
	</div>
</PartCardFrame>
