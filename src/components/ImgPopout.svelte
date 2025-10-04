<script lang="ts">
	import { fade, fly } from "svelte/transition";
	import { spring } from "svelte/motion";
	import { clickOutside } from '$lib/clickOut.js';


	let zoomed: boolean = $state(false);

	let x = spring(0);
	let y = spring(0);
	function zoom(event: MouseEvent) {
		if (zoomed) {
			var zoomer = event.currentTarget;
			// console.log(zoomer)

			let offsetX, offsetY;
			// @ts-ignore
			event.offsetX ? offsetX = event.offsetX : offsetX = event.touches[0].pageX
			// @ts-ignore
			event.offsetY ? offsetY = event.offsetY : offsetY = event.touches[0].pageY
			// @ts-ignore
			$x = offsetX/zoomer.offsetWidth*100
			// @ts-ignore
			$y = offsetY/zoomer.offsetHeight*100
			// @ts-ignore
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

    import { createEventDispatcher } from 'svelte';
	interface Props {
		img?: string;
		title?: string;
		open?: boolean;
	}

	let { img = "/uploads/placeholder.png", title = "Title", open = $bindable(false) }: Props = $props();

    const dispatch = createEventDispatcher();

    function handleClickOutside() {
        open = false;
        dispatch('clickOutside');
    }
</script>

<svelte:window onkeydown={keydown} onkeyup={keyup}/>

{#if open}
	<div in:fade={{duration: 300, delay: 0}} out:fade={{delay: 200}} class="fixed w-screen h-screen top-0 left-0 z-60 backdrop-blur-sm md:flex hidden items-center justify-center bg-black bg-opacity-80">
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<div 
			transition:fly={{duration: 300, y: 200, delay: 100}} 
			class="h-full aspect-auto flex flex-col py-8 justify-center z-10 select-none relative" 
			use:clickOutside 
			onclickOutside={handleClickOutside}
		>
			<img 
				class="select-none rounded-2xl object-contain h-full duration-150"
				style="scale: {zoomed ? "300%" : "100%"}; transition-property: scale"
				src={img}
				alt={title + " image"}
				crossorigin="anonymous"
				onmousemove={(event) => zoom(event)}
			>
			{#if !zoomed}
				<button 
					onclick={() => open = false}
					transition:fade={{duration: 50, delay: 0}}
					class="stroke-red duration-300 absolute top-8 right-0 rounded-full border-2 border-red/40 bg-red/20 hover:bg-red/40"
					aria-label="Close"
				>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" class="w-7 h-7 rotate-45">
						<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
					</svg>
				</button>
			{/if}
		</div>
		{#if !zoomed}
			<div class="absolute bottom-1 left-1 text-sm text-neutral-400/60 md:visible invisible">Press Shift to zoom</div>
		{/if}
	</div>
{/if}