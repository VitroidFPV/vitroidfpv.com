<script lang="ts">
	import { getContext } from "svelte";
	import type { TabCtxType } from "./Tablist.svelte";
	import { writable } from "svelte/store";
	import { fade } from "svelte/transition";

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
</script>

<li role="presentation">
	<button
		type="button"
		on:click={() => (open = true)}
		role="tab"
		class={"mr-4 px-1 text-xl hover:text-highlight dark:hover:text-highlight-dark duration-300 border-b-2 border-transparent" + (open ? 
		" dark:text-highlight-dark text-highlight dark:border-highlight-dark border-highlight" : "")}
		{...$$restProps}>
		<slot name="title">{title}</slot>
	</button>

	{#if open}
		<div class="hidden tab_content_placeholder">
			<div transition:fade={{duration: 500}} class="" use:init>
				<slot />
			</div>
		</div>
	{/if}
</li>