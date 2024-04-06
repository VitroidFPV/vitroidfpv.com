<script lang="ts">
	import BuildProduct from "$components/buildsPage/buildProduct.svelte";
	import ProductList from "$components/ProductList.svelte";
	import MainHeader from "$components/MainHeader.svelte";
	import Header from "$components/Header.svelte";
	import Paragraph from "$components/Paragraph.svelte";
	import Rating from "$components/Rating.svelte";
	import Link from "$components/Link.svelte";
	import PriceCompBox from "$components/buildsPage/PriceCompBox.svelte";
	import FeedbackForm from "$components/FeedbackForm.svelte";
	import { onMount } from "svelte";

	import { formatModules } from "$lib/formatModules";
	import type { Module } from "$lib/types/module";

	let importModules = import.meta.glob("/modules/equipment/charging/*.md", {eager: true});
	let modules = formatModules(importModules as { [path: string]: Module; });
	
	import { fly, fade } from "svelte/transition";
	import tinycolor from "tinycolor2";

	async function getUpvotes() {
		const res = await fetch("/api/forms?id=63a234bd85496d0008335b10")
		const data = await res.json()

		return data
	}

	let deltaVotes: number

	onMount(() => {
		getUpvotes().then((data) => {
			deltaVotes = data.votes
		})
	})

	let useful = true
	let feedback = ""
	let pilotName = ""

	import { slide } from "svelte/transition";

	let prefix = "Equipment";
	let titleRaw = "Charging";
	let title = " - " + titleRaw;
	let color = "#ffcc00";
	let color1 = tinycolor(color).lighten(20).spin(10).toHexString();
	let color2 = tinycolor(color).darken(20).spin(10).toHexString();
	let img = "/uploads/images/charger_512.png";
	let description =
		"Everything you need to charge up your packs to fly, from chargers and PSUs to parallel boards and other accessories.";
</script>

<svelte:head>
	<title>VitroidFPV{title}</title>
	<meta name="author" content="VitroidFPV" />
	<meta property="og:image" content="https://vitroidfpv.com{img}" />
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

<div class="overflow-x-clip h-fit relative">
	<div class="flex flex-col w-full relative px-4 md:px-0">
		<div class="mt-20 mb-10 w-fit z-20 md:pl-8 px-4">
			<MainHeader title={titleRaw} color="yellow"/>
			<Header title="Cheap, durable, and easy to put together and repair" />
			<p class="text-xl md:w-1/2 md:px-0">
				{description}<br><br>
				Batteries we use in FPV are not single-use disposable items, so we need a way to charge them. This list covers chargers and other charging 
				equipment across a range of price points.
				<br><br>
				Always make sure that you're charging in a safe environment, and never leave your batteries unattended while charging. Everything in this list 
				should be solid, but nothing can truly be completely safe.
				<ul class="mt-4 grid md:grid-cols-4 grid-cols-2 w-full justify-between">
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

	<ProductList modules={modules.groupedModules}/>

	<!-- <div class="p-4 md:p-8 w-full h-full">
		<FeedbackForm name="5inchBeginner" />
	</div> -->
</div>
