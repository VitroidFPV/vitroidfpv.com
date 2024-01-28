<script lang="ts">
	import { fade, fly } from "svelte/transition";
	import { clickOutside } from '$lib/clickOut.js';
	import { spring } from "svelte/motion";
	import { Icon } from "@steeze-ui/svelte-icon";
	import { Plus } from "@steeze-ui/heroicons";

	import ImgPopout from "$components/ImgPopout.svelte";

	export let src: string;
	export let alt: string;

	let open = false;

</script>

<svelte:window on:keydown={(event) => {if (event.key === "Escape") {open = false}}}/>

<ImgPopout img={src} title={alt} {open} />

<div class="w-full">
	<button on:click={() => open = !open} class="fancy-img rounded-2xl shadow-lg origin-left overflow-clip outline-0 ring-0 w-fit 2xl:w-3/4">
		<img {src} {alt} crossorigin="anonymous" class="" />
	</button>
</div>