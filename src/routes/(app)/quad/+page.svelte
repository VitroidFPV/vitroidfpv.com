<script lang="ts">
	import { Canvas } from "@threlte/core"
	import Quad from "./Quad.svelte"
	import { component } from "$lib/stores/quadStore"
	import { text } from "@sveltejs/kit";
	import Button from "$components/Button.svelte";
	import { fly } from "svelte/transition";
	import type { SvelteComponent } from "svelte";

	const pages: { [key: number]: { id: string; url: string } } = {
		0: {
			id: "anatomy",
			url: "",
		},
		1: {
			id: "frame",
			url: "/uploads/three/quad/frame.glb",
		},
		2: {
			id: "motors",
			url: "/uploads/three/quad/motors.glb",
		},
		3: {
			id: "esc",
			url: "/uploads/three/quad/esc.glb",
		},
		4: {
			id: "fc",
			url: "/uploads/three/quad/fc.glb",
		},
		5: {
			id: "cam",
			url: "/uploads/three/quad/cam.glb",
		},
		6: {
			id: "vtx",
			url: "/uploads/three/quad/vtx.glb",
		},
		7: {
			id: "vtx_antenna",
			url: "/uploads/three/quad/vtx_antenna.glb",
		},
		8: {
			id: "rx",
			url: "/uploads/three/quad/rx.glb",
		},
		9: {
			id: "rx_antenna",
			url: "/uploads/three/quad/rx_antenna.glb",
		},
	}

	let currentPage = 0

	function step(back: boolean = false) {
		if (!back) {
			if (currentPage < Object.keys(pages).length - 1) {
				currentPage++
				$component.selected = pages[currentPage].url
			}
		} else {
			if (currentPage > 0) {
				currentPage--
				$component.selected = pages[currentPage].url
			}
		}
	}

	// update the current page when the selected component changes
	$: currentPage = Object.keys(pages).findIndex((key) => pages[Number(key)].url == $component.selected)

	const colors = ["#2AD162", "#90d95b", "#5AD8E6"]

	const urls = Object.values(pages).map((page) => page.url)
	urls.shift()

	let modules = import.meta.glob("/modules/quad/*.svx", {eager: true})
	let groupedModules: Record<string, any> = {}
	for (const [key, value] of Object.entries(pages)) {
		groupedModules[value.id] = modules[`/modules/quad/${value.id}.svx`] as SvelteComponent
	}

	let isMobile = false
	let anchor = ""
	if (typeof window !== "undefined") {
		isMobile = window.innerWidth < 768
		anchor = window.location.hash.replace("#", "");
	}

	if (anchor) {
		currentPage = Object.keys(pages).findIndex((key) => pages[Number(key)].id == anchor)
		$component.selected = pages[currentPage].url
	}

	let prefix = "VitroidFPV";
	let title = " - 5\" Quad Anatomy";
	let color = "#1cd167";
	let description =
		"Learn about all of the parts that make up a 5\" quad - with a fancy 3D view to take a proper look at each part!";
</script>

<svelte:head>
	<title>VitroidFPV{title}</title>
	<meta name="author" content="VitroidFPV" />
	<meta property="og:image:width" content="512" />
	<meta property="og:image:height" content="512" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="VitroidFPV" />
	<meta property="article:author" content="VitroidFPV" />
	<meta property="og:title" content="{prefix}{title}" />
	<meta name="description" content={description} />
	<meta property="og:description" content={description} />
	<meta content="https://vitroidfpv.com/" property="og:url" />
	<meta name="theme-color" content={color} />
</svelte:head>
<div class="p-4 w-full h-full grid grid-cols-3 gap-4 relative overflow-x-clip">
	{#if !isMobile}
		<div class="col-span-2 rounded-3xl cursor-pointer overflow-hidden z-10 relative aspect-auto">
			<div class="absolute w-full h-full dark:bg-grid-dark bg-grid-light opacity-10 -z-10 pointer-events-none"></div>
			<Canvas rendererParameters={{antialias: true}}>
				<Quad {urls} />
			</Canvas>
		</div>
		<div class="col-span-1 px-4 py-8 bg-neutral-500/10 rounded-3xl backdrop-blur-md border-dashed border-2 border-neutral-500/40 flex duration-300 
			transition-all justify-between items-center flex-col z-10 max-h-[calc(100vh_-_2rem)]"
		>
			<div class="md green overflow-y-auto px-4 mb-4 transition-container overflow-x-hidden">
				{#key groupedModules[pages[currentPage].id]}
					<div in:fly={{x: 20}} out:fly={{x: -20}}>
						{#if groupedModules[pages[currentPage].id]}
							<svelte:component this={groupedModules[pages[currentPage].id].default} />
						{/if}
					</div>
				{/key}
			</div>
			<div class="flex justify-between w-full px-4">
				<div>
					{#if currentPage > 0}
						<Button color="green" isLink={false} size="sm" on:click={() => {step(true)}}>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 rotate-180">
								<path stroke-linecap="round" stroke-linejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
							</svg>
						</Button>
					{/if}
				</div>
				<div>
					{#if currentPage != Object.keys(pages).length - 1}
						<Button color="green" isLink={false} size="sm" on:click={() => {step()}}>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
								<path stroke-linecap="round" stroke-linejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
							</svg>
						</Button>
					{/if}
				</div>
			</div>
		</div>
		<div class="absolute w-full h-full">
			<div
				class="absolute pointer-events-none scale-[2] dark:opacity-40 opacity-80 saturate-150 rotate-90 blur-lg"
			>
				<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g filter="url(#filter0_f_102_2)">
						<path d="M309.084 268.926C302.432 259.168 282.402 267.902 261.56 263.019C256.136 261.749 250.866 258.163 251.678 252.651C253.417
						240.836 266.582 220.805 273.349 213.623C284.406 201.887 253.849 107.926 229.349 115.426C204.849 122.926 186.585 252.426 171.585
						260.426C156.585 268.426 182.322 309.071 192.585 322.926C202.584 336.426 359.236 391.194 382.584 331.926C389.084 315.426 316.584
						279.926 309.084 268.926Z" fill={colors[0]} fill-opacity="0.25"/>
					</g>
					<defs>
						<filter id="filter0_f_102_2" x="39" y="-13" width="471.996" height="499.937" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
							<feFlood flood-opacity="0" result="BackgroundImageFix"/>
							<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
							<feGaussianBlur stdDeviation="64" result="effect1_foregroundBlur_102_2"/>
						</filter>
					</defs>
				</svg>
			</div>
			<div
				class="absolute pointer-events-none scale-[2] dark:opacity-40 opacity-80 saturate-150 -rotate-90 -bottom-20 right-32 blur-lg"
			>
				<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g filter="url(#filter0_f_102_2)">
						<path d="M309.084 268.926C302.432 259.168 282.402 267.902 261.56 263.019C256.136 261.749 250.866 258.163 251.678 252.651C253.417
						240.836 266.582 220.805 273.349 213.623C284.406 201.887 253.849 107.926 229.349 115.426C204.849 122.926 186.585 252.426 171.585
						260.426C156.585 268.426 182.322 309.071 192.585 322.926C202.584 336.426 359.236 391.194 382.584 331.926C389.084 315.426 316.584
						279.926 309.084 268.926Z" fill={colors[2]} fill-opacity="0.25"/>
					</g>
					<defs>
						<filter id="filter0_f_102_2" x="39" y="-13" width="471.996" height="499.937" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
							<feFlood flood-opacity="0" result="BackgroundImageFix"/>
							<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
							<feGaussianBlur stdDeviation="64" result="effect1_foregroundBlur_102_2"/>
						</filter>
					</defs>
				</svg>
					</div>
					<div
				class="absolute pointer-events-none scale-[2] dark:opacity-40 opacity-80 saturate-150 rotate-45 scale-x-[2] scale-y-[3] left-1/3 top-1/4 blur-lg"
					>
				<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g filter="url(#filter0_f_102_2)">
						<path d="M309.084 268.926C302.432 259.168 282.402 267.902 261.56 263.019C256.136 261.749 250.866 258.163 251.678 252.651C253.417
						240.836 266.582 220.805 273.349 213.623C284.406 201.887 253.849 107.926 229.349 115.426C204.849 122.926 186.585 252.426 171.585
						260.426C156.585 268.426 182.322 309.071 192.585 322.926C202.584 336.426 359.236 391.194 382.584 331.926C389.084 315.426 316.584
						279.926 309.084 268.926Z" fill={colors[1]} fill-opacity="0.25"/>
					</g>
					<defs>
						<filter id="filter0_f_102_2" x="39" y="-13" width="471.996" height="499.937" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
							<feFlood flood-opacity="0" result="BackgroundImageFix"/>
							<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
							<feGaussianBlur stdDeviation="64" result="effect1_foregroundBlur_102_2"/>
						</filter>
					</defs>
				</svg>
			</div>
		</div>
	{:else}
		<!--  -->
		<div class="col-span-3 flex flex-col items-center justify-center md">
			<h1>Please open on a computer!</h1>
			<p>
				The 3d models used may be too heavy for mobile devices to handle.
			</p>
			<p>
				For the best experience, please open this page on a computer instead.
			</p>
		</div>
	{/if}
</div>