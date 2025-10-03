<script>
	import { onMount } from "svelte";
	import { theme } from "$lib/stores/themeStore"

	import { Icon } from "@steeze-ui/svelte-icon";
	import { Sun, Moon } from "@steeze-ui/heroicons";

	onMount(() => {
		let unsubscribe = theme.subscribe((value) => {
			if (value === "dark") {
				window.document.body.classList.add("dark");
			} else {
				window.document.body.classList.remove("dark");
			}
		});

		return () => {
			unsubscribe();
		};
	});
</script>

<!-- <button
	on:click={() => ($theme = $theme == "dark" ? "light" : "dark")}
	class="absolute leading-none text-[0px] right-[5px] top-[-0px] md:relative m-0 md:mt-auto bg-contain bg-no-repeat justify-self-end mb-4 h-12 w-12 bg-[url('https://img.icons8.com/material-outlined/64/a1a1a1/sun--v1.png')] md:scale-75 scale-50 dark:bg-[url('https://img.icons8.com/material-outlined/64/a1a1a1/moon--v1.png')] opacity-80 hover:opacity-100 md:hover:-translate-y-1 duration-300"
	>Change Theme
</button> -->

<button
	onclick={() => ($theme = $theme == "dark" ? "light" : "dark")}
	class="md:relative absolute justify-self-end md:mb-8 md:mr-0 mr-3 md:top-0 right-0 top-1/4 hover:-translate-y-1 duration-300 opacity-75 hover:opacity-100"
>
	{#if $theme == "light"}
		<Icon src={Sun} class="md:h-8 h-6 aspect-square" stroke-width="2" />
	{:else}
		<Icon src={Moon} class="md:h-8 h-6 aspect-square" stroke-width="2" />
	{/if}
</button>
