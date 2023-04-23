<script lang="ts">
	import BuildProduct from "$components/buildsPage/buildProduct.svelte";
	import MainHeader from "$components/MainHeader.svelte";
	import Header from "$components/Header.svelte";
	import Paragraph from "$components/Paragraph.svelte";
	import Rating from "$components/Rating.svelte";
	import Link from "$components/Link.svelte";
	import PriceCompBox from "$components/buildsPage/PriceCompBox.svelte";

	import { getModules } from "$lib/getModules";
	let modules = getModules("/builds/5inch-advanced")

	// import { priceSum, part } from "$components/buildsPage/stores.js"
	import { slide } from "svelte/transition";
	import tinycolor from "tinycolor2";

	let prefix = "Builds";
	let titleRaw = "Advanced 5\"";
	let title = " - " + titleRaw;
	let color = "#ff9742";
	let color1 = tinycolor(color).lighten(20).spin(10).toHexString();
	let color2 = tinycolor(color).darken(20).spin(10).toHexString();
	let img = "/uploads/images/advanced_512.png";
	let description =
		"High end parts for great performance and durability (or just for the looks), or even some more \"exotic\" parts for a unique build.";
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

<PriceCompBox />

<div class="overflow-x-clip h-fit">
	<div class="flex flex-col w-full relative">
		<div class="mt-20 mb-10 w-fit z-20 md:pl-8">
			<MainHeader title={titleRaw} color="orange"/>
			<Header title="Advanced builds for advanced pilots" />
			<p class="text-xl md:w-1/2 md:px-0 px-4">
				{description}<br><br>
				This list is specced for 6s, and includes everything to build a full quad, except parts such as cameras, goggles, receiver and radio systems as those vary depending on prefference and you'll find recommendations on this site elsewhere.<br><br>
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
				<svg width="1024" height="360" viewBox="0 0 1024 360" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full -rotate-12 md:blur-[96px] blur-2xl md:h-full md:scale-x-125 md:scale-y-100 scale-y-200 dark:saturate-100 dark:opacity-70 opacity-200">
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
	<div class="flex flex-col">
		{#each Object.entries(modules.groupedModules) as [cat, contents]}
			{#if cat != "Recommended Builds"}
				<div class="{cat} my-8 w-full h-fit">
					<div
						class="text-4xl tracking-tight md:w-fit f-full px-1 md:ml-1 ml-2 cat {cat} mb-2 text-center"
						id={cat}>
						{cat}
					</div>
					{#each Object.entries(contents) as [group, products]}
						<div
							class="md:ml-3 grid 3xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 border-b-[1px] border-neutral-500/30">
							{#each products as info}
								{#if info.metadata.visible}
									<BuildProduct
										color={info.metadata.color}
										title={info.metadata.title}
										price={info.metadata.price}
										point1={info.metadata.point1}
										point2={info.metadata.point2}
										point3={info.metadata.point3}
										point4={info.metadata.point4}
										point5={info.metadata.point5}
										text={info.metadata.text}
										href={info.metadata.link}
										img={info.metadata.img}
										category={cat}
									/>
								{/if}
							{/each}
						</div>
					{/each}
				</div>
			{/if}
		{/each}

	<!-- <div class="my-8 w-full h-fit Recommended Builds pl-2 md:pl-1">
		<div
			class="text-4xl tracking-tight md:w-fit f-full cat mb-2 text-center">
			Recommended Builds
		</div>
		<p class="md:w-3/4">
			There's multiple different specs and price ranges you can go for, so I've made a few different builds to suit different needs
			
		</p>
		<ul class="mt-4 md:w-3/4">
			<li class="mb-2"><strong>Budget</strong> - Basic parts to build an inexpensive rig for non-spec races and self-practice</li>
			<li class="mb-2"><strong>Mid-range</strong> - A good balance between price and performance, good for most racers for open races</li>
			<li class="mb-2"><strong class="md">High-end 1 (<a href="https://freedomspec.com/">Freedom Spec</a>)</strong> - "in pursuit of the perfect spec class.  
				Our goal is to spec the components that are absolutely necessary and pull the performance of the drones as close as possible.  All while having the 
				easiest transition possible between our spec and open class racing".<br>
				TL;DR: Freedom spec dictates what motors, props, and frame you have to use, the rest is up to you. Apparently, 6" arms are very popular for Freedom spec</li>
			<li class="mb-2"><strong>High-end 2</strong> - The best of the best for open spec, for the most demanding pilots to cut tenths of seconds</li>
			<li class="mb-2"><strong>High-end 3 (EU Edition)</strong> - If you're in the EU, certain parts may be hard to come by. I've checked the main stores in Central Europe, so shipping should be similar across the whole continent</li>
		</ul>
		{#each Object.entries(recommended_products) as [group, contents]}
			<div class="group {group} mt-4 mb-8 w-full h-fit">
				{#if group != "undefined"}
					<div
						class="text-xl tracking-tight w-full {group} mb-2 border-b-[1px] border-gray-700 text-main-50 dark:text-contrast-500"
						id={group}>
						{group}
					</div>
				{/if}

				<div class="flex md:flex-row flex-wrap w-full md:justify-start md:items-start items-center pl-0.5">
					{#each contents as info}
						{#if info.metadata.visible}
							<div class="h-fit max-w-sm {info.metadata.color} border-l-4 product pl-2 my-4 md:mr-8 md:w-1/6 w-1/3">
								<Link color={info.metadata.color} size="2" color1={info.metadata.color} href={info.metadata.link} external="true">{info.metadata.title}</Link>
								<div class="text-base text-main-100 dark:text-contrast-300 mr-2">{info.metadata.price}</div>
							</div>
						{/if}
					{/each}
				</div>
			</div>
		{/each}
		</div> -->
	</div>
</div>
