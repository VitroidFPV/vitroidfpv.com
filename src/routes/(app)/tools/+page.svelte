<script lang="ts">
	import { run, handlers } from 'svelte/legacy';

	import MainHeader from "$components/MainHeader.svelte";
	import Header from "$components/Header.svelte";
	import Paragraph from "$components/Paragraph.svelte";
	import { compareArray } from "$lib/stores/toolsStore";
	import { slide } from "svelte/transition";
	import { Switch } from "@skeletonlabs/skeleton-svelte";
	import toast from 'svelte-french-toast';
	import { copyNode } from "$lib/copy";

	import { Icon } from "@steeze-ui/svelte-icon";
	import { AdjustmentsVertical, Clipboard, ChevronUp } from "@steeze-ui/heroicons";

	function copyCalc(id: string) {
		var node = document.getElementById(id);

		let height = 100
		let width = 400

		if (id === "wh") {
			height = 150
		}
		// @ts-ignore
		copyNode(node, height, width)
	}

	function copyCompare() {
		// @ts-ignore
		let node: HTMLElement = document.getElementById("compare");

		copyNode(node);
	}

	let size: string = $state("");
	let rounded = false;

	let dbmToMw = true;
	let dbmToMwRotated = $state(0)
	// if dbmToMw is true, then the dbmToMwRotated is 0, otherwise it is 180

	function toggleDbmToMw() {
		dbmToMw = !dbmToMw;
		dbmToMwRotated = dbmToMw ? 0 : 180
	}
	let dbm = $state(0);
	let mw = $state(0);
	// console.log(dbmToMw);

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

	function addCompare(size: string) {
		// compareArray.push(size);
		// if size is 0, then don't add it
		if (size != "0") {
			// update the compareArray store
			compareArray.update((arr) => {
				// if the array already contains the size, then remove it
				if (arr.includes(size)) {
					return arr.filter((val) => val !== size);
				} else {
					toast.success("Added to Comparison!", {
						style: "border-radius: 999px; backdrop-filter: blur(8px); box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1); outline: 2px solid #ffffff1f; background-color: rgb(163 163 163 / 0.1); color: #87cc52;",
						iconTheme: {
							primary: "#87cc52",
							secondary: "#000000",
						}
					});
					// if the array doesn't contain the size, then add it
					return [...arr, size];
				}
			});
		}
		// console.log($compareArray);
	}

	let compareOpen = $state(false);
	import { backInOut } from 'svelte/easing';
	import SizeComparison from "$components/toolsPage/SizeComparison.svelte";
	import Link from "$components/Link.svelte";

	function expand(node:HTMLElement, {
		delay = 0,
		duration = 300,
	}) {
		const h = node.offsetHeight;
		const w = node.offsetWidth;


		return {
			delay,
			duration,
			// @ts-ignore
			css: t => {
				const eased = backInOut(t)
				// first 50% of the animation, the height stays at 48px, the width goes from 0 to 100%
				// delay the second 50% of the animation by 50ms
				// second 50% of the animation, the height goes from 48px to 100%, the width stays 100%
				// also from t 0 to 100, ease opacity from 0 to 1
				return `
					overflow: hidden;
					height: ${t < 0.5 ? 48 : eased * h}px;
					width: ${t < 0.5 ? eased * w : w}px;
					opacity: ${t};
				`
			}
		}
	}

	run(() => {
		if ($compareArray.length == 0) {
			compareOpen = false;
		}
	});

	let cellCount = $state(1);
	let isHv = $state(false);
	let capacity = $state(0);
	let wh = $state(0);

	function updateCellCount(increment: boolean) {
		if (increment) {
			if (cellCount < 69) {
				cellCount++;
			}
		} else {
			if (cellCount > 1) {
				cellCount--;
			}
		}
	}

	function calculateWh() {
		if (isHv) {
			wh = capacity / 1000 * 3.85;
		} else {
			wh = capacity / 1000 * 3.7;
		}
		wh = parseFloat((wh * cellCount).toFixed(2));
	}

	run(() => {
		isHv = isHv
		calculateWh();
	});

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


<div class="p-4 md:p-8 content-box relative">
	<div class="absolute w-full h-full -ml-8 pr-8">
		<div class="sticky top-8 flex justify-end z-20">
			<button 
				onclick={() => {
					if ($compareArray.length > 0) {
						compareOpen = !compareOpen;
					} else {
						compareOpen = false;
					}
				}}
				class="h-12 w-12 group bg-neutral-500/20 border-2 border-neutral-500/40 shadow-lg
				hover:bg-highlight hover:border-highlight dark:hover:border-highlight-dark backdrop-blur-md z-10 
				dark:hover:bg-highlight-dark duration-300 rounded-full flex items-center justify-center relative">
				<Icon class="w-6 h-6" src={AdjustmentsVertical} size="24" theme="default" title="Compare" />
				{#if $compareArray.length > 0}
					<div class="p-1 absolute h-6 aspect-square bg-contrast-200 dark:bg-main-100 -top-2 -right-2 text-sm rounded-full z-10 shadow-lg">{$compareArray.length}</div>
				{/if}
			</button>
			{#if compareOpen}
				<div transition:expand={{duration: 1000, delay: 0}} id="compare" class="w-64 min-h-fit p-4 absolute bg-neutral-500/10 right-0 top-0 rounded-3xl backdrop-blur-md border-2 border-neutral-500/40 flex flex-col duration-300 transition-all">
					<div class="flex">
						<div class="text-2xl text-highlight dark:text-highlight-dark mb-4 mr-2">Compare</div>
						<button onclick={() => copyCompare()} class="h-8 w-8 outline outline-2 outline-highlight dark:outline-highlight-dark bg-highlight/20 dark:bg-highlight-dark/20 hover:bg-highlight/40 dark:hover:bg-highlight-dark/40 duration-300 rounded-full flex items-center justify-center relative">
							<Icon class="w-6 h-6" src={Clipboard} size="24" theme="default" title="Copy" />
						</button>
					</div>
					<!-- #each block for $compareArray that updates with the array, and contains a SizeComparison {size} element -->
					{#each $compareArray as size}
						<div transition:slide|local>
							<SizeComparison {size}/>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>
	<MainHeader title="Tools" color="green" />
	<Header title="A collection of various calculators and other stuff™"/>
	<Paragraph>{description}</Paragraph>

	<div class="my-8 w-full h-fit relative">
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
									oninput={() => calculateVolume(size)}
									type="text"
									class="bg-gray-500/30 w-16 h-8 ml-2 rounded-md p-2 text-base duration-300
								outline-none focus-within:outline-highlight outline-[3px]"
								/>
							</div>
							<div class="flex items-end ml-4">
								<p>Result:</p>
								<div
									class:invisible={isNaN(calculateVolume(size)) || calculateVolume(size) == 0}
									class="bg-gray-500/30 flex items-center align-middle min-w-8 h-8 ml-2 rounded-md p-2 text-base text-green w-fit duration-300"
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
							<code>π × r<sup>2</sup> × h</code><br>
							Advanced calculator available <Link color="cyan" color1="cyan" href="/tools/motors">here</Link>
						</p>
						<div class="flex mt-2 w-full justify-between">
							<button 
								onclick={() => (copyCalc("calc"))} 
								class="h-fit w-fit bg-green/90 hover:bg-green rounded-md py-1 px-2 cursor-pointer"
							>
								Copy!
							</button>
							<button 
								onclick={() => (addCompare(size))}
								class="h-fit w-fit bg-cyan/90 hover:bg-cyan rounded-md py-1 px-2 cursor-pointer"
							>
								Compare!
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
								oninput={calculateMwDbm}
								type="text"
								class="bg-gray-500/30 w-16 h-8 ml-2 rounded-md p-2 mr-1 text-base duration-300
								outline-none focus-within:outline-highlight outline-[3px]"
								/>
								<p>dBm</p>
							</div>
							<!-- svelte-ignore a11y_click_events_have_key_events -->
							<button style="transform: rotate({dbmToMwRotated}deg)" class="duration-300 text-2xl hover:text-highlight dark:hover:text-highlight-dark" onclick={() => toggleDbmToMw()}>→</button>
							<div class="flex items-end ml-4">
								<input
								bind:value={mw}
								oninput={calculateMwDbm}
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
							<code><span class="text-green">dBm</span> = 10 × (log10 <span class="text-yellow">mW</span>)</code>
						</p>
						<button onclick={() => (copyCalc("power"))}>
							<div class="h-fit w-fit bg-green/90 rounded-md py-1 px-2 cursor-pointer">Copy!</div>
						</button>
					</div>
				</div>

				<div class="green h-fit max-w-sm min-w-[18rem] border-l-4 product pl-2 my-4 mx-2" id="wh">
					<p class="text-2xl text-green">LiPo Wh</p>
					<div>
						<div class="flex my-4">
							<div class="h-8 flex flex-col justify-between mr-1 text-neutral-400/40">
								<button onclick={handlers(() => updateCellCount(true), calculateWh)} class="hover:text-highlight dark:hover:text-highlight-dark duration-300">
									<Icon class="w-3 h-3" src={ChevronUp} stroke-width="4" size="12" theme="default" title="Increase cell count" />
								</button>
								<button onclick={handlers(() => updateCellCount(false), calculateWh)} class="hover:text-highlight dark:hover:text-highlight-dark duration-300">
									<Icon class="w-3 h-3 rotate-180" src={ChevronUp} stroke-width="4" size="12" theme="default" title="Decrease cell count" />
								</button>
							</div>
							<div class="flex items-end">
								<input
								bind:value={cellCount}
								oninput={calculateWh}
								type="number"
								min=1
								max=69
								class="bg-gray-500/30 w-12 h-8 rounded-md p-2 mr-1 text-base duration-300
								outline-none focus-within:outline-highlight outline-[3px] no-spinner"
								/>
								<p>cell</p>
							</div>
							<div class="flex items-end">
								<input
								bind:value={capacity}
								oninput={calculateWh}
								type="text"
								class="bg-gray-500/30 w-16 h-8 ml-2 rounded-md p-2 mr-1 text-base duration-300
								outline-none focus-within:outline-highlight outline-[3px]"
								/>
								<p>mAh</p>
							</div>
							<div class="flex items-end ml-4">
								<p>Result:</p>
								<div
									class:invisible={isNaN(wh) || wh == 0}
									class="bg-gray-500/30 flex items-center align-middle min-w-8 h-8 ml-2 rounded-md p-2 text-base text-green w-fit duration-300"
								>
									{wh > 1000 ? (wh / 1000).toFixed(2) : wh}
								</div>
								{#if wh > 1000}
									<p class:invisible={isNaN(wh) || wh == 0}>KWh</p>
								{:else}
									<p class:invisible={isNaN(wh) || wh == 0}>Wh</p>
								{/if}
							</div>
						</div>
						<div class="flex items-end mb-4 text-base gap-2">
							<Switch
								name="isHv"
								checked={isHv}
								onCheckedChange={(e) => (isHv = e.checked)}
							/>
							HV LiPo
						</div>
						<p class="mb-4">
							<code>Wh</code> is a unit of energy measurement. It denotes the power over time, and is 
							used to compare the energy capacity of different batteries.
						</p>
						<p class="mb-4">
							<!-- Given power in <code class="text-green">dBm</code>, 
							the calculation to get the power in <code class="text-yellow">mW</code> is 
							<code>
								<span class="text-yellow">mW</span> = 10<sup>(<span class="text-green">dBm</span>/10)</sup>
							</code> -->
							The calculation to get the <code class="text-green">Wh</code> of a LiPo is:<br>
							<code><span class="text-yellow">Ah</span> × 3.7 (nominal voltage) × <span class="text-green"># of cells</span></code>
						</p>
						<button onclick={() => (copyCalc("wh"))}>
							<div class="h-fit w-fit bg-green/90 rounded-md py-1 px-2 cursor-pointer">Copy!</div>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.no-spinner::-webkit-outer-spin-button, .no-spinner::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	.no-spinner {
		-moz-appearance: textfield;
		appearance: textfield;
	}
</style>