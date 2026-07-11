<script lang="ts">
	import type { BuildGuideSection } from "$lib/builds/guide-sections"

	let { section }: { section: BuildGuideSection } = $props()
</script>

<div class="flex flex-col gap-2">
	<h3 class="h-18 font-josefin-sans text-6xl font-bold">{section.title}</h3>
	<div class="prose min-h-[1.5em]">
		{#if section.description.trim()}
			<p>{section.description}</p>
		{/if}
	</div>
</div>
