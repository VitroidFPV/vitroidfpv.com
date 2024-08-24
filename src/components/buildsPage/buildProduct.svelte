<script lang="ts">
	// @ts-ignore
	import Link from "$components/Link.svelte";
	import Chip from "$components/Chip.svelte";
	import IntersectionObserver from "svelte-intersection-observer";
	import { addPart } from "$lib/addPart";
	import { page } from "$app/stores";
	import { spring } from "svelte/motion"
	import { Icon } from "@steeze-ui/svelte-icon";
	import { Photo, Plus, } from "@steeze-ui/heroicons";
	import ImgPopout from "$components/ImgPopout.svelte";

	const url = $page.url.pathname;

	let element: HTMLElement;
	let intersecting: boolean;

	export let color: string;
	export let title: string;
	export let price: string;
	export let point1 = "";
	export let point2 = "";
	export let point3 = "";
	export let point4 = "";
	export let point5 = "";
	export let info: string[] | string = [] || "";
	let infoArray: string[] = [];
	if (typeof info === "string") {
		info.split(";").forEach((item) => {
			infoArray.push(item);
		});
	} else {
		infoArray = info;
	}
	export let text: string;
	export let href: string;
	export let img: string;
	export let category: string = "";

	let open = false;

	let infoObjects: { text: string; tooltip: string }[] = [];
	if (info) {
		infoObjects = infoArray.map((item) => {
			const split = item.split("<");
			if (split.length === 1) {
				return { text: split[0], tooltip: "" };
			} else {
				return { text: split[0], tooltip: split[1].slice(0, -1) };
			}
		});
		price = infoObjects[0]?.text;
	}

	let colorHex = "";

	switch (color) {
		case "red":
			colorHex = "#d6395b";
			break;
		case "orange":
			colorHex = "#ff9742";
			break;
		case "green":
			colorHex = "#87cc52";
			break;
		case "violet":
			colorHex = "#9550ba";
			break;
	}
</script>

<svelte:window on:keydown={(event) => {if (event.key === "Escape") {open = false}}}/>

<ImgPopout {img} {title} {open} on:clickOutside={() => open = false} />

<IntersectionObserver {element} bind:intersecting>
	<div class="product-box h-full flex flex-col not-intersecting z-10 relative" bind:this={element} class:intersecting={intersecting}>
		<div class="{color} {category} relative h-fit w-full border-l-4 product pl-2 my-4 md:mr-8">
			<div class="flex w-full justify-between link t-{color}">
				<div>
					<Link {color} color1={color} size="2" {href} external={true}>{title}</Link>
				</div>
				<div>
					<button 
						on:click={() => addPart(title, price, color, category, url, href)}
						class="mr-2 hover:text-current text-contrast-500 duration-300">
						<Icon class="w-7 h-7" src={Plus} stroke-width="2" />
						<div class="sr-only">Add to price comparison</div>
					</button>
					{#if img}
						<button on:click={() => open = true} class="hover:text-current text-contrast-500 duration-300">
							<Icon class="w-7 h-7" src={Photo} stroke-width="2" />
							<div class="sr-only">View image</div>
						</button>
					{/if}
				</div>
			</div>
			{#if info === ""}
				<div class="flex justify-between mt-3 mb-3 flex-wrap tracking-[0.01em]">
					<div class="text-base text-main-100 dark:text-contrast-300 mr-2">{price}</div>
					<div class="text-base text-main-50 dark:text-contrast-500 mr-2">{point1}</div>
					<div class="text-base text-main-50 dark:text-contrast-500 mr-2">{point2}</div>
					<div class="text-base text-main-50 dark:text-contrast-500 mr-2">{point3}</div>
					<div class="text-base text-main-50 dark:text-contrast-500 mr-2">{point4}</div>
					<div class="text-base text-main-50 dark:text-contrast-500 mr-2">{point5}</div>
				</div>
			{:else}
				<div class="relative flex flex-wrap w-fit gap-2 chip-box my-2">
					{#each infoObjects as infoObject}
						<Chip classes="text-sm" color={color} tooltip={infoObject.tooltip}>{infoObject.text}</Chip>
					{/each}
				</div>
			{/if}
			{#if text !== undefined}
				<div>{@html text}</div>
			{/if}
		</div>
		
		{#each {length: 3} as _, i}
			<div 
				class="absolute dark:opacity-40 opacity-80 pointer-events-none z-10 !scale-75 saturate-150"
				style={`top: ${(Math.random() * 50) - 70}%; left: ${(Math.random() * 100) - 50}%; transform: translate(-50%, -50%)`}
			>
				<svg width="443" height="470" viewBox="0 0 443 470" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g filter="url(#filter0_f_102_3)">
						<path d="M271 251.5C264.347 241.743 244.318 250.476 223.476 245.594C218.051 244.323 212.782
						240.738 213.593 235.226C215.333 223.411 228.498 203.379 235.264 196.198C246.321 184.461 215.764
						90.5 191.264 98C166.764 105.5 148.5 235 133.5 243C118.5 251 144.238 291.646 154.5 305.5C164.5 319
						321.152 373.768 344.5 314.5C351 298 278.5 262.5 271 251.5Z" fill={colorHex} fill-opacity="0.25"/>
					</g>
					<defs>
						<filter id="filter0_f_102_3" x="0.915527" y="-30.4256" width="471.996" height="499.937" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
							<feFlood flood-opacity="0" result="BackgroundImageFix"/>
							<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
							<feGaussianBlur stdDeviation="128" result="effect1_foregroundBlur_102_3"/>
						</filter>
					</defs>
				</svg>
			</div>
		{/each}

	</div>
</IntersectionObserver>


<style>
	.not-intersecting {
		opacity: 0;
		transform: translateX(-5%);
		/* filter: blur(2px); */
		transition: all 300ms;
	}
	.intersecting {
		opacity: 1;
		transform: translateX(0%);
		/* filter: blur(0px); */
	}

	@media (min-width: 2000px) {
		.product-box:nth-of-type(4n+1) {
			transition-delay: 0ms;
		}

		.product-box:nth-of-type(4n+2) {
			transition-delay: 50ms;
		}

		.product-box:nth-of-type(4n+3) {
			transition-delay: 100ms;
		}

		.product-box:nth-of-type(4n+4) {
			transition-delay: 150ms;
		}
	}
	
	@media (min-width: 1280px) and (max-width: 1999px) {
		.product-box:nth-of-type(3n+1) {
			transition-delay: 0ms;
		}

		.product-box:nth-of-type(3n+2) {
			transition-delay: 50ms;
		}

		.product-box:nth-of-type(3n+3) {
			transition-delay: 100ms;
		}
	}

	@media (min-width: 768px) and (max-width: 1279px) {
		.product-box:nth-of-type(2n+1) {
			transition-delay: 0ms;
		}

		.product-box:nth-of-type(2n+2) {
			transition-delay: 50ms;
		}
	}

	@media (max-width: 767px) {
		.product-box:nth-of-type(1n+1) {
			transition-delay: 0ms;
		}
	}
</style>