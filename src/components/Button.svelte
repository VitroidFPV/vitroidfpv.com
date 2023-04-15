<script lang="ts">
	export let color: "red" | "orange" | "yellow" | "green" | "cyan" | "blue" | "violet" = "green";
	export let isLink: boolean;	
	export let href: string = "";

	interface Colors {
		bg: string;
		bgTransparent: string;
		text: string;
	}

	let colors: Colors
	colors = {
		bg: "bg-green",
		bgTransparent: "bg-green/20 hover:bg-green/40",
		text: "text-green",
	}

	switch (color) {
		case "red":
			colors = {
				bg: "bg-red",
				bgTransparent: "bg-red/20 hover:bg-red/40",
				text: "text-red",
			};
			break;
		case "orange":
			colors = {
				bg: "bg-orange",
				bgTransparent: "bg-orange/20 hover:bg-orange/40",
				text: "text-orange",
			};
			break;
		case "yellow":
			colors = {
				bg: "bg-yellow",
				bgTransparent: "bg-yellow/20 hover:bg-yellow/40",
				text: "text-yellow",
			};
			break;
		case "green":
			colors = {
				bg: "bg-green",
				bgTransparent: "bg-green/20 hover:bg-green/40",
				text: "text-green",
			};
			break;
		case "cyan":
			colors = {
				bg: "bg-cyan",
				bgTransparent: "bg-cyan/20 hover:bg-cyan/40",
				text: "text-cyan",
			};
			break;
		case "blue":
			colors = {
				bg: "bg-blue",
				bgTransparent: "bg-blue/20 hover:bg-blue/40",
				text: "text-blue",
			};
			break;
		case "violet":
			colors = {
				bg: "bg-violet",
				bgTransparent: "bg-violet/20 hover:bg-violet/40",
				text: "text-violet",
			};
			break;
	}
</script>

{#if isLink}
	<a {href} class="{colors.bgTransparent} {colors.text} backdrop-blur-md md:p-4 p-3 rounded-full outline outline-4 outline-current duration-300 shadow-xl text-base"><span class="dark:text-inherit text-black/75"><slot/></span></a>
{:else}
	<button on:click class="{colors.bgTransparent} {colors.text} backdrop-blur-md md:p-4 p-3 rounded-full outline outline-4 outline-current duration-300 shadow-xl text-base"><span class="dark:text-inherit text-black/75"><slot/></span></button>
{/if}
