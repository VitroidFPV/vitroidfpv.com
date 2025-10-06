<script>
	import { onMount } from "svelte";
	import { theme } from "$lib/stores/themeStore"

	import { Icon } from "@steeze-ui/svelte-icon";
	import { Sun, Moon } from "@steeze-ui/heroicons";

	onMount(() => {
		let unsubscribe = theme.subscribe((value) => {
			if (value === "dark") {
				window.document.documentElement.classList.add("dark");
			} else {
				window.document.documentElement.classList.remove("dark");
			}
		});

		return () => {
			unsubscribe();
		};
	});
</script>

<button
	onclick={() => ($theme = $theme == "dark" ? "light" : "dark")}
	class="md:relative absolute justify-self-end md:mb-8 md:mr-0 mr-3 md:top-0 right-0 top-1/4 hover:-translate-y-1 duration-300 opacity-75 hover:opacity-100"
	aria-label="Toggle Light/Dark Mode"
>
	{#if $theme == "light"}
		<Icon src={Sun} class="md:h-8 h-6 aspect-square" stroke-width="2" size="24" theme="default" title="Light mode" />
	{:else}
		<Icon src={Moon} class="md:h-8 h-6 aspect-square" stroke-width="2" size="24" theme="default" title="Dark mode" />
	{/if}
</button>
