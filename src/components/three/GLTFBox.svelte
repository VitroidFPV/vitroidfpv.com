<script lang="ts">
	import { Canvas } from "@threlte/core";
	import GLTFWrapper from "$components/three/GLTFWrapper.svelte";
	import IntersectionObserver from "svelte-intersection-observer";
	import { fade } from "svelte/transition";
	import { transitions } from '@threlte/extras'
	transitions();

	let element: HTMLElement;
	let intersecting: boolean;

	export let url: string = "";
	export let position: [number, number, number] = [0, 0, 0];
	export let rotation: [number, number, number] = [0, 0, 0];
	export let scale: number = 1;
</script>


<IntersectionObserver {element} bind:intersecting>
	<div bind:this={element}>
		<div 
			class="aspect-square rounded-2xl bg-neutral-400/5 mb-3 overflow-clip outline outline-2 outline-neutral-400/20
			cursor-grab"
		>
			{#if intersecting}
				<div class="w-full h-full flex items-center justify-center">
					<Canvas useLegacyLights={false}>
						<slot>
							<!-- <GLTFWrapper {url} {position} {rotation} {scale} /> -->
						</slot>
					</Canvas>
				</div>
			{/if}
		</div>
		<slot name="content" />
	</div>
</IntersectionObserver>