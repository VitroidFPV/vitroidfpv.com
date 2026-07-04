<script lang="ts">
	import { browser } from "$app/environment"
	import type { BuildModelDepthTreatment } from "$lib/builds/depthTreatment"
	import type { BuildModel } from "$lib/builds/models"
	import { Canvas } from "@threlte/core"

	import BuildModelScene from "./BuildModel.svelte"

	let {
		class: className,
		model,
		depthTreatment = "prepass"
	}: {
		class?: string
		model: BuildModel
		depthTreatment?: BuildModelDepthTreatment
	} = $props()
</script>

<div class={className}>
	{#if browser}
		<Canvas>
			{#key model.id}
				<BuildModelScene {model} {depthTreatment} />
			{/key}
		</Canvas>
	{/if}
</div>
