<script lang="ts">
	import BuildGuidePage from "$components/build-guides/BuildGuidePage.svelte"
	import { getBuildGuide } from "$lib/guides/content"
</script>

<BuildGuidePage
	guide={getBuildGuide("7-8inch-lr")}
	editable
/>
