<script lang="ts">
	import { Canvas } from "@threlte/core";
	import GLTFWrapper from "$components/three/GLTFWrapper.svelte";

	export let url: string = "";
	export let position: [number, number, number] = [0, 0, 0];
	export let rotation: [number, number, number] = [0, 0, 0];
	export let scale: number = 1;
</script>

<div>
	<div 
		class="aspect-square rounded-2xl bg-neutral-400/5 mb-3 overflow-clip outline outline-2 outline-neutral-400/20
		cursor-grab">
		<Canvas useLegacyLights={false}>
			<slot>
				<!-- <GLTFWrapper {url} {position} {rotation} {scale} /> -->
			</slot>
		</Canvas>
	</div>
	<slot name="content" />
</div>