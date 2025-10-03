<!-- @migration-task Error while migrating Svelte code: $$props is used together with named props in a way that cannot be automatically migrated. -->
<script lang="ts">
	export let color:
		| "red"
		| "orange"
		| "yellow"
		| "green"
		| "cyan"
		| "blue"
		| "violet"
		| "highlight" = "green";
	export let isLink: boolean = false;
	export let isDownload: boolean = false;
	export let download: string = "";
	export let href: string = "";

	interface Colors {
		bg: string;
		bgTransparent: string;
		text: string;
	}

	let colors: Colors;
	colors = {
		bg: "bg-green",
		bgTransparent: "bg-green/10 hover:bg-green/20",
		text: "text-green",
	};

	switch (color) {
		case "red":
			colors = {
				bg: "bg-red",
				bgTransparent: "bg-red/10 hover:bg-red/20",
				text: "text-red",
			};
			break;
		case "orange":
			colors = {
				bg: "bg-orange",
				bgTransparent: "bg-orange/10 hover:bg-orange/20",
				text: "text-orange",
			};
			break;
		case "yellow":
			colors = {
				bg: "bg-yellow",
				bgTransparent: "bg-yellow/10 hover:bg-yellow/20",
				text: "text-yellow",
			};
			break;
		case "green":
			colors = {
				bg: "bg-green",
				bgTransparent: "bg-green/10 hover:bg-green/20",
				text: "text-green",
			};
			break;
		case "cyan":
			colors = {
				bg: "bg-cyan",
				bgTransparent: "bg-cyan/10 hover:bg-cyan/20",
				text: "text-cyan",
			};
			break;
		case "blue":
			colors = {
				bg: "bg-blue",
				bgTransparent: "bg-blue/10 hover:bg-blue/20",
				text: "text-blue",
			};
			break;
		case "violet":
			colors = {
				bg: "bg-violet",
				bgTransparent: "bg-violet/10 hover:bg-violet/20",
				text: "text-violet",
			};
			break;
		case "highlight":
			colors = {
				bg: "bg-highlight",
				bgTransparent:
					"bg-highlight/10 hover:bg-highlight/20 dark:bg-highlight-dark/10 dark:hover:bg-highlight-dark/20",
				text: "text-highlight dark:text-highlight-dark",
			};
			break;
	}

	export let size: "sm" | "md" | "lg" = "md";

	switch (size) {
		case "sm":
			colors.bgTransparent += " p-2 outline-[3]";
			break;
		case "md":
			colors.bgTransparent += " md:p-4 p-3 outline-4";
			break;
		case "lg":
			colors.bgTransparent += " md:p-6 p-4 outline-4 text-xl";
			break;
	}

	export let type: "button" | "submit" | "reset" = "button";
</script>

{#if isLink}
	<a
		{href}
		class="{colors.bgTransparent} {colors.text} {$$props.class} 
		backdrop-blur-md rounded-full outline outline-current duration-300 shadow-xl text-base flex items-center justify-center"
	>
		<span class="dark:text-inherit text-black/75 flex gap-2 justify-center items-center">
			<slot />
		</span>
	</a>
{:else if isDownload}
	<a
		{href}
		{download}
		class="{colors.bgTransparent} {colors.text} {$$props.class} 
		backdrop-blur-md rounded-full outline outline-current duration-300 shadow-xl text-base flex items-center justify-center"
	>
		<span class="dark:text-inherit text-black/75 flex gap-2 justify-center items-center">
			<slot />
		</span>
	</a>
{:else}
	<button
		{type}
		on:click
		class="{colors.bgTransparent} {colors.text} {$$props.class} 
		backdrop-blur-md rounded-full outline outline-current duration-300 shadow-xl text-base flex items-center justify-center"
	>
		<span class="dark:text-inherit text-black/75 flex gap-2 justify-center items-center">
			<slot />
		</span>
	</button>
{/if}
