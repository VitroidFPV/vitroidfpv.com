<script lang="ts">
	import PartCardFrame from "$components/build-guides/PartCardFrame.svelte"
	import Content, { metadata } from "./MotorSize.svx"

	let inputSize = $state("")

	function parseMotorSize(
		size: string
	): { diameter: number; height: number } | null {
		// 2207 - diameter: 22mm, height: 7mm
		// 2306.5 - diameter: 23mm, height: 6.5mm
		// 2306,5 - diameter: 23mm, height: 6.5mm
		// 2207. - diameter: 22mm, height: 7mm (trailing separator ignored)

		const regex = /^(\d{2})(\d{1,2}(?:[.,]\d+)?)[.,]?$/
		const match = size.match(regex)
		if (!match) return null

		const diameter = parseInt(match[1], 10)
		const height = parseFloat(match[2].replace(",", "."))

		return { diameter, height }
	}

	let statorVolume = $derived(() => {
		if (!inputSize) return null

		const parsedSize = parseMotorSize(inputSize)
		if (!parsedSize) return null

		const { diameter, height } = parsedSize

		console.log(diameter, height)

		// Calculate volume in mm³
		const radius = diameter / 2
		const volume = Math.PI * Math.pow(radius, 2) * height
		return Math.round(volume)
	})

	let statorSurfaceArea = $derived(() => {
		if (!inputSize) return null

		const parsedSize = parseMotorSize(inputSize)
		if (!parsedSize) return null

		const { diameter, height } = parsedSize

		// Calculate surface area in mm²
		const radius = diameter / 2
		const surfaceArea = 2 * Math.PI * radius * (radius + height)
		return Math.round(surfaceArea)
	})
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

	<div class="flex items-center gap-2">
		<div class="flex items-center gap-1">
			Volume: <span
				class="inline-flex h-8 w-20 rounded-full bg-surface-100-900 px-2 py-1"
				>{statorVolume()}</span
			> mm³
		</div>
		<div class="flex items-center gap-1">
			Surface Area: <span
				class="inline-flex h-8 w-20 rounded-full bg-surface-100-900 px-2 py-1"
				>{statorSurfaceArea()}</span
			> mm²
		</div>
	</div>

	<div class="prose">
		<Content />
	</div>
</PartCardFrame>
