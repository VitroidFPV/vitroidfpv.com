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
		smartypants: false,
		xhtml: false,
	});

	import { Icon } from "@steeze-ui/svelte-icon";
	import { Banknotes, Share, ChatBubbleOvalLeft, ClipboardDocument, ShoppingBag, ShoppingCart, BuildingStorefront } from "@steeze-ui/heroicons";

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
			<h1 class="text-blue md:text-6xl text-5xl font-bold mb-4 md:self-end">Coffeine</h1>
			<div class="flex flex-col md:flex-row-reverse">
				<div class="md:w-2/3 mb-4">
					<p>
						Apart from Svelte, the development of this site is mostly powered by coffeine. If you like 
						what I do and want to support me, you can 
						<Link href="https://www.ko-fi.com/vitroid">buy me a coffee</Link> to help me keep this site up
						and keep me awake (as I'm writing this it is well past 1am)
					</p>
				</div>
				<div class="md:w-1/3 w-full grid grid-cols-3 grid-rows-1 text-neutral-500/30 md:mr-32">
					<div class="rotate-[-23deg]">
						<Icon class="md:h-24 h-20 aspect-square" src={Banknotes} size="80" theme="default" title="Banknotes" />
					</div>
					<div class="col-start-3 col-end-4 rotate-23">
						<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke-width="1.5" stroke="currentColor" class="md:h-24 h-20 aspect-square">
							<path d="M5.50549 3.81162L5.49796 3.80478L5.4903 3.79809C4.76209 3.16265 4 2.46548 4 1.125C4 1.05385 4.05385 1 4.125 1C4.19615 1 4.25 1.05385 4.25 1.125C4.25 1.69008 4.39127 2.16842 4.69741 2.61344C4.96238 2.99863 5.33732 3.33189 5.70076 3.6486L5.74451 3.68838L5.75204 3.69522L5.7597 3.70191C6.48791 4.33735 7.25 5.03452 7.25 6.375C7.25 6.44615 7.19615 6.5 7.125 6.5C7.05385 6.5 7 6.44615 7 6.375C7 5.80991 6.85873 5.33158 6.55259 4.88656C6.28761 4.50137 5.91268 4.1681 5.54924 3.8514L5.50549 3.81162ZM18 18.5H17V19.5C17 21.4321 15.4321 23 13.5 23H4.5C2.56791 23 1 21.4321 1 19.5V10.5C1 10.2226 1.2226 10 1.5 10H18.75C21.0993 10 23 11.9007 23 14.25C23 16.5993 21.0993 18.5 18.75 18.5H18ZM18 11H17V12V16.5V17.5H18H19.266C21.0605 17.5 22.516 16.0445 22.516 14.25C22.516 12.4555 21.0605 11 19.266 11H18ZM10.7555 3.81163L10.748 3.80478L10.7403 3.79809C10.0121 3.16265 9.25 2.46548 9.25 1.125C9.25 1.05385 9.30385 1 9.375 1C9.44615 1 9.5 1.05385 9.5 1.125C9.5 1.69009 9.64127 2.16842 9.94741 2.61344C10.2124 2.99863 10.5873 3.33189 10.9508 3.6486L10.9945 3.68837L11.002 3.69522L11.0097 3.70191C11.7379 4.33735 12.5 5.03452 12.5 6.375C12.5 6.44615 12.4462 6.5 12.375 6.5C12.3038 6.5 12.25 6.44615 12.25 6.375C12.25 5.80991 12.1087 5.33158 11.8026 4.88656C11.5376 4.50137 11.1627 4.1681 10.7992 3.8514L10.7555 3.81163Z"/>
						</svg>
					</div>
				</div>
			</div>
		</div>
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
						<Icon class="md:h-24 h-20 aspect-square" src={Share} size="80" theme="default" title="Share" />
					</div>
					<div class="md:row-start-1 md:row-end-2 col-start-2 col-end-3">
						<Icon class="md:h-24 h-20 aspect-square" src={ChatBubbleOvalLeft} size="80" theme="default" title="Chat bubble" />
					</div>
					<div class="md:row-start-2 md:row-end-3 col-start-3 col-end-4 rotate-23">
						<Icon class="md:h-24 h-20 aspect-square" src={ClipboardDocument} size="80" theme="default" title="Clipboard" />
					</div>
				</div>
			</div>
		</div>
		<div class="flex flex-col md:mb-16 mb-12 border-b-2 border-neutral-500/20 pb-16">
			<h1 class="text-blue md:text-6xl text-5xl font-bold mb-4 md:self-end">Shop</h1>
			<div class="flex flex-col md:flex-row-reverse">
				<div class="md:w-2/3 mb-4">
					<p>
						Affiliate links... I decided to never force affiliate links in the build guides. Some people hate them
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
						<Icon class="md:h-24 h-20 aspect-square" src={ShoppingBag} size="80" theme="default" title="Shopping bag" />
					</div>
					<div class="md:row-start-1 md:row-end-2 col-start-2 col-end-3">
						<Icon class="md:h-24 h-20 aspect-square" src={ShoppingCart} size="80" theme="default" title="Shopping cart" />
					</div>
					<div class="md:row-start-2 md:row-end-3 col-start-3 col-end-4 rotate-23">
						<Icon class="md:h-24 h-20 aspect-square" src={BuildingStorefront} size="80" theme="default" title="Building storefront" />
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
