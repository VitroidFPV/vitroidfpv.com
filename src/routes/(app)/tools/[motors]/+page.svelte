<script lang="ts">
	import { page } from "$app/stores";
	import { onMount } from "svelte";
	import tinycolor from "tinycolor2";
	import Header from "$components/Header.svelte";
	import MainHeader from "$components/MainHeader.svelte";
	import MotorComparison from "$components/toolsPage/MotorComparison.svelte";
	import { motors } from "$lib/stores/motorsStore";
	import { undo } from "$lib/stores/motorsStore";
	import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from "@rgossiaux/svelte-headlessui";
	import { slide, fade } from "svelte/transition";

	function keydown(event: KeyboardEvent) {
		if (event.key === "z" && event.ctrlKey) {
			if ($undo.length != 0) {
				// console.log($undo);
				let last = $undo[$undo.length - 1];
				motors.update((motors) => [...motors, { size: last.size, volume: last.volume, surface: last.surface }]);
				undo.update((arr) => arr.filter((val) => val.size !== last.size));
			}
		}
	}

	let slug = $page.url.search.substr(8);

	function calculateVolume(size: string) {
		let sizeP = size.replace(",", ".");
		let sizeRadius = parseFloat(sizeP.substr(0, 2));
		let sizeHeight = parseFloat(sizeP.substr(2, 5));
		let pi = 3.141;
		// cry about it

		let volume = parseFloat(((sizeRadius / 2) ** 2 * pi * sizeHeight).toFixed(0));
		return volume;
	}

	function calculateSurface(size: string) {
		let sizeP = size.replace(",", ".");
		let sizeRadius = parseFloat(sizeP.substr(0, 2));
		let sizeHeight = parseFloat(sizeP.substr(2, 5));
		let pi = 3.141;
		// cry about it

		let surface = parseFloat(((sizeRadius / 2) * 2 * pi * sizeHeight + (sizeRadius / 2) ** 2 * pi * 2).toFixed(0));
		return surface;
	}

	let loadMotors:{size: string, volume: number, surface: number}[] = [];

	slug.split('-').forEach((motor) => {
		if (slug) {
			let size = motor;
			let volume = calculateVolume(motor);
			let surface = calculateSurface(motor);
			loadMotors.push({ size, volume, surface });
		}
	});

	// this is weird but it prevents it from duplicating on HMR
	$motors = loadMotors;

	let newSize = ""
	let newVolume: number
	let newSurface: number

	function addMotor() {
		// if (!$motors.find(motor => motor.size === newSize)) {
		// if motor exists in array or has NaN values, don't add it
		if (!$motors.find(motor => motor.size === newSize) && !isNaN(newVolume) && !isNaN(newSurface)) {
			motors.update((motors) => [...motors, { size: newSize, volume: newVolume, surface: newSurface }]);
			undo.update((arr) => [...arr, { size: newSize, volume: newVolume, surface: newSurface }]);
			newSize = "";
			newVolume = NaN;
			newSurface = NaN;
		} else {
			alert("Motor already exists or has invalid values!")
		}
	}

	let sortOptions = [
		{ label: "Volume (High to Low)", name: "volume-desc" },
		{ label: "Volume (Low to High)", name: "volume-asc" },
		{ label: "Surface Area (High to Low)", name: "surface-desc" },
		{ label: "Surface Area (Low to High)", name: "surface-asc" },
	]

	let selectedSort:{label: string, name: string} = null;

	function sortMotors() {
		// sort depending on selectedSort
		switch (selectedSort.name) {
			case "volume-desc":
				motors.update((motors) => motors.sort((a, b) => b.volume - a.volume));
				break;
			case "volume-asc":
				motors.update((motors) => motors.sort((a, b) => a.volume - b.volume));
				break;
			case "surface-desc":
				motors.update((motors) => motors.sort((a, b) => b.surface - a.surface));
				break;
			case "surface-asc":
				motors.update((motors) => motors.sort((a, b) => a.surface - b.surface));
				break;
		}
	}

	$: if (selectedSort) {
		sortMotors();
	}

	let prefix = "VitroidFPV";
	let titleRaw = "Stator Volume Calculator";
	let title = " - " + titleRaw;
	let color = "#5ad8e6";
	let color1 = tinycolor(color).lighten(20).spin(10).toHexString();
	let color2 = tinycolor(color).darken(20).spin(10).toHexString();
	let description = "Easily calculate and compare different motos in terms of stator volume and surface area!\n \n" + 
	$motors.map(motor => motor.size + " - Surface Area: " + motor.surface + "mm², " + "Volume: " + motor.volume + "mm³").join("\n");
</script>

<svelte:head>
	<title>VitroidFPV{title}</title>
	<meta name="author" content="VitroidFPV" />
	<!-- <meta property="og:image" content="https://vitroidfpv-sv.netlify.app{img}" /> -->
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

<svelte:window on:keydown={keydown}/>

<div class="overflow-x-clip h-fit">
	<div class="flex flex-col w-full relative px-4 md:px-0">
		<div class="mt-20 mb-4 w-fit z-20 md:pl-8">
			<MainHeader title="Stator Calculator" color="cyan"/>
			<Header title="Advanced Stator Size Calculator" />
			<p class="text-lg md:w-1/2">
				Easily calculate and compare different motos in terms of stator volume and surface area!<br><br>
				This stator volume calculator is a greatly expanded version of the smaller calculator on the Tools page. It comes with 
				a better UX for adding comparisons, sort options, and an API-style URL that you can use to share 
				comparisons with others!
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

<div class="p-4 md:p-8 content-box">
	<div class="relative h-20 w-full flex justify-end">
		<Listbox 
			class={({open}) => (open ? "gap-2" : " gap-0") + " listbox"} 
			bind:value={selectedSort}
			let:open
		>
			<ListboxButton class="text-cyan flex items-center p-4">
				{#if !selectedSort}
					Sort By
				{:else}
					{selectedSort.label}
				{/if}
				<div class="ml-2 duration-300 rotate-0" class:rotate-90={open}>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-4 h-4">
						<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
					</svg>
				</div>
			</ListboxButton>
			{#if open}
				<div transition:fade={{duration: 150}}>
					<ListboxOptions class="listbox-options">
						{#each sortOptions as option}
							<ListboxOption
								value={option}
								class={({selected})=> (selected ? "listbox-selected" : "") + " listbox-option"}
							>
								{option.label}
							</ListboxOption>
						{/each}
					</ListboxOptions>
				</div>
			{/if}
		</Listbox>
	</div>
	<div class="w-full flex flex-col gap-4 z-10">
		{#if $motors}
			{#each $motors as motor}
				<MotorComparison size={motor.size} volume={motor.volume} surface={motor.surface} />
			{/each}
		{/if}
		<div 
			class="p-4 bg-neutral-500/10 rounded-3xl backdrop-blur-md border-dashed border-2 border-neutral-500/40 flex duration-300 
			transition-all justify-between items-center"
		>
			<div class="flex">
				<input
					bind:value={newSize}
					on:input={() => {
						newVolume = calculateVolume(newSize);
						newSurface = calculateSurface(newSize);
					}}
					on:keydown={(e) => {
						if (e.key === "Enter") {
							addMotor();
						}
					}}
					type="text"
					placeholder="Add New"
					class="bg-neutral-500/10 w-28 h-8 rounded-2xl p-3 text-base duration-300
					outline-none focus-within:outline-cyan outline-[3px]"
				/>
					<!-- <button
						class="text-cyan"
						on:click={() => {
							motors.update((motors) => [...motors, { size: newSize, volume: newVolume }]);
							undo.update((arr) => [...arr, { size: newSize, volume: newVolume }]);
							newSize = "";
							newVolume = NaN;
						}}
					>
					Add New
					</button> -->
				</div>
			<div class="md:gap-8 gap-3 flex">
				<div class:invisible={isNaN(newSurface)}><span class="text-neutral-400 text-base mr-1">Surface: </span>{newSurface}mm²</div>
				<div class:invisible={isNaN(newVolume)}><span class="text-neutral-400 text-base mr-1">Volume: </span>{newVolume}mm³</div>
				<button
					class="text-cyan"
					on:click={addMotor}
				>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-6 h-6 stroke-neutral-500/50 hover:stroke-cyan duration-300 rotate-45">
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
		</div>
	</div>
	<div class="mt-8 text-lg md:w-1/2">
		<p>
			Calculating the stator volume is important when you want to compare motors of different sizes. Two motors 
			with seemingly completely different sizes can have very similar stator volumes, and so you can expect 
			similar performance. This applies for most of commonly used sizes until you move to very large motors.<br><br>

			The stator surface area is also important, the more surface area you have exposed to the air, the more 
			heat you can dissipate. <br><br>
		</p>
		<p>
			The motor stator size is listed as <code>xxyy</code>, with the <code>xx</code> being the
			width, and <code>yy</code> being the height. A 2207 motor will have a stator 22mm wide,
			and 7mm high<br /><br />
			The calculation to get the stator volume is for a simple cylinder:
			<code>π × <span class="text-cyan">r</span><sup>2</sup> × <span class="text-cyan">h</span></code><br><br>
			And the calculation for the surface area is:
			<code>(2 × π × <span class="text-cyan">r</span> × <span class="text-cyan">h</span>) + (2 × π × <span class="text-cyan">r</span><sup>2</sup>)</code><br><br>
		</p>
		<!-- This is very rambly but most of my google clicks come from the little calculator believe it or Notification. SEO for the win I guess -->
	</div>
</div>