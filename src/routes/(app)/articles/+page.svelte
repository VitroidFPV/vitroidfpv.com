<script lang="ts">
	import Header from "$components/Header.svelte";
	import MainHeader from "$components/MainHeader.svelte";
	import Paragraph from "$components/Paragraph.svelte";
	import ArticlePreview from "$components/articlesPage/ArticlePreview.svelte";
	import { slide } from "svelte/transition";
	import { selectedCategories } from "$lib/stores/categoryStore";

	const modules = import.meta.glob("/modules/articles/*.md", {eager: true});
	// console.log(JSON.stringify(modules, null, 2));
	// sort grouped_modules by date, newest first, add formatted date
	let date_sorted_modules: any[] = [];
	
	interface Module {
		metadata: {
			title: string;
			description: string;
			img: string;
			category: string;
			date: string;
			author: string;
		};
	}


	for (const [key, value] of Object.entries(modules)) {
		const moduleValue = value as unknown as Module;
		const date = new Date(moduleValue.metadata.date);
		const formattedDate = date.toLocaleDateString("en-US", {year: "numeric", month: "long", day: "numeric"});
		moduleValue.metadata.date = formattedDate;
		date_sorted_modules.push(moduleValue);
	}


	date_sorted_modules.sort((a, b) => {
		return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime();
	});

	const categories = [
		{name: "News", color: "red"},
		{name: "Reviews", color: "yellow"},
		{name: "Guides", color: "green"},
		{name: "Tutorials", color: "cyan"},
		{name: "Misc", color: "violet"},
	]

	// let selectedCategories = ["News"] 

	// $: console.log($selectedCategories)

	let selectedModules = date_sorted_modules.filter(module => $selectedCategories.includes(module.metadata.category))
	$: selectedModules = date_sorted_modules.filter(module => $selectedCategories.includes(module.metadata.category))

	// console.log("/articles/" + date_sorted_modules[0].metadata.category.toLowerCase() + "-" + date_sorted_modules[0].metadata.title.toLowerCase().replace(/[^a-zA-Z0-9]/g, "-").replace("---", "-"));
	// let postedDate = new Date(slugModule.metadata.date)
	// let postedDateFormatted = postedDate.toLocaleDateString("en-US", {year: "numeric", month: "long", day: "numeric"})

	let prefix = "VitroidFPV";
	let titleRaw = "Articles";
	let title = " - " + titleRaw;
	let color = "#2ad162";
	let img = "/uploads/images/1s_toothpick_512.png";
	let description =
		"Longer-form articles about various topics in the FPV community. From beginner guides to advanced tips and tricks, you'll find it all here!";
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
			<MainHeader title={titleRaw} color="yellow" />
			<Header title="Totally not a blog" />
			<p class="text-xl md:w-1/2">
				{description}<br>
				Pretty much anything that wouldn't go into the FAQ for being too long, into the builds for not fitting the format, news about anything FPV, or anything else that I feel like writing about<br><br>
				Please keep in mind that this site is still in the works, you may see some things change here and there
			</p>
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
							<stop stop-color="#d99c18" />
							<stop offset="1" stop-opacity="0" />
						</radialGradient>
						<radialGradient id="paint1_radial_1_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(269.537 117.636) scale(269.537 117.636)">
							<stop stop-color="#ffcc00"/>
							<stop offset="1" stop-opacity="0" />
						</radialGradient>
						<radialGradient id="paint2_radial_1_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(202.06 156.176) scale(202.06 156.176)">
							<stop stop-color="#ffcc00"/>
							<stop offset="1" stop-opacity="0" />
						</radialGradient>
						<radialGradient id="paint3_radial_1_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(256.567 131.288) scale(256.567 131.288)">
							<stop stop-color="#f5ce33"/>
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

<div class="p-4 md:p-8 content-box">
	<div class="flex flex-col w-full">
		<div class="Category my-8 w-full h-fit">
			<div
				class="text-4xl tracking-tight md:w-fit f-full px-1 md:ml-0 ml-2 cat Category mb-4 text-center"
				id=Category>
				Newest
			</div>
			<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 w-full">

				{#each date_sorted_modules.slice(0, 3) as module}
					{#if module.metadata.visible}
						<ArticlePreview
							title={module.metadata.title}
							description={module.metadata.description}
							img={module.metadata.img}
							category={module.metadata.category}
							date={module.metadata.date}
							href={"/articles/" + module.metadata.category.toLowerCase() + "-" + module.metadata.title.toLowerCase().replace(`'`, ``).replace(/[^a-zA-Z0-9]/g, "-").replace("---", "-")}
						/>
					{/if}
				{/each}
			</div>
		</div>
		<div class="Category my-8 w-full h-fit">
			<div
				class="text-4xl tracking-tight md:w-fit f-full px-1 md:ml-0 ml-2 cat Category mb-4 text-center"
				id=Category>
				Categories
			</div>
			<div class="flex gap-4 pl-2 mb-4 flex-wrap">
				<!-- <input type="radio" name="category" id="category"> -->
				{#each categories as category, i}
					<div class="flex items-center justify-center group">
						<input type="checkbox" value={category.name} bind:group={$selectedCategories} checked={i == 0} name="category" id={category.name} class="hidden peer" required>
						<label for={category.name} class="flex items-center cursor-pointer ring-2 ring-current px-2 py-1 rounded-full stroke-main-200 dark:stroke-contrast-50 peer-checked:text-{category.color} peer-checked:stroke-{category.color} peer-checked:bg-{category.color}/20 group-hover:text-{category.color} group-hover:stroke-{category.color} duration-300">
							{category.name}
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="4" class="w-4 h-4 ml-2 transition-transform" class:rotate-45={$selectedCategories.includes(category.name)}>
								<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
							</svg>
						</label>
					</div>
				{/each}
			</div>
			<div class="grid md:grid-cols-2 xl:grid-cols-3 xl:gap-12 gap-6 w-full">
				{#each selectedModules as module}
					{#if module.metadata.visible}
						<ArticlePreview
							title={module.metadata.title}
							description={module.metadata.description}
							img={module.metadata.img}
							category={module.metadata.category}
							date={module.metadata.date}
							href={"/articles/" + module.metadata.category.toLowerCase() + "-" + module.metadata.title.toLowerCase().replace(`'`, ``).replace(/[^a-zA-Z0-9]/g, "-").replace("---", "-")}
						/>
					{/if}
				{/each}
			</div>
		</div>
	</div>
</div>
