<script lang="ts">
	import type { Picture } from "@sveltejs/enhanced-img"

	let {
		src,
		alt,
		class: className = "",
		sizes = "(min-width: 1024px) 320px, (min-width: 768px) 50vw, 100vw",
		style: styleProp = "",
		loading,
		fetchpriority,
		onload
	}: {
		src: Picture
		alt: string
		class?: string
		sizes?: string
		style?: string
		loading?: "eager" | "lazy"
		fetchpriority?: "high" | "low" | "auto"
		onload?: () => void
	} = $props()
</script>

<enhanced:img
	{src}
	{alt}
	class="h-auto w-full rounded-xl object-contain {className}"
	{sizes}
	style={styleProp}
	{loading}
	{fetchpriority}
	{onload}
/>
