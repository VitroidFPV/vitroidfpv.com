<script lang="ts">
	export let size: string

	import { compareArray } from "$routes/(app)/tools/stores"

	function calculateVolume(size: string) {
		let sizeP = size.replace(",", ".");
		let sizeRadius = parseFloat(sizeP.substr(0, 2));
		let sizeHeight = parseFloat(sizeP.substr(2, 5));
		// console.log(sizeRadius, sizeHeight);
		let pi = 3.141;
		// cry about it

		let volume = parseFloat(((sizeRadius / 2) ** 2 * pi * sizeHeight).toFixed(0));
		return volume;
	}
</script>

<div class="flex w-full justify-between">
	<div class="flex justify-between w-full mr-2">
		<div class="text-highlight dark:text-highlight-dark">{size}</div>
		<div class:invisible={isNaN(calculateVolume(size)) || calculateVolume(size) == 0} class="ml-2">{calculateVolume(size)}mm³</div>
	</div>
	<button
		class="text-red"
		on:click={() => {
			compareArray.update(arr => arr.filter(val => val !== size))
		}}
	>
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-6 h-6 stroke-neutral-500/50 hover:stroke-red duration-300">
  			<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
		</svg>
	</button>
</div>