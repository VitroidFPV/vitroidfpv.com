<script>
	import { writable } from "svelte/store";
	import { persist, localStorage } from "@macfja/svelte-persistent-store";
	import { onMount } from "svelte";

	const theme = persist(writable("dark"), localStorage(), "app-theme");

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
	on:click={() => ($theme = $theme == "dark" ? "light" : "dark")}
	class="md:relative absolute justify-self-end md:mb-8 md:mr-0 mr-3 md:top-0 right-0 top-1/4 hover:-translate-y-1 duration-300 opacity-75 hover:opacity-100"
>
	{#if $theme == "light"}
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="md:h-8 h-6 aspect-square">
			<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
		</svg>
	{:else}
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="md:h-8 h-6 aspect-square">
			<path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
		</svg>
	{/if}
</button>
