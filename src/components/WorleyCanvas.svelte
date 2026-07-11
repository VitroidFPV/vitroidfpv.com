<script lang="ts">
	import {
		WorleyRenderer,
		type FrameStats,
		type MouseState,
		type WorleyMode
	} from "$lib/webgl/worley"
	import { createSubscriber, MediaQuery } from "svelte/reactivity"
	import { toastError } from "$lib/toaster"

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
		pixelRatioCap?: number
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
		pixelRatioCap = 2,
		onframe
	}: Props = $props()

	const reducedMotion = new MediaQuery(
		"(prefers-reduced-motion: reduce)",
		false
	)
	const subscribeToThemeMode = createSubscriber((update) => {
		const observer = new MutationObserver(update)
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["data-mode"]
		})

		return () => observer.disconnect()
	})

	let renderer: WorleyRenderer | null = null
	let visibilityState = $state<DocumentVisibilityState>(
		typeof document !== "undefined" ? document.visibilityState : "visible"
	)
	let canvasVisible = $state(false)
	const pageVisible = $derived(visibilityState === "visible")
	const themeMode = $derived.by(() => {
		if (typeof document === "undefined") return "dark"

		subscribeToThemeMode()
		return document.documentElement.getAttribute("data-mode") ?? "dark"
	})
	const lightBackground = $derived(themeMode === "light")
	const shouldRender = $derived(
		pageVisible && canvasVisible && !reducedMotion.current
	)

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
		let instance: WorleyRenderer | null = null
		const visibilityObserver =
			typeof IntersectionObserver !== "undefined"
				? new IntersectionObserver(
						([entry]) => {
							canvasVisible = entry?.isIntersecting ?? false
						},
						{ rootMargin: "200px 0px" }
					)
				: null

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
		if (visibilityObserver) {
			visibilityObserver.observe(canvas)
		} else {
			canvasVisible = true
		}

		try {
			instance = new WorleyRenderer(canvas)
			renderer = instance

			$effect(() => {
				if (!instance) return

				instance.options = {
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
					lightBackground,
					enabled: shouldRender,
					pixelRatioCap,
					onFrame: onframe
				}
			})

			return () => {
				canvas.removeEventListener("pointerenter", handlePointerEnter)
				canvas.removeEventListener("pointermove", handlePointerMove)
				canvas.removeEventListener("pointerleave", handlePointerLeave)
				visibilityObserver?.disconnect()
				canvasVisible = false
				instance?.destroy()
				if (renderer === instance) renderer = null
			}
		} catch (e) {
			canvas.removeEventListener("pointerenter", handlePointerEnter)
			canvas.removeEventListener("pointermove", handlePointerMove)
			canvas.removeEventListener("pointerleave", handlePointerLeave)
			visibilityObserver?.disconnect()
			canvasVisible = false
			toastError({
				title: e instanceof Error ? e.message : "Failed to initialize WebGL"
			})
			renderer = null
		}
	}
</script>

<svelte:document bind:visibilityState />

<div
	class="relative h-full w-full mask-[linear-gradient(to_bottom,transparent,black_20%,black_50%,transparent)]"
>
	<canvas
		{@attach setupRenderer}
		class="block h-full w-full"
		aria-label="4D noise-driven Voronoi texture visualization"
	></canvas>
</div>
