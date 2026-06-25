<script lang="ts">
	import {
		WorleyRenderer,
		type FrameStats,
		type MouseState,
		type WorleyMode
	} from "$lib/webgl/worley"

	type Props = {
		scale?: number
		noiseScale?: number
		threshold?: number
		speed?: number
		mode?: WorleyMode
		mouseFalloff?: number
		mouseScaleBoost?: number
		mouseNoiseBoost?: number
		indicatorFill?: number
		indicatorRing?: number
		indicatorAlpha?: number
		onframe?: (stats: FrameStats) => void
	}

	let {
		scale = 86.9,
		noiseScale = 0.8,
		threshold = 0.214,
		speed = 0,
		mode = "f1",
		mouseFalloff = 5,
		mouseScaleBoost = 1.25,
		mouseNoiseBoost = 1.25,
		indicatorFill = 0.35,
		indicatorRing = 1,
		indicatorAlpha = 0.92,
		onframe
	}: Props = $props()

	let error = $state<string | null>(null)
	let renderer: WorleyRenderer | null = null

	function pointerToMouse(
		canvas: HTMLCanvasElement,
		clientX: number,
		clientY: number,
		active: boolean
	): MouseState {
		const rect = canvas.getBoundingClientRect()
		const uvX = (clientX - rect.left) / rect.width
		const uvY = 1 - (clientY - rect.top) / rect.height
		const aspect = rect.width / rect.height

		return {
			x: (uvX - 0.5) * aspect,
			y: uvY - 0.5,
			active
		}
	}

	function setupRenderer(canvas: HTMLCanvasElement) {
		error = null

		let instance: WorleyRenderer | null = null

		const handlePointerEnter = (event: PointerEvent) => {
			instance?.setMouse(
				pointerToMouse(canvas, event.clientX, event.clientY, true)
			)
		}

		const handlePointerMove = (event: PointerEvent) => {
			instance?.setMouse(
				pointerToMouse(canvas, event.clientX, event.clientY, true)
			)
		}

		const handlePointerLeave = () => {
			instance?.setMouse({ x: 0, y: 0, active: false })
		}

		canvas.addEventListener("pointerenter", handlePointerEnter)
		canvas.addEventListener("pointermove", handlePointerMove)
		canvas.addEventListener("pointerleave", handlePointerLeave)

		try {
			instance = new WorleyRenderer(canvas)
			instance.start()
			renderer = instance

			$effect(() => {
				instance?.setOptions({
					scale,
					noiseScale,
					threshold,
					speed,
					mode,
					mouseFalloff,
					mouseScaleBoost,
					mouseNoiseBoost,
					indicatorFill,
					indicatorRing,
					indicatorAlpha,
					onFrame: onframe
				})
			})

			return () => {
				canvas.removeEventListener("pointerenter", handlePointerEnter)
				canvas.removeEventListener("pointermove", handlePointerMove)
				canvas.removeEventListener("pointerleave", handlePointerLeave)
				instance?.destroy()
				if (renderer === instance) renderer = null
			}
		} catch (e) {
			canvas.removeEventListener("pointerenter", handlePointerEnter)
			canvas.removeEventListener("pointermove", handlePointerMove)
			canvas.removeEventListener("pointerleave", handlePointerLeave)
			error = e instanceof Error ? e.message : "Failed to initialize WebGL"
			renderer = null
		}
	}
</script>

<div
	class="relative h-full w-full mask-[linear-gradient(to_bottom,transparent,black_20%,black_50%,transparent)]"
>
	<canvas
		{@attach setupRenderer}
		class="block h-full w-full"
		aria-label="4D noise-driven Voronoi texture visualization"
	></canvas>
	{#if error}
		<p class="absolute inset-0 flex items-center justify-center text-error-500">
			{error}
		</p>
	{/if}
</div>
