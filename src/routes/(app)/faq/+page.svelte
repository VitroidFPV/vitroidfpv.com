<script lang="ts">
	import Header from "$components/Header.svelte";
	import MainHeader from "$components/MainHeader.svelte";
	import CategoryIndex from "$components/faqPage/categoryIndex.svelte";
	import FaqQuestion from "$components/faqPage/faqQuestion.svelte";
	import Paragraph from "$components/Paragraph.svelte";
	import Rating from "$components/Rating.svelte";
	import FeedbackForm from "$components/FeedbackForm.svelte";

	import type { Module } from "$lib/types/module";

	import { onMount } from "svelte";
	import { slide, fade, fly } from "svelte/transition";

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

	const modules = import.meta.glob("/modules/faq/*.md", {eager: true});
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

	sorted_grouped_modules = Object.fromEntries(
		Object.entries(sorted_grouped_modules).map(([cat, contents]) => [
			cat,
			contents.filter((module) => {
				if (module.metadata.visible === false) {
					return false;
				} else {
					return true;
				}
			}),
		])
	);

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

	async function getUpvotes() {
		const res = await fetch("/api/forms?id=633def84b40b9d0008711757")
		const data = await res.json()

		// console.log(data)

		return data
	}

	let deltaVotes: number

	onMount(() => {
		getUpvotes().then((data) => {
			deltaVotes = data.votes
		})
	})

	let useful = true;
	let feedback = ""
	let pilotName = ""

	let prefix = "VitroidFPV";
	let titleRaw = "FAQ";
	let title = " - " + titleRaw;
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

<div class="overflow-x-clip h-fit">
	<div class="flex flex-col w-full relative px-4 md:px-0">
		<div class="mt-20 mb-10 w-fit z-20 md:pl-8">
			<!-- <div class="flex flex-col md:flex-row items-center w-fit">
				<h1
					class="md:text-[130px] text-[70px] h-min w-fit mb-2 md:-ml-3 ml-3 leading-none text-violet duration-500">
					FAQ
				</h1>
				<div>
					{#if deltaVotes != undefined}
						<Rating>{deltaVotes}</Rating>
					{/if}
				</div>
			</div> -->
			<MainHeader title="{titleRaw}" color="violet" {deltaVotes} />
			<Header title="If you need a quick answer, you might find it here!" />
			<p class="text-xl md:w-1/2">
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
			href="Starting"
		/>
		<CategoryIndex
			icon="bg-[url('https://img.icons8.com/material-outlined/32/d6395b/plus--v1.png')]"
			color="hover:text-red"
			text="Building"
			href="Building"
		/>
		<CategoryIndex
			icon="bg-[url('https://img.icons8.com/material-outlined/32/ffcc00/plus--v1.png')]"
			color="hover:text-yellow"
			text="Betaflight"
			href="Betaflight"
		/>
		<CategoryIndex
			icon="bg-[url('https://img.icons8.com/material-outlined/32/87cc52/plus--v1.png')]"
			color="hover:text-green"
			text="Video"
			href="Video"
		/>
		<CategoryIndex
			icon="bg-[url('https://img.icons8.com/material-outlined/32/5ad8e6/plus--v1.png')]"
			color="hover:text-cyan"
			text="Radio"
			href="Radio"
		/>
		<CategoryIndex
			icon="bg-[url('https://img.icons8.com/material-outlined/32/5a6fe6/plus--v1.png')]"
			color="hover:text-blue"
			text="Hardware"
			href="Hardware"
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
<div class="p-4 md:p-8 content-box">

	<!-- if searched_grouped_modules is not empty, show below -->
	{#if Object.keys(searched_grouped_modules).length > 0}
	{#each Object.entries(searched_grouped_modules) as [cat, contents]}
		<div class="{cat} my-8 w-full h-fit text-justify">
			<div class="text-3xl tracking-tight border-b-2 w-fit px-1 cat {cat} pb-1" id={cat}>{cat}</div>
			<div class="md:grid md:grid-cols-2">
				{#each contents as question}
					<FaqQuestion
						category={cat}
						title={question.metadata.title}
						content={marked.parse(question.metadata.answer)}
						id={question.metadata.id}
					/>
				{/each}
			</div>
		</div>
	{/each}
	{:else}
		<div class="text-3xl tracking-tight w-fit px-1 cat pb-1 my-32">Nothing matching your search results has been found</div>
	{/if}

	<FeedbackForm name="faq"/>
</div>

<style>
	.img-closed {
		width: 50%;
	}
	.img-open {
		width: 100%;
	}
</style>
