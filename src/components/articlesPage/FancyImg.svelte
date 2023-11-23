<script lang="ts">
	import { fade, fly } from "svelte/transition";
	import { clickOutside } from '$lib/clickOut.js';
	import { spring } from "svelte/motion";
	import { Icon } from "@steeze-ui/svelte-icon";
	import { Plus } from "@steeze-ui/heroicons";

	export let src: string;
	export let alt: string;

	let open = false;
	let zoomed = false;

	function handleClickOutside() {
		open = false;
	}

	let x = spring(0);
	let y = spring(0);
	function zoom(event: MouseEvent) {
		if (zoomed) {
			var zoomer = event.currentTarget;
			// console.log(zoomer)

			let offsetX, offsetY;

			event.offsetX ? offsetX = event.offsetX : offsetX = event.touches[0].pageX
			event.offsetY ? offsetY = event.offsetY : offsetY = event.touches[0].pageY
			$x = offsetX/zoomer.offsetWidth*100
			$y = offsetY/zoomer.offsetHeight*100
			zoomer.style.transformOrigin = $x + '% ' + $y + '%';
		}
	}

	function keydown(event: KeyboardEvent) {
		if (event.key === "Escape") {
			open = false;
		}

		if (event.key === "Shift") {
			zoomed = true
		}
	}

	function keyup(event: KeyboardEvent) {
		if (event.key === "Shift") {
			zoomed = false
		}
	}

</script>

<svelte:window on:keydown={keydown} on:keyup={keyup}/>

{#if open}
	<div in:fade={{duration: 300, delay: 0}} out:fade={{delay: 200}} class="fixed w-screen h-screen top-0 left-0 z-[60] backdrop-blur-sm md:flex hidden items-center justify-center bg-black bg-opacity-80">
		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
		<div 
			transition:fly={{duration: 300, y: 200, delay: 100}} 
			class="h-full aspect-auto flex flex-col py-8 justify-center z-10 select-none relative" 
			use:clickOutside 
			on:clickOutside={handleClickOutside}
		>
			<img 
				class="select-none rounded-2xl object-contain h-full duration-150"
				style="scale: {zoomed ? "300%" : "100%"}; transition-property: scale"
				{src} {alt}
				crossorigin="anonymous"
				on:mousemove={(event) => zoom(event)}
			>
			{#if !zoomed}
				<button 
					on:click={() => open = false}
					transition:fade={{duration: 50, delay: 0}}
					class="stroke-red duration-300 absolute top-8 right-0 rounded-full border-2 border-red/40 bg-red/20 hover:bg-red/40">
					<Icon src={Plus} class="w-7 h-7 rotate-45" stroke-width="1.5" />
				</button>
			{/if}
		</div>
		{#if !zoomed}
			<div class="absolute bottom-1 left-1 text-sm text-neutral-400/60 md:visible invisible">Press Shift to zoom</div>
		{/if}
	</div>
{/if}

<button on:click={() => open = !open} class="rounded-md shadow-lg origin-left overflow-clip outline-0 ring-0">
	<img {src} {alt} crossorigin="anonymous" />
</button>