<script lang="ts">
	import { Canvas } from "@threlte/core";
	import GLTFWrapper from "$components/three/GLTFWrapper.svelte";
	import IntersectionObserver from "svelte-intersection-observer";
	import { fade } from "svelte/transition";
	import { transitions } from '@threlte/extras'
	transitions();

	let element: HTMLElement | undefined = $state();
	let intersecting: boolean = $state(false);

	interface Props {
		url?: string;
		position?: [number, number, number];
		rotation?: [number, number, number];
		scale?: number;
		children?: import('svelte').Snippet;
		content?: import('svelte').Snippet;
	}

	let {
		url = "",
		position = [0, 0, 0],
		rotation = [0, 0, 0],
		scale = 1,
		children,
		content
	}: Props = $props();
</script>


<IntersectionObserver {element} bind:intersecting>
	<div bind:this={element}>
		<div 
			class="aspect-square rounded-2xl bg-neutral-400/5 mb-3 overflow-clip outline-2 outline-neutral-400/20
			cursor-grab"
		>
			{#if intersecting}
				<div class="w-full h-full flex items-center justify-center">
					<Canvas>
						{#if children}{@render children()}{:else}
							<!-- <GLTFWrapper {url} {position} {rotation} {scale} /> -->
						{/if}
					</Canvas>
				</div>
			{/if}
		</div>
		{@render content?.()}
	</div>
</IntersectionObserver>