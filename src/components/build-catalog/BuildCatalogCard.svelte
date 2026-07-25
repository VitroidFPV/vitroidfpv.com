<script lang="ts">
	import { resolve } from "$app/paths"
	import GraphicsCanvas from "$components/graphics/Canvas.svelte"
	import SplitEdge from "$components/graphics/SplitEdge.svelte"
	import gggyrate from "$lib/assets/gggyrate.svg"
	import {
		buildCatalogAccentClasses,
		buildCatalogAccentVar
	} from "$lib/build-catalog/theme"
	import type { BuildCatalogEntry } from "$lib/build-catalog/types"
	import type { Component } from "svelte"

	let { entry }: { entry: BuildCatalogEntry } = $props()

	const colors = $derived(buildCatalogAccentClasses[entry.accent])
</script>

{#snippet featureItem(
	featureTitle: string,
	description: string,
	barClass: string,
	Icon?: Component<{ class?: string }>
)}
	<div class="flex gap-2">
		<div class="h-full w-1 rounded-full {barClass} shrink-0"></div>
		<div class="flex flex-col gap-0 lg:gap-2">
			<div class="flex items-center gap-1 text-surface-600-400">
				{#if Icon}
					<Icon class="size-3 lg:size-5" />
				{/if}
				<h4 class="text-xs 2xl:text-sm">{featureTitle}</h4>
			</div>
			<p class="text-sm font-bold whitespace-nowrap xl:text-lg 2xl:text-xl">
				{description}
			</p>
		</div>
	</div>
{/snippet}

<div
	class="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border-2 border-surface-100-900 transition-all duration-300 hover:shadow-2xl {colors.cardHover} bg-surface-50-950 lg:min-h-96 lg:flex-row lg:rounded-[3rem] 2xl:min-h-128"
	style:--build-accent={buildCatalogAccentVar[entry.accent]}
>
	<div class="relative z-10 flex-1 lg:max-w-2/3 xl:min-w-3xl">
		<div class="content-container h-full w-full bg-surface-50-950">
			<img
				src={gggyrate}
				alt=""
				class="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 scale-300 opacity-10 transition-all duration-300 group-hover:opacity-10 lg:scale-200 lg:opacity-5 lg:group-hover:scale-205
				"
			/>
			<div
				class="text-container relative flex h-fit w-full flex-col gap-2 p-2 md:p-4 lg:gap-4 lg:p-8"
			>
				<div class="flex w-full items-center justify-between">
					{#if entry.href}
						<a
							href={resolve(entry.href as "/")}
							class="font-josefin-sans font-bold {colors.text} fancy-link-xl -mb-2 pt-2 text-4xl lg:mb-0 lg:pt-0 xl:text-5xl 2xl:text-8xl"
						>
							{entry.title}
						</a>
					{:else}
						<h3
							class="font-josefin-sans font-bold {colors.text} -mb-2 pt-2 text-4xl lg:mb-0 lg:pt-0 xl:text-5xl 2xl:text-8xl"
						>
							{entry.title}
						</h3>
					{/if}
					<span
						class="pr-16 font-josefin-sans text-2xl font-bold {colors.text} hidden lg:block lg:text-4xl"
						>{entry.price}</span
					>
				</div>
				<div
					class="prose max-w-[95%] flex-1 text-sm text-surface-950-50 lg:pr-16 lg:text-base 2xl:text-lg"
				>
					<entry.Summary />
				</div>
				<div class="flex flex-1 justify-between">
					<div class="grid flex-1 grid-cols-2 gap-4 pb-4 lg:pb-0">
						{#each entry.specs as spec (spec.title)}
							{@render featureItem(
								spec.title,
								spec.description,
								colors.bar,
								spec.icon
							)}
						{/each}
					</div>
					<div class="spacer h-full w-0 lg:w-1/2 2xl:w-16"></div>
				</div>
				<div
					class="spacer -mb-4 flex aspect-8/1 h-full w-full items-center justify-end lg:hidden"
				>
					<span class="font-josefin-sans text-2xl font-bold {colors.text}"
						>{entry.price}</span
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
	<div class="spacer -mt-16 block aspect-square w-full lg:hidden"></div>
	<div
		class="img-container absolute right-0 flex h-full w-full items-end justify-center lg:w-[calc(100%-2rem)] lg:items-center lg:justify-end"
	>
		<div
			class="flex h-full w-full items-end justify-end px-2 lg:items-center lg:pr-0 2xl:pr-8"
		>
			<div
				class="flex aspect-square h-auto w-full items-center justify-center lg:h-full lg:w-max"
			>
				{#if entry.model}
					<GraphicsCanvas
						model={entry.model}
						class="size-full min-h-0 max-w-full cursor-grab select-none lg:mb-0"
					/>
				{:else if entry.image}
					<img
						src={entry.image}
						alt={entry.title}
						class="pointer-events-none -mb-16 w-full select-none lg:mb-0"
					/>
				{/if}
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

	@property --accent-gradient-opacity {
		syntax: "<number>";
		inherits: false;
		initial-value: 1;
	}

	.img-container {
		--s: 100px; /* control the size*/
		--c1: rgba(255, 255, 255, 0.01);
		--c2: transparent;
		--accent-gradient-opacity: 1;

		--_g: #0000 90deg, var(--c1) 0;
		background:
			radial-gradient(
				at 100% 100%,
				color-mix(
					in oklch,
					var(--build-accent) calc(12% * var(--accent-gradient-opacity)),
					transparent
				),
				color-mix(
						in oklch,
						var(--build-accent) calc(5% * var(--accent-gradient-opacity)),
						transparent
					)
					50%,
				transparent 70%
			),
			conic-gradient(from 90deg at 1px 1px, var(--_g)),
			conic-gradient(from 90deg at 0.5px 0.5px, var(--_g)), var(--c2);
		background-size:
			auto,
			var(--s) var(--s),
			calc(var(--s) / 5) calc(var(--s) / 5);
		transition: --accent-gradient-opacity 300ms ease;
	}

	.group:hover .img-container {
		--accent-gradient-opacity: 1.2;
	}
</style>
