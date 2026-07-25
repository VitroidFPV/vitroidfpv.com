<script lang="ts">
	import SectionHeadingView from "$components/build-guides/SectionHeadingView.svelte"
	import type { BuildGuideSection } from "$lib/build-guides/types"

	let { section }: { section: BuildGuideSection } = $props()
</script>

<SectionHeadingView
	title={section.title}
	content={section.Content}
/>
