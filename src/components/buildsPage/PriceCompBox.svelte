<script lang="ts">
	import { parts } from "$components/buildsPage/stores";
	import { copyCompare } from "$lib/copyCompare";
	import { expand } from "$lib/transition"
	import { page } from "$app/stores";
	import PriceComparison from "$components/buildsPage/PriceComparison.svelte";	
	import { slide } from "svelte/transition"
	import { get } from "svelte/store";

	let compareOpen = false
	let url = $page.url.pathname

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
	let total = 0;
	// $: total = sumPrices($parts[url].map((part) => part.price))
	// if $parts[url] is not empty, then sum the prices of all the parts in the array. if it is empty, close the compare
	$: if ($parts[url] && $parts[url].length > 0) {
		// total = sumPrices($parts[url].map((part) => part.price))
		// console.log(sumPrices(get(parts)[url]))
		total = sumPrices(get(parts)[url])
	} else {
		compareOpen = false;
	}

</script>
<div class="absolute min-h-full right-8 z-30 pointer-events-none">
	<div class="sticky top-8 flex justify-end pointer-events-auto">
		<button 
			on:click={() => {
				// if $parts exists and is not empty, then toggle compareOpen
				if ($parts[url] && $parts[url].length > 0) {
					compareOpen = !compareOpen;
				} else {
					compareOpen = false;
				}
			}}
			class="h-12 w-12 group bg-neutral-500/20 border-2 border-neutral-500/40 shadow-lg
			hover:bg-highlight hover:border-highlight dark:hover:border-highlight-dark backdrop-blur-md z-10 
			dark:hover:bg-highlight-dark duration-300 rounded-full flex items-center justify-center relative">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5" />
			</svg>
			{#if $parts[url] && $parts[url].length > 0}
				<div class="p-1 absolute h-6 aspect-square bg-contrast-200 dark:bg-main-100 -top-2 -right-2 text-sm rounded-full z-10 shadow-lg">{$parts[url].length}</div>
			{/if}
		</button>
		{#if compareOpen}
			<div transition:expand={{duration: 1000, delay: 0}} id="compare" class="w-96 min-h-fit p-4 absolute bg-neutral-500/10 right-0 top-0 rounded-3xl backdrop-blur-md border-2 border-neutral-500/40 flex flex-col duration-300 transition-all">
				<div class="flex">
					<div class="text-2xl text-highlight dark:text-highlight-dark mb-4 mr-2">Compare</div>
					<button on:click={() => copyCompare()} class="h-8 w-8 outline outline-2 outline-highlight dark:outline-highlight-dark bg-highlight/20 dark:bg-highlight-dark/20 hover:bg-highlight/40 dark:hover:bg-highlight-dark/40 duration-300 rounded-full flex items-center justify-center relative">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
							<path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
						</svg>
					</button>
				</div>
				<!-- #each block for $compareArray that updates with the array, and contains a SizeComparison {size} element -->
				<!-- {#each $compareArray as size}
					<div transition:slide>
						<SizeComparison {size}/>
					</div>
				{/each} -->
				{#each $parts[url] as part}
					<!-- {#key $parts[url]} -->
					<div transition:slide>
						<PriceComparison title={part.title} {url} color={part.color} price={part.price} href={part.href}, quantity={part.quantity}/>
					</div>
					<!-- {/key} -->
				{/each}
				<div class="flex justify-end mt-4">
					<div class="text-2xl"><span class="text-base">Total:</span> ${total}</div>
				</div>
			</div>
		{/if}
	</div>
</div>