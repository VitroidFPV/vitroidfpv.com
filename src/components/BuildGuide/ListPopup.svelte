<script lang="ts">
	import SplitCorner from "$components/graphics/SplitCorner.svelte"
	import PartTags from "$components/BuildGuide/PartTags.svelte"
	import {
		guidePartColors,
	} from "$lib/builds/guide-sections"
	import { PanelTopClose, PanelTopOpen } from "@lucide/svelte"

	let {
		state = "open"
	}: {
		state?: "open" | "minimized" | "closed"
	} = $props()

	const stateClasses = {
		open: "translate-y-0",
		minimized: "-translate-y-full",
		closed: "-translate-y-[calc(100%+4rem)]"
	}
</script>

<div
	class="relative h-fit max-w-2xl min-w-xl rounded-bl-4xl border-b-2 border-l-2 border-surface-100-900 bg-surface-950 {stateClasses[state]} transition-transform duration-300"
>
	<div class="flex flex-col gap-2 p-4">
		<div class="flex gap-2">
			<div class="size-16 bg-surface-100-900 rounded-2xl"></div>
			<div class="flex flex-col gap-1 mr-8">
				<h3 class="font-semibold text-success-500 text-lg">T-Motor Velox V3</h3>
				<PartTags
					tags={[
						{ label: "2207/2306", tooltip: "Stator size" },
						{ label: "1750/1950/2050KV" },
						{ label: "35.2g" }
					]}
					price="$13.99"
					priceClass={guidePartColors["success"].price}
				/>
			</div>
			<div class="flex gap-1 items-end">
				<span class="text-surface-500 text-sm">5x</span>
				<span class="text-lg font-semibold">$13.99</span>
			</div>
		</div>
	</div>
	<SplitCorner
		fillClass="fill-surface-950"
		class="absolute top-full right-0 h-16 text-surface-100-900"
	/>
	<div class="absolute top-full left-0 w-full h-16 flex items-center justify-end px-2 gap-4">
		<div class="flex gap-1 items-end">
			<!-- <span class="text-surface-500 text-sm">Total:</span> -->
			<span class="text-2xl font-semibold text-success-500">$69.95</span>
		</div>
		<button class="preset-filled-surface-100-900 btn-icon">
			{#if state === "open"}
				<PanelTopClose class="size-4" />
			{:else}
				<PanelTopOpen class="size-4" />
			{/if}
		</button>
	</div>
</div>
