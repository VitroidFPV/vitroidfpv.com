<script lang="ts">
	import { createBubbler } from 'svelte/legacy';
	
	interface Props {
		color?: 
		| "red"
		| "orange"
		| "yellow"
		| "green"
		| "cyan"
		| "blue"
		| "violet"
		| "highlight";
		isLink?: boolean;
		isDownload?: boolean;
		download?: string;
		href?: string;
		size?: "sm" | "md" | "lg";
		type?: "button" | "submit" | "reset";
		children?: import('svelte').Snippet;
	}

	let {
		color = "green",
		isLink = false,
		isDownload = false,
		download = "",
		href = "",
		size = "md",
		type = "button",
		children
	}: Props = $props();

	const bubble = createBubbler();

	interface Colors {
		bg: string;
		bgTransparent: string;
		text: string;
	}

	const baseColors = $derived((() => {
		switch (color) {
			case "red":
				return {
					bg: "bg-red",
					bgTransparent: "bg-red/10 hover:bg-red/20",
					text: "text-red",
				};
			case "orange":
				return {
					bg: "bg-orange",
					bgTransparent: "bg-orange/10 hover:bg-orange/20",
					text: "text-orange",
				};
			case "yellow":
				return {
					bg: "bg-yellow",
					bgTransparent: "bg-yellow/10 hover:bg-yellow/20",
					text: "text-yellow",
				};
			case "cyan":
				return {
					bg: "bg-cyan",
					bgTransparent: "bg-cyan/10 hover:bg-cyan/20",
					text: "text-cyan",
				};
			case "blue":
				return {
					bg: "bg-blue",
					bgTransparent: "bg-blue/10 hover:bg-blue/20",
					text: "text-blue",
				};
			case "violet":
				return {
					bg: "bg-violet",
					bgTransparent: "bg-violet/10 hover:bg-violet/20",
					text: "text-violet",
				};
			case "highlight":
				return {
					bg: "bg-highlight",
					bgTransparent:
						"bg-highlight/10 hover:bg-highlight/20 dark:bg-highlight-dark/10 dark:hover:bg-highlight-dark/20",
					text: "text-highlight dark:text-highlight-dark",
				};
			case "green":
			default:
				return {
					bg: "bg-green",
					bgTransparent: "bg-green/10 hover:bg-green/20",
					text: "text-green",
				};
		}
	})());

	const sizeClasses = $derived((() => {
		switch (size) {
			case "sm":
				return " p-2 outline-[3]";
			case "lg":
				return " md:p-6 p-4 outline-4 text-xl";
			case "md":
			default:
				return " md:p-4 p-3 outline-4";
		}
	})());

	const colors = $derived({
		bg: baseColors.bg,
		bgTransparent: baseColors.bgTransparent + sizeClasses,
		text: baseColors.text,
	});

</script>

{#if isLink}
	<a
		{href}
		class="{colors.bgTransparent} {colors.text}
		backdrop-blur-md rounded-full outline outline-current duration-300 shadow-xl text-base flex items-center justify-center"
	>
		<span class="dark:text-inherit text-black/75 flex gap-2 justify-center items-center">
			{@render children?.()}
		</span>
	</a>
{:else if isDownload}
	<a
		{href}
		{download}
		class="{colors.bgTransparent} {colors.text}
		backdrop-blur-md rounded-full outline outline-current duration-300 shadow-xl text-base flex items-center justify-center"
	>
		<span class="dark:text-inherit text-black/75 flex gap-2 justify-center items-center">
			{@render children?.()}
		</span>
	</a>
{:else}
	<button
		{type}
		onclick={bubble('click')}
		class="{colors.bgTransparent} {colors.text}
		backdrop-blur-md rounded-full outline outline-current duration-300 shadow-xl text-base flex items-center justify-center"
	>
		<span class="dark:text-inherit text-black/75 flex gap-2 justify-center items-center">
			{@render children?.()}
		</span>
	</button>
{/if}
