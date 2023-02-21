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

<div class="overflow-x-clip h-fit">
	<div class="flex flex-col w-full relative">
		<div class="mt-20 mb-10 w-fit z-20 md:pl-8">
			<div class="flex flex-col md:flex-row items-center w-fit">
				<h1
					class="md:text-[130px] text-[70px] h-min w-fit mb-2 md:-ml-3 leading-none text-blue duration-500">
					Equipment
				</h1>
			</div>
			<Header text="All the things you'll need to get in the air, and more!" />
			<p class="text-xl md:w-1/2 md:px-0 px-4">
				{description} and some other minor things that could still make or break a new build<br><br>
				The equipment is sorted into categories, so you can quickly find anything you need. Hover over any card to get more info about what is listed, and click on the name to go to the page<br><br>
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
							<stop stop-color="#293996" />
							<stop offset="1" stop-opacity="0" />
						</radialGradient>
						<radialGradient id="paint1_radial_1_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(269.537 117.636) scale(269.537 117.636)">
							<stop stop-color="#5a6fe6"/>
							<stop offset="1" stop-opacity="0" />
						</radialGradient>
						<radialGradient id="paint2_radial_1_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(202.06 156.176) scale(202.06 156.176)">
							<stop stop-color="#5a6fe6"/>
							<stop offset="1" stop-opacity="0" />
						</radialGradient>
						<radialGradient id="paint3_radial_1_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(256.567 131.288) scale(256.567 131.288)">
							<stop stop-color="#4761f5"/>
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

<div class="content-box">
	<!-- <MainHeader>Equipment</MainHeader>
	<Header text="All the things you'll need to get in the air!" />

	<Paragraph>{description} and some other minor things that could still make or break a new build<br>Keep in mind that this site is still in the works. Info here should be mostly reliable, but some may be unfinished and/or buggy</Paragraph> -->
	<div class="flex flex-row flex-wrap justify-around z-20">
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
					short={build.metadata.short}
				/>
			{/each}
		{/each}
	</div>
</div>
