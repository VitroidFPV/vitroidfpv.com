<script>
	// @ts-ignore
	import MainHeader from "/src/components/mainHeader.svelte";
	// @ts-ignore
	import Header from "/src/components/Header.svelte";
	// @ts-ignore
	import Paragraph from "/src/components/Paragraph.svelte";

	import domtoimage from "dom-to-image";
	import { copyImageToClipboard } from "copy-image-clipboard";
	import { onMount } from "svelte";

	function copyVolume() {
		var node = document.getElementById("calc");

		domtoimage
			.toPng(node, { height: 96, width: 400, bgcolor: "#0f0f0f" })
			.then(function (dataUrl) {
				var img = new Image();
				img.src = dataUrl;
				console.log(dataUrl);

				copyImageToClipboard(dataUrl)
					.then(() => {
						console.log("Image Copied");
					})
					.catch((e) => {
						console.log("Error: ", e.message);
					});
			})
			.catch(function (error) {
				console.error("oops, something went wrong!", error);
			});
	}

	let size = "";
	let rounded = false;
	function calculateVolume(size) {
		let sizeP = size.replace(",", ".");
		let sizeRadius = parseFloat(sizeP.substr(0, 2));
		let sizeHeight = parseFloat(sizeP.substr(2, 5));
		console.log(sizeRadius, sizeHeight);
		let pi = 3.141;
		// cry about it

		let volume = parseFloat(((sizeRadius / 2) ** 2 * pi * sizeHeight).toFixed(0));
		return volume;
	}
	console.log(rounded);
</script>

<div class="content-box">
	<MainHeader text="Tools" />

	<div class="my-8 w-full h-fit">
		<div class="green h-fit max-w-sm min-w-[18rem] border-l-4 product pl-2 my-4 mx-2" id="calc">
			<p class="text-2xl text-green">Stator Volume</p>
			<div>
				<div class="flex my-2 h-fit">
					<div class="flex items-end">
						<p>Motor Size:</p>
						<input
							bind:value={size}
							on:input={calculateVolume}
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
					<div
						class="h-fit w-fit bg-green/90 rounded-md py-1 px-2 cursor-pointer"
						on:click={copyVolume}
					>
						Copy!
					</div>
					<!-- <input type="checkbox" on:change={console.log(rounded)} on:input={calculateVolume} name="Rounded" id="Rounded" class="ml-4" bind:checked={rounded}> -->
				</div>
			</div>
		</div>
	</div>
</div>
