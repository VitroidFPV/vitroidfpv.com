<script>
	import BuildCard from "$components/buildsPage/buildCard.svelte";
	import Header from "$components/Header.svelte";
	import MainHeader from "$components/mainHeader.svelte";
	import Paragraph from "$components/Paragraph.svelte";

	const modules = import.meta.glob("/modules/buildLists/*.md", {eager: true});
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

	let prefix = "VitroidFPV";
	let titleRaw = "Builds";
	let title = " - " + titleRaw;
	let color = "#2ad162";
	let img = "/uploads/images/1s_toothpick_512.png";
	let description =
		"If you're just a beginner wanting to get their first build, or a long-time pilot that just wants some build inspiration, this is the place for you!";
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
	<MainHeader>Builds</MainHeader>
	<Header text="Parts lists and build guides for any quad you'd want!" />

	<Paragraph>If you're just a beginner wanting to get their first build, or a long-time pilot that just wants some build inspiration, this is the place for you!<br><br>
        The builds here are sorted by difficulty, so you can quickly decide if something is for you as a beginner, or to recommend to someone else. When you hover on a specifc build, it will pop up with some short info, and you can get to the build by clicking on the name<br>
        Keep in mind that this site is still in the works. Info here should be mostly reliable, but some may be unfinished and/or buggy
		<ul class="mt-4">
			<li class="mb-4">
				<div class="flex">
					<div class="dark:bg-main-300 bg-contrast-100 min-w-[8rem] shadow-[0px_-10px_0px] shadow-green h-20 rounded-2xl flex items-center justify-center mr-4 mt-2 text-2xl">Easy</div>
					<div class=""> - You should be able to put this together as a complete beginner. Parts are easy to source, and you'll have enough space to assemble and solder everything</div>
				</div>
			</li>
			<li class="mb-4">
				<div class="flex">
					<div class="dark:bg-main-300 bg-contrast-100 min-w-[8rem] shadow-[0px_-10px_0px] shadow-orange h-20 rounded-2xl flex items-center justify-center mr-4 mt-2 text-2xl">Medium</div>
					<div class=""> - More for intermediate pilots, or if you have more experience with electronics and soldering. Parts usually more expensive and sometimes hard to come across</div>
				</div>
			</li>
			<li class="mb-4">
				<div class="flex">
					<div class="dark:bg-main-300 bg-contrast-100 min-w-[8rem] shadow-[0px_-10px_0px] shadow-red h-20 rounded-2xl flex items-center justify-center mr-4 mt-2 text-2xl">Hard</div>
					<div class=""> - For experienced pilots that know what they're doing, this shouldn't be your first build. Exotic and pricy parts, tight space to build in, and other various build constraints</div>
				</div>
			</li>
		</ul>
	</Paragraph>

	<div class="flex flex-row flex-wrap justify-around">
		{#each Object.entries(grouped_modules) as [a, contents]}
			{#each contents as build}
				<BuildCard
					title={build.metadata.title}
					color={build.metadata.difficulty}
					link={build.metadata.link}
					text1={build.metadata.text1}
					text2={build.metadata.text2}
					text3={build.metadata.text3}
					text4={build.metadata.text4}
					text5={build.metadata.text5}
					img={build.metadata.img}
				/>
			{/each}
		{/each}
	</div>
</div>
