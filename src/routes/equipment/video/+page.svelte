<script lang="ts">
	import BuildGuidePage from "$components/build-guides/BuildGuidePage.svelte"
	import { getEquipmentGuide } from "$lib/guides/content"
</script>

<BuildGuidePage guide={getEquipmentGuide("video")} />
