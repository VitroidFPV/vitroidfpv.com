<script lang="ts">
	import { run } from 'svelte/legacy';

	import MainHeader from "$components/MainHeader.svelte";
	import Header from "$components/Header.svelte";
	import Button from "$components/Button.svelte";
	import AudioPlayer from "$components/toolsPage/AudioPlayer.svelte";
	import { ArrowPath, ArrowDownTray } from "@steeze-ui/heroicons"

	import tinycolor from "tinycolor2";
	import toast from "svelte-french-toast";

	import { FFmpeg } from "@ffmpeg/ffmpeg";
	import type { LogEvent } from "@ffmpeg/ffmpeg/dist/esm/types";
	import { fetchFile, toBlobURL } from "@ffmpeg/util";
	import { fly } from "svelte/transition";
	import { Icon } from "@steeze-ui/svelte-icon";

	let fullSoundList = false;

	let soundNames: string[] = [];
	if (fullSoundList) {
		const soundList = import.meta.glob("/static/uploads/edgetx-sounds/**/*.wav");
		for (const path in soundList) {
			soundNames.push(path.split("/").pop()!);
		}
	} else {
		const soundList = import.meta.glob("/static/uploads/edgetx-sounds/*.wav");
		for (const path in soundList) {
			soundNames.push(path.split("/").pop()!);
		}
	}
	soundNames.sort();
	// console.log(soundNames);

	let files: FileList = $state();
	let inputFileName: string = $state();
	let inputSrc: string = $state();

	let soundSearch: string = $state("");
	let selectedSound: string | undefined = $state();
	let outputSrc: string = $state();

	let resultSrc: string = $state();

	function search() {
		const filtered = soundNames.filter((name) => name.toLowerCase().includes(soundSearch.toLowerCase()));
		// console.log(filtered)
		selectedSound = filtered[0];
	}

	run(() => {
		if (selectedSound && selectedSound != "") {
			outputSrc = `/uploads/edgetx-sounds/${selectedSound}`;
			console.log(outputSrc);
		}
	});

	run(() => {
		if (files) {
			const file = files[0];
			inputFileName = file.name;
			inputSrc = URL.createObjectURL(file);
			console.log(files);
		}
	});

	const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm";
	const videoURL = "https://raw.githubusercontent.com/ffmpegwasm/testdata/master/video-15s.avi";
	let message = "message";

	let loading = $state(false);

	async function transcode() {
		if (!files) {
			console.error("No sound uploaded!");
			toast.error("No sound uploaded!", {
				style: "border-radius: 999px; backdrop-filter: blur(8px); box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1); outline: 2px solid #ffffff1f; background-color: rgb(163 163 163 / 0.1); color: #d6395b;",
				iconTheme: {
					primary: "#d6395b",
					secondary: "#000000",
				}
			})
			return;
		}

		if (selectedSound == "" || selectedSound == undefined) {
			console.error("No sound selected!");
			toast.error("No sound selected!", {
				style: "border-radius: 999px; backdrop-filter: blur(8px); box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1); outline: 2px solid #ffffff1f; background-color: rgb(163 163 163 / 0.1); color: #d6395b;",
				iconTheme: {
					primary: "#d6395b",
					secondary: "#000000",
				}
			})
			return;
		}

		const ffmpeg = new FFmpeg();
		loading = true;
		message = "Loading ffmpeg-core.js";
		ffmpeg.on("log", ({ message: msg }: LogEvent) => {
			message = msg;
			console.log(message);
		});

		await ffmpeg.load({
			coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
			wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
		});

		message = "Start transcoding";
		await ffmpeg.writeFile("input.mp3", await fetchFile(inputSrc));
		// to 32k mono wav
		const outputName = selectedSound + ".wav";
		await ffmpeg.exec(["-i", "input.mp3", "-ac", "1", "-ar", "32000", outputName]);
		message = "Complete transcoding";
		const data = await ffmpeg.readFile(outputName);
		console.log("done");
		resultSrc = URL.createObjectURL(new Blob([data as Uint8Array], { type: "audio/wav" }));
		toast.success("Converted!", {
			style: "border-radius: 999px; backdrop-filter: blur(8px); box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1); outline: 2px solid #ffffff1f; background-color: rgb(163 163 163 / 0.1); color: #87cc52;",
			iconTheme: {
				primary: "#87cc52",
				secondary: "#000000",
			}
		});
		console.log(resultSrc);
		loading = false;
	}

	let prefix = "Tools";
	let titleRaw = "EdgeTX Sounds";
	let title = " - " + titleRaw;
	let color = "#5ad8e6";
	let color1 = tinycolor(color).lighten(20).spin(10).toHexString();
	let color2 = tinycolor(color).darken(20).spin(10).toHexString();
	let description = "Automatically convert any MP3 file to a format compatible with any OpenTX or EdgeTX radio!";
</script>

<svelte:head>
	<title>VitroidFPV{title}</title>
	<meta name="author" content="VitroidFPV" />
	<!-- <meta property="og:image" content="https://vitroidfpv.com{img}" /> -->
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

<div class="overflow-x-clip h-fit relative">
	<div class="flex flex-col w-full relative px-4 md:px-0">
		<div class="mt-20 mb-10 w-fit z-20 md:pl-8 px-4">
			<MainHeader title={titleRaw} color="cyan"/>
			<Header title="Customizing your radio sounds has never been easier" />
			<p class="text-xl md:w-1/2 md:px-0">
				{description}<br><br>
				Just upload any MP3 file and it will be converted to the specific format required by your radio. In addition, you can easily pick the file you want to replace and it will be automatically match the original file name.<br><br>
			</p>
		</div>
		<div class="absolute w-full h-full pointer-events-none">
			<div style="-webkit-mask-image: linear-gradient(transparent, black, transparent);"
				class="absolute w-full h-[150%] dark:bg-grid-dark bg-grid-light bg-repeat dark:opacity-[.15] opacity-60 z-10 pointer-events-none">
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

	<div class="grid xl:grid-cols-3 grid-cols-2 xl:grid-rows-3 grid-rows-4 w-full p-8 gap-8 xl:h-96">

		<div class="xl:col-span-1 col-span-2 xl:row-span-full md:row-span-1 order-1">
			<label 
				for="input" 
				class="p-8 bg-neutral-400/10 hover:bg-neutral-400/20
				rounded-2xl backdrop-blur-md outline-2 outline-dashed outline-neutral-500/40 flex flex-col duration-300 
				justify-center items-center cursor-pointer h-full w-full"
			>
				{#if inputFileName == undefined}
					<div class="text-2xl font-medium md:block hidden">Drag and drop to upload</div>
					<div class="text-xl text-main-100 dark:text-contrast-500 md:block hidden">or</div>
					<div class="text-xl text-main-300 dark:text-contrast-300">Click to select a file</div>
				{:else}
					<div class="flex xl:flex-col flex-row items-center justify-center">
						<div class="text-2xl font-medium">Current file:</div>
						<div class="text-xl text-main-300 dark:text-contrast-300 text-center">{inputFileName}</div>
					</div>
				{/if}
				<input 
					type="file" 
					name="input" 
					id="input" 
					accept=".mp3" 
					class="hidden"
					bind:files={files}
				>
			</label>
		</div>

		<div class="col-span-1 flex flex-col justify-between xl:order-2 order-4">
			<div>Destination Preview</div>
			<AudioPlayer src={outputSrc} />
		</div>

		<div class="col-span-1 xl:order-3 order-5">
			<div>Destination Options</div>
			<div class="h-full flex gap-2 items-center">
				<select
					bind:value={selectedSound}
					class="bg-neutral-500/10 rounded-2xl px-4 py-2 text-base duration-300 outline-none focus-within:outline-cyan outline-[3px] cursor-pointer hover:text-cyan whitespace-nowrap"
				>
					<option value="">Select Sound</option>
					{#each soundNames as option}
						<option value={option}>{option}</option>
					{/each}
				</select>
				<div class="w-full">
					<input
						type="text"
						name="filter"
						id="filter"
						class="bg-neutral-500/10 w-full h-8 rounded-2xl p-3 text-base duration-300
						outline-none focus-within:outline-cyan outline-[3px]"
						placeholder="Search..."
						autocomplete="off"
						bind:value={soundSearch}
						oninput={search}
					>
				</div>
			</div>
		</div>

		<div class="col-span-1 flex flex-col justify-between xl:order-4 order-2">
			<div>Input Preview</div>
			<AudioPlayer src={inputSrc} />
		</div>

		<div class="spacer col-span-1 xl:order-5 order-3"></div>

		{#if selectedSound && files}
			<div class="order-6">
				<Button color="cyan" isLink={false} on:click={transcode} size="lg" class="w-full">
					<Icon src={ArrowPath} class={loading ? "animate-spin w-8 h-8" : "w-8 h-8"} />
					Convert
				</Button>
			</div>
		{/if}

		<!-- button link to download result -->
		{#if resultSrc}
			<!-- <a href={resultSrc} download={selectedSound} class="col-span-1">
				<Button color="cyan" isLink={true} size="lg">Download</Button>
			</a> -->
			<div class="order-7">
				<Button isDownload color="cyan" href={resultSrc} download={selectedSound} size="lg" class="w-full">
					<Icon src={ArrowDownTray} class="w-8 h-8" />
					Download
				</Button>
			</div>
		{/if}
		
	</div>

</div>