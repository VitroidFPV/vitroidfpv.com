<script lang="ts">
	import BuildCard from "$components/buildsPage/buildCard.svelte";
	import Header from "$components/Header.svelte";
	import MainHeader from "$components/MainHeader.svelte";
	import Paragraph from "$components/Paragraph.svelte";
	import tinycolor from "tinycolor2";
	import { marked } from "marked";
	import Link from "$components/Link.svelte";
	marked.setOptions({
		gfm: true,
		breaks: true,
		sanitize: false,
		smartLists: false,
		smartypants: false,
		xhtml: false,
	});

	// export let data: any;

	// console.log(data.data)
	// log data.data as string
	// console.log(JSON.stringify(data.data))
	// data.data is structured as {"/modules/support/test1.md":"---\r\ntitle: A\r\n---\r\naaaaa","/modules/support/test2.md":"---\r\ntitle: B\r\n---\r\nbbbbb"}

	// get the data into an object with two keys, title and content
	// let content = Object.keys(data.data).map((key) => {
	// 	let title = data.data[key].split("---")[1].split("title: ")[1].split("\r\n")[0];
	// 	let content = data.data[key].split("---")[2];
	// 	return { title, content };
	// });

	// console.log(content)

	let prefix = "VitroidFPV";
	let titleRaw = "Support me";
	let title = " - " + titleRaw;
	let color = "#5a6fe6";
	let color1 = tinycolor(color).lighten(20).spin(10).toHexString();
	let color2 = tinycolor(color).darken(20).spin(10).toHexString();
	let img = "/uploads/images/1s_toothpick_512.png";
	let description =
		"I run this site out of my free time and wallet. If you like what I do, or just want to support me, here are some ways you can help.";

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
			<MainHeader title={titleRaw} color="blue"/>
			<Header title="All the ways you can support me" />
			<p class="text-xl md:w-1/2 md:px-0">
				{description}<br><br>

				<!-- {marked.parse(content)} -->
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
							<stop stop-color="{color1}" />
							<stop offset="1" stop-opacity="0" />
						</radialGradient>
						<radialGradient id="paint1_radial_1_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(269.537 117.636) scale(269.537 117.636)">
							<stop stop-color="{color}"/>
							<stop offset="1" stop-opacity="0" />
						</radialGradient>
						<radialGradient id="paint2_radial_1_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(202.06 156.176) scale(202.06 156.176)">
							<stop stop-color="{color}"/>
							<stop offset="1" stop-opacity="0" />
						</radialGradient>
						<radialGradient id="paint3_radial_1_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(256.567 131.288) scale(256.567 131.288)">
							<stop stop-color="{color2}"/>
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

<div class="p-4 md:p-8 content-box md">
	<div class="">
		<div class="flex flex-col md:mb-16 mb-12 border-b-2 border-neutral-500/20 pb-16">
			<h1 class="text-blue md:text-6xl text-5xl font-bold mb-4">Share</h1>
			<div class="flex md:flex-row flex-col">
				<div class="md:w-1/2 mb-4">
					<p>
						One of the easiest ways you can help is by sharing this very site with others who may benefit from
						the info. By sharing the site, you are not only helping me to continue providing FPV support but
						also helping others who may be struggling with the issues listed here. So, please consider sharing
						the site with those around you
					</p>
				</div>
				<div class="w-full grid grid-cols-3 md:grid-rows-2 grid-rows-1 text-neutral-500/30 md:ml-32">
					<div class="md:row-start-2 md:row-end-3 rotate-[-23deg]">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="md:h-24 h-20 aspect-square">
							<path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
						</svg>
					</div>
					<div class="md:row-start-1 md:row-end-2 col-start-2 col-end-3">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="md:h-24 h-20 aspect-square">
							<path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
						</svg>
					</div>
					<div class="md:row-start-2 md:row-end-3 col-start-3 col-end-4 rotate-[23deg]">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="md:h-24 h-20 aspect-square">
							<path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
						</svg>
					</div>
				</div>
			</div>
		</div>
		<div class="flex flex-col md:mb-16 mb-12 border-b-2 border-neutral-500/20 pb-16">
			<h1 class="text-blue md:text-6xl text-5xl font-bold mb-4 md:self-end">Shop</h1>
			<div class="flex flex-col md:flex-row-reverse">
				<div class="md:w-2/3 mb-4">
					<p>
						Affiliate links... I decided to never use affiliate links in the build guides. Some people hate them
						or find them annoying, and I don't want someone buying something they don't need just because I want
						a quick commission. I would never recommend something I don't believe in or use myself. However, I do
						have some here if you want to support me and the further development of this site, and it won't cost
						you anything:
					</p>

					<ul>
						<li><Link href="https://www.flyfish-rc.com/?ref=VitroidFPV">FlyFishRC</Link></li>
						<li>
							<Link href="https://chinahobbyline.com?referral_code=erKL7Zy8TX8DJqd6j">CNHL</Link> - $20 discount on your order as well
						</li>
						<li>
							<Link href="https://www.diatone.us?sca_ref=2692838.eWbS2DQnk0&sca_source=VitroidFPV%20Site">Diatone</Link>
						</li>
						<li>
							<Link href="https://geprc.com/?ref=VitroidFPV">GEPRC</Link>
						</li>
					</ul>
				</div>
				<div class="md:w-1/3 w-full grid grid-cols-3 md:grid-rows-2 grid-rows-1 text-neutral-500/30 md:mr-32">
					<div class="md:row-start-2 md:row-end-3 rotate-[-23deg]">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="md:h-24 h-20 aspect-square">
						<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
					</svg>
					</div>
					<div class="md:row-start-1 md:row-end-2 col-start-2 col-end-3">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="md:h-24 h-20 aspect-square">
							<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
						</svg>
					</div>
					<div class="md:row-start-2 md:row-end-3 col-start-3 col-end-4 rotate-[23deg]">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="md:h-24 h-20 aspect-square">
							<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
						</svg>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
