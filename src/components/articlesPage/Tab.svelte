<script lang="ts">
	import { getContext } from "svelte";
	import type { TabCtxType } from "./Tablist.svelte";
	import { writable } from "svelte/store";
	import { fade } from "svelte/transition";
	import { onMount } from "svelte";
	import { queryParam } from "sveltekit-search-params";

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

<li role="presentation">
	<div class="flex" id="{sanitizedTitle}">
		<button
			type="button"
			on:click={updateURL}
			role="tab"
			class={"mr-4 px-1 text-xl hover:text-highlight dark:hover:text-highlight-dark duration-300 border-b-2 border-transparent" + (open ?
			" dark:text-highlight-dark text-highlight dark:border-highlight-dark border-highlight" : "")}
			{...$$restProps}>
			<slot name="title">{title}</slot>
		</button>
	</div>

	{#if open}
		<div class="hidden tab_content_placeholder">
			<div transition:fade={{duration: 500}} class="" use:init>
				<slot />
			</div>
		</div>
	{/if}
</li>