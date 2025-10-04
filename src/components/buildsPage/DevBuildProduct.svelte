<script lang="ts">
	import { run } from 'svelte/legacy';

	// @ts-ignore
	import Link from "$components/Link.svelte";
	import Chip from "$components/Chip.svelte";
	import IntersectionObserver from "svelte-intersection-observer";
	import { addPart } from "$lib/addPart";
	import { page } from "$app/state";
	import ImgPopout from "$components/ImgPopout.svelte";
	import { slide, fly } from "svelte/transition";
	import { Icon } from "@steeze-ui/svelte-icon";
	import { Photo, Eye, Plus, Link as ChainLink, PencilSquare, FolderArrowDown, ChevronUp } from "@steeze-ui/heroicons"

	const url = page.url.pathname;

	let element: HTMLElement | undefined = $state();
	let intersecting: boolean | undefined = $state();

	
	let infoArray: string[] = $state([]);
	$effect(() => {
		if (typeof info === "string") {
			info.split(";").forEach((item) => {
				infoArray.push(item);
			});
		} else {
			infoArray = info;
		}
	});
	interface Props {
		// input variables
		color?: string;
		title?: string;
		price?: string;
		point1?: string;
		point2?: string;
		point3?: string;
		point4?: string;
		point5?: string;
		info?: string[] | string;
		text?: string;
		href?: string;
		img?: string;
		category?: string;
		group?: any;
		moduleUrl?: string;
		order?: number;
	}

	let {
		color = $bindable("red"),
		title = $bindable("Title"),
		price = $bindable("$0.00"),
		point1 = "",
		point2 = "",
		point3 = "",
		point4 = "",
		point5 = "",
		info = [],
		text = $bindable("Description"),
		href = $bindable("/"),
		img = $bindable("/uploads/placeholder.png"),
		category = $bindable(""),
		group = $bindable(undefined),
		moduleUrl = "",
		order = $bindable(0)
	}: Props = $props();

	run(() => {
		if (!group) {
			// hacky but whatever
			group = undefined;
		}
	});

	let infoYaml = $state("");
	run(() => {
		if (info) {
			infoYaml = infoArray.map((item) => {
				return `- ${item}`;
			}).join("\n");
		}
	});

	// save the original input variables
	let originalSave = $derived({ color, title, point1, point2, point3, point4, point5, infoYaml, text, href, img, category, group, order });

	let canSave = $state(false);
	// check if the input variables have changed from the saved ones
	// if they have, then the user can save
	run(() => {
		canSave = JSON.stringify({ color, title, point1, point2, point3, point4, point5, infoYaml, text, href, img, category, group, order }) !== JSON.stringify(originalSave);
	});

	let open: boolean = $state(false);

	let infoObjects: { text: string; tooltip: string }[] = $state([]);

	run(() => {
		if (info) {
			// [text<tooltip>", "text<tooltip>", ...]
			// separate strings in the array into objects with text and tooltip
			infoObjects = infoArray.map((item) =>  {
				const [text, tooltip] = String(item).split(/<|>/);
				return { text, tooltip: tooltip || "" };
			})

			price = infoObjects[0]?.text;
		}
	});

	// if infoYaml changes, update the infoArray
	run(() => {
		if (infoYaml) {
			infoArray = infoYaml.split("\n").map((item) => {
				return item.slice(2);
			});
			// remove empty strings from the array
			infoArray = infoArray.filter((item) => item !== "");
		}
	});

	let colorHex = $state("");

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

	let editMode = $state(false);
	let editPhoto = $state(false);
	run(() => {
		if (!editMode) {
			editPhoto = false;
		}
	});

	let sanitizedName = $state(`${category.toLowerCase().replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "")}-${title.toLocaleLowerCase().replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "")}`)
	run(() => {
		sanitizedName = `${category.toLowerCase().replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "")}-${title.toLocaleLowerCase().replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "")}`
	});

	let autoPath = $state("");
	run(() => {
		autoPath = `/uploads${url}/${sanitizedName}.png`;
	});

	let formattedYaml = $state("");
	run(() => {
		formattedYaml = infoYaml.split("\n").map((item) => {
			return `  ${item}`;
		}).join("\n");
	});

	let content = $state("")
	run(() => {
		content = 
	`---
	color: ${color}
	category: ${category}
	group: ${group}
	visible: true
	order: ${order}
	title: ${title}
	link: ${href}
	img: ${img}
	text: ${text}
	info: 
	${formattedYaml}
	---`;
	});

	function confirm() {
		let path = "";
		let name = "";
		if (moduleUrl !== "" && moduleUrl !== undefined) {
			path = moduleUrl;
		} else {
			path = "/modules/" + url;
			name = `${sanitizedName}.md`;
		}
		writeProduct(content, path, name);
	}

	async function writeProduct(content: string, path: string, name: string) {
		await fetch("/api/dev", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ content, path, name }),
		});
	}

	let colors: string[] = ["green", "orange", "red", "violet"];

	function selectColor(boxColor: string) {
		color = boxColor;
		content = 
`---
color: ${boxColor}
category: ${category}
group: ${group}
visible: true
order: ${order}
title: ${title}
link: ${href}
img: ${img}
text: ${text}
info: 
  ${infoYaml}
---`;

	}
</script>

<svelte:window onkeydown={(event) => {if (event.key === "Escape") {open = false}}}/>

<ImgPopout {img} {title} {open} on:clickOutside={() => open = false} />

<IntersectionObserver {element} bind:intersecting>
		<div class="product-box h-full flex flex-col not-intersecting z-10 relative" bind:this={element} class:intersecting={intersecting}>
			<div class="{color} {category} relative h-fit w-full border-l-4 product pl-2 my-4 md:mr-8 duration-300">
				<div class="flex w-full justify-between link text-{color} duration-300 items-start">
					<div class="w-full pr-2 flex flex-col" class:gap-4={editMode}>
						{#if editMode}

							<div class="flex"
									transition:slide
							>
								<input
									bind:value={category}
									type="text"
									spellcheck="false"
									class="text-base text-main-100 dark:text-contrast-300 px-2 py-1 text-main mr-4 w-full h-fit rounded-md bg-neutral-500/10 break-all
									focus-visible:outline-none focus-visible:outline-[3px] focus-visible:outline-neutral-400/20"
								>
								<input
									bind:value={group}
									type="text"
									spellcheck="false"
									class="text-base text-main-100 dark:text-contrast-300 px-2 py-1 text-main mr-4 w-full h-fit rounded-md bg-neutral-500/10 break-all
									focus-visible:outline-none focus-visible:outline-[3px] focus-visible:outline-neutral-400/20"
								>
							</div>
						{/if}
						{#if !editMode}
							<Link {color} color1={color} size="2" {href} external={true}>{title}</Link>
						{:else}
							<input 
								type="text"
								bind:value={title}
								spellcheck="false"
								class="text-2xl h-fit rounded-md bg-neutral-500/10 mb-2 w-full
								focus-visible:outline-none focus-visible:outline-[3px] focus-visible:outline-offset-[3] focus-visible:outline-current"
							>

						{/if}
					</div>
					<div class="flex items-center duration-300">
						<button 
							onclick={() => addPart(title, price, color, category, url, href)}
							class="hover:stroke-current stroke-contrast-500 duration-300 mr-2">
							<Icon class="w-7 h-7 stroke-[2.5] stroke-inherit" src={Plus} size="28" theme="default" title="Add to price comparison" />
						</button>
						<!-- {#if img} -->
						<button
							onclick={() => {if (!editMode) {open = true} else {editPhoto = !editPhoto}}}
							class=" hover:stroke-current stroke-contrast-500 duration-300 mr-2"
						>
							<div class="transition-container">
								{#if !editPhoto}
									<div
										in:fly={{y: -20, duration: 300}}
										out:fly={{y: 20, duration: 300}}
									>
										<Icon class="w-7 h-7 stroke-2 stroke-inherit" src={Photo} size="28" theme="default" title="View image" />
									</div>
								{:else}
									<div
										in:fly={{y: -20, duration: 300}}
										out:fly={{y: 20, duration: 300}}
									>
										<Icon class="w-7 h-7 stroke-2 stroke-inherit" src={ChainLink} size="28" theme="default" title="View image" />
									</div>
								{/if}
							</div>
						</button>
						<!-- {/if} -->
						<div class="transition-container" class:mr-2={canSave}>
							{#if !editMode}
								<button
									onclick={() => {editMode = true}}
									class=" hover:stroke-current stroke-contrast-500 duration-300"
									in:fly={{y: -16, duration: 300}}
									out:fly={{y: 16, duration: 300}}
								>
									<Icon class="w-7 h-7 stroke-2 stroke-inherit" src={PencilSquare} size="28" theme="default" title="Edit" />
								</button>
							{:else}
								<button
									onclick={() => {editMode = false}}
									class=" hover:stroke-current stroke-contrast-500 duration-300"
									in:fly={{y: -16, duration: 300}}
									out:fly={{y: 16, duration: 300}}
								>
									<Icon class="w-7 h-7 stroke-2 stroke-inherit" src={Eye} size="28" theme="default" title="View" />
								</button>
							{/if}
						</div>
							<div 
								class="transition-container duration-300 w-0"
								class:w-7={canSave}
							>
							{#if canSave}
								<button
									onclick={() => {confirm()}}
									class=" hover:stroke-current stroke-contrast-500 duration-300"
									transition:fly={{y: -16, duration: 300}}
								>
									<Icon class="w-7 h-7 stroke-2 stroke-inherit" src={FolderArrowDown} size="28" theme="default" title="Save" />
								</button>
							{/if}
						</div>
					</div>
				</div>
				{#if editMode}
					<div class="flex pt-2" transition:slide>
						{#if editPhoto}
							<div
								bind:innerText={img}
								ondblclick={() => {img = autoPath}}
								spellcheck="false"
								contenteditable="true"
								role="textbox"
								tabindex="0"
								class="text-base p-2 text-main-100 dark:text-contrast-300 mr-4 w-full min-h-full rounded-md bg-neutral-500/10 break-all
								focus-visible:outline-none focus-visible:outline-[3px] focus-visible:outline-neutral-400/20"
							>
							<div class="float-right h-8 w-8 bg-red"></div>
							</div>
						{:else}
							<div
								bind:innerText={href}
								spellcheck="false"
								contenteditable="true"
								class="text-base p-2 text-main-100 dark:text-contrast-300 mr-4 w-full min-h-full rounded-md bg-neutral-500/10 break-all
								focus-visible:outline-none focus-visible:outline-[3px] focus-visible:outline-neutral-400/20"
							></div>
						{/if}

						<div>
							<form class="grid grid-cols-2 gap-4 mr-2 h-fit">
								{#each colors as colorBox}
									<div>
										<input 
											type="radio" 
											name={colorBox} 
											value={colorBox} 
											id={colorBox} 
											class="hidden peer" 
											bind:group={color}
											onclick={() => selectColor(color)}
										>
										<label for={colorBox} class="h-7 w-7 bg-{colorBox} text-{colorBox} outline outline-2 outline-transparent outline-offset-[3px] peer-checked:outline-current block rounded-md cursor-pointer"></label>
									</div>
								{/each}
							</form>
								<div class="flex mt-3">
									<div class="flex items-end">
										<input
										bind:value={order}
										type="number"
										min=1
										max=69
										class="bg-gray-500/10 w-full h-8 rounded-md p-2 text-base duration-300
										outline-none focus-within:outline-{color} outline-2 no-spinner"
										/>
									</div>
									<div class="h-8 flex flex-col justify-between ml-1.5 text-neutral-400/40">
										<button onclick={() => order++} class="hover:text-{color} duration-300">
											<Icon class="w-3 h-3 stroke-4" src={ChevronUp} size="12" theme="default" title="Increase order" />
										</button>
										<button onclick={() => order--} class="hover:text-{color} duration-300">
											<Icon class="w-3 h-3 stroke-4 rotate-180 stroke-current" src={ChevronUp} size="12" theme="default" title="Decrease order" />
										</button>
									</div>
								</div>
						</div>
					</div>
				{/if}
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
				{#if editMode}
					<div 
						bind:innerText={infoYaml}
						transition:slide
						spellcheck="false"
						contenteditable="true"
						class="text-base p-2 text-main mr-4 w-full h-fit rounded-md bg-neutral-500/10 break-all
						focus-visible:outline-none focus-visible:outline-[3px] focus-visible:outline-neutral-400/20 mb-4"
					></div>
				{/if}
				{#if text !== undefined}
					{#if !editMode}
						<div>{@html text}</div>
					{:else}
						<div 
							bind:innerText={text}
							spellcheck="false"
							contenteditable="true"
							class="text-base p-2 text-main-100 dark:text-contrast-300 mr-4 w-full h-fit rounded-md bg-neutral-500/10 break-words
							focus-visible:outline-none focus-visible:outline-[3px] focus-visible:outline-neutral-400/20"
						></div>
					{/if}
				{/if}
			</div>
			
			{#each {length: 3} as _, i}
				<div 
					class="absolute dark:opacity-40 opacity-80 pointer-events-none z-10 scale-75! saturate-150"
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

	.no-spinner::-webkit-outer-spin-button, .no-spinner::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	.no-spinner {
		-moz-appearance: textfield;
		appearance: textfield;
	}
</style>