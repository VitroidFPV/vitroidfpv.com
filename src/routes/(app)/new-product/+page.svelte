<script lang="ts">
	import { preventDefault } from 'svelte/legacy';

	import { page } from "$app/stores";
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
	import { copyText } from "$lib/copy";
	import { Icon } from "@steeze-ui/svelte-icon";
	import { Clipboard } from "@steeze-ui/heroicons";
	import Button from "$components/Button.svelte";

	const initialProduct = $page.url.searchParams.get("product") || "<PRODUCT>";
	const initialManufacturer =
		$page.url.searchParams.get("manufacturer") || "<MANUFACTURER>";
	const initialCategory = $page.url.searchParams.get("category") || "<CATEGORY>";

	let product = $state(initialProduct);
	let manufacturer = $state(initialManufacturer);
	let category = $state(initialCategory);

	function handleChange() {
		if (window.location.href) {
			// update the url with the new parameters, don't reload the page
			window.history.pushState({}, "", `?product=${product}&manufacturer=${manufacturer}&category=${category}`);
		}
	}

	function handleSubmit() {
		copyText(window.location.href);
	}

	let prefix = "VitroidFPV";
	let titleRaw = $derived(`${manufacturer} ${product}`);
	let title = $derived(" - " + titleRaw);
	let color = "#ffcc00";
	let color1 = tinycolor(color).lighten(20).spin(10).toHexString();
	let color2 = tinycolor(color).darken(20).spin(10).toHexString();
	// let img = "/uploads/images/1s_toothpick_512.png";
	let description = $derived(`${manufacturer} ${product} is a new product that is available for purchase.`);
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
			<Header title={`The ${manufacturer} ${product} is now out!`} />
			<!-- <p class="text-xl md:w-1/2 md:px-0">
				{description}
			</p> -->
		</div>
		<div class="absolute w-full h-full pointer-events-none">
			<div
				style="-webkit-mask-image: linear-gradient(transparent, black, transparent);"
				class="absolute w-full h-[150%] dark:bg-grid-dark bg-grid-light bg-repeat dark:opacity-[.15] opacity-60 z-10 pointer-events-none"
			>
				<!-- <div class="h-full aspect-square bg-red/5"></div> -->
			</div>
			<div class="absolute w-full top-20">
				<svg
					width="1024"
					height="360"
					viewBox="0 0 1024 360"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					class="w-full -rotate-12 md:blur-[96px] blur-2xl md:h-full md:scale-x-125 md:scale-y-100 scale-y-200 dark:saturate-100 dark:opacity-70 opacity-200"
				>
					<g opacity="0.5" clip-path="url(#clip0_1_2)">
						<rect
							width="433.919"
							height="307.42"
							transform="matrix(0.652501 0.757788 -0.918405 0.395643 223.833 -50.3698)"
							fill="url(#paint0_radial_1_2)"
						/>
						<rect
							width="539.073"
							height="235.273"
							transform="matrix(0.979338 0.202229 -0.381519 0.924361 132.254 83.877)"
							fill="url(#paint1_radial_1_2)"
						/>
						<rect
							width="404.121"
							height="312.353"
							transform="matrix(-0.658984 -0.752157 0.946257 -0.323417 846.453 402.448)"
							fill="url(#paint2_radial_1_2)"
						/>
						<rect
							width="513.135"
							height="262.577"
							rx="109.572"
							transform="matrix(-0.977818 -0.209455 0.481307 -0.876552 861.081 275.469)"
							fill="url(#paint3_radial_1_2)"
						/>
					</g>
					<defs>
						<radialGradient
							id="paint0_radial_1_2"
							cx="0"
							cy="0"
							r="1"
							gradientUnits="userSpaceOnUse"
							gradientTransform="translate(216.96 153.71) scale(216.96 153.71)"
						>
							<stop stop-color={color1} />
							<stop offset="1" stop-opacity="0" />
						</radialGradient>
						<radialGradient
							id="paint1_radial_1_2"
							cx="0"
							cy="0"
							r="1"
							gradientUnits="userSpaceOnUse"
							gradientTransform="translate(269.537 117.636) scale(269.537 117.636)"
						>
							<stop stop-color={color} />
							<stop offset="1" stop-opacity="0" />
						</radialGradient>
						<radialGradient
							id="paint2_radial_1_2"
							cx="0"
							cy="0"
							r="1"
							gradientUnits="userSpaceOnUse"
							gradientTransform="translate(202.06 156.176) scale(202.06 156.176)"
						>
							<stop stop-color={color} />
							<stop offset="1" stop-opacity="0" />
						</radialGradient>
						<radialGradient
							id="paint3_radial_1_2"
							cx="0"
							cy="0"
							r="1"
							gradientUnits="userSpaceOnUse"
							gradientTransform="translate(256.567 131.288) scale(256.567 131.288)"
						>
							<stop stop-color={color2} />
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

<div class="p-4 md:p-8 content-box gap-y-4">
	<p>
		Good news everyone!<br />
		<span class="font-bold text-yellow">{manufacturer}</span> has finally
		released the widely anticipated
		<span class="font-bold text-yellow">{product} {category}</span>!
	</p>

	<p>
		It's amazing! All the new features we've been hyping up, seeing sneak peeks
		of in various posts and GitHub repos, are finally here!<br />
		Just think about how the
		<span class="font-bold text-yellow"
			>{manufacturer} {product} {category}</span
		>
		will change the way you fly! It's truly a game changer for the entire hobby.
		Better rush to your wallet (or piggy bank, I don't judge) and get your hands
		on one before your existing
		<span class="font-bold text-yellow">{category}</span> is obsolete!
	</p>

	<hr />

	<p>But wait - just think about it a little more.</p>

	<hr />

	<p>
		Do you really need the <span class="font-bold text-yellow">{product}</span>?
		If you have a
		<span class="font-bold text-yellow">{category}</span> already, do you really
		need another one? Maybe all the new features of the
		<span class="font-bold text-yellow">{manufacturer} {product}</span> don't
		make a massive difference.<br />
		I get it. It's new. It's exciting. It's something to brag about. But your existing
		<span class="font-bold text-yellow">{category}</span> was also brand new when
		you bought it, with that same excitement and newness. It's still probably more
		than good enough for 99.999999999% of your flying needs.
	</p>

	<p>
		Maybe the <span class="font-bold text-yellow">{manufacturer} {product}</span
		>
		has some bugs and issues that weren't caught before release. Maybe the
		<span class="font-bold text-yellow">{product}</span> is not as good as all the
		YouTube videos praise it to be. I mean, it's probably good, I agree that all
		the new stuff is cool. Some people will get it right now and they'll love it.
		Or they won't.
	</p>

	<p>
		And we only get to hear about all the actual feedback about the <span
			class="font-bold text-yellow">{manufacturer} {product}</span
		> from real and prolonged use after a few months of it being out on the market.
		So how about a compromise?
	</p>

	<p>
		If you looked at all the <span class="font-bold text-yellow">{product}</span
		>
		reviews and judged for yourself, then go for it! I'm excited for any new
		developments in the hobby, just like the
		<span class="font-bold text-yellow">{manufacturer} {product}</span>
		is right now.<br />
		If your <span class="font-bold text-yellow">{category}</span> is still
		running, and you're happy with it, don't rush to buy the
		<span class="font-bold text-yellow">{manufacturer} {product}</span>.<br />
	</p>

	<div class="h-[50vh]"></div>

	<p>
		As you may have already noticed, this post is pretty vague about what's
		actually going on.<br />
		This is a post about anything and everything new that comes out. All the highlighted
		words are adjustable with the URL parameters. I didn't write this about the
		<span class="font-bold text-yellow"
			>{manufacturer} {product} {category}</span
		> specifically, you may have gotten this link in relation to a radio, goggles,
		a new quad, or really anything else that's new at the time that you're reading
		this.
	</p>

	<p>
		I wrote this partly as a joke, but mostly to actually make some people think
		about their purchases with what is essentially an interactive copypasta. I
		genuinely understand the urge to buy something new when it's all new and
		exciting. FOMO (Fear of Missing Out) is real. GAS (Gear Acquisition
		Syndrome) is real. It's something that humans are just generally wired to
		do.
	</p>

	<p>
		Anyway, I hope you enjoyed this post. I hope you're excited for the <span
			class="font-bold text-yellow">{manufacturer} {product} {category}</span
		>.
	</p>

	<p>
		If you'd like to make your own post, you can do so by changing the URL
		parameters manually, or using the form below.
	</p>

	<form
		onsubmit={preventDefault(handleSubmit)}
		class="flex flex-col gap-y-4 lg:w-1/3 w-full bg-neutral-500/10 rounded-2xl p-4"
	>
		<div class="text-lg font-bold text-yellow">
			Generate a new post
		</div>
		<div class="flex flex-col gap-y-2">
			<label for="product" class="text-sm font-medium text-neutral-300">Product</label>
			<input
				id="product"
				type="text"
				bind:value={product}
				oninput={handleChange}
				placeholder="Product"
				class="bg-neutral-500/10 w-full h-8 rounded-2xl p-3 text-base duration-300 outline-none focus-within:outline-yellow outline-[3px] placeholder:text-neutral-400"
			/>
		</div>
		<div class="flex flex-col gap-y-2">
			<label for="manufacturer" class="text-sm font-medium text-neutral-300">Manufacturer</label>
			<input
				id="manufacturer"
				type="text"
				bind:value={manufacturer}
				oninput={handleChange}
				placeholder="Manufacturer"
				class="bg-neutral-500/10 w-full h-8 rounded-2xl p-3 text-base duration-300 outline-none focus-within:outline-yellow outline-[3px] placeholder:text-neutral-400"
			/>
		</div>
		<div class="flex flex-col gap-y-2">
			<label for="category" class="text-sm font-medium text-neutral-300">Category</label>
			<input
				id="category"
				type="text"
				bind:value={category}
				oninput={handleChange}
				placeholder="Category"
				class="bg-neutral-500/10 w-full h-8 rounded-2xl p-3 text-base duration-300 outline-none focus-within:outline-yellow outline-[3px] placeholder:text-neutral-400"
			/>
		</div>
		<!-- <button
			type="submit"
			class="bg-yellow text-black w-28 h-8 rounded-2xl p-3 text-base duration-300 outline-none focus-within:outline-yellow outline-[3px]">Copy</button
		> -->
		<Button isLink={false} size="sm" color="yellow" onclick={handleSubmit}>
			<Icon src={Clipboard} class="w-7 h-7"  stroke-width="1.5" size="28" theme="default" title="Copy" />
			Copy
		</Button>
	</form>
</div>
