<script lang="ts">
	import Header from "$components/Header.svelte";
	import MainHeader from "$components/mainHeader.svelte";
	import CategoryIndex from "$components/faqPage/categoryIndex.svelte";
	import FaqQuestion from "$components/faqPage/faqQuestion.svelte";
	import Paragraph from "$components/Paragraph.svelte";
	import Rating from "$components/Rating.svelte";

	import type { Module } from "$lib/types/module";

	import { onMount } from "svelte";
	import { slide, fade, fly } from "svelte/transition";
	import { page } from "$app/stores";
	import { bind } from "svelte/internal";

	import { marked } from "marked";
	marked.setOptions({
		gfm: true,
		breaks: true,
		sanitize: false,
		smartLists: false,
		smartypants: false,
		xhtml: false
	});

	//  import removeMarkdown
	import removeMd from "remove-markdown";

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
	let deltaVotes = getUpvotes("633def84b40b9d0008711757")

	// svelte template <img src="/uploads/axisflying-1-.png" alt="" on:click={() => open = !open} class:img-closed={!open} class:img-open={open} class="h-auto duration-300">

	const modules = import.meta.glob("/modules/faqs/*.md", {eager: true});
	// console.log(modules)
	let grouped_modules: {[category: string]: Array<Module>} = {};

	for (const k in modules) {
		const cat = (modules[k] as Module).metadata.category;
		if (grouped_modules[cat]) {
			grouped_modules[cat].push(modules[k] as Module);
		} else {
			grouped_modules[cat] = [modules[k] as Module];
		}
	}

	let sorted_grouped_modules: {[category: string]: Array<Module>} = {};
	// sort grouped_modules in each category by the "order" key into sorted_grouped_modules
	for (const cat in grouped_modules) {
		sorted_grouped_modules[cat] = grouped_modules[cat];
		sorted_grouped_modules[cat].sort((a, b) => {
			return a.metadata.order - b.metadata.order;
		});
	}
	// console.log(JSON.stringify(sorted_grouped_modules, null, 2));
	
	let search = "";
	let searched_grouped_modules: { [key: string]: any[] } = {};
	$: { 
		// match search string to each module title in each category, if category is empty, remove it
		for (const cat in sorted_grouped_modules) {
			searched_grouped_modules[cat] = [];
			for (const module of sorted_grouped_modules[cat]) {
				if (module.metadata.answer.toLowerCase().includes(search.toLowerCase())) {
					searched_grouped_modules[cat].push(module);
				}
			}
			if (searched_grouped_modules[cat].length === 0) {
				delete searched_grouped_modules[cat];
			}
		}
	}
	console.log(JSON.stringify(searched_grouped_modules, null, 2));

	onMount(() => {
		if (window.location.hash) {
			setTimeout(() => {
				const el = document.getElementById(window.location.hash.slice(1));
				if (el) {
					el.scrollIntoView();
				}
			}, 300);
		}
	});

	let useful = true;
	let feedback = ""
	let pilotName = ""

	let prefix = "VitroidFPV";
	let title = " - FAQ";
	let color = "#1cd167";
	let description =
		"There's a lot of questions in FPV, doesn't matter if you're just starting or not. You will find most of the common and easy to answer ones here. For more specific ones, there are tutorials planned";
</script>

<svelte:head>
	<title>VitroidFPV{title}</title>
	<meta name="author" content="VitroidFPV" />
	<!-- <meta property="og:image" content="https://www.vitroidfpv.com/sources/cinewhoop_512.png"> -->
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

<!-- <div class="text-main-200 highlight-bg">
	<div class="bg-highlight-dark p-8">
		<MainHeader>FAQ
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
		<Header text="If you need a quick answer, you might find it here!" />
		<Paragraph>
			There's a lot of questions in FPV, doesn't matter if you're just starting or not<br>
			You will find most of the common and easy to answer ones here. For more specific ones, there are tutorials planned<br>
			The questions are sorted into individual categories, and you can search for various keywords to find exactly what you need! (please keep in mind that this function has been implemented in like 30mins so it isn't perfect) Next to each question, there is a button that will copy a link to the specific one if you want to send it to someone.<br>
			Keep in mind that this site is still in the works. Info here should be mostly reliable, but some may be unfinished and/or buggy
		</Paragraph>
	</div>
	<div class="h-32 max-w-full relative z-20 rotate-180">
		<div>
			<svg
				class="w-full h-min"
				id="visual"
				viewBox="0 0 2400 300"
				width="100%"
				height="300"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				version="1.1">
				<rect x="0" y="0" width="2400" height="300" class="hover:-translate-y-2 duration-300 fill-transparent" />
				<path
					d="M0 92L50 91.8C100 91.7 200 91.3 300 112.7C400 134 500 177 600 175.5C700 174 800 128 900 118.5C1000 109 1100 136 1200 151.8C1300 167.7
			1400 172.3 1500 158C1600 143.7 1700 110.3 1800 97.7C1900 85 2000 93 2100 114.8C2200 136.7 2300 172.3 2350 190.2L2400 208L2400 301L2350 301C2300
			301 2200 301 2100 301C2000 301 1900 301 1800 301C1700 301 1600 301 1500 301C1400 301 1300 301 1200 301C1100 301 1000 301 900 301C800 301 700 301
			600 301C500 301 400 301 300 301C200 301 100 301 50 301L0 301Z"
					fill=""
					stroke-linecap="round"
					stroke-linejoin="miter"
					class="duration-300 fill-highlight dark:fill-highlight-dark"
				/>
			</svg>
		</div>
	</div>
</div> -->

<div class="overflow-x-clip h-fit">
	<div class="flex flex-col w-full relative">
		<div class="mt-20 mb-10 w-fit z-20 md:pl-8">
			<div class="flex flex-col md:flex-row items-center w-fit">
				<h1
					class="md:text-[130px] text-[70px] h-min w-fit mb-2 md:-ml-3 leading-none text-violet duration-500">
					FAQ
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
			<Header text="If you need a quick answer, you might find it here!" />
			<p class="text-xl md:w-1/2 md:px-0 px-4">
				There's a lot of questions in FPV, doesn't matter if you're just starting or not<br><br>
				I hope that you'll find answers to most of them. These are mostly mean as quick answers, you can even copy a link to any question to send it to someone! For longer sutff, there are articles planned<br><br>
				Please keep in mind that this site is still in the works, you may see questions come and go
			</p>
		</div>
		<div class="absolute w-full h-full pointer-events-none">
			<div style="-webkit-mask-image: linear-gradient(transparent, black, transparent);"
				class="absolute w-full h-[150%] dark:bg-grid-dark bg-grid-light bg-repeat dark:opacity-[.15] opacity-60 z-10 pointer-events-none">
				<!-- <div class="h-full aspect-square bg-red/5"></div> -->
			</div>
			<div class="absolute w-full top-20">
				<svg width="1024" height="360" viewBox="0 0 1024 360" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full -rotate-12  md:blur-[96px] blur-2xl md:h-full md:scale-x-125 md:scale-y-100 scale-y-200 md:dark:saturate-100 saturate-[2] dark:opacity-70 opacity-100">
					<g opacity="0.5" clip-path="url(#clip0_1_2)">
						<rect width="433.919" height="307.42" transform="matrix(0.652501 0.757788 -0.918405 0.395643 223.833 -50.3698)" fill="url(#paint0_radial_1_2)" />
						<rect width="539.073" height="235.273" transform="matrix(0.979338 0.202229 -0.381519 0.924361 132.254 83.877)" fill="url(#paint1_radial_1_2)" />
						<rect width="404.121" height="312.353" transform="matrix(-0.658984 -0.752157 0.946257 -0.323417 846.453 402.448)" fill="url(#paint2_radial_1_2)" />
						<rect width="513.135" height="262.577" rx="109.572" transform="matrix(-0.977818 -0.209455 0.481307 -0.876552 861.081 275.469)" fill="url(#paint3_radial_1_2)" />
					</g>
					<defs>
						<radialGradient id="paint0_radial_1_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(216.96 153.71) scale(216.96 153.71)">
							<stop stop-color="#6e378c" />
							<stop offset="1" stop-opacity="0" />
						</radialGradient>
						<radialGradient id="paint1_radial_1_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(269.537 117.636) scale(269.537 117.636)">
							<stop stop-color="#9550ba"/>
							<stop offset="1" stop-opacity="0" />
						</radialGradient>
						<radialGradient id="paint2_radial_1_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(202.06 156.176) scale(202.06 156.176)">
							<stop stop-color="#9550ba"/>
							<stop offset="1" stop-opacity="0" />
						</radialGradient>
						<radialGradient id="paint3_radial_1_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(256.567 131.288) scale(256.567 131.288)">
							<stop stop-color="#8f30c2"/>
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
	<ul class="pl-8 text-2xl w-fit z-30 relative">
		<CategoryIndex
			icon="bg-[url('https://img.icons8.com/material-outlined/32/9550ba/plus--v1.png')]"
			color="hover:text-violet"
			text="Starting out"
			link="Starting"
		/>
		<CategoryIndex
			icon="bg-[url('https://img.icons8.com/material-outlined/32/d6395b/plus--v1.png')]"
			color="hover:text-red"
			text="Building"
			link="Building"
		/>
		<CategoryIndex
			icon="bg-[url('https://img.icons8.com/material-outlined/32/ffcc00/plus--v1.png')]"
			color="hover:text-yellow"
			text="Betaflight"
			link="Betaflight"
		/>
		<CategoryIndex
			icon="bg-[url('https://img.icons8.com/material-outlined/32/87cc52/plus--v1.png')]"
			color="hover:text-green"
			text="Video"
			link="Video"
		/>
		<CategoryIndex
			icon="bg-[url('https://img.icons8.com/material-outlined/32/5ad8e6/plus--v1.png')]"
			color="hover:text-cyan"
			text="Radio"
			link="Radio"
		/>
		<CategoryIndex
			icon="bg-[url('https://img.icons8.com/material-outlined/32/5a6fe6/plus--v1.png')]"
			color="hover:text-blue"
			text="Hardware"
			link="Hardware"
		/>
		
		<div class="flex items-center my-4">
			<div class="bg-[url('https://img.icons8.com/ios-filled/50/0f0f0f/search--v1.png')] dark:bg-[url('https://img.icons8.com/ios-filled/50/f7f7f7/search--v1.png')] relative mr-1 w-8 h-8 bg-contain bg-center" />
			<input
				type="text"
				class="w-40 h-12 rounded-full px-3 caret-green p-2 bg-contrast-200 dark:bg-main-200
				outline-none hover:shadow-black/50 shadow-[0_25px_50px_-12px_#00000059] duration-300 focus-within:outline-highlight outline-[3px]
				focus-within:shadow-black/50"
				bind:value={search}
				placeholder="Search"
			/>
		</div>
	</ul>
</div>
<div class="content-box">

	<!-- if searched_grouped_modules is not empty, show below -->
	{#if Object.keys(searched_grouped_modules).length > 0}
	{#each Object.entries(searched_grouped_modules) as [cat, contents]}
		<div class="{cat} my-8 w-full h-fit text-justify">
			<div class="text-3xl tracking-tight border-b-2 w-fit px-1 cat {cat} pb-1" id={cat}>{cat}</div>
			{#each contents as question}
				<FaqQuestion
					category={cat}
					title={question.metadata.title}
					content={marked.parse(question.metadata.answer)}
					id={question.metadata.id}
				/>
			{/each}
		</div>
	{/each}
	{:else}
		<div class="text-3xl tracking-tight w-fit px-1 cat pb-1 my-32">Nothing matching your search results has been found</div>
	{/if}

	<form 
		class="w-fit flex flex-col form mt-10 bg-gray-500/10 p-4 rounded-2xl dark:shadow-[0_25px_50px_-12px_#00000059,-6px_0px_0px_0px_#2ad162] 
			shadow-[0_25px_50px_-12px_#00000059,-6px_0px_0px_0px_#90d95b]" 
		method="post" 
		name="faq" 
		data-netlify 
		data-netlify-honeypot="bot-field"
	>
		<input type="hidden" name="form-name" value="faq" />
		<Header text="Feedback" />
		<Paragraph>If you found this page useful (or not), or have any suggestions, ideas and so on, let me know here to help me improve the site!
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
						<div transition:fade class="text-green text-lg absolute">I'm glad you found this site it useful! You can give me some more ideas below</div>
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

<style>
	.img-closed {
		width: 50%;
	}
	.img-open {
		width: 100%;
	}
</style>
