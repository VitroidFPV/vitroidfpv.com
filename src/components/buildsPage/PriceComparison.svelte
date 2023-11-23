<script lang="ts">
	export let url: string
	export let title: string;
	export let color: string;
	export let price: string;
	export let href: string;
	export let quantity: number;
	import { slide } from "svelte/transition"
	import { Icon } from "@steeze-ui/svelte-icon";
	import { Plus } from "@steeze-ui/heroicons";

	import { parts } from "$lib/stores/buildsStore";
	import Link from "$components/Link.svelte";


	function removePart() {
		console.log("remove part " + title);

		// update $parts[url] to remove the part that has a title that matches the title of the part that was passed in
		parts.update((parts) => {
			let newParts = parts;
			newParts[url] = newParts[url].filter((part) => part.title !== title);
			return newParts;
		});
	}
</script>

<div class="flex w-full justify-between">
	<div class="flex justify-between w-full mr-2">
		<Link color1={color} color={color} {href} external>{title}</Link>
		<div class="flex items-end">
			{#if quantity > 1}
				<div class="text-sm text-neutral-500 mb-0.5">{quantity}x</div>
			{/if}
			<div class="ml-1">{price}</div>
		</div>
	</div>
	<button
		class="text-red"
		on:click={() => {
			removePart();
		}}
	>
		<Icon src={Plus} class="w-6 h-6 stroke-neutral-500/50 hover:stroke-red duration-300 rotate-45" stroke-width="3" />
	</button>
</div>