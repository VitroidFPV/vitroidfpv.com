<script lang="ts">
	import PartCardView from "$components/build-guides/PartCardView.svelte"
	import type { BuildGuidePart } from "$lib/build-guides/types"

	let {
		part,
		onaddtolist
	}: {
		part: BuildGuidePart
		onaddtolist?: () => void
	} = $props()
</script>

<PartCardView
	title={part.title}
	url={part.url}
	accent={part.accent}
	price={part.price}
	tags={part.tags}
	image={part.image}
	imageAlt={part.imageAlt}
	Description={part.Content}
	{onaddtolist}
/>
