<script lang="ts">

	import { compareArray } from "$lib/stores/toolsStore"
	import { Icon } from "@steeze-ui/svelte-icon";
	import { Plus } from "@steeze-ui/heroicons";
	interface Props {
		size: string;
	}

	let { size }: Props = $props();

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
		onclick={() => {
			compareArray.update(arr => arr.filter(val => val !== size))
		}}
	>
		<Icon src={Plus} class="w-6 h-6 stroke-neutral-500/50 hover:stroke-red duration-300 rotate-45" stroke-width="3" size="24" theme="default" title="Add size" />
	</button>
</div>