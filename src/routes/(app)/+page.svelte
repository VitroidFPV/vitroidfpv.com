<script>
	import PropSvg from "$components/PropSvg.svelte";
	import Link from "$components/Link.svelte";
	import Button from "$components/Button.svelte";
	import { onMount } from "svelte";
	import { fly } from "svelte/transition";
	import netlifyIdentity from "netlify-identity-widget";
	import { Icon } from "@steeze-ui/svelte-icon";
	import { QuestionMarkCircle, WrenchScrewdriver, Newspaper } from "@steeze-ui/heroicons";

	import Radiomaster from "$components/gradientLogos/Radiomaster.svelte";
	import Hq from "$components/gradientLogos/HQ.svelte";
	import Axis from "$components/gradientLogos/Axis.svelte";
	import Dogcom from "$components/gradientLogos/Dogcom.svelte";

	let index = 0;

	onMount(() => {
		setInterval(() => {
			index = index < 3 ? index + 1 : 0;
		}, 5000);

		netlifyIdentity.init();
		if (netlifyIdentity) {
			netlifyIdentity.on("init", (user) => {
				if (!user) {
					netlifyIdentity.on("login", () => {
						document.location.href = "/admin/";
						console.log(user)
					});
				}
			});
		}
	});

	import { Canvas } from '@threlte/core'
	import HomeProp from "$components/three/HomeProp.svelte";
	import HomeFc from "$components/three/HomeFc.svelte";
	import HomeIron from "$components/three/HomeIron.svelte";
	import HomeFrame from "$components/three/HomeFrame.svelte";
	import HomeMonitor from "$components/three/HomeMonitor.svelte";

	let prefix = "VitroidFPV";
	let title = "";
	let color = "#1cd167";
	let description =
		"This site is my project to keep FPV info easily and more importantly quickly readable when needed. It's constantly getting updated, so expect new stuff (and maybe some bugs) to be added here and there";
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

<div class="flex flex-col w-full overflow-hidden">
	<div class="flex flex-col w-full relative px-4 md:px-0">
		<div class="flex h-full w-full items-center">
			<div class="mt-64 md:mb-24 mb-16 w-full z-30 h-full">
				<h1
					class="md:text-[180px] whitespace-nowrap text-[90px] font-caveat h-fit w-fit leading-none dark:text-highlight-dark duration-500">
					Vitroid FPV
				</h1>
				<!-- <div class="transition-container md:ml-8 ml-4 mt-8">
					{#key index}
						<div in:fly|local={{duration:750, y:0, x:100}} out:fly|local={{duration:750, y:0, x:-100}}>
							{#if index == 0}
								<Button isLink={true} href="/articles/guides-getting-into-fpv" color="yellow">Get Started in FPV</Button>
							{:else if index == 1}
								<Button isLink={true} href="/faq" color="violet">Get Answers in the FAQ</Button>
							{:else if index == 2}
								<Button isLink={true} href="/builds" color="green">Visit Build Guides</Button>
							{:else if index == 3}
								<Button isLink={true} href="/equipment" color="cyan">Find Equipment Recommendations</Button>
							{/if}
						</div>
					{/key}
				</div> -->
			</div>
			<div class="h-full w-2/3 hidden md:block aspect-square z-10 mt-16">
				<Canvas>
					<HomeProp />
				</Canvas>
			</div>
		</div>
		<div class="absolute w-full h-full flex md:top-20 top-28">
			<div style="-webkit-mask-image: linear-gradient(transparent, black, transparent);"
				class="absolute w-full h-full dark:bg-grid-dark bg-grid-light bg-repeat dark:opacity-[.15] opacity-60 z-10 pointer-events-none">
				<!-- <div class="h-full aspect-square bg-red/5"></div> -->
			</div>
			<div class="absolute w-full h-full">
				<svg width="1024" height="360" viewBox="0 0 1024 360" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full  md:blur-[96px] blur-2xl md:h-full md:scale-x-125 md:dark:saturate-100 saturate-[3] dark:opacity-70 opacity-100">
					<g opacity="0.5" clip-path="url(#clip0_1_2)">
						<rect width="433.919" height="307.42" transform="matrix(0.652501 0.757788 -0.918405 0.395643 223.833 -50.3698)" fill="url(#paint0_radial_1_2)" />
						<rect width="539.073" height="235.273" transform="matrix(0.979338 0.202229 -0.381519 0.924361 132.254 83.877)" fill="url(#paint1_radial_1_2)" />
						<rect width="404.121" height="312.353" transform="matrix(-0.658984 -0.752157 0.946257 -0.323417 846.453 402.448)" fill="url(#paint2_radial_1_2)" />
						<rect width="513.135" height="262.577" rx="109.572" transform="matrix(-0.977818 -0.209455 0.481307 -0.876552 861.081 275.469)" fill="url(#paint3_radial_1_2)" />
					</g>
					<defs>
						<radialGradient id="paint0_radial_1_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(216.96 153.71) scale(216.96 153.71)">
							<stop stop-color="#2AD162" />
							<stop offset="1" stop-opacity="0" />
						</radialGradient>
						<radialGradient id="paint1_radial_1_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(269.537 117.636) scale(269.537 117.636)">
							<stop stop-color="#90d95b"/>
							<stop offset="1" stop-opacity="0" />
						</radialGradient>
						<radialGradient id="paint2_radial_1_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(202.06 156.176) scale(202.06 156.176)">
							<stop stop-color="#2AD162"/>
							<stop offset="1" stop-opacity="0" />
						</radialGradient>
						<radialGradient id="paint3_radial_1_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(256.567 131.288) scale(256.567 131.288)">
							<stop stop-color="#5AD8E6"/>
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
	<div>
		<div class="h-fit max-w-full relative z-20">
			<div>
				<svg
					class="max-w-full h-fit"
					id="visual"
					viewBox="0 0 2400 300"
					width="100%"
					height="300"
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					version="1.1">
					<rect x="0" y="0" width="2400" height="300" class="hover:-translate-y-2 duration-300 fill-transparent" />
					<path
						d="M0 92L50 91.8C100 91.7 200 91.3 300 112.7C400 134 500 177 600 175.5C700 174 800 128 900 118.5C1000 109 1100 136 1200 151.8C1300 167.7
				1400 172.3 1500 158C1600 143.7 1700 110.3 1800 97.7C1900 85 2000 93 2100 114.8C2200 136.7 2300 172.3 2350 190.2L2400 208L2400 301L2350 301C2300
				301 2200 301 2100 301C2000 301 1900 301 1800 301C1700 301 1600 301 1500 301C1400 301 1300 301 1200 301C1100 301 1000 301 900 301C800 301 700 301
				600 301C500 301 400 301 300 301C200 301 100 301 50 301L0 301Z"
						fill=""
						stroke-linecap="round"
						stroke-linejoin="miter"
						class="duration-300 fill-highlight dark:fill-highlight-dark"
					/>
				</svg>
			</div>
		</div>
		<div class="w-full h-fit bg-highlight dark:bg-highlight-dark relative -mb-1 flex md:flex-row flex-col highlight-bg duration-300">
			<div class="flex flex-col md:w-1/2">
				<div class="dark:text-main-200 text-main-100 px-8 z-10">
					<h2 class="text-4xl font-semibold my-4 border-b-4 border-dotted w-fit border-main-100">
						Your source for quick FPV info!
					</h2>
					<p class="text-xl leading-normal">
						Heyo! I'm a 18y/o FPV pilot, Betaflight and Front-End developer<br /><br />
						This site is my project to keep FPV info easily and more importantly quickly readable when
						needed. It's constantly getting updated, so expect new stuff (and maybe some bugs) to be
						added here and there.<br /> If you wish to contribute, you can go to the GitHub
						<a href="https://github.com/VitroidFPV/VitroidFPV" class="underline hover:brightness-125 duration-300">here</a>
						, and if you like what I do, you can support me <a href="/support" class="underline hover:brightness-125 duration-300">here</a>
					</p>
				</div>
				<!-- <div class="absolute w-full h-full bg-grid-dark opacity-50" style="-webkit-mask-image: linear-gradient(transparent, black, transparent);"></div> -->
			</div>
			<div class="w-full flex h-fit md:flex-col flex-row justify-between md:pt-0 pt-4 md:w-1/2">
				<PropSvg pathClass="fill-[#a6e17c] dark:fill-[#65dd8d] prop" svgClass="prop-svg h-fit w-fit relative md:top-10 md:left-10 rotate-12"/>
				<PropSvg pathClass="fill-[#a6e17c] dark:fill-[#65dd8d] prop" svgClass="prop-svg h-fit w-fit relative md:left-96 md:bottom-10 -rotate-12"/>
				<PropSvg pathClass="fill-[#a6e17c] dark:fill-[#65dd8d] prop" svgClass="prop-svg h-fit w-fit relative md:left-32 md:bottom-10 rotate-45"/>
			</div>
		</div>
		<div class="h-fit max-w-full rotate-180">
			<div>
				<svg
					class="max-w-full h-fit"
					id="visual"
					viewBox="0 0 2400 300"
					width="100%"
					height="300"
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					version="1.1">
					<rect x="0" y="0" width="2400" height="300" class="hover:-translate-y-2 duration-300 fill-transparent" />
					<path
						d="M0 92L50 91.8C100 91.7 200 91.3 300 112.7C400 134 500 177 600 175.5C700 174 800 128 900 118.5C1000 109 1100 136 1200 151.8C1300 167.7
				1400 172.3 1500 158C1600 143.7 1700 110.3 1800 97.7C1900 85 2000 93 2100 114.8C2200 136.7 2300 172.3 2350 190.2L2400 208L2400 301L2350 301C2300
				301 2200 301 2100 301C2000 301 1900 301 1800 301C1700 301 1600 301 1500 301C1400 301 1300 301 1200 301C1100 301 1000 301 900 301C800 301 700 301
				600 301C500 301 400 301 300 301C200 301 100 301 50 301L0 301Z"
						fill=""
						stroke-linecap="round"
						stroke-linejoin="miter"
						class="duration-300 fill-highlight dark:fill-highlight-dark"
					/>
				</svg>
			</div>
		</div>
	</div>

	<div class="xl:px-16 md:px-8 px-4 my-8">
		<h2 class="text-6xl text-highlight dark:text-highlight-dark mb-4">Sponsors</h2>
		<div class="grid grid-cols-2 xl:grid-cols-4 items-center justify-center max-w-[100vw] xl:gap-32 gap-16">
			<Radiomaster />
			<Hq />
			<Axis />
			<Dogcom />
		</div>
	</div>
	
	<!-- <div class="w-full flex items-center md:md:my-32 my-16 pl-8">
		<h2 class="text-6xl">What Can You Find Here?</h2>
	</div> -->

	<div class="relative md:my-32 my-16">
		<div class="absolute w-full h-full pointer-events-none">
			<div style="-webkit-mask-image: linear-gradient(transparent, black, transparent);"
				class="absolute w-full h-[150%] dark:bg-grid-dark bg-grid-light bg-repeat dark:opacity-[.15] opacity-60 z-10 pointer-events-none">
			</div>
			<div class="absolute w-full">
				<svg width="1024" height="360" viewBox="0 0 1024 360" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full rotate-180 md:blur-[96px] blur-2xl md:h-full md:scale-x-125 md:scale-y-75 scale-y-200 md:dark:saturate-100 saturate-[2] dark:opacity-70 opacity-100">
					<g opacity="0.5" clip-path="url(#clip0_1_2)">
						<rect width="433.919" height="307.42" transform="matrix(0.652501 0.757788 -0.918405 0.395643 223.833 -50.3698)" fill="url(#paint0_radial_2_2)" />
						<rect width="539.073" height="235.273" transform="matrix(0.979338 0.202229 -0.381519 0.924361 132.254 83.877)" fill="url(#paint1_radial_2_2)" />
						<rect width="404.121" height="312.353" transform="matrix(-0.658984 -0.752157 0.946257 -0.323417 846.453 402.448)" fill="url(#paint2_radial_2_2)" />
						<rect width="513.135" height="262.577" rx="109.572" transform="matrix(-0.977818 -0.209455 0.481307 -0.876552 861.081 275.469)" fill="url(#paint3_radial_2_2)" />
					</g>
					<defs>
						<radialGradient id="paint0_radial_2_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(216.96 153.71) scale(216.96 153.71)">
							<stop stop-color="#6e378c" />
							<stop offset="1" stop-opacity="0" />
						</radialGradient>
						<radialGradient id="paint1_radial_2_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(269.537 117.636) scale(269.537 117.636)">
							<stop stop-color="#9550ba"/>
							<stop offset="1" stop-opacity="0" />
						</radialGradient>
						<radialGradient id="paint2_radial_2_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(202.06 156.176) scale(202.06 156.176)">
							<stop stop-color="#9550ba"/>
							<stop offset="1" stop-opacity="0" />
						</radialGradient>
						<radialGradient id="paint3_radial_2_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(256.567 131.288) scale(256.567 131.288)">
							<stop stop-color="#8f30c2"/>
							<stop offset="1" stop-opacity="0" />
						</radialGradient>
					</defs>
				</svg>
			</div>
		</div>

		<div class="flex md:flex-row flex-col h-full xl:px-16 md:px-8 px-4 w-full z-10 items-center">
			<div class="flex flex-col md:w-1/2">
				<div class="text-violet flex my-4 items-center">
					<Icon src={QuestionMarkCircle} class="w-16 h-16 mr-2" />
					<h2 class="text-6xl">FAQ</h2>
				</div>
				<p class="text-2xl mb-8">Find quick answers to the most frequently asked questions!</p>
				<p>
					It's no secret that FPV is not a very easy hobby to get into. There's a lot of things to learn, 
					and with that come a lot of questions! Some may be more common than others, but I hope to cover 
					most of the ones that come up often. <br>
					The FAQ page covers everything from the first few questions you might have when you start, to 
					troubleshooting and repairs
				</p>
				<div class="flex md:flex-row flex-col justify-between w-full items-center">
					<div class="my-4 flex flex-col gap-2 w-fit">
						<Link href="/faq/startingOutCost" color="violet" color1="violet">How much does FPV cost?</Link>
						<Link href="/faq/sim" color="violet" color1="violet">What's a good sim?</Link>
					</div>
					<div class="md:w-fit my-4"><Button isLink={true} href="/faq" color="violet">Get Answers in the FAQ</Button></div>
				</div>
			</div>
			<div class="md:flex flex-col md:w-1/2 w-full aspect-video hidden">
				<Canvas>
					<HomeFrame />
				</Canvas>
			</div>
		</div>
	</div>

	<div class="relative md:my-32 my-16">
		<div class="absolute w-full h-full pointer-events-none">
			<div style="-webkit-mask-image: linear-gradient(transparent, black, transparent);"
				class="absolute w-full h-[150%] dark:bg-grid-dark bg-grid-light bg-repeat dark:opacity-[.15] opacity-60 z-10 pointer-events-none">
			</div>
			<div class="absolute w-full">
				<svg width="1024" height="360" viewBox="0 0 1024 360" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full md:blur-[96px] blur-2xl md:h-full md:scale-x-125 md:scale-y-75 scale-y-200 md:dark:saturate-100 saturate-[2] dark:opacity-70 opacity-100">
					<g opacity="0.5" clip-path="url(#clip0_1_2)">
						<rect width="433.919" height="307.42" transform="matrix(0.652501 0.757788 -0.918405 0.395643 223.833 -50.3698)" fill="url(#paint0_radial_3_2)" />
						<rect width="539.073" height="235.273" transform="matrix(0.979338 0.202229 -0.381519 0.924361 132.254 83.877)" fill="url(#paint1_radial_3_2)" />
						<rect width="404.121" height="312.353" transform="matrix(-0.658984 -0.752157 0.946257 -0.323417 846.453 402.448)" fill="url(#paint2_radial_3_2)" />
						<rect width="513.135" height="262.577" rx="109.572" transform="matrix(-0.977818 -0.209455 0.481307 -0.876552 861.081 275.469)" fill="url(#paint3_radial_3_2)" />
					</g>
					<defs>
						<radialGradient id="paint0_radial_3_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(216.96 153.71) scale(216.96 153.71)">
							<stop stop-color="#911f37" />
							<stop offset="1" stop-opacity="0" />
						</radialGradient>
						<radialGradient id="paint1_radial_3_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(269.537 117.636) scale(269.537 117.636)">
							<stop stop-color="#d6395b"/>
							<stop offset="1" stop-opacity="0" />
						</radialGradient>
						<radialGradient id="paint2_radial_3_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(202.06 156.176) scale(202.06 156.176)">
							<stop stop-color="#d6395b"/>
							<stop offset="1" stop-opacity="0" />
						</radialGradient>
						<radialGradient id="paint3_radial_3_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(256.567 131.288) scale(256.567 131.288)">
							<stop stop-color="#f5365f"/>
							<stop offset="1" stop-opacity="0" />
						</radialGradient>
					</defs>
				</svg>
			</div>
		</div>

		<div class="flex md:flex-row flex-col h-full xl:px-16 md:px-8 px-4 w-full z-10 items-center">
			<div class="md:flex flex-col md:w-1/2 w-full aspect-video hidden">
				<Canvas>
					<HomeFc />
				</Canvas>
			</div>
			<div class="flex flex-col md:w-1/2 z-10">
				<div class="text-red flex my-4 items-center">
					<svg width="150" height="150" viewBox="0 0 200 200" fill="currentColor" stroke-width="8" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 -mb-2">
						<path fill-rule="evenodd" clip-rule="evenodd" d="M92.8079 95.1565C92.9816 94.8991 93.0481 94.5859 92.9687 
						94.2857C83.8268 59.7442 94.1948 4.97097 99.6692 3.70844C105.241 2.42341 106.009 3.43176 106.009 6.9173C106.009 
						7.74605 105.962 8.95909 105.902 10.5199V10.52C105.708 15.5238 105.375 24.1017 106.009 35.0506C106.566 44.6669 
						107.308 48.1922 108.188 52.3745C108.622 54.4396 109.09 56.6648 109.587 59.8625C111.791 74.0627 110.482 80.6871 
						106.704 93.7946C106.611 94.1204 106.69 94.474 106.895 94.7435C107.134 95.0556 107.351 95.3844 107.546 
						95.7277C107.688 95.9771 107.912 96.1661 108.189 96.2413C142.668 105.61 184.89 141.953 183.247 147.324C181.574 
						152.791 180.317 152.952 177.298 151.21C176.58 150.795 175.553 150.148 174.232 149.315L174.232 149.315C169.995 
						146.645 162.733 142.068 152.934 137.143C144.328 132.817 140.904 131.697 136.842 130.368L136.842 130.368C134.836 
						129.711 132.675 129.004 129.657 127.835C116.492 122.734 111.355 118.354 102.204 108.883C101.964 108.634 
						101.61 108.528 101.269 108.578C100.855 108.639 100.431 108.67 100 108.67C99.7327 108.67 99.4682 108.658 
						99.2071 108.634C98.8936 108.606 98.5828 108.702 98.3575 108.922C72.8226 133.847 20.8884 151.978 17.0838 
						147.896C13.185 143.714 13.6743 142.544 16.6928 140.802C17.4105 140.387 18.4846 139.821 19.8665 139.093C24.2969 
						136.76 31.8919 132.759 41.057 126.735C49.1064 121.444 51.7886 119.039 54.9706 116.186L54.9706 116.186C56.5418 
						114.777 58.2348 113.259 60.7559 111.231C71.9294 102.24 78.3176 100.052 91.5041 96.7802C91.8114 96.704 92.0661 
						96.4841 92.205 96.1996C92.3822 95.837 92.5838 95.4886 92.8079 95.1565Z"/>
					</svg>
					<h2 class="text-6xl">Builds</h2>
				</div>
				<p class="text-2xl mb-8">Get parts for your first build, or just some inspiration</p>
				<p>
					Building your first quad can be a daunting task, especially if you don't know what to get. 
					There's a lot of parts out there, and it can be hard to know what's good and what isn't.<br>
					You can find lists of all the parts you need to build anything from a 200km/h racer to a tiny 
					build that can fit in your palm!
				</p>
				<div class="flex md:flex-row flex-col justify-between w-full items-center">
					<!-- <div class="my-4 flex flex-col gap-2 w-fit">
						<Link href="/faq/startingOutCost" color="violet" color1="violet">How much does FPV cost?</Link>
						<Link href="/faq/sim" color="violet" color1="violet">What's a good sim?</Link>
					</div> -->
					<div class="md:w-fit my-8"><Button isLink={true} href="/builds" color="red">Visit Build Guides</Button></div>
				</div>
			</div>
		</div>
	</div>

	<div class="relative md:my-32 my-16">
		<div class="absolute w-full h-full pointer-events-none">
			<div style="-webkit-mask-image: linear-gradient(transparent, black, transparent);"
				class="absolute w-full h-[150%] dark:bg-grid-dark bg-grid-light bg-repeat dark:opacity-[.15] opacity-60 z-10 pointer-events-none">
			</div>
			<div class="absolute w-full">
				<svg width="1024" height="360" viewBox="0 0 1024 360" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full rotate-180 md:blur-[96px] blur-2xl md:h-full md:scale-x-125 md:scale-y-75 scale-y-200 md:dark:saturate-100 saturate-[2] dark:opacity-70 opacity-100">
					<g opacity="0.5" clip-path="url(#clip0_1_2)">
						<rect width="433.919" height="307.42" transform="matrix(0.652501 0.757788 -0.918405 0.395643 223.833 -50.3698)" fill="url(#paint0_radial_4_2)" />
						<rect width="539.073" height="235.273" transform="matrix(0.979338 0.202229 -0.381519 0.924361 132.254 83.877)" fill="url(#paint1_radial_4_2)" />
						<rect width="404.121" height="312.353" transform="matrix(-0.658984 -0.752157 0.946257 -0.323417 846.453 402.448)" fill="url(#paint2_radial_4_2)" />
						<rect width="513.135" height="262.577" rx="109.572" transform="matrix(-0.977818 -0.209455 0.481307 -0.876552 861.081 275.469)" fill="url(#paint3_radial_4_2)" />
					</g>
					<defs>
						<radialGradient id="paint0_radial_4_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(216.96 153.71) scale(216.96 153.71)">
							<stop stop-color="#ff9742" />
							<stop offset="1" stop-opacity="0" />
						</radialGradient>
						<radialGradient id="paint1_radial_4_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(269.537 117.636) scale(269.537 117.636)">
							<stop stop-color="#ff9742"/>
							<stop offset="1" stop-opacity="0" />
						</radialGradient>
						<radialGradient id="paint2_radial_4_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(202.06 156.176) scale(202.06 156.176)">
							<stop stop-color="#ff9742"/>
							<stop offset="1" stop-opacity="0" />
						</radialGradient>
						<radialGradient id="paint3_radial_4_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(256.567 131.288) scale(256.567 131.288)">
							<stop stop-color="#db8700"/>
							<stop offset="1" stop-opacity="0" />
						</radialGradient>
					</defs>
				</svg>
			</div>
		</div>

		<div class="flex md:flex-row flex-col h-full xl:px-16 md:px-8 px-4 w-full z-10 items-center">
			<div class="flex flex-col md:w-1/2 z-10">
				<div class="text-orange flex my-4 items-center">
					<Icon src={WrenchScrewdriver} class="w-16 h-16 mr-2" />
					<h2 class="text-6xl">Equipment</h2>
				</div>
				<p class="text-2xl mb-8">Everything you need to get in the air!</p>
				<p>
					<!-- Building your first quad can be a daunting task, especially if you don't know what to get. 
					There's a lot of parts out there, and it can be hard to know what's good and what isn't.<br>
					You can find lists of all the parts you need to build anything from a 200km/h racer to a tiny 
					build that can fit in your palm! -->
					Find recommendations for every piece of gear, accessories, and tools to get you flying. Everything 
					from stuff you need like goggles, radios and even chargers, to things to stuff your tool bag with!<br><br>
					<em>Chargers and tools coming soon™</em>
				</p>
				<div class="flex md:flex-row flex-col justify-between w-full items-center">
					<!-- <div class="my-4 flex flex-col gap-2 w-fit">
						<Link href="/faq/startingOutCost" color="violet" color1="violet">How much does FPV cost?</Link>
						<Link href="/faq/sim" color="violet" color1="violet">What's a good sim?</Link>
					</div> -->
					<div class="md:w-fit my-8"><Button isLink={true} href="/equipment" color="orange">Find Equipment Recommendations</Button></div>
				</div>
			</div>
			<div class="md:flex flex-col md:w-1/2 w-full aspect-video hidden">
				<Canvas>
					<HomeIron />
				</Canvas>
			</div>
		</div>
	</div>

	<div class="relative md:my-32 my-16">
		<div class="absolute w-full h-full pointer-events-none">
			<div style="-webkit-mask-image: linear-gradient(transparent, black, transparent);"
				class="absolute w-full h-[150%] dark:bg-grid-dark bg-grid-light bg-repeat dark:opacity-[.15] opacity-60 z-10 pointer-events-none">
			</div>
			<div class="absolute w-full">
				<svg width="1024" height="360" viewBox="0 0 1024 360" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full rotate-180 md:blur-[96px] blur-2xl md:h-full md:scale-x-125 md:scale-y-75 scale-y-200 md:dark:saturate-100 saturate-[2] dark:opacity-70 opacity-100">
					<g opacity="0.5" clip-path="url(#clip0_1_2)">
						<rect width="433.919" height="307.42" transform="matrix(0.652501 0.757788 -0.918405 0.395643 223.833 -50.3698)" fill="url(#paint0_radial_5_2)" />
						<rect width="539.073" height="235.273" transform="matrix(0.979338 0.202229 -0.381519 0.924361 132.254 83.877)" fill="url(#paint1_radial_5_2)" />
						<rect width="404.121" height="312.353" transform="matrix(-0.658984 -0.752157 0.946257 -0.323417 846.453 402.448)" fill="url(#paint2_radial_5_2)" />
						<rect width="513.135" height="262.577" rx="109.572" transform="matrix(-0.977818 -0.209455 0.481307 -0.876552 861.081 275.469)" fill="url(#paint3_radial_5_2)" />
					</g>
					<defs>
						<radialGradient id="paint0_radial_5_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(216.96 153.71) scale(216.96 153.71)">
							<stop stop-color="#d99c18" />
							<stop offset="1" stop-opacity="0" />
						</radialGradient>
						<radialGradient id="paint1_radial_5_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(269.537 117.636) scale(269.537 117.636)">
							<stop stop-color="#ffcc00"/>
							<stop offset="1" stop-opacity="0" />
						</radialGradient>
						<radialGradient id="paint2_radial_5_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(202.06 156.176) scale(202.06 156.176)">
							<stop stop-color="#ffcc00"/>
							<stop offset="1" stop-opacity="0" />
						</radialGradient>
						<radialGradient id="paint3_radial_5_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(256.567 131.288) scale(256.567 131.288)">
							<stop stop-color="#f5ce33"/>
							<stop offset="1" stop-opacity="0" />
						</radialGradient>
					</defs>
				</svg>
			</div>
		</div>

		<div class="flex md:flex-row flex-col h-full xl:px-16 md:px-8 px-4 w-full z-10 items-center">
			<div class="md:flex flex-col md:w-1/2 w-full aspect-video hidden">
				<Canvas>
					<HomeMonitor />
				</Canvas>
			</div>
			<div class="flex flex-col md:w-1/2 z-10">
				<div class="text-yellow flex my-4 items-center">
					<Icon src={Newspaper} class="w-16 h-16 mr-2" />
					<h2 class="text-6xl">Articles</h2>
				</div>
				<p class="text-2xl mb-8">Definitely not just a blog™</p>
				<p>
					Anything from Reviews, News about stuff I find interesting yet cannot afford, to Guides and Tutorials!
					Even just stuff I couldn't fit into the FAQ or don't want to write every time<br><br>
					If you (much like me) prefer written content over videos, this is the place for you! I hope you find 
					something that you like
				</p>
				<div class="flex md:flex-row flex-col justify-between w-full items-center">
					<div class="md:w-fit my-8"><Button isLink={true} href="/articles" color="yellow">Read Stuff</Button></div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.transition-container {
		display: grid;
		grid-template-rows: 1fr;
		grid-template-columns: 1fr;
	}

	.transition-container > * {
		grid-row: 1;
		grid-column: 1;
	}
</style>
