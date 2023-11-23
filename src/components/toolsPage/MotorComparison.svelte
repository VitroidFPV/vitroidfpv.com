<script lang="ts">
	export let size: string;
	export let volume: number;
	export let surface: number;

	import { motors } from "$lib/stores/motorsStore";
	import { undo } from "$lib/stores/motorsStore";
	import { cubicOut } from "svelte/easing";
	import { slide } from "svelte/transition";

	import { Icon } from "@steeze-ui/svelte-icon";
	import { Plus } from "@steeze-ui/heroicons";

</script>

<div 
	class="p-4 bg-neutral-500/10 rounded-3xl backdrop-blur-md border-2 border-neutral-500/40 flex duration-300 
	transition-all justify-between items-center mb-4"
	transition:slide={{duration: 300, easing: cubicOut}}
>

<h1 class="text-cyan text-2xl">{size}</h1>

<div class="flex md:gap-8 gap-6">
	<div class="flex flex-col md:flex-row"><span class="text-neutral-400 text-base mr-1">Surface: </span>{surface}mm²</div>
	<div class="flex flex-col md:flex-row"><span class="text-neutral-400 text-base mr-1">Volume: </span>{volume}mm³</div>
	<button
		class="text-cyan"
		on:click={() => {
			undo.update(arr => [...arr, { size, volume, surface }])
			console.log($undo)
			motors.update(arr => arr.filter(val => val.size !== size))
		}}
	>
		<Icon src={Plus} class="w-6 h-6 stroke-neutral-500/50 hover:stroke-red duration-300 rotate-45" stroke-width="3" />
	</button>
</div>

</div>