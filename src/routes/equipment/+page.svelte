<script>
	import BuildCard from "$components/buildsPage/buildCard.svelte";
	import Header from "$components/Header.svelte";
	import MainHeader from "$components/mainHeader.svelte";
	import Paragraph from "$components/Paragraph.svelte";

	const modules = import.meta.glob("/modules/equipmentLists/*.md", {eager: true});
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
	let titleRaw = "Equipment";
	let title = " - " + titleRaw;
	let color = "#2ad162";
	let img = "/uploads/images/1s_toothpick_512.png";
	let description =
		"Everything that you will need to get building and flying. From goggles, cams, antennas, to radio transmitters and receivers, to tools and soldering equipment";

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
	<MainHeader>Equipment</MainHeader>
	<Header text="All the things you'll need to get in the air!" />

	<Paragraph>{description} and some other minor things that could still make or break a new build<br>Keep in mind that this site is still in the works. Info here should be mostly reliable, but some may be unfinished and/or buggy</Paragraph>
	<div class="flex flex-row flex-wrap justify-around">
		{#each Object.entries(grouped_modules) as [a, contents]}
			{#each contents as build}
				<!-- <BuildCard
					title={build.metadata.title}
					color={build.metadata.color}
					link={build.metadata.link}
					short={build.metadata.short}
					text1={build.metadata.text1}
					text2={build.metadata.text2}
					text3={build.metadata.text3}
					text4={build.metadata.text4}
					text5={build.metadata.text5}
				/> -->

				<BuildCard
					title={build.metadata.title}
					color={build.metadata.color}
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
