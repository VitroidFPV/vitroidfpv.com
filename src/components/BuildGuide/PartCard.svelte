<script lang="ts">
	import PartCardView from "$components/BuildGuide/PartCardView.svelte"
	import type { BuildGuidePart } from "$lib/builds/guide-sections"

	let { part }: { part: BuildGuidePart } = $props()
</script>

<PartCardView
	title={part.title}
	url={part.url}
	color={part.color}
	price={part.price}
	tags={part.tags}
	image={part.image}
	imageAlt={part.imageAlt}
	Description={part.component}
/>
