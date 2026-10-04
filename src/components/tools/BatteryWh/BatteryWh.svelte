<script lang="ts">
	import PartCardFrame from "$components/build-guides/PartCardFrame.svelte"
	import Content, { metadata } from "./BatteryWh.svx"

	import { SegmentedControl } from "@skeletonlabs/skeleton-svelte"

	let cellCount: number | undefined = $state()

	let chemistries = [
		{ name: "LiPo", value: "lipo" },
		{ name: "LiHV", value: "lihv" },
		{ name: "Li-ion", value: "liion" },
		{ name: "LiFePO4", value: "lifepo" }
	]

	let selectedChemistry: "lipo" | "lihv" | "liion" | "lifepo" = $state("lipo")
	let nominalVoltage: number = $derived.by(() => {
		switch (selectedChemistry) {
			case "lipo":
				return 3.7
			case "lihv":
				return 3.85
			case "liion":
				return 3.6
			case "lifepo":
				return 3.2
			default:
				return 3.7
		}
	})

	let capacity: number | undefined = $state()

	let energyWh: number | undefined = $derived.by(() => {
		if (capacity && cellCount && nominalVoltage) {
			return (capacity * cellCount * nominalVoltage) / 1000
		}
		return undefined
	})
</script>

<PartCardFrame accent="success">
	<div class="text-xl font-semibold text-success-500 md:text-2xl">
		{metadata.title}
	</div>

	<SegmentedControl
		value={selectedChemistry}
		onValueChange={({ value }: { value: string | null }) => {
			if (value) selectedChemistry = value as typeof selectedChemistry
		}}
	>
		<SegmentedControl.Control class="gap-1 bg-surface-50-950 p-1">
			<SegmentedControl.Indicator class="bg-primary-500" />
			{#each chemistries as item (item)}
				<SegmentedControl.Item
					value={item.value}
					class="group px-2 py-1 text-sm hover:filter-none"
				>
					<SegmentedControl.ItemText
						class="data-[state=checked]:text-primary-contrast-dark data-[state=unchecked]:group-hover:text-primary-500"
						>{item.name}</SegmentedControl.ItemText
					>
					<SegmentedControl.ItemHiddenInput />
				</SegmentedControl.Item>
			{/each}
		</SegmentedControl.Control>
	</SegmentedControl>

	<div class="flex items-center justify-between gap-2">
		<label class="flex items-center gap-1">
			<span>Capacity:</span>
			<input
				type="number"
				bind:value={capacity}
				inputmode="decimal"
				min="0"
				step="any"
				placeholder="1300"
				class="no-spinner input h-fit w-24 bg-surface-50-950 font-geist-mono outline-none focus:ring-primary-800 dark:focus:ring-primary-500"
			/>
			<span>mAh</span>
		</label>
		<label class="flex items-center gap-1">
			<span>Cell Count:</span>
			<input
				type="number"
				bind:value={cellCount}
				inputmode="numeric"
				min="1"
				step="1"
				placeholder="6"
				class="input h-fit w-24 bg-surface-50-950 font-geist-mono outline-none focus:ring-primary-800 dark:focus:ring-primary-500"
			/>
		</label>
	</div>

	<div class="flex items-center gap-1">
		<span>Energy:</span>
		<span class="inline-flex h-8 w-20 rounded-full bg-surface-100-900 px-2 py-1"
			>{energyWh ? energyWh.toFixed(2) : "N/A"}</span
		>
		Wh
	</div>

	<div class="prose">
		<Content />
	</div>
</PartCardFrame>

<style>
	.no-spinner::-webkit-outer-spin-button,
	.no-spinner::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	.no-spinner {
		-moz-appearance: textfield;
		appearance: textfield;
	}
</style>
