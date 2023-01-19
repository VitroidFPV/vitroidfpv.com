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

<div class="overflow-x-clip h-fit">
	<div class="flex flex-col w-full relative">
		<div class="mt-20 mb-10 w-fit z-20 md:pl-8">
			<div class="flex flex-col md:flex-row items-center w-fit">
				<h1
					class="md:text-[130px] text-[70px] h-min w-fit mb-2 md:-ml-3 leading-none text-red duration-500">
					Builds
				</h1>
			</div>
			<Header text="Parts lists and build guides for any quad you'd want!" />
			<p class="text-xl md:w-1/2 md:px-0 px-4">
				If you're just a beginner wanting to get their first build, or a long-time pilot that just wants some build inspiration, this is the place for you!<br><br>
				The builds here are sorted by difficulty, so you can quickly decide if something is for you as a beginner, or to recommend to someone else. Hover over any card to get more info, and click on the name to go to the build page<br><br>
				Please keep in mind that this site is still in the works, you may see some things change here and there
			</p>
		</div>
		<div class="absolute w-full h-full pointer-events-none">
			<div style="-webkit-mask-image: linear-gradient(transparent, black, transparent);"
				class="absolute w-full h-[150%] dark:bg-grid-dark bg-grid-light bg-repeat dark:opacity-[.15] opacity-60 z-10 pointer-events-none">
				<!-- <div class="h-full aspect-square bg-red/5"></div> -->
			</div>
			<div class="absolute w-full top-20">
				<svg width="1024" height="360" viewBox="0 0 1024 360" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full -rotate-12 md:blur-3xl blur-2xl md:h-full md:scale-x-125 md:scale-y-100 scale-y-200 dark:saturate-100 dark:opacity-70 opacity-200">
					<g opacity="0.5" clip-path="url(#clip0_1_2)">
						<rect width="433.919" height="307.42" transform="matrix(0.652501 0.757788 -0.918405 0.395643 223.833 -50.3698)" fill="url(#paint0_radial_1_2)" />
						<rect width="539.073" height="235.273" transform="matrix(0.979338 0.202229 -0.381519 0.924361 132.254 83.877)" fill="url(#paint1_radial_1_2)" />
						<rect width="404.121" height="312.353" transform="matrix(-0.658984 -0.752157 0.946257 -0.323417 846.453 402.448)" fill="url(#paint2_radial_1_2)" />
						<rect width="513.135" height="262.577" rx="109.572" transform="matrix(-0.977818 -0.209455 0.481307 -0.876552 861.081 275.469)" fill="url(#paint3_radial_1_2)" />
					</g>
					<defs>
						<radialGradient id="paint0_radial_1_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(216.96 153.71) scale(216.96 153.71)">
							<stop stop-color="#911f37" />
							<stop offset="1" stop-opacity="0" />
						</radialGradient>
						<radialGradient id="paint1_radial_1_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(269.537 117.636) scale(269.537 117.636)">
							<stop stop-color="#d6395b"/>
							<stop offset="1" stop-opacity="0" />
						</radialGradient>
						<radialGradient id="paint2_radial_1_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(202.06 156.176) scale(202.06 156.176)">
							<stop stop-color="#d6395b"/>
							<stop offset="1" stop-opacity="0" />
						</radialGradient>
						<radialGradient id="paint3_radial_1_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(256.567 131.288) scale(256.567 131.288)">
							<stop stop-color="#f5365f"/>
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
	<!-- <MainHeader>Builds</MainHeader>
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
	</Paragraph> -->

	<div class="flex flex-row flex-wrap justify-around z-20">
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
