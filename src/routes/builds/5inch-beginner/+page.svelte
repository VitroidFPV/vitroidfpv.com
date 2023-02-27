<script lang="ts">
	import BuildProduct from "$components/buildsPage/buildProduct.svelte";
	import MainHeader from "$components/mainHeader.svelte";
	import Header from "$components/Header.svelte";
	import Paragraph from "$components/Paragraph.svelte";
	import Rating from "$components/Rating.svelte";
	import Link from "$components/Link.svelte";
	import { fly, fade } from "svelte/transition";
	import tinycolor from "tinycolor2";

	import type { Module } from "$lib/types/module";

	async function getUpvotes(formId: string) {
		const res = await fetch(`https://vitroidfpv-sv.netlify.app/cors?url=http://195.88.87.150:5678/webhook/0963ddbf-a472-4a54-bff7-f37c43d8a64e?id=${formId}`)
		const data = await res.json()
		let novoted = data.length
		let upvoted = 0
		for (let i = 0; i < data.length; i++) {
			if (data[i].data.Useful === "on") {
				upvoted++
			}
		}
		let downvoted = novoted - upvoted
		let deltaVotes = upvoted - downvoted
		return deltaVotes
	}
	let deltaVotes = getUpvotes("63a234bd85496d0008335b10")

	let useful = true
	let feedback = ""
	let pilotName = ""

	// import { priceSum, part } from "$components/buildsPage/stores.js"
	import { slide } from "svelte/transition";

	const modules = import.meta.glob("/modules/buildLists/5inch-beginner/*.md", {eager: true});

	// console.log(modules)
	let grouped_modules: {[category: string]: Array<Module>} = {};

	for (const k in modules) {
		const cat = (modules[k] as Module).metadata?.category;
		if (grouped_modules[cat]) {
			grouped_modules[cat].push(modules[k] as Module);
		} else {
			grouped_modules[cat] = [modules[k] as Module];
		}
	}

	//  if key visible isn't in the metadata, set it to true, otherwise set it to the value in the metadata
	for (const k in grouped_modules) {
		for (const i in grouped_modules[k]) {
			if (grouped_modules[k][i].metadata?.visible === undefined) {
				grouped_modules[k][i].metadata.visible = true;
			}
		}
	}


	let prefix = "Builds";
	let titleRaw = "5\" Beginner Quad";
	let title = " - " + titleRaw;
	let color = "#90d95b";
	let color1 = tinycolor(color).lighten(20).spin(10).toHexString();
	let color2 = tinycolor(color).darken(20).spin(10).toHexString();
	let img = "/uploads/images/beginner_512.png";
	let description =
		"Specced out to be easy to assemble, with affordable and accessible parts, and electronics that should be easy to solder, this build should be perfect to get you started in the world of FPV";
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
					class="md:text-[130px] text-[70px] h-min w-fit mb-2 md:-ml-3 leading-none text-green duration-500">
					{titleRaw}
				</h1>
				<div>
					{#await deltaVotes}
						<div></div>
					{:then deltaVotes}
						<Rating>{deltaVotes}</Rating>
					{:catch err}
						<div></div>
					{/await}
				</div>
			</div>
			<Header text="Cheap, durable, and easy to put together and repair" />
			<p class="text-xl md:w-1/2 md:px-0 px-4">
				{description}<br><br>
				This list is specced for 6s, and includes everything to build a full quad, except parts such as cameras, goggles, receiver and radio systems as those vary depending on prefference and you'll find recommendations on this site elsewhere.<br><br>
				The parts are sorted by price, but they are still relatively cheap without sacrificing on quality
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
	<!-- <MainHeader>{titleRaw}
		<div>
			{#await deltaVotes}
				<div></div>
			{:then deltaVotes}
				<Rating>{deltaVotes}</Rating>
			{:catch err}
				<div></div>
			{/await}
		</div>
	</MainHeader>
	<Header text="Cheap, durable, and easy to put together and repair" />
	<Paragraph>{description}<br>
		This list is specced for 6s, and includes everything to build a full quad, except parts such as cameras, goggles, receiver and radio systems as those vary depending on prefference and you'll find recommendations on this site elsewhere.<br>
		The price range for each part is highlighted, so you can quickly find something to suit your budget. That doesn't mean the budget parts are bad and that the high-end ones are too expensive. It's all relative to the price avarage of the build itself, all of them here are great
		<ul class="flex flex-row justify-between w-full flex-wrap mt-4">
			<li
				class="before:content-[''] before:pr-7 before:rounded-lg before:mr-2 before:bg-green before:relative mb-2">
				Budget
			</li>
			<li
				class="before:content-[''] before:pr-7 before:rounded-lg before:mr-2 before:bg-orange before:relative mb-2">
				Mid-range
			</li>
			<li
				class="before:content-[''] before:pr-7 before:rounded-lg before:mr-2 before:bg-red before:relative mb-2">
				High-end
			</li>
			<li
				class="before:content-[''] before:pr-7 before:rounded-lg before:mr-2 before:bg-violet before:relative mb-2">
				Highly varied
			</li>
		</ul>
	</Paragraph> -->

	<div class="flex flex-col">
		{#each Object.entries(grouped_modules) as [cat, contents]}
			<div class="{cat} my-8 w-full h-fit">
				<div
					class="text-4xl tracking-tight md:w-fit f-full px-1 md:ml-1 ml-2 cat {cat} mb-2 text-center"
					id={cat}>
					{cat}
				</div>
				<div
					class="md:ml-3 grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 border-b-[1px] border-neutral-500/30">
					{#each contents as info}
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
								link={info.metadata.link}
								img={info.metadata.img}
								category={cat}
							/>
						{/if}
					{/each}
				</div>
			</div>
		{/each}
	</div>

	<form 
		class="w-fit flex flex-col form mt-10 bg-gray-500/10 p-4 rounded-2xl dark:shadow-[0_25px_50px_-12px_#00000059,-6px_0px_0px_0px_#2ad162] 
		shadow-[0_25px_50px_-12px_#00000059,-6px_0px_0px_0px_#90d95b]" 
		method="post" 
		name="5inchBeginner" 
		data-netlify="true" 
		data-netlify-honeypot="bot-field"
	>
		<input type="hidden" name="form-name" value="5inchBeginner" />
		<Header text="Feedback" />
		<Paragraph>If you found this page useful (or not), or have any suggestions for parts, ideas and so on, let me know here to help me improve the site!
		</Paragraph>
		<div class="mt-12 flex flex-col">
			<div class="flex">
				<label class="switch">
					<input type="checkbox" id="useful" bind:checked={useful} name="Useful">
					<span class="slider round"></span>
				</label>
				<div class="relative w-4 ml-2">
					{#if useful}
						<div transition:fly={{ y: 10, duration: 300 }} class="text-xl text-green w-4 absolute">✔</div>
					{:else}
						<div transition:fly={{ y: 10, duration: 300 }} class="text-xl text-red w-4 absolute">✘</div>
					{/if}
				</div>
				<label for="useful" class="ml-4">Did you find this page helpful?</label>
			</div>
			<div class="mt-4">
				<div class="relative h-8">
					{#if useful}
						<div transition:fade class="text-green text-lg absolute">I'm glad you found this site it useful! You can give me some more part ideas below</div>
					{:else}
						<div transition:fade class="text-red text-lg absolute">I'm sorry you didn't find this site useful! Please tell me what to improve below</div>
					{/if}
				</div>
				<textarea rows="3"
					class="w-full h-32 my-4 rounded-xl caret-green p-2 bg-contrast-100 dark:bg-main-200 
					outline-none hover:shadow-black/50 shadow-[0_25px_50px_-12px_#00000059] duration-300 focus-within:outline-highlight outline-[3px]
					focus-within:shadow-black/50" name="Feedback" bind:value={feedback}></textarea>

					<input type="text" name="pilotName" bind:value={pilotName} class="w-40 h-8 mt-4 mr-4 rounded-xl caret-green p-2 bg-contrast-100 dark:bg-main-200
					outline-none hover:shadow-black/50 shadow-[0_25px_50px_-12px_#00000059] duration-300 focus-within:outline-highlight outline-[3px]
					focus-within:shadow-black/50" />
					<label for="pilotName">Pilot Name (optional, for crediting)</label>
			</div>
		</div>
		<button type="submit" class="mt-4 rounded-2xl bg-contrast-100 dark:bg-main-300 hover:shadow-highlight/50 dark:hover:shadow-highlight-dark/50 hover:translate-x-2 hover:brightness-125 shadow-md duration-300 w-fit p-2 px-4 border-4 border-highlight dark:border-highlight-dark">Send!</button>

	</form>
</div>
