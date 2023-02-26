<script lang="ts">
	import MainHeader from "$components/mainHeader.svelte";
	import Header from "$components/Header.svelte";
	import Paragraph from "$components/Paragraph.svelte";

	import domtoimage from "dom-to-image";
	// @ts-ignore
	import { copyImageToClipboard } from "copy-image-clipboard/dist/index.common.js";
	import { onMount } from "svelte";

	function copyCalc(id: string) {
		var node = document.getElementById(id);

		domtoimage
			.toPng(node as HTMLElement, { height: 100, width: 400, bgcolor: "#0f0f0f" })
			.then(function (dataUrl) {
				var img = new Image();
				img.src = dataUrl;
				console.log(dataUrl);

				copyImageToClipboard(dataUrl)
					.then(() => {
						console.log("Image Copied");
					})
					.catch((e: any) => {
						console.log("Error: ", e.message);
					});
			})
			.catch(function (error) {
				console.error("oops, something went wrong!", error);
			});
	}

	let size: string = "";
	let rounded = false;

	let dbmToMw = true;
	let dbmToMwRotated = 0
	// if dbmToMw is true, then the dbmToMwRotated is 0, otherwise it is 180

	function toggleDbmToMw() {
		dbmToMw = !dbmToMw;
		dbmToMwRotated = dbmToMw ? 0 : 180
	}
	let dbm = 0;
	let mw = 0;
	console.log(dbmToMw);

	function calculateVolume(size: string) {
		let sizeP = size.replace(",", ".");
		let sizeRadius = parseFloat(sizeP.substr(0, 2));
		let sizeHeight = parseFloat(sizeP.substr(2, 5));
		// console.log(sizeRadius, sizeHeight);
		let pi = 3.141;
		// cry about it

		let volume = parseFloat(((sizeRadius / 2) ** 2 * pi * sizeHeight).toFixed(0));
		return volume;
	}

	function calculateMwDbm() {
		if (dbmToMw) {
			mw = parseFloat((10 ** (dbm / 10)).toFixed(2));
		} else {
			dbm = parseFloat((10 * Math.log10(mw)).toFixed(2));
			if (dbm < 0) {
				dbm = 0;
			}
		}
	}

	let prefix = "VitroidFPV";
	let titleRaw = "Tools";
	let title = " - " + titleRaw;
	let color = "#5ad8e6";
	let img = "/uploads/images/radio_512.png";
	let description =
		"A bunch of things™ that I found important enough to calculate/have access to/include in places where it wouldn't go otherwise";
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

<div class="content-box">
	<MainHeader>{titleRaw}</MainHeader>
	<Header text="A collection of various calculators and other stuff™"/>
	<Paragraph>{description}</Paragraph>

	<div class="my-8 w-full h-fit">

		<div class="Calculators category mb-4 w-full h-fit flex flex-col">
			<div class="text-4xl tracking-tight w-fit px-1 cat Calculators mb-2" id=Calculators>Calculators</div>
			<!-- a lot of nested divs for actual content -->
			<div class="md:ml-3 flex flex-col md:flex-row flex-wrap w-full md:justify-start md:items-start items-center border-white/10">
				<div class="green h-fit max-w-sm min-w-[18rem] border-l-4 product pl-2 my-4 mx-2" id="calc">
					<p class="text-2xl text-green">Stator Volume</p>
					<div>
						<div class="flex my-4 h-fit">
							<div class="flex items-end">
								<p>Motor Size:</p>
								<input
									bind:value={size}
									on:input={() => calculateVolume(size)}
									type="text"
									class="bg-gray-500/30 w-16 h-8 ml-2 rounded-md p-2 text-base duration-300
								outline-none focus-within:outline-highlight outline-[3px]"
								/>
							</div>
							<div class="flex items-end ml-4">
								<p>Result:</p>
								<div
									class:invisible={isNaN(calculateVolume(size)) || calculateVolume(size) == 0}
									class="bg-gray-500/30 flex items-center align-middle min-w-[2rem] h-8 ml-2 rounded-md p-2 text-base text-green w-fit duration-300"
								>
									{calculateVolume(size)}
								</div>
								<p class:invisible={isNaN(calculateVolume(size)) || calculateVolume(size) == 0}>mm³</p>
							</div>
						</div>
						<p class="">
							The motor stator size is listed as <code>xxyy</code>, with the <code>xx</code> being the
							width, and <code>yy</code> being the height. A 2207 motor will have a stator 22mm wide,
							and 7mm high<br /><br />
							The calculation to get the stator volume is for a simple cylinder:
							<code>π × r<sup>2</sup> × h</code>
						</p>
						<div class="flex mt-2">
							<button on:click={() => (copyCalc("calc"))}>
								<div class="h-fit w-fit bg-green/90 rounded-md py-1 px-2 cursor-pointer">Copy!</div>
							</button>
							<!-- <input type="checkbox" on:change={console.log(rounded)} on:input={calculateVolume} name="Rounded" id="Rounded" class="ml-4" bind:checked={rounded}> -->
						</div>
					</div>
				</div>
				<div class="green h-fit max-w-sm min-w-[18rem] border-l-4 product pl-2 my-4 mx-2" id="power">
					<p class="text-2xl text-green">dBm &lt;―&gt; mW</p>
					<div>
						<div class="flex my-4 h-fit">
							<div class="flex items-end mr-4">
								<input
								bind:value={dbm}
								on:input={calculateMwDbm}
								type="text"
								class="bg-gray-500/30 w-16 h-8 ml-2 rounded-md p-2 mr-1 text-base duration-300
								outline-none focus-within:outline-highlight outline-[3px]"
								/>
								<p>dBm</p>
							</div>
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<div style="transform: rotate({dbmToMwRotated}deg)" class="duration-300 text-2xl hover:text-highlight dark:hover:text-highlight-dark" on:click={() => toggleDbmToMw()}>→</div>
							<div class="flex items-end ml-4">
								<input
								bind:value={mw}
								on:input={calculateMwDbm}
								type="text"
								class="bg-gray-500/30 w-16 h-8 ml-2 rounded-md p-2 mr-1 text-base duration-300
								outline-none focus-within:outline-highlight outline-[3px]"
								/>
								<p>mW</p>
							</div>
						</div>
						<p class="mb-4">
							<code>dBm</code> is a unit of power measurement. It is a logarithmic unit (unlike Watts), and is used to compare the power of different signals.
						</p>
						<p class="mb-4">
							Given power in <code class="text-green">dBm</code>, 
							the calculation to get the power in <code class="text-yellow">mW</code> is 
							<code>
								<span class="text-yellow">mW</span> = 10<sup>(<span class="text-green">dBm</span>/10)</sup>
							</code>
						</p>
						<p class="mb-4">
							Given power in <code class="text-yellow">mW</code>,
							the calculation to get the power in <code class="text-green">dBm</code> is
							<code><span class="text-green">dBm</span> = 10 × (log10 <span class="text-yellow">mW</span>)
						</p>
						<button on:click={() => (copyCalc("power"))}>
							<div class="h-fit w-fit bg-green/90 rounded-md py-1 px-2 cursor-pointer">Copy!</div>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
