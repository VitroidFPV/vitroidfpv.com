<script>
	import Header from "$components/Header.svelte";
	import MainHeader from "$components/mainHeader.svelte";
	import Paragraph from "$components/Paragraph.svelte";
	import ArticlePreview from "$components/articlesPage/ArticlePreview.svelte";

	const modules = import.meta.glob("/modules/articles/*.md", {eager: true});
	// console.log(JSON.stringify(modules, null, 2));
	// sort grouped_modules by date, newest first, add formatted date
	let date_sorted_modules = [];
	for (const [key, value] of Object.entries(modules)) {
		let date = new Date(value.metadata.date);
		let formatted_date = date.toLocaleDateString("en-US", {year: "numeric", month: "long", day: "numeric"});
		value.metadata.date = formatted_date;
		date_sorted_modules.push(value);
	}
	date_sorted_modules.sort((a, b) => {
		return new Date(b.metadata.date) - new Date(a.metadata.date);
	});

	console.log("/articles/" + date_sorted_modules[0].metadata.category.toLowerCase() + "-" + date_sorted_modules[0].metadata.title.toLowerCase().replace(/[^a-zA-Z0-9]/g, "-").replace("---", "-"));
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

<div class="content-box">
	<MainHeader>{titleRaw}</MainHeader>
	<Header text="Totally not a blog™" />

	<Paragraph>{description}<br>
		Pretty much anything that wouldn't go into the FAQ for being too long, into the builds for not fitting the format, news about anything FPV, or anything else that I feel like writing about
	</Paragraph>

	<div class="flex flex-col">
		<div class="Category my-8 w-full h-fit">
			<div
				class="text-4xl tracking-tight md:w-fit f-full px-1 md:ml-1 ml-2 cat Category mb-2 text-center"
				id=Category>
				Newest
			</div>
			<div class="ml-3 flex flex-col md:flex-row flex-wrap w-full md:justify-start md:items-start items-center border-b-[1px] border-white/10">

				{#each date_sorted_modules as module}
					{#if module.metadata.visible}
						<ArticlePreview
							title={module.metadata.title}
							description={module.metadata.description}
							img={module.metadata.img}
							category={module.metadata.category}
							date={module.metadata.date}
							author={module.metadata.author}
							link={"/articles/" + date_sorted_modules[0].metadata.category.toLowerCase() + "-" + date_sorted_modules[0].metadata.title.toLowerCase().replace(/[^a-zA-Z0-9]/g, "-").replace("---", "-")}
						/>
					{/if}
				{/each}
			</div>
		</div>
	</div>
</div>
