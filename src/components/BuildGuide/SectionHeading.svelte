<script lang="ts">
	import SectionHeadingView from "$components/BuildGuide/SectionHeadingView.svelte"
	import type { BuildGuideSection } from "$lib/builds/guide-sections"

	let { section }: { section: BuildGuideSection } = $props()
</script>

<SectionHeadingView
	title={section.title}
	description={section.description}
/>
