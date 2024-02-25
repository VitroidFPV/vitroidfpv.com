<script lang="ts">
	import type { PageData } from './$types';
	import type { SvelteComponentTyped } from 'svelte/internal';
	import { onMount } from 'svelte/internal';
	import type { Module } from "$lib/types/module";
	import { browser } from '$app/environment';
	import removeMarkdown from "remove-markdown";
	import { html } from 'satori-html';

	export let data: PageData;

	type C = $$Generic<typeof SvelteComponentTyped<any, any, any>>;
	$: component = data.component as unknown as C;

	let categoryColor: string;
	let hexColor: string;
	switch (data.frontmatter.category) {
		case "Guides":
			categoryColor = "green"
			hexColor = "#87cc52"
			break
		case "Tutorials":
			categoryColor = "cyan"
			hexColor = "#5ad8e6"
			break
		case "News":
			categoryColor = "red"
			hexColor = "#d6395b"
			break
		case "Reviews":
			categoryColor = "yellow"
			hexColor = "#ffcc00"
			break
		case "Misc":
			categoryColor = "violet"
			hexColor = "#9550ba"
			break
		default:
			categoryColor = "violet"
			hexColor = "#9550ba"
	}

	let postedDate = new Date(data.frontmatter.date)
	let postedDateFormatted = postedDate.toLocaleDateString("en-US", {year: "numeric", month: "long", day: "numeric"})
	let updatedDate = new Date(data.frontmatter.updated)
	let updatedDateFormatted = updatedDate.toLocaleDateString("en-US", {year: "numeric", month: "long", day: "numeric"})

	// const headerRegex = /(?<flag>#{1,6})\s+(?<content>.+)/g
	// let headers = 
	// 	Array
	// 	.from(raw.matchAll(headerRegex))
	// 	.map(({ groups }) => ({
	// 		heading: `${ groups?.flag?.length ?? 0 }`,
	// 		content: groups?.content ?? '',
	// 	}))
	let htmlString = ""
	let readTime = 1

	const headerRegex = /<h([1-6])[^>]*>(.*?)<\/h\1>/gi;
	let headers: any = []

	// console.log(headers)

	let intersecionOptions = {
		root: null,
		rootMargin: "0px 0px -50% 0px",
		threshold: 1
	}

	let intersectingHeader = ""
	let	callback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				intersectingHeader = entry.target.innerHTML
			}
		})
	}

	function removeSpecial(string: string) {
		// spaces should be replaced with dashes
		// special characters should be removed
		// all letters should be lowercase
		return string.replaceAll(" ", "-").replaceAll(/[^a-zA-Z0-9-]/g, "").toLowerCase()
	}

	onMount(() => {
		let html = document.getElementsByClassName("article md")[0]
		htmlString = html.innerHTML
		headers = Array.from(htmlString.matchAll(headerRegex), match => {
			const level = match[1];
			const content = match[2];
			return { level, content };
		});

		let intersectingTargets = document.querySelectorAll(".article.md h1, .article.md h2, .article.md h3, .article.md h4")
		// console.log(intersectingTargets)
		let observer = new IntersectionObserver(callback, intersecionOptions);
		intersectingTargets.forEach(target => {
			observer.observe(target)
			// console.log(target)
		})

		// calculate read time from html.textContent
		let readTimeRaw = html.textContent?.split(" ").length ?? 0
		readTime = Math.ceil(readTimeRaw / 200)

		if (window.location.hash) {
			setTimeout(() => {
				const el = document.getElementById(window.location.hash.slice(1));
				if (el) {
					el.scrollIntoView();
				}
			}, 300);
		}
	})

	let prefix = data.frontmatter.category;
	let titleRaw = data.frontmatter.title;
	let title = " - " + titleRaw;
	let color = hexColor;
	let imgRaw = data.frontmatter.img;
	let img = imgRaw
	// if imgRaw is relative, add "https://vitroidfpv-sv.netlify.app" to the beginning
	if (imgRaw.startsWith("/")) {
		img = "https://vitroidfpv.com" + imgRaw
	}

	let description = data.frontmatter.description

	let descriptionLong = `
		${data.frontmatter.description}
		${removeMarkdown(data.frontmatter.content).slice(0, 200) + "..."}
		`;
	let category = data.frontmatter.category;
	let authors = data.frontmatter.author.split(", ");

	// console.log(description)

	let imgOg = `https://vitroidfpv.com/api/og?title=${titleRaw}&description=${description}&category=${category}&img=${img}`
</script>

<svelte:head>
	<title>VitroidFPV{title}</title>
	<meta name="author" content="VitroidFPV" />
	<meta property="og:image" content="{imgOg}" />
	<meta name="twitter:card" content="summary_large_image">
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="VitroidFPV" />
	<meta property="article:author" content="VitroidFPV" />
	<meta property="og:title" content="{prefix}{title}" />
	<!-- <meta name="description" content={descriptionLong} />
	<meta property="og:description" content={descriptionLong} /> -->
	<meta content="https://vitroidfpv.com/" property="og:url" />
	<meta name="theme-color" content={color} />
</svelte:head>

<div class="p-4 md:p-8 content-box">
	<div class="flex justify-between w-full">
		<article class="flex flex-col md:mr-8 mr-0 max-w-[120ch]">
			<div class="md:order-1 order-2 p-0 article-card {data.frontmatter.category} rounded-2xl mb-8 w-full flex xl:flex-row flex-col gap-4 h-fit">
				<div
					class="duration-500 aspect-square w-full"
				>
					<img
						src="{data.frontmatter.img}"
						alt="Article Header"
						class="object-cover object-center rounded-2xl"
					>
				</div>
				<div class="grid grid-cols-2 justify-center gap-4 w-full">
					<div class="col-span-2 row-span-1 bg-neutral-400/5 gap-4 flex flex-col justify-center rounded-2xl outline outline-2 outline-neutral-500/10 shadow-lg md:p-8 p-4 md:text-xl text-lg">
						<h1 class="text-{categoryColor} md:text-5xl text-4xl mb-2">{data.frontmatter.title}</h1>
						<h2 class="md:text-3xl text-xl">{data.frontmatter.description}</h2>
					</div>
					<div class="bg-neutral-400/5 gap-4 flex flex-col justify-center rounded-2xl outline outline-2 outline-neutral-500/10 shadow-lg md:p-8 p-4 md:text-xl text-lg">
						<div>
							A <span
								class="md:text-3xl text-{categoryColor}"
							>
								{data.frontmatter.category == "News" || data.frontmatter.category == "Misc" ? data.frontmatter.category : data.frontmatter.category.slice(0, -1)}
							</span> Article
						</div>
						<div>
							By
							{#each authors as author}
								<span
									class="md:text-3xl text-{categoryColor}"
								>
									{author}
								</span>
								{#if author != authors[authors.length - 1]}
									{" and "}
								{/if}
							{/each}
						</div>
					</div>
					<div class="bg-neutral-400/5 gap-4 flex flex-col justify-center rounded-2xl outline outline-2 outline-neutral-500/10 shadow-lg md:p-8 p-4 md:text-xl text-lg">
						<div>
							Posted on <span class="text-{categoryColor}">{postedDateFormatted}</span>
							{#if data.frontmatter.updated}
								, last updated <span class="text-{categoryColor}">{updatedDateFormatted}</span>
							{/if}
						</div>
						<div>
							Taking <span class="text-{categoryColor}">{readTime}min</span> to read
						</div>
					</div>
				</div>
			</div>
			<!-- <div class="md:order-2 order-1 flex-col items-start w-fit mb-4 md:mt-0 mt-8">
				<h1 class="text-{categoryColor} md:text-5xl text-4xl mb-2">{data.frontmatter.title}</h1>
				<h2 class="md:text-3xl text-xl">{data.frontmatter.description}</h2>
			</div> -->
			<div class="order-3 article md !duration-300 transition-colors {categoryColor}">
				<svelte:component this={component} />
			</div>
		</article>
		<div class="md:flex md:flex-col hidden sticky h-fit left-full top-0 pl-4 w-fit max-w-[24rem]">
			<div class="text-{categoryColor} text-3xl w-fit font-semibold mt-8 mb-4 border-b-2 border-current">Contents:</div>
			{#each headers as header}
				{#if +header.level < 5}
				<a 	href="#{removeSpecial(header.content)}"
					class={
					`text-[0.95rem] mb-2 leading-tight heading-${header.level} hover:translate-x-1 hover:text-${categoryColor} duration-300 w-fit border-l-2 border-transparent`
					+ (header.content === intersectingHeader ? ` text-${categoryColor} !border-current` : "")}
				>
					{header.content}
				</a>
				{/if}
			{/each}
		</div>
	</div>
</div>

<style>
	.heading-1 {
		padding-left: 0.25rem;
	}
	.heading-2 {
		padding-left: 0.5rem;
	}
	.heading-3 {
		padding-left: 1rem;
	}
	.heading-4 {
		padding-left: 1.5rem;
	}
</style>