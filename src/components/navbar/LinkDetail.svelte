<script lang="ts">
	export let color = "green";
	export let color1 = "green";
	export let size = "";
	export let href = "";
	export let external = false;

	export let description = "";

	import Link from "$components/Link.svelte";
</script>

<div class="group relative">
	<div class="md:flex hidden text-inherit absolute w-fit bottom-full left-4 bg-neutral-400/10 dark:bg-main-300/10 backdrop-blur-md text-base outline-2 outline outline-neutral-500/30 p-4 shadow-2xl rounded-2xl scale-0 group-hover:scale-100 duration-300 z-10">{description}</div>
	<Link {external} {href} {color} {color1} {size}>
		<slot />
	</Link>
</div>