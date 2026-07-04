<script lang="ts">
	import SplitEdge from "$components/graphics/SplitEdge.svelte"
	import gggyrate from "$lib/assets/gggyrate.svg"
	import {
		buildAccentVar,
		buildColorClasses,
		type BuildColor
	} from "$lib/builds/colors"
	import type { BuildFeature } from "$lib/builds/sections"
	import type { Component } from "svelte"

	let {
		title,
		price,
		image,
		imageAlt = title,
		color = "primary",
		features,
		Description
	}: {
		title: string
		price: string
		image: string
		imageAlt?: string
		color?: BuildColor
		features: BuildFeature[]
		Description: Component
	} = $props()

	const colors = $derived(buildColorClasses[color])
</script>

{#snippet featureItem(
	featureTitle: string,
	description: string,
	barClass: string,
	Icon?: Component<{ class?: string }>
)}
	<div class="flex gap-2">
		<div class="h-full w-1 rounded-full {barClass} shrink-0"></div>
		<div class="flex flex-col lg:gap-2 gap-0">
			<div class="flex items-center gap-1 text-surface-600-400">
				{#if Icon}
					<Icon class="lg:size-5 size-3" />
				{/if}
				<h4 class="text-xs 2xl:text-sm">{featureTitle}</h4>
			</div>
			<p class="text-sm font-bold xl:text-lg 2xl:text-xl whitespace-nowrap">
				{description}
			</p>
		</div>
	</div>
{/snippet}

<div
	class="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border-2 border-surface-100-900 transition-all duration-300 hover:shadow-2xl {colors.cardHover} lg:min-h-96 lg:flex-row lg:rounded-[3rem] 2xl:min-h-128"
	style:--build-accent={buildAccentVar[color]}
>
	<div class="relative z-10 flex-1 lg:max-w-2/3 xl:min-w-3xl">
		<div class="content-container h-full w-full bg-surface-50-950">
			<img
				src={gggyrate}
				alt=""
				class="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 lg:scale-200 lg:opacity-5 transition-all duration-300 lg:group-hover:scale-205 scale-300 opacity-10"
			/>
			<div
				class="text-container relative flex h-fit w-full flex-col lg:gap-4 gap-2 p-2 md:p-4 lg:p-8"
			>
				<div class="flex w-full items-center justify-between">
					<h3
						class="font-josefin-sans font-bold {colors.text} text-4xl xl:text-5xl 2xl:text-8xl pt-2 lg:pt-0 -mb-2 lg:mb-0"
					>
						{title}
					</h3>
					<span
						class="pr-16 font-josefin-sans text-2xl font-bold {colors.text} lg:text-4xl lg:block hidden"
						>{price}</span
					>
				</div>
				<div
					class="prose flex-1 lg:pr-16 text-sm lg:text-base text-surface-950-50 2xl:text-lg"
				>
					<Description />
				</div>
				<div class="flex flex-1 justify-between">
					<div class="grid flex-1 grid-cols-2 gap-4 lg:pb-0 pb-4">
						{#each features as feature (feature.title)}
							{@render featureItem(
								feature.title,
								feature.description,
								colors.bar,
								feature.icon
							)}
						{/each}
					</div>
					<div class="h-full w-0 lg:w-1/2 2xl:w-16 spacer"></div>
				</div>
				<div
					class="spacer aspect-8/1 w-full h-full lg:hidden flex items-center justify-end -mb-4"
				>
					<span class="text-2xl font-bold font-josefin-sans {colors.text}"
						>{price}</span
					>
				</div>
			</div>
		</div>
		<SplitEdge
			orientation="vertical"
			class="absolute bottom-0 left-0 h-auto w-full text-surface-100-900 transition-all duration-300 {colors.splitEdgeHover} lg:hidden"
		/>
		<SplitEdge
			class="absolute top-0 right-0 hidden h-full w-auto text-surface-100-900 transition-all duration-300 {colors.splitEdgeHover} lg:block"
		/>
	</div>
	<div class="aspect-square w-full lg:hidden block spacer -mt-16"></div>
	<div
		class="img-container right-0 flex h-full w-full lg:items-center items-end justify-center absolute lg:w-[calc(100%-2rem)] lg:justify-end"
	>
		<div
			class="h-full w-full px-2 lg:pr-2 2xl:pr-8 flex items-end justify-end lg:items-center"
		>
			<div
				class="aspect-square items-center justify-center flex w-full lg:w-auto"
			>
				<img
					src={image}
					alt={imageAlt}
					class="pointer-events-none w-full select-none -mb-16 lg:mb-0"
				/>
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
				color-mix(in oklch, var(--build-accent) 12%, transparent),
				color-mix(in oklch, var(--build-accent) 5%, transparent) 50%,
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
