<script lang="ts">
	export let size: string;
	export let volume: number;
	export let surface: number;

	import { motors } from "$lib/stores/motorsStore";
	import { undo } from "$lib/stores/motorsStore";
	import { slide } from "svelte/transition";

</script>

<div 
	class="p-4 bg-neutral-500/10 rounded-3xl backdrop-blur-md border-2 border-neutral-500/40 flex duration-300 
	transition-all justify-between items-center"
	transition:slide={{duration: 300}}
>

<h1 class="text-cyan text-2xl">{size}</h1>

<div class="flex gap-8">
	<div><span class="text-neutral-400 text-base mr-1">Surface: </span>{surface}mm²</div>
	<div><span class="text-neutral-400 text-base mr-1">Volume: </span>{volume}mm³</div>
	<button
		class="text-cyan"
		on:click={() => {
			undo.update(arr => [...arr, { size, volume, surface }])
			console.log($undo)
			motors.update(arr => arr.filter(val => val.size !== size))
		}}
	>
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-6 h-6 stroke-neutral-500/50 hover:stroke-red duration-300">
  			<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
		</svg>
	</button>
</div>

</div>