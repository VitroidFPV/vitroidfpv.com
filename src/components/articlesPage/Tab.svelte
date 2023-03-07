<script lang="ts">
	import { getContext } from "svelte";
	import type { TabCtxType } from "./Tablist.svelte";
	import { writable } from "svelte/store";
	import { fade } from "svelte/transition";
	import { onMount } from "svelte";
	import { queryParam } from "sveltekit-search-params";
	import Corner from "$components/Corner.svelte";

	export let open: boolean = false;
	export let title: string = "Tab title";

	const ctx = getContext<TabCtxType>("ctx") ?? {};
	// single selection
	const selected = ctx.selected ?? writable<HTMLElement>();

	function init(node: HTMLElement) {
		selected.set(node);

		const destroy = selected.subscribe((x) => {
			if (x !== node) {
				open = false;
			}
		});

		return { destroy };
	}

	let query = queryParam("tab", {
		encode: (value: string) => value,
		decode: (value) => value,
	});

	if ($query === title) {
		open = true;
	}

	let sanitizedTitle = title.replace(/ /g, "-").replace(/[^a-zA-Z0-9-]/g, "");

	function updateURL() {
		$query = title
		open = true;
	}

	onMount(() => {
		if ($query === title) {
			setTimeout(() => {
				const el = document.getElementById(sanitizedTitle);
				if (el) {
					el.scrollIntoView({ behavior: "smooth", block: "center" });
				}
			}, 300);
		}
	})
</script>

<li role="presentation" class="!m-0" class:tab-open={open}>
	<div class="flex flex-row items-start h-fit">
		{#key open}
		<Corner fill={open ? "highlight" : "transparent"} rotation={270} invisible/>
		{/key}
		<button
			type="button"
			on:click={updateURL}
			role="tab"
			id="{sanitizedTitle}"
			class={"tab md:p-4 p-3 rounded-b-3xl md:text-xl text-base md:hover:text-highlight md:dark:hover:text-highlight-dark hover:-translate-y-0.5 duration-300 transition-transform" + (open ?
			" dark:bg-highlight-dark bg-highlight z-10 tab-open hover:text-inherit -translate-y-0.5 hover:!text-main-200 dark:hover:!text-contrast-50" : "")}
			{...$$restProps}>
			<slot name="title">{title}</slot>
		</button>
		{#key open}
		<Corner fill={open ? "highlight" : "transparent"} rotation={180} invisible/>
		{/key}
	</div>

	{#if open}
		<div class="hidden tab_content_placeholder">
			<div transition:fade={{duration: 500}} class="" use:init>
				<slot />
			</div>
		</div>
	{/if}
</li>