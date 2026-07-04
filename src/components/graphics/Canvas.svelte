<script lang="ts">
	import { browser } from "$app/environment"
	import { Canvas } from "@threlte/core"

	import S1V5 from "./S1V5.svelte"

	let { class: className }: { class?: string } = $props()
</script>

<div class={className}>
	{#if browser}
		<Canvas>
			<S1V5 />
		</Canvas>
	{/if}
</div>
