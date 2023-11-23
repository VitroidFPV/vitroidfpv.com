<script lang="ts">
	import BuildCard from "$components/buildsPage/buildCard.svelte";
	import Header from "$components/Header.svelte";
	import MainHeader from "$components/MainHeader.svelte";
	import Paragraph from "$components/Paragraph.svelte";
	import tinycolor from "tinycolor2";
	import Link from "$components/Link.svelte";
	import AudioPlayer from "$components/toolsPage/AudioPlayer.svelte";
	import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from "@rgossiaux/svelte-headlessui";
	
	import { Icon } from "@steeze-ui/svelte-icon";
	import { ChevronUp, ArrowPathRoundedSquare, FolderArrowDown } from "@steeze-ui/heroicons";

	import { marked } from "marked";
	import { slide, fly } from "svelte/transition";
	import { browser } from '$app/environment';

	let sounds = import.meta.glob("/static/uploads/edgetx-sounds/*.wav");
	let soundFiles: string[] = [];
	for (const path in sounds) {
		soundFiles.push(path.split("/").pop()!);
	}
	// console.log(soundFiles)

	let selectedSound = soundFiles[0];
	// console.log(selectedSound)

	// get duration of selected sound
	// let selectedDuration = 0;
	// $: if (selectedSound) {
	// 	let audio = new Audio("/uploads/edgetx-sounds/" + selectedSound);
	// 	audio.addEventListener("loadedmetadata", () => {
	// 		selectedDuration = audio.duration;
	// 	});
	// }
	// $: console.log(selectedDuration)


	import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

	marked.setOptions({
		gfm: true,
		breaks: true,
		sanitize: false,
		smartLists: false,
		smartypants: false,
		xhtml: false,
	});

	let files: any = null;
	let inputFileName: string = ""
	// $: console.log(files)

	const ffmpeg = createFFmpeg({
		// log: true
	});

	let inputSrc: string = ""
	let prevSrc: string = ""
	let destinationSrc: string = ""

	$: if (files) {
		inputFileName = files[0].name
		inputSrc = URL.createObjectURL(files[0])
		// console.log(inputSrc)
	}

	$: if (sounds) {
		destinationSrc = "/uploads/edgetx-sounds/" + selectedSound
		// console.log(destinationSrc)
	}

	// $: console.log(selectedSound)

	// @ts-ignore
	const transcode = async (files): Promise<void> => {
		const { name } = files[0];
		if (!ffmpeg.isLoaded()) {
			await ffmpeg.load();
		}
		// console.log("FFMPEG Loaded: " + name)
		ffmpeg.FS("writeFile", name, await fetchFile(files[0]));
		// ffmpeg -i input.mp3 -ac 1 -ar 32000 -sample_fmt s16 -c:a pcm_s16le -y 123456.wav
		await ffmpeg.run("-i", name, "-ac", "1", "-ar", "32000", "-sample_fmt", "s16", "-c:a", "pcm_s16le", "-y", "output.wav");
		const data = ffmpeg.FS("readFile", "output.wav");
		if (browser) {
			// const output = document.getElementById("audioPrev") as HTMLAudioElement;
			// output.src = URL.createObjectURL(new Blob([data.buffer], { type: "audio/wav" }));
			prevSrc = URL.createObjectURL(new Blob([data.buffer], { type: "audio/wav" }));
			// console.log(prevSrc)
		}
		setTimeout(() => {
			ffmpeg.exit(); // ffmpeg.exit() is callable only after load() stage.
		}, 1000);
	}

	let prefix = "VitroidFPV";
	let titleRaw = "EdgeTX Sounds";
	let title = " - " + titleRaw;
	let color = "#5a6fe6";
	let color1 = tinycolor(color).lighten(20).spin(10).toHexString();
	let color2 = tinycolor(color).darken(20).spin(10).toHexString();
	let img = "/uploads/images/tx16s_512.png";
	let description =
		"Automatically convert any MP3 file to a format compatible with any OpenTX or EdgeTX radio.";

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

	<!-- // 			res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
	// 			res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
	// 			res.setHeader("Cross-Origin-Resource-Policy", "cross-origin"); -->

	<!-- rewrite those headers -->
	<meta http-equiv="Cross-Origin-Embedder-Policy" content="require-corp">
	<meta http-equiv="Cross-Origin-Opener-Policy" content="same-origin">
	<meta http-equiv="Cross-Origin-Resource-Policy" content="cross-origin">

</svelte:head>

<div class="overflow-x-clip h-fit">
	<div class="flex flex-col w-full relative px-4 md:px-0">
		<div class="mt-20 mb-10 w-fit z-20 md:pl-8">
			<MainHeader title={titleRaw} color="blue"/>
			<Header title="Customizing your radio sounds has never been easier" />
			<p class="text-xl md:w-1/2 md:px-0">
				Talk about a corny catchphrase... {description}<br><br>

				Just upload any MP3 file and it will be converted to the specific format required by your radio. In addition, you can easily pick the file you want to replace and it will be automatically match the original file name.<br><br>
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

<div class="content-box">
	<div class="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-8 min-h-96">
		<label 
			for="input" 
			class="p-8 bg-neutral-500/10 dark:hover:bg-neutral-400/10 hover:bg-neutral-700/10 
			rounded-2xl backdrop-blur-md outline-dashed outline-2 outline-neutral-500/40 flex flex-col duration-300 
			justify-center items-center cursor-pointer col-span-1"
		>
			<h2 class="text-2xl">Drag and drop to upload</h2>
			<p class="text-xl text-main-100 dark:text-contrast-500">or</p>
			<p class="text-xl text-main-300 dark:text-contrast-300">Click to select a file</p>
			<input 
				type="file" 
				name="input" 
				id="input" 
				accept=".mp3" 
				class="hidden"
				bind:files={files}
			>
		</label>
		<div class="xl:col-span-2 h-full">
			<h2 class="text-blue text-5xl mb-4">Options</h2>
			<div class="grid grid-cols-4 h-full grid-rows-3 gap-8">
				<div class="md:col-span-2 col-span-4">
					<div class="">
						<p class="text-base mb-2">
							Input file:
						</p>
						{#if files}
							<div class="transition-container">
								<p class="text-blue text-xl" transition:fly|local={{duration: 300, delay: 200, x: 100}}>
									{inputFileName}
								</p>
							</div>
						{/if}
					</div>
				</div>
				<div class="md:col-span-1 col-span-2 md:row-start-auto md:row-end-auto row-start-3 row-end-4">
					<p class="text-base mb-2">
						Destination file:
					</p>
					<!-- <audio id="audioPrev" controls></audio> -->
					<div class="relative">
						<Listbox class={({open}) => (open ? "gap-2" : " gap-0") + " listbox"} value={selectedSound} let:open on:change={(e) => (selectedSound = e.detail)}>
							<ListboxButton class="text-blue text-xl flex items-center px-2 py-3">
								{selectedSound}
								<div class="ml-2 duration-300 rotate-0" class:rotate-90={open}>
									<Icon src={ChevronUp} class="w-4 h-4" stroke-width="3" />
								</div>
							</ListboxButton>
							{#if open}
								<div transition:slide>
									<ListboxOptions class="listbox-options">
										{#each soundFiles as sound}
											<ListboxOption
												value={sound}
												let:selected
												class={({selected})=> (selected ? "listbox-selected" : "") + " listbox-option"}
											>
												{sound}
											</ListboxOption>
										{/each}
									</ListboxOptions>
								</div>
							{/if}
						</Listbox>
					</div>
				</div>
				<div class="md:col-span-2 col-span-4 row-start-2 row-end-3">
					<p class="text-base mb-2">
						Input preview:
					</p>
					{#if inputSrc}
						<div class="transition-container">
							<div transition:fly|local={{duration: 300, delay: 300, x: 100}}>
								<AudioPlayer src={inputSrc} />
							</div>
						</div>
					{/if}
				</div>
				<div class="md:row-start-2 md:row-end-3 md:col-span-1 col-span-2 row-start-3 row-end-4">
					<p class="text-base mb-2">
						Destination preview:
					</p>
					{#if destinationSrc}
						<div>
							<AudioPlayer src={destinationSrc} />
						</div>
					{/if}
				</div>
				<div class="md:col-span-1 col-span-2 md:row-start-auto md:row-end-auto row-start-4 row-end-5 flex items-center">
						{#if files}
							<div class="transition-container">
								<button 
									class="mb-4 bg-blue/20 hover:bg-blue/40 text-blue backdrop-blur-md p-4 
									rounded-full outline outline-4 outline-current duration-300 shadow-xl text-2xl flex 
									items-center" 
									on:click={() => transcode(files)}
									transition:fly|local={{duration: 300, delay: 400, x: -100}}
								>
									<Icon src={ArrowPathRoundedSquare} class="w-8 h-8 mr-2" stroke-width="2" />
									Transcode
								</button>
							</div>
						{/if}
				</div>

				<div class="md:col-span-1 md:row-start-2 md:row-end-3 col-span-2 row-start-4 row-end-5 flex items-center">
					{#if prevSrc && prevSrc.length > 0}
						<div class="transition-container">
							<a
								class="mb-4 bg-blue/20 hover:bg-blue/40 text-blue backdrop-blur-md p-4 rounded-full
								outline outline-4 outline-current duration-300 shadow-xl text-2xl flex items-center"
								href={prevSrc}
								download={selectedSound}
								target="_blank"
								rel="noopener noreferrer"
								transition:fly|local={{duration: 300, delay: 200, x: -100}}
							>
								<Icon src={FolderArrowDown} class="w-8 h-8 mr-2" stroke-width="2" />
								Download
							</a>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>