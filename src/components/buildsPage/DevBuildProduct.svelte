<script lang="ts">
	// @ts-ignore
	import Link from "$components/Link.svelte";
	import Chip from "$components/Chip.svelte";
	import IntersectionObserver from "svelte-intersection-observer";
	import { addPart } from "$lib/addPart";
	import { page } from "$app/stores";
	import ImgPopout from "$components/ImgPopout.svelte";
	import { slide, fly } from "svelte/transition";

	const url = $page.url.pathname;

	let element: HTMLElement;
	let intersecting: boolean;

	// input variables
	export let color: string = "red";
	export let title: string = "Title";
	export let price: string = "$0.00";
	export let point1 = "";
	export let point2 = "";
	export let point3 = "";
	export let point4 = "";
	export let point5 = "";
	export let info: string = "";
	export let text: string = "Description";
	export let href: string = "/";
	export let img: string = "/uploads/placeholder.png";
	export let category: string = "";
	export let group: any = undefined;
	export let moduleUrl: string = "";
	export let order: number = 0;	

	// $: console.log(moduleUrl)

	// save the original input variables
	const originalSave = { color, title, point1, point2, point3, point4, point5, info, text, href, img, category, group, order };

	let canSave = false;
	// check if the input variables have changed from the saved ones
	// if they have, then the user can save
	$: canSave = JSON.stringify({ color, title, point1, point2, point3, point4, point5, info, text, href, img, category, group, order }) !== JSON.stringify(originalSave);

	let open: boolean;

	let infoObjects: { text: string; tooltip: string }[] = [];
	$: if (info) {
		const infoArray = info.split(";");
		infoObjects = infoArray.map((item) => {
			const split = item.split("<");
			if (split.length === 1) {
				return { text: split[0], tooltip: "" };
			} else {
				return { text: split[0], tooltip: split[1].slice(0, -1) };
			}
		});
		price = infoObjects[0].text;
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

	let editMode = false;

	let content = ""
	
	$: content = 
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
info: ${info}
---`;

	// $: console.log(content)

	function confirm() {
		let path = "";
		let name = "";
		if (moduleUrl !== "") {
			path = moduleUrl;
		} else {
			path = "/modules/" + url;
			name = category.toLowerCase() + "-" + title.toLowerCase().replace(`'`, ``).replace(/[^a-zA-Z0-9]/g, "-").replace("---", "-") + ".md";
		}
		writeProduct(content, path, name);
	}

	async function writeProduct(content: string, path: string, name: string) {
		console.log(content)
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
info: ${info}
---`;

		// console.log(`color: ${color}\nboxColor: ${boxColor}\ncontent: ${content}`)
	}
</script>

<svelte:window on:keydown={(event) => {if (event.key === "Escape") {open = false}}}/>

<ImgPopout {img} {title} {open} />

<IntersectionObserver {element} bind:intersecting>
		<div class="product-box h-full flex flex-col not-intersecting z-10 relative" bind:this={element} class:intersecting={intersecting}>
			<div class="{color} {category} relative h-fit w-full border-l-4 product pl-2 my-4 md:mr-8 duration-300">
				<div class="flex w-full justify-between link text-{color} duration-300 items-start">
					<div>
						{#if !editMode}
							<Link {color} color1={color} size="2" {href} external={true}>{title}</Link>
						{:else}
							<input 
								type="text"
								bind:value={title}
								spellcheck="false"
								class="text-2xl h-fit rounded-md bg-neutral-500/10 mb-2
								focus-visible:outline-none focus-visible:outline-[3px] focus-visible:outline-offset-[3] focus-visible:outline-current"
							>

						{/if}
					</div>
					<div class="flex items-center duration-300">
						<button 
							on:click={() => addPart(title, price, color, category, url, href)}
							class="hover:stroke-current stroke-contrast-500 duration-300 mr-2">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" class="w-7 h-7">
								<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
							</svg>
						</button>
						{#if img}
							<button 
								on:click={() => {open = true}} 
								class=" hover:stroke-current stroke-contrast-500 duration-300 mr-2"
							>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-width="2" class="w-7 h-7">
									<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
								</svg>
							</button>
						{/if}
						<div class="transition-container" class:mr-2={canSave}>
							{#if !editMode}
								<button
									on:click={() => {editMode = true}}
									class=" hover:stroke-current stroke-contrast-500 duration-300"
									in:fly={{y: -16, duration: 300}}
									out:fly={{y: 16, duration: 300}}
								>
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" class="w-7 h-7">
										<path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
									</svg>
								</button>
							{:else}
								<button
									on:click={() => {editMode = false}}
									class=" hover:stroke-current stroke-contrast-500 duration-300"
									in:fly={{y: -16, duration: 300}}
									out:fly={{y: 16, duration: 300}}
								>
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" class="w-7 h-7">
										<path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
										<path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
									</svg>
								</button>
							{/if}
						</div>
							<div 
								class="transition-container duration-300 w-0"
								class:w-7={canSave}
							>
							{#if canSave}
								<button
									on:click={() => {confirm()}}
									class=" hover:stroke-current stroke-contrast-500 duration-300"
									transition:fly={{y: -16, duration: 300}}
								>
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" class="w-7 h-7">
										<path stroke-linecap="round" stroke-linejoin="round" d="M9 13.5l3 3m0 0l3-3m-3 3v-6m1.06-4.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
									</svg>
								</button>
							{/if}
						</div>
					</div>
				</div>
				{#if editMode}
					<div class="flex pt-2" transition:slide>
						<div
							bind:innerText={href}
							spellcheck="false"
							contenteditable="true"
							class="text-base p-2 text-main-100 dark:text-contrast-300 mr-4 w-full min-h-full rounded-md bg-neutral-500/10 break-all
							focus-visible:outline-none focus-visible:outline-[3px] focus-visible:outline-neutral-400/20"
						></div>
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
											on:click={() => selectColor(color)}
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
										outline-none focus-within:outline-highlight outline-[3px] no-spinner"
										/>
									</div>
									<div class="h-8 flex flex-col justify-between ml-1 text-neutral-400/40">
										<button on:click={() => order++} class="hover:text-{color} duration-300">
											<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="4" stroke="currentColor" class="w-3 h-3">
												<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
											</svg>
										</button>
										<button on:click={() => order--} class="hover:text-{color} duration-300">
											<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="4" stroke="currentColor" class="w-3 h-3 rotate-180">
												<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
											</svg>
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
						bind:innerText={info}
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

	.no-spinner::-webkit-outer-spin-button, .no-spinner::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	.no-spinner {
		-moz-appearance: textfield;
		appearance: textfield;
	}
</style>