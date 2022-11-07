<script>
	import { page } from '$app/stores';
	import BuildProduct from "$components/buildsPage/buildProduct.svelte";
	import MainHeader from "$components/mainHeader.svelte";
	import Header from "$components/Header.svelte";
	import Paragraph from "$components/Paragraph.svelte";

	import { marked } from 'marked';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	const modules = import.meta.glob("/modules/articles/*.md", {eager: true});
	// console.log(JSON.stringify(modules, null, 2));

	let slug = $page.params.slug
	// console.log(slug)
	let slugModule = modules[`/modules/articles/${slug}.md`]

	let categoryColor
	switch (slugModule.metadata.category) {
		case "Guides":
			categoryColor = "green"
			break
		case "Tutorials":
			categoryColor = "cyan"
			break
		case "News":
			categoryColor = "red"
			break
		case "Reviews":
			categoryColor = "yellow"
			break
		case "Misc":
			categoryColor = "violet"
			break
		default:
			categoryColor = "violet"
	}
	let postedDate = new Date(slugModule.metadata.date)
	let postedDateFormatted = postedDate.toLocaleDateString("en-US", {year: "numeric", month: "long", day: "numeric"})
	// console.log(postedDateFormatted)

	const headerRegex = /(?<flag>#{1,6})\s+(?<content>.+)/g
	let headers = 
		Array
		.from(slugModule.metadata.content.matchAll(headerRegex))
		.map(({ groups: { flag, content } }) => ({
			heading: `${ flag.length }`,
			content,
		}))
	console.log(headers)

	let intersecionOptions = {
		root: null,
		rootMargin: "8px",
		threshold: 1
	}
	let intersectingHeader = ""
	let	callback = (entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				// console.log(entry.target.innerHTML)
				intersectingHeader = entry.target.innerHTML
			}
		})
	}
	onMount(() => {
		let intersectingTargets = document.querySelectorAll(".article.md h1, .article.md h2, .article.md h3, .article.md h4")
		let observer = new IntersectionObserver(callback, intersecionOptions);
		intersectingTargets.forEach(target => {
			observer.observe(target)
		})
	})

	let prefix = slugModule.metadata.category;
	let titleRaw = slugModule.metadata.title;
	let title = " - " + titleRaw;
	let color = "#ff9742";
	let img = slugModule.metadata.img;
	let description = slugModule.metadata.description;
</script>

<svelte:head>
	<title>VitroidFPV{title}</title>
	<meta name="author" content="VitroidFPV" />
	<!-- <meta property="og:image" content="https://vitroidfpv-sv.netlify.app{img}" /> -->
	<meta name="twitter:card" content="https://vitroidfpv-sv.netlify.app{img}">
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="VitroidFPV" />
	<meta property="article:author" content="VitroidFPV" />
	<meta property="og:title" content="{prefix}{title}" />
	<meta name="description" content={description} />
	<meta property="og:description" content={description} />
	<meta content="https://vitroidfpv.com/" property="og:url" />
	<meta name="theme-color" content={color} />
</svelte:head>

<div class="content-box md:pr-72">
	<!-- <img src={slugModule.metadata.img} alt="" class="w-3/4" /> -->
	<div class="flex flex-col pr-0 article-card {slugModule.metadata.category} rounded-2xl mb-8 w-fit">
		<div class="rounded-2xl {slugModule.metadata.category} relative select-none group overflow-hidden">
			<div class="absolute card-gradient {slugModule.metadata.category} w-full h-full rounded-2xl opacity-100 group-hover:scale-x-0 origin-left group-hover:blur-sm blur-none duration-500 z-10 backdrop-saturate-0 hover:backdrop-saturate-100"></div>
			<img src="{slugModule.metadata.img}" alt="" class="w-[64rem] m-0 h-96 object-cover rounded-2xl duration-500">
		</div>
		<div class="flex flex-col right-0 mr-24 mt-24 md:visible invisible fixed">
			<div class="text-highlight dark:text-highlight-dark text-3xl font-semibold mb-8">Contents:</div>
			{#each headers as header}
				{#if header.heading < 5}
				<a 	href="#{header.content.replaceAll(" ", "-").toLowerCase()}" 
				class:intersecting-header={header.content === intersectingHeader} 
				class:headeer={header.content != intersectingHeader}
				class="text-xl mb-4 hover:translate-x-2 hover:text-highlight dark:hover:text-highlight-dark duration-300">{header.content}</a>
				{/if}
			{/each}
		</div>
	</div>
	<div class="w-full flex-col items-start border-b-[1px] border-gray-700 mb-8">
		<h1 class="text-{categoryColor} text-5xl mb-2">{slugModule.metadata.title}</h1>
		<h2 class="text-3xl">{slugModule.metadata.description}</h2>
		<div class="my-4">Posted on <span class="text-{categoryColor}">{postedDateFormatted}</span> by <span class="text-{categoryColor}">{slugModule.metadata.author}</span></div>
	</div>

	<div class="flex">
		<div class="article md">
			{@html marked.parse(slugModule.metadata.content)}
		</div>
	</div>
</div>

<style>
	.header {
		color: currentColor;
		transform: translateX(0);
	}

	.intersecting-header {
		color: var(--range-handle);
		transform: translateX(8px);
	}
</style>