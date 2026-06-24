<script lang="ts">
	const sourceItems = [
		"NOGYRO",
		"FAILSAFE",
		"RXLOSS",
		"NOT_DISARMED",
		"BOXFAILSAFE",
		"RUNAWAY",
		"CRASH",
		"THROTTLE",
		"ANGLE",
		"BOOTGRACE",
		"NOPREARM",
		"LOAD",
		"CALIB",
		"CLI",
		"CMS",
		"BST",
		"MSP",
		"PARALYZE",
		"GPS",
		"RESCUE_SW",
		"DSHOT_TELEM",
		"REBOOT_REQD",
		"DSHOT_BBANG",
		"NO_ACC_CAL",
		"MOTOR_PROTO",
		"FLIP_SWITCH",
		"ALT_HOLD_SW",
		"POS_HOLD_SW",
		"ARM_SWITCH",
		"NONE",
		"UNKNOWN",
		" BEACON ON",
		"ARM IN %d.%d",
		"FAIL SAFE",
		"ESC %d%s",
		"ESC+",
		">CRASH FLIP<",
		"CRASHFLIP SW",
		"LAUNCH",
		"LAUNCH %d",
		"RSSI LOW",
		"RSSI DBM",
		"RSNR LOW",
		"LINK QUALITY",
		" LAND NOW",
		"CPU OVERLOAD",
		"RESCUE N/A",
		"RESCUE OFF",
		"POSHOLD FAIL",
		"HEADFREE",
		"CORE %c: %3d%c",
		"LOW BATTERY",
		"OVER CAP",
		"BATTERY CONT",
		"BATT < FULL",
		"  * * * *",
		"CHIRP EXC FINISHED"
	]

	let {
		count = 24,
		duration = 40,
		gap = "gap-8",
		refreshOnLoop = true
	}: {
		count?: number
		duration?: number
		gap?: string
		refreshOnLoop?: boolean
	} = $props()

	function pickRandom(): string {
		return sourceItems[Math.floor(Math.random() * sourceItems.length)]
	}

	function generateSequence(length: number): string[] {
		return Array.from({ length }, pickRandom)
	}

	let loopCount = $state(0)
	let root = $state<HTMLDivElement>()
	let hoveredKey = $state<string | null>(null)

	let pointerX = 0
	let pointerY = 0
	let pointerActive = false

	let sequence = $derived.by(() => {
		void loopCount
		return generateSequence(count)
	})

	function onLoop() {
		if (refreshOnLoop) {
			loopCount++
		}
	}

	function hitTest(clientX: number, clientY: number): string | null {
		if (!root) return null

		const items = root.querySelectorAll<HTMLElement>(
			'[data-scroller-column="visible"] [data-scroller-item]'
		)

		for (const el of items) {
			const rect = el.getBoundingClientRect()
			if (
				clientX >= rect.left &&
				clientX <= rect.right &&
				clientY >= rect.top &&
				clientY <= rect.bottom
			) {
				return el.dataset.scrollerItem ?? null
			}
		}

		return null
	}

	function setHovered(key: string | null) {
		if (key !== hoveredKey) {
			hoveredKey = key
		}
	}

	function syncHover() {
		setHovered(hitTest(pointerX, pointerY))
	}

	function onPointerMove(event: PointerEvent) {
		pointerX = event.clientX
		pointerY = event.clientY
		pointerActive = true
		syncHover()
	}

	function onPointerLeave() {
		pointerActive = false
		setHovered(null)
	}

	$effect(() => {
		let frame = 0
		const motionReduced = window.matchMedia("(prefers-reduced-motion: reduce)")

		const tick = () => {
			if (
				pointerActive &&
				!motionReduced.matches &&
				root
			) {
				const { left, right, top, bottom } = root.getBoundingClientRect()
				if (
					pointerX >= left &&
					pointerX <= right &&
					pointerY >= top &&
					pointerY <= bottom
				) {
					syncHover()
				} else if (hoveredKey !== null) {
					setHovered(null)
				}
			}

			frame = requestAnimationFrame(tick)
		}

		frame = requestAnimationFrame(tick)
		window.addEventListener("pointermove", onPointerMove, { passive: true })
		document.addEventListener("pointerleave", onPointerLeave)

		return () => {
			cancelAnimationFrame(frame)
			window.removeEventListener("pointermove", onPointerMove)
			document.removeEventListener("pointerleave", onPointerLeave)
		}
	})
</script>

{#snippet column(hidden = false)}
	<div
		class="flex shrink-0 flex-col items-center pb-16 font-vcr-osd text-2xl tracking-[0.08em] uppercase {gap}"
		data-scroller-column={hidden ? "hidden" : "visible"}
		aria-hidden={hidden || undefined}
	>
		{#each sequence as item, index (`${index}-${item}`)}
			{@const key = `${index}-${item}`}
			<span
				data-scroller-item={key}
				class="inline-block [writing-mode:sideways-lr] transition-colors duration-200 {hoveredKey ===
				key
					? 'text-primary-500'
					: ''}">{item}</span
			>
		{/each}
	</div>
{/snippet}

<div
	bind:this={root}
	class="pointer-events-none h-full overflow-hidden mask-[linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)]"
	aria-live="off"
>
	<div
		class="flex h-max flex-col animate-scroll motion-reduce:animate-none"
		style:animation-duration="{duration}s"
		onanimationiteration={onLoop}
	>
		{@render column()}
		{@render column(true)}
	</div>
</div>
