<script lang="ts">
	let {
		class: className,
		fillClass = "fill-surface-50-950",
		strokeWidth = 2
	}: {
		class?: string
		fillClass?: string
		strokeWidth?: number
	} = $props()

	// Outer boundary plus the stroke path reversed, so the fill meets the stroke
	// at (0, 0.5) along the same horizontal segment.
	const fillPath =
		"M0 0.5H37.5L37.5 8.5H10.1251C8.69604 8.5 7.37554 7.73761 6.661 6.5L4.3516 2.5C3.63707 1.2624 2.31656 0.5 0.887499 0.5H0Z"

	// Keep the decorative edge just below the parent boundary without leaving a
	// visible gap between it and the fill.
	const strokePath =
		"M0 0.6H0.887499C2.31656 0.6 3.63707 1.3624 4.3516 2.6L6.661 6.6C7.37554 7.83761 8.69604 8.6 10.1251 8.6H37.5"
</script>

<svg
	viewBox="0 0.5 37.5 8"
	fill="none"
	overflow="visible"
	xmlns="http://www.w3.org/2000/svg"
	class="{className} pointer-events-none overflow-visible select-none"
	aria-hidden="true"
>
	<path
		d={fillPath}
		class={fillClass}
	/>
	<path
		d={strokePath}
		fill="none"
		stroke="currentColor"
		stroke-width={strokeWidth}
		stroke-linecap="square"
		stroke-linejoin="round"
		vector-effect="non-scaling-stroke"
	/>
</svg>
