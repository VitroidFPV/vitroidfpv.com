<script>
	import BuildProduct from "$components/buildsPage/buildProduct.svelte";
	import MainHeader from "$components/mainHeader.svelte";
	import Header from "$components/Header.svelte";
	import Paragraph from "$components/Paragraph.svelte";
	import Rating from "$components/Rating.svelte";
	import Link from "$components/Link.svelte";
	import { fly, fade } from "svelte/transition";

	async function getUpvotes(formId) {
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

	let useful = true
	let feedback = ""
	let pilotName = ""

	// import { priceSum, part } from "$components/buildsPage/stores.js"
	import { slide } from "svelte/transition";

	const modules = import.meta.glob("/modules/buildLists/5inchBeginner/*.md", {eager: true});

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

	//  if key visible isn't in the metadata, set it to true, otherwise set it to the value in the metadata
	for (const [key, value] of Object.entries(grouped_modules)) {
		for (const [key2, value2] of Object.entries(value)) {
			if (value2.metadata.visible == undefined) {
				value2.metadata.visible = true;
			}
		}
	}

	let prefix = "Builds";
	let titleRaw = "5\" Beginner Quad";
	let title = " - " + titleRaw;
	let color = "#90d95b";
	let img = "/uploads/images/beginner_512.png";
	let description =
		"Specced out to be easy to assemble, with affordable and accessible parts, and electronics that should be easy to solder, this build should be perfect to get you started in the world of FPV";
</script>

<script context="module">
	export const prerender = true;
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

<div class="content-box">
	<MainHeader>{titleRaw}
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
	</Paragraph>

	<div class="flex flex-col">
		{#each Object.entries(grouped_modules) as [cat, contents]}
			<div class="{cat} my-8 w-full h-fit">
				<div
					class="text-4xl tracking-tight md:w-fit f-full px-1 md:ml-1 ml-2 cat {cat} mb-2 text-center"
					id={cat}>
					{cat}
				</div>
				<div
					class="ml-3 flex flex-col md:flex-row flex-wrap w-full md:justify-start md:items-start items-center border-b-[1px] border-white/10">
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
								category={cat}
							/>
						{/if}
					{/each}
				</div>
			</div>
		{/each}
	</div>
	<form class="w-fit flex flex-col form mt-10 bg-gray-500/10 p-4 rounded-2xl dark:shadow-[0_25px_50px_-12px_#00000059,-6px_0px_0px_0px_#2ad162] shadow-[0_25px_50px_-12px_#00000059,-6px_0px_0px_0px_#90d95b]" method="post" name="5inchBeginner" netlify netlify-honeypot="bot-field">
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
