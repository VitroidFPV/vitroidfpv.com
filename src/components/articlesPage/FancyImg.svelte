<script lang="ts">
	import ImgPopout from "$components/ImgPopout.svelte";

	interface Props {
		src: string;
		alt: string;
	}

	let { src, alt }: Props = $props();

	let open = $state(false);
</script>

<svelte:window onkeydown={(event) => {if (event.key === "Escape") {open = false}}}/>

<ImgPopout img={src} title={alt} {open} />

<div class="w-full">
	<button onclick={() => open = !open} class="fancy-img rounded-2xl shadow-lg origin-left overflow-clip outline-0 ring-0 w-fit 2xl:w-3/4">
		<img {src} {alt} crossorigin="anonymous" class="" />
	</button>
</div>