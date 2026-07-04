<script lang="ts">
	import SplitEdge from "$components/graphics/SplitEdge.svelte"
	import S1V1 from "$lib/assets/S1V5.svg"
	import gggyrate from "$lib/assets/gggyrate.svg"
	import type { Component } from "svelte"

	import {
		Weight,
		RulerDimensionLine,
		BatteryMedium,
		SignalHigh
	} from "@lucide/svelte"
</script>

{#snippet feature(
	title: string,
	description: string,
	Icon?: Component<{ class?: string }>
)}
	<div class="flex gap-2">
		<div class="h-full w-1 rounded-full bg-primary-500 shrink-0"></div>
		<div class="flex flex-col lg:gap-2 gap-0">
			<div class="flex items-center gap-1 text-surface-600-400">
				{#if Icon}
					<Icon class="lg:size-5 size-3" />
				{/if}
				<h4 class="text-xs 2xl:text-sm">{title}</h4>
			</div>
			<p class="text-sm font-bold xl:text-lg 2xl:text-xl whitespace-nowrap">{description}</p>
		</div>
	</div>
{/snippet}

<div class="p-4 lg:p-8">
	<div
		class="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border-2 border-surface-100-900 transition-all duration-300 hover:border-primary-500/40 hover:shadow-2xl hover:shadow-primary-500/5 lg:min-h-96 lg:flex-row lg:rounded-[3rem] 2xl:min-h-128"
	>
		<div class="relative z-10 flex-1 lg:max-w-2/3 xl:min-w-3xl">
			<div class="content-container h-full w-full bg-surface-50-950">
				<img
					src={gggyrate}
					alt="gggyrate"
					class="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 lg:scale-200 lg:opacity-5 transition-all duration-300 lg:group-hover:scale-205 scale-300 opacity-10"
				/>
				<div
					class="text-container relative flex h-fit w-full flex-col lg:gap-4 gap-2 p-2 md:p-4 lg:p-8"
				>
					<div class="flex w-full items-center justify-between">
						<h3
							class="font-josefin-sans font-bold text-primary-500 text-4xl xl:text-5xl 2xl:text-8xl pt-2 lg:pt-0 -mb-2 lg:mb-0"
						>
							5" Beginner
						</h3>
						<span
							class="pr-16 font-josefin-sans text-2xl font-bold text-primary-500 lg:text-4xl lg:block hidden"
							>~$250</span
						>
					</div>
					<div
						class="prose flex-1 lg:pr-16 text-sm lg:text-base text-surface-950-50 2xl:text-lg"
					>
						Specced out to be easy to assemble, with affordable and accessible
						parts and electronics that should be easy to solder. This build
						should be perfect to get you started in the world of FPV.
					</div>
					<div class="flex flex-1 justify-between">
						<div class="grid flex-1 grid-cols-2 gap-4 lg:pb-0 pb-4">
							{@render feature("Weight", "600-900g", Weight)}
							{@render feature("Stack Mounting", "30x30", RulerDimensionLine)}
							{@render feature(
								"VTX Mounting",
								"20x20/zipties",
								RulerDimensionLine
							)}
							{@render feature("Flight Time", "~5-10 min", BatteryMedium)}
							{@render feature("Range", "~1-2km", SignalHigh)}
						</div>
						<div class="h-full w-0 lg:w-1/2 2xl:w-16 spacer"></div>
					</div>
					<div class="spacer aspect-8/1 w-full h-full lg:hidden flex items-center justify-end -mb-4">
						<span class="text-2xl font-bold font-josefin-sans text-primary-500">~$250</span>
					</div>
				</div>
			</div>
			<SplitEdge
				orientation="vertical"
				class="absolute bottom-0 left-0 h-auto w-full text-surface-100-900 transition-all duration-300 group-hover:text-primary-500/40 lg:hidden"
			/>
			<SplitEdge
				class="absolute top-0 right-0 hidden h-full w-auto text-surface-100-900 transition-all duration-300 group-hover:text-primary-500/40 lg:block"
			/>
		</div>
		<div class="aspect-square w-full lg:hidden block spacer -mt-16"></div>
		<div
			class="img-container right-0 flex h-full w-full lg:items-center items-end justify-center absolute lg:w-[calc(100%-2rem)] lg:justify-end"
		>
			<div class="h-full w-full px-2 lg:pr-2 2xl:pr-8 flex items-end justify-end lg:items-center">
				<div class="aspect-square items-center justify-center flex w-full lg:w-auto">
					<img
						src={S1V1}
						alt="S1V5"
						class="pointer-events-none w-full select-none -mb-16 lg:mb-0"
					/>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.content-container {
		mask-repeat: no-repeat;
		mask-image: url(/split-mask-vertical.svg);
		mask-size: 100% auto;
		mask-position: bottom;
	}

	@media (min-width: 1024px) {
		.content-container {
			mask-image: url(/split-mask.svg);
			mask-size: auto 100%;
			mask-position: right;
		}
	}

	.img-container {
		--s: 100px; /* control the size*/
		--c1: rgba(255, 255, 255, 0.01);
		--c2: transparent;

		--_g: #0000 90deg, var(--c1) 0;
		background:
			radial-gradient(
				at 100% 100%,
				color-mix(in oklch, var(--color-primary-500) 12%, transparent),
				color-mix(in oklch, var(--color-primary-500) 5%, transparent) 50%,
				transparent 70%
			),
			conic-gradient(from 90deg at 1px 1px, var(--_g)),
			conic-gradient(from 90deg at 0.5px 0.5px, var(--_g)), var(--c2);
		background-size:
			auto,
			var(--s) var(--s),
			calc(var(--s) / 5) calc(var(--s) / 5);
	}
</style>
