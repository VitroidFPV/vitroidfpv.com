<script lang="ts">
	import BuildProduct from "$components/buildsPage/buildProduct.svelte";
	import MainHeader from "$components/mainHeader.svelte";
	import Header from "$components/Header.svelte";
	import Paragraph from "$components/Paragraph.svelte";
	import tinycolor from "tinycolor2";

	import type { Module } from "$lib/types/module";

	import { marked } from "marked";
	marked.setOptions({
		gfm: true,
		breaks: true,
		sanitize: false,
		smartLists: false,
		smartypants: false,
		xhtml: false
	});

	const modules = import.meta.glob("/modules/equipmentLists/radioList/*.md", {eager: true});
	let grouped_modules: {[category: string]: {[group: string]: Array<Module>}} = {};

	for (const k in modules) {
	const cat = (modules[k] as Module).metadata.Category;
	const group = (modules[k] as Module).metadata.group;

	if (grouped_modules[cat]) {
		if (grouped_modules[cat][group]) {
			grouped_modules[cat][group].push(modules[k] as Module);
		} else {
			grouped_modules[cat][group] = [modules[k] as Module];
		}
	} else {
		grouped_modules[cat] = {};
		grouped_modules[cat][group] = [modules[k] as Module];
	}}

	// sort the products in each category by the "order" key, and have the group "Info" be last while keeping the same structure
	let sorted_grouped_modules: {[category: string]: {[group: string]: Array<Module>}} = {};
	for (const cat in grouped_modules) {
		sorted_grouped_modules[cat] = {};
		const groups = Object.keys(grouped_modules[cat]);
		groups.sort((a, b) => {
			if (a === "Info") return 1;
			if (b === "Info") return -1;
			return grouped_modules[cat][a][0].metadata.order - grouped_modules[cat][b][0].metadata.order;
		});
		for (const group of groups) {
			sorted_grouped_modules[cat][group] = grouped_modules[cat][group];
		}
	}

	// if key visible isn't in the metadata, set it to true, otherwise set it to the value in the metadata
	for (const cat in grouped_modules) {
		for (const group in grouped_modules[cat]) {
			for (const product in grouped_modules[cat][group]) {
				if (!grouped_modules[cat][group][product].metadata.visible) {
					grouped_modules[cat][group][product].metadata.visible = true;
				}
			}
		}
	}
	// omfg copilot carries this shit

	// console.log(JSON.stringify(sorted_grouped_modules));

	let prefix = "VitroidFPV";
	let titleRaw = "Radio Equipment";
	let title = " - " + titleRaw;
	let color = "#5ad8e6";
	let color1 = tinycolor(color).lighten(20).spin(10).toHexString();
	let color2 = tinycolor(color).darken(20).spin(10).toHexString();
	let img = "/uploads/images/radio_512.png";
	let description =
		"Radios, TX modules, receivers, antennas, and any other misc accessories for radios, all you need to get control over your craft";
</script>

<svelte:head>
	<title>VitroidFPV{title}</title>
	<meta name="author" content="VitroidFPV" />
	<meta property="og:image" content="https://vitroidfpv-sv.netlify.app{img}" />
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

<div class="overflow-x-clip h-fit">
	<div class="flex flex-col w-full relative">
		<div class="mt-20 mb-10 w-fit z-20 md:pl-8">
			<div class="flex flex-col md:flex-row items-center w-fit">
				<h1
					class="md:text-[130px] text-[70px] h-min w-fit mb-2 md:-ml-3 leading-none text-cyan duration-500">
					{titleRaw}
				</h1>
			</div>
			<Header text="Everything you need to control your quad" />
			<p class="text-xl md:w-1/2 md:px-0 px-4">
				{description}<br><br>
				If you're trying to decide, or don't even have any prior experience, this list will hopefully help you!<br><br>
				Prices may depend on where and when you source the parts, (prices and specs are sourced from the manufacturers website at the time of the writing when possible)
				<ul class="flex flex-row justify-between w-fit flex-wrap mt-4">
					<li
						class="before:content-[''] before:pr-7 before:rounded-lg before:mr-2 before:bg-green before:relative mb-2 mr-8">
						Budget
					</li>
					<li
						class="before:content-[''] before:pr-7 before:rounded-lg before:mr-2 before:bg-orange before:relative mb-2 mr-8">
						Mid-range
					</li>
					<li
						class="before:content-[''] before:pr-7 before:rounded-lg before:mr-2 before:bg-red before:relative mb-2 mr-8">
						High-end
					</li>
					<li
						class="before:content-[''] before:pr-7 before:rounded-lg before:mr-2 before:bg-violet before:relative mb-2">
						Highly varied
					</li>
				</ul>
		</div>
		<div class="absolute w-full h-full pointer-events-none">
			<div style="-webkit-mask-image: linear-gradient(transparent, black, transparent);"
				class="absolute w-full h-[150%] dark:bg-grid-dark bg-grid-light bg-repeat dark:opacity-[.15] opacity-60 z-10 pointer-events-none">
				<!-- <div class="h-full aspect-square bg-red/5"></div> -->
			</div>
			<div class="absolute w-full top-20">
				<svg width="1024" height="360" viewBox="0 0 1024 360" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full -rotate-12  md:blur-[96px] blur-2xl md:h-full md:scale-x-125 md:scale-y-100 scale-y-200 dark:saturate-100 dark:opacity-70 opacity-200">
					<g opacity="0.5" clip-path="url(#clip0_1_2)">
						<rect width="433.919" height="307.42" transform="matrix(0.652501 0.757788 -0.918405 0.395643 223.833 -50.3698)" fill="url(#paint0_radial_1_2)" />
						<rect width="539.073" height="235.273" transform="matrix(0.979338 0.202229 -0.381519 0.924361 132.254 83.877)" fill="url(#paint1_radial_1_2)" />
						<rect width="404.121" height="312.353" transform="matrix(-0.658984 -0.752157 0.946257 -0.323417 846.453 402.448)" fill="url(#paint2_radial_1_2)" />
						<rect width="513.135" height="262.577" rx="109.572" transform="matrix(-0.977818 -0.209455 0.481307 -0.876552 861.081 275.469)" fill="url(#paint3_radial_1_2)" />
					</g>
					<defs>
						<radialGradient id="paint0_radial_1_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(216.96 153.71) scale(216.96 153.71)">
							<stop stop-color="{color1}" />
							<stop offset="1" stop-opacity="0" />
						</radialGradient>
						<radialGradient id="paint1_radial_1_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(269.537 117.636) scale(269.537 117.636)">
							<stop stop-color="{color}"/>
							<stop offset="1" stop-opacity="0" />
						</radialGradient>
						<radialGradient id="paint2_radial_1_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(202.06 156.176) scale(202.06 156.176)">
							<stop stop-color="{color}"/>
							<stop offset="1" stop-opacity="0" />
						</radialGradient>
						<radialGradient id="paint3_radial_1_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(256.567 131.288) scale(256.567 131.288)">
							<stop stop-color="{color2}"/>
							<stop offset="1" stop-opacity="0" />
						</radialGradient>
						<clipPath id="clip0_1_2">
							<rect width="1024" height="360" fill="white" />
						</clipPath>
					</defs>
				</svg>
			</div>
		</div>
	</div>
</div>

<div class="content-box">
	<!-- <MainHeader>{titleRaw}</MainHeader>
	<Header text="Everything you need to control your quad" />
	<Paragraph>
		{description}<br>
    If you're trying to decide, or don't even have any prior experience, this list will hopefully help you!<br><br>
    Prices may depend on where and when you source the parts, (prices and specs are sourced from the manufacturers website at the time of the writing when possible)
	<ul class="flex flex-row justify-between w-full flex-wrap mt-4">
		<li class="before:content-[''] before:pr-7 before:rounded-lg before:mr-2 before:bg-green before:relative mb-2">
			Budget
		</li>
		<li class="before:content-[''] before:pr-7 before:rounded-lg before:mr-2 before:bg-orange before:relative mb-2">
			Mid-range
		</li>
		<li class="before:content-[''] before:pr-7 before:rounded-lg before:mr-2 before:bg-red before:relative mb-2">
			High-end
		</li>
		<li class="before:content-[''] before:pr-7 before:rounded-lg before:mr-2 before:bg-violet before:relative mb-2">
			Highly varied
		</li>
	</ul>
	</Paragraph> -->

	{#each Object.entries(sorted_grouped_modules) as [cat, contents]}
		<div class="{cat} category my-8 w-full h-fit flex flex-col">
			<div class="text-4xl tracking-tight w-fit px-1 cat {cat} mb-2" id={cat}>{cat}</div>
			{#each Object.entries(contents) as [group, info]}
				{#if group != "Info"}
					<div class="group {group} my-4 w-full h-fit">
						{#if group != "undefined"}
							<div
								class="text-xl tracking-tight w-full px-1 {group} mb-2 border-b-[1px] border-gray-700 text-main-50 dark:text-contrast-500"
								id={group}>
								{group}
							</div>
						{/if}
						<div
							class="md:ml-3 grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 border-b-[1px] border-neutral-500/30">
								{#each info as product}
									{#if product.metadata.visible}
										<BuildProduct
											color={product.metadata.color}
											title={product.metadata.title}
											price={product.metadata.price}
											point1={product.metadata.point1}
											point2={product.metadata.point2}
											point3={product.metadata.point3}
											point4={product.metadata.point4}
											point5={product.metadata.point5}
											text={product.metadata.text}
											link={product.metadata.link}
											img={product.metadata.img}
											category={cat}
										/>
									{/if}
								{/each}
						</div>
					</div>
				{:else}
					{#each info as product}
						<div class="md ml-4 group {group}">{@html marked.parse(product.metadata.text)}</div>
					{/each}
				{/if}
			{/each}
		</div>
	{/each}
</div>
