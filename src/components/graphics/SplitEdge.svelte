<script lang="ts">
	let {
		class: className,
		strokeWidth = 2,
		orientation = "horizontal"
	}: {
		class?: string
		strokeWidth?: number
		orientation?: "horizontal" | "vertical"
	} = $props()

	// Right-edge path from split-mask.svg; endpoints nudged along tangents so
	// square caps meet adjacent borders without viewBox clipping the stroke.
	const horizontalEdgePath =
		"M178.35 64.26L194.665 36C196.094 33.5248 198.735 32 201.593 32H206.633C209.492 32 212.133 30.4752 213.563 28L229.878 -0.26"

	// Bottom-edge path from split-edge-vertical.svg, in split-mask-vertical.svg
	// coordinates so mask and stroke share the same scale when bottom-anchored.
	const verticalEdgePath =
		"M-0.26 120H27.3875C28.8166 120 30.1371 120.762 30.8516 122L33.161 126C33.8755 127.238 35.196 128 36.6251 128H64.26"

	const isVertical = $derived(orientation === "vertical")
	const edgePath = $derived(isVertical ? verticalEdgePath : horizontalEdgePath)
</script>

<svg
	viewBox={isVertical ? "0 0 64 128" : "0 0 230 64"}
	fill="none"
	overflow="visible"
	xmlns="http://www.w3.org/2000/svg"
	class="{className} pointer-events-none overflow-visible select-none"
	aria-hidden="true"
>
	<path
		d={edgePath}
		stroke="currentColor"
		stroke-width={strokeWidth}
		stroke-linecap="square"
		stroke-linejoin="round"
		vector-effect="non-scaling-stroke"
	/>
</svg>
