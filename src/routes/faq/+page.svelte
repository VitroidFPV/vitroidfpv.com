<script>

	/** @type {import('./$types').PageData} */
	export let data;
	let deltaVotes = data.votes;
	
	import Header from "$components/Header.svelte";
	import MainHeader from "$components/mainHeader.svelte";
	import CategoryIndex from "$components/faqPage/categoryIndex.svelte";
	import FaqQuestion from "$components/faqPage/faqQuestion.svelte";
	import Paragraph from "$components/Paragraph.svelte";
	import Rating from "$components/Rating.svelte";

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

	// svelte template <img src="/uploads/axisflying-1-.png" alt="" on:click={() => open = !open} class:img-closed={!open} class:img-open={open} class="h-auto duration-300">

	const modules = import.meta.glob("/modules/faqs/*.md", {eager: true});
	// console.log(modules)
	let grouped_modules = {};

	for (const k in modules) {
		const cat = modules[k].metadata.Category;
		if (grouped_modules[cat]) {
			grouped_modules[cat].push(modules[k]);
		} else {
			grouped_modules[cat] = [modules[k]];
		}
	}

	let sorted_grouped_modules = {};
	// sort grouped_modules in each category by the "order" key into sorted_grouped_modules
	for (const cat in grouped_modules) {
		sorted_grouped_modules[cat] = grouped_modules[cat];
		sorted_grouped_modules[cat].sort((a, b) => {
			return a.metadata.order - b.metadata.order;
		});
	}
	// console.log(JSON.stringify(sorted_grouped_modules, null, 2));
	
	let search = "";
	let searched_grouped_modules = {};
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

<div class="content-box">
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

	<ul class="mt-8 text-2xl w-fit border-b-[1px] border-gray-700">
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

	<!-- if searched_grouped_modules is not empty, show below -->
	{#if Object.keys(searched_grouped_modules).length > 0}
	{#each Object.entries(searched_grouped_modules) as [cat, contents]}
		<div class="{cat} my-8 w-full h-fit text-justify">
			<div class="text-3xl tracking-tight border-b-2 w-fit px-1 cat {cat} pb-1" id={cat}>{cat}</div>
			{#each contents as question}
				<!-- <div class="w-full">
            <div class="w-[38rem] tracking-normal text-main-200 dark:text-contrast-100 border-none">
                <div class="inline-flex text-3xl translate-y-0.5 text-black dark:text-white opacity-10 hover:opacity-30 duration-300 cursor-pointer copy-id">#</div>
                <button type="button" class="collapsible duration-300 after:ml-1 text-[22px] hover:translate-x-1 duartion-150 {cat}">{question.metadata.title}</button>
                <div class="content text-xl bg-contrast-200 dark:bg-main-300 rounded-2xl shadow-xl dark:shadow-black mb-2">
                    <p class="m-4">{@html question.metadata.answer}</p>
                </div>
            </div>
        </div> -->

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

	<form class="w-fit flex flex-col form mt-10 bg-gray-500/10 p-4 rounded-2xl dark:shadow-[0_25px_50px_-12px_#00000059,-6px_0px_0px_0px_#2ad162] shadow-[0_25px_50px_-12px_#00000059,-6px_0px_0px_0px_#90d95b]" method="post" name="faq" netlify netlify-honeypot="bot-field">
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
				<textarea rows="3" type="text" 
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
