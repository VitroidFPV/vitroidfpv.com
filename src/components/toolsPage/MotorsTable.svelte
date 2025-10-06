<script lang="ts">
	import MotorComparison from "./MotorComparison.svelte";
	interface Props {
		motors: { size: string, volume: number, surface: number }[];
	}

	let { motors }: Props = $props();
</script>

<div class="py-4 grid 3xl:grid-cols-2 grid-cols-1 gap-x-4">
	{#if motors}
		{#each motors as motor (motor.size)}
			<MotorComparison volume={motor.volume} surface={motor.surface} size={motor.size} />
		{/each}
	{/if}
</div>

<!-- for some reason I had to extract this to its own component for the Listbox to work correctly -->
<!-- this was a pain to debug, I have no idea why it worked -->