<script lang="ts">
	import { run } from 'svelte/legacy';

	import { parts } from "$lib/stores/buildsStore";
	import { copyCompare } from "$lib/copyCompare";
	import { expand } from "$lib/transition"
	import { page } from "$app/state";
	import PriceComparison from "$components/buildsPage/PriceComparison.svelte";	
	import { slide } from "svelte/transition"
	import { get } from "svelte/store";
	import { Icon } from "@steeze-ui/svelte-icon";
	import { Clipboard, AdjustmentsVertical } from "@steeze-ui/heroicons";

	let compareOpen = $state(false)
	let url = page.url.pathname

	// $: console.log($parts[url])
	// log the stringified version 
	// $: console.log(JSON.stringify($parts[url]))

	function sumPrices(items: { price: string, quantity: number }[]) {
	let total = 0;

	for (let i = 0; i < items.length; i++) {
		const item = items[i];
		const priceStr = item.price.replace(/[^\d.]/g, '');
		const price = parseFloat(priceStr);
		const roundedPrice = Math.ceil(price);

		total += roundedPrice * item.quantity;
	}

	return total;
	}


	// $: console.log($parts[url].map((part) => part.price))
	let total = $state(0);
	// $: total = sumPrices($parts[url].map((part) => part.price))
	// if $parts[url] is not empty, then sum the prices of all the parts in the array. if it is empty, close the compare
	run(() => {
		if ($parts[url] && $parts[url].length > 0) {
			// total = sumPrices($parts[url].map((part) => part.price))
			// console.log(sumPrices(get(parts)[url]))
			total = sumPrices(get(parts)[url])
		} else {
			compareOpen = false;
		}
	});

</script>
<div class="absolute min-h-full right-8 z-30 pointer-events-none">
	<div class="sticky top-8 flex justify-end pointer-events-auto">
		<button 
			onclick={() => {
				// if $parts exists and is not empty, then toggle compareOpen
				if ($parts[url] && $parts[url].length > 0) {
					compareOpen = !compareOpen;
				} else {
					compareOpen = false;
				}
			}}
			class="h-12 w-12 group bg-neutral-500/20 border-2 border-neutral-500/40 shadow-lg
			hover:bg-highlight hover:border-highlight dark:hover:border-highlight-dark backdrop-blur-md z-10 
			dark:hover:bg-highlight-dark duration-300 rounded-full flex items-center justify-center relative"
		>
			<Icon class="w-6 h-6" src={AdjustmentsVertical} stroke-width="1.5" size="24" theme="default" title="Compare" />
			{#if $parts[url] && $parts[url].length > 0}
				<div class="p-1 absolute h-6 aspect-square bg-contrast-200 dark:bg-main-100 -top-2 -right-2 text-sm rounded-full z-10 shadow-lg">{$parts[url].length}</div>
			{/if}
		</button>
		{#if compareOpen}
			<div transition:expand={{duration: 1000, delay: 0}} id="compare" class="w-96 min-h-fit p-4 absolute bg-neutral-500/10 right-0 top-0 rounded-3xl backdrop-blur-md border-2 border-neutral-500/40 flex flex-col duration-300 transition-all">
				<div class="flex">
					<div class="text-2xl text-highlight dark:text-highlight-dark mb-4 mr-2">Compare</div>
					<button onclick={() => copyCompare()} class="h-8 w-8 outline-2 outline-highlight dark:outline-highlight-dark bg-highlight/20 dark:bg-highlight-dark/20 hover:bg-highlight/40 dark:hover:bg-highlight-dark/40 duration-300 rounded-full flex items-center justify-center relative">
						<Icon class="w-6 h-6" src={Clipboard} stroke-width="1.5" size="24" theme="default" title="Copy compare" />
					</button>
				</div>
				<!-- #each block for $compareArray that updates with the array, and contains a SizeComparison {size} element -->
				<!-- {#each $compareArray as size}
					<div transition:slide>
						<SizeComparison {size}/>
					</div>
				{/each} -->
				{#each $parts[url] as part (part.title)}
					<div transition:slide>
						<PriceComparison title={part.title} {url} color={part.color} price={part.price} href={part.href} quantity={part.quantity}/>
					</div>
				{/each}
				<div class="flex justify-end mt-4">
					<div class="text-2xl"><span class="text-base">Total:</span> ${total}</div>
				</div>
			</div>
		{/if}
	</div>
</div>