<script lang="ts">
	import PartCardFrame from "$components/build-guides/PartCardFrame.svelte"
	import Content, { metadata } from "./PowerConversion.svx"

	let valuemW = $state("")
	let valuedBm = $state("")

	function updateFrommW(event: Event) {
		valuemW = (event.currentTarget as HTMLInputElement).value
		const mW = Number(valuemW)
		valuedBm =
			valuemW.trim() && Number.isFinite(mW) && mW > 0
				? Number((10 * Math.log10(mW)).toPrecision(6)).toString()
				: ""
	}

	function updateFromdBm(event: Event) {
		valuedBm = (event.currentTarget as HTMLInputElement).value
		const dBm = Number(valuedBm)
		const mW = 10 ** (dBm / 10)
		valuemW =
			valuedBm.trim() && Number.isFinite(dBm) && Number.isFinite(mW) && mW > 0
				? Number(mW.toPrecision(6)).toString()
				: ""
	}
</script>

<PartCardFrame accent="success">
	<div class="text-xl font-semibold text-success-500 md:text-2xl">
		{metadata.title}
	</div>

	<div class="flex items-center gap-4">
		<label class="flex items-center gap-1">
			<input
				type="text"
				value={valuemW}
				oninput={updateFrommW}
				inputmode="decimal"
				placeholder="800"
				class="input h-fit w-24 bg-surface-50-950 font-geist-mono outline-none focus:ring-primary-800 dark:focus:ring-primary-500"
			/>
			<span>mW</span>
		</label>
		=
		<label class="flex items-center gap-1">
			<input
				type="text"
				value={valuedBm}
				oninput={updateFromdBm}
				inputmode="decimal"
				placeholder="29"
				class="input h-fit w-24 bg-surface-50-950 font-geist-mono outline-none focus:ring-primary-800 dark:focus:ring-primary-500"
			/>
			<span>dBm</span>
		</label>
	</div>

	<div class="prose">
		<Content />
	</div>
</PartCardFrame>
