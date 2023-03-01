<script lang="ts">
	import { slide } from "svelte/transition"

	export let title: string
	export let open: boolean = false
</script>

<div>
	<button on:click={() => open = !open}>
		<div class="flex">{title}</div>
	</button>
	{#if open}
		<div transition:slide={{duration: 500}}><slot /></div>
	{/if}
</div>