<script>
	import Header from "../../components/Header.svelte";
	import MainHeader from "../../components/mainHeader.svelte";
	import CategoryIndex from "../../components/faqPage/categoryIndex.svelte";
	// @ts-ignore
	import FaqQuestion from "../../components/faqPage/faqQuestion.svelte";
	import { onMount } from "svelte";
	import { slide, fade, fly } from "svelte/transition";
	import { page } from "$app/stores";
	import { bind } from "svelte/internal";
	// @ts-ignore
	import Paragraph from "/src/components/Paragraph.svelte";

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

	const modules = import.meta.globEager("/modules/faqs/*.md");
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

	let hash = $page.url.hash.replace("#", "");
	let openQuestion = null;
	for (const cat in grouped_modules) {
		for (const question of grouped_modules[cat]) {
			if (question.metadata.id === hash) {
				openQuestion = question;
				break;
			}
		}
	}
	let questionAnswer = openQuestion ? removeMd(openQuestion.metadata.answer) : "";
	let shortQuestionAnswer = questionAnswer.substring(0, 200) + "...";

	let questionTitle = openQuestion ? openQuestion.metadata.title : "";
	// console.log(questionTitle)
	// console.log(shortQuestionAnswer)	

	let useful = true;
	let feedback = ""

	const upvotes = async() => {
		let response = await fetch ("https://api.netlify.com/api/v1/forms/633def84b40b9d0008711757/submissions", 
			{
				method: "get",
				headers: {
					"Authorization": "Bearer haha no token for you"
				}
			}
		)
		let data = await response.json()
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
	
	let deltaVotes = upvotes()

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
	<MainHeader text="FAQ" />
	<Header text="If you need a quick answer, you might find it here!" />

	<Paragraph
		text="There's a lot of questions in FPV, doesn't matter if you're just starting or not<br>
        You will find most of the common and easy to answer ones here. For more specific ones, there are tutorials planned<br>
        The questions are sorted into individual categories, and next to each one there is a button that will copy a link to the specific one if you want to send it to someone.<br>
        Keep in mind that this site is still in the works. Info here should be mostly reliable, but some may be unfinished and/or buggy"
	>
		<div>
			{#await deltaVotes}
				<div></div>
			{:then deltaVotes}
				<div transition:fly={{ y: -10, duration: 300 }} class="text-[1.35rem] border-l-4 border-highlight dark:border-highlight-dark px-4 mb-4 bg-gray-500/10 py-2 rounded-r-xl"><span class="text-highlight dark:text-highlight-dark">{deltaVotes}</span> people have found this page helpful!</div>
			{:catch err}
				<div>Error while loading upvotes</div>
			{/await}
		</div>
	</Paragraph>

	<ul class="mt-8 text-2xl w-fit">
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
	</ul>

	{#each Object.entries(grouped_modules) as [cat, contents]}
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

	<form class="flex flex-col form mt-10" method="post" name="faq" netlify netlify-honeypot="bot-field">
		<input type="hidden" name="form-name" value="faq" />
		<Header text="Feedback" />
		<Paragraph text="If you found this page useful (or not), or have any suggestions, ideas and so on, let me know here to help me improve the site!" />
		<div class="mt-4 flex flex-col">
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
					class="w-96 h-32 mt-4 rounded-xl caret-green p-2 bg-contrast-100 dark:bg-main-300 
					outline-none hover:shadow-black/50 shadow-[0_25px_50px_-12px_#00000059] duration-300 
					focus-within:shadow-black/50" name="Feedback" bind:value={feedback}></textarea>
			</div>
		</div>
		<button type="submit" class="mt-4 rounded-2xl bg-contrast-100 dark:bg-main-300 hover:shadow-highlight/50 hover:translate-x-2 shadow-lg duration-300 w-fit p-2 px-4 border-4 border-highlight">Send!</button>
	</form>
</div>

<style>
	.img-closed {
		width: 50%;
	}
	.img-open {
		width: 100%;
	}

	:root {
		--toggle-color: #87cc52;
		--toggle-color1: #d6395b;
		--circle-color: #6ba142;
		--circle-color1: #962a42;

		--toggle-transition: 300ms;

		--toggle-width: 2.5rem;
		--toggle-height: 1.5rem;
		--toggle-radius: 1rem;
	}

	/* The switch - the box around the slider */
	.switch {
		position: relative;
		display: inline-block;
		width: var(--toggle-width);
		height: var(--toggle-height);
		transition: filter 300ms;
	}
	.switch:hover {
		filter: brightness(1.2);
	}

	/* Hide default HTML checkbox */
	.switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	/* The slider */
	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: var(--toggle-color1);
		-webkit-transition: var(--toggle-transition);
		transition: var(--toggle-transition);
	}

	.slider:before {
		position: absolute;
		content: "";
		height: var(--toggle-radius);
		width: var(--toggle-radius);
		left: 4px;
		bottom: 4px;
		background-color: var(--circle-color);
		-webkit-transition: var(--toggle-transition);
		transition: var(--toggle-transition);
	}

	input:checked + .slider {
		background-color: var(--toggle-color);
	}

	input + .slider:before {
		background-color: var(--circle-color1);
	}
	input:checked + .slider:before {
		background-color: var(--circle-color);
	}

	input:focus + .slider {
		box-shadow: 0 0 1px #2196F3;
	}

	input:checked + .slider:before {
		-webkit-transform: translateX(var(--toggle-radius));
		-ms-transform: translateX(var(--toggle-radius));
		transform: translateX(var(--toggle-radius));
	}

	/* Rounded sliders */
	.slider.round {
		border-radius: 34px;
	}

	.slider.round:before {
		border-radius: 50%;
	}
</style>
