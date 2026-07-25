<script lang="ts">
	import { browser } from "$app/environment"
	import type { BuildCatalogModel } from "$lib/build-catalog/models"
	import { Canvas } from "@threlte/core"

	import BuildModelScene from "./BuildModel.svelte"

	let {
		class: className,
		model
	}: { class?: string; model: BuildCatalogModel } = $props()
</script>

<div class={className}>
	{#if browser}
		<Canvas>
			{#key model.id}
				<BuildModelScene {model} />
			{/key}
		</Canvas>
	{/if}
</div>
