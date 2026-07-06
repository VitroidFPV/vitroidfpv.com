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
		"BEACON ON",
		"ARM IN 6.7",
		"FAIL SAFE",
		"ESC 1CTR",
		"ESC 1CTR 2T+",
		">CRASH FLIP<",
		"CRASHFLIP SW",
		"LAUNCH",
		"LAUNCH 45",
		"RSSI LOW",
		"RSSI DBM",
		"RSNR LOW",
		"LINK QUALITY",
		"LAND NOW",
		"CPU OVERLOAD",
		"RESCUE N/A",
		"RESCUE OFF",
		"POSHOLD FAIL",
		"HEADFREE",
		"CORE °: 75C",
		"LOW BATTERY",
		"OVER CAP",
		"BATTERY CONT",
		"BATT < FULL",
		"* * * *",
		"CHIRP EXC FINISHED"
	]

	type ScrollerItem = {
		text: string
		href?: string
	}

	let {
		count = 24,
		duration = 100,
		gap = "gap-8",
		refreshOnLoop = true,
		reverse = false,
		easterEgg,
		easterEggChance = 0.1
	}: {
		count?: number
		duration?: number
		gap?: string
		refreshOnLoop?: boolean
		reverse?: boolean
		easterEgg?: { label: string; href: string }
		easterEggChance?: number
	} = $props()

	function pickRandom(): ScrollerItem {
		if (easterEgg && Math.random() < easterEggChance) {
			return { text: easterEgg.label, href: easterEgg.href }
		}

		return { text: sourceItems[Math.floor(Math.random() * sourceItems.length)] }
	}

	function generateSequence(length: number): ScrollerItem[] {
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
		requestAnimationFrame(syncHover)
	}

	function hitTest(clientX: number, clientY: number): string | null {
		if (!root) return null

		const items = root.querySelectorAll<HTMLElement>("[data-scroller-item]")
		let match: string | null = null

		for (const el of items) {
			const rect = el.getBoundingClientRect()
			if (
				clientX >= rect.left &&
				clientX <= rect.right &&
				clientY >= rect.top &&
				clientY <= rect.bottom
			) {
				match = el.dataset.scrollerItem ?? null
			}
		}

		return match
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
			if (pointerActive && !motionReduced.matches && root) {
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
		class="flex shrink-0 flex-col items-center pb-16 font-vcr-osd text-xs tracking-[0.08em] uppercase md:text-2xl {gap}"
		aria-hidden={hidden || undefined}
	>
		{#each sequence as item, index (`${loopCount}-${index}-${item.text}`)}
			{@const key = `${loopCount}-${index}-${item.text}`}
			{@const hoverClass =
				hoveredKey === key
					? "text-primary-500 text-shadow-[0px_0px_32px] text-shadow-primary-500/90"
					: ""}
			{#if item.href}
				<a
					href={item.href}
					target="_blank"
					rel="noopener noreferrer"
					data-scroller-item={key}
					class="pointer-events-auto inline-block transition-colors duration-200 [writing-mode:sideways-lr] {hoverClass}"
					>{item.text}</a
				>
			{:else}
				<span
					data-scroller-item={key}
					class="inline-block transition-colors duration-200 [writing-mode:sideways-lr] {hoverClass}"
					>{item.text}</span
				>
			{/if}
		{/each}
	</div>
{/snippet}

<div
	bind:this={root}
	class="pointer-events-none h-full overflow-hidden mask-[linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)]"
	aria-live="off"
>
	<div
		class="flex h-max animate-scroll flex-col motion-reduce:animate-none"
		style:animation-duration="{duration}s"
		onanimationiteration={onLoop}
		style:animation-direction={reverse ? "reverse" : "normal"}
	>
		{@render column()}
		{@render column(true)}
	</div>
</div>
