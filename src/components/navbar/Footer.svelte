<script>
	import Link from "$components/Link.svelte";
	import LinkDetail from "$components/navbar/LinkDetail.svelte";
	import { onMount } from "svelte";

	import tinycolor from "tinycolor2";

	let darkMultiplier = 12;
	let lightMultiplier = 8;

	let shade = {
		light: "#90d95b",
		dark: "#2ad162",
	}

	let shade1 = {
		light: tinycolor(shade.light).lighten(lightMultiplier).toHexString(),
		dark: tinycolor(shade.dark).darken(darkMultiplier).toHexString(),
	}

	let shade2 = {
		light: tinycolor(shade.light).lighten(lightMultiplier * 2).toHexString(),
		dark: tinycolor(shade.dark).darken(darkMultiplier * 2).toHexString(),
	}

	let shade3 = {
		light: tinycolor(shade.light).lighten(lightMultiplier * 3).toHexString(),
		dark: tinycolor(shade.dark).darken(darkMultiplier * 3).toHexString(),
	}

	let shade4 = {
		light: tinycolor(shade.light).lighten(lightMultiplier * 4).toHexString(),
		dark: tinycolor(shade.dark).darken(darkMultiplier * 4).toHexString(),
	}

	let isDark = true;
	let colors = [shade1.dark, shade2.dark, shade3.dark, shade4.dark]
	
	$: colors = isDark ? [shade1.dark, shade2.dark, shade3.dark, shade4.dark] : [shade1.light, shade2.light, shade3.light, shade4.light];

	onMount(() => {
		const body = document.body;
		const observer = new MutationObserver(mutationsList => {
			mutationsList.forEach(mutation => {
				if (mutation.attributeName === "class") {
					isDark = body.classList.contains("dark");
				}
			});
		})

		observer.observe(body, { attributes: true });
	})
</script>

<div class="flex flex-col z-[50] relative">
	<!-- <div class="flex flex-col justify-start h-32">
        <div class="max-h-fit max-w-full scale-y-50">
            <svg class="max-w-full h-fit" id="visual" viewBox="0 0 2400 300" width="2400" height="300" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
            <rect x="0" y="0" width="2400" height="300" class="fill-transparent"></rect>
            <path d="M0 92L50 91.8C100 91.7 200 91.3 300 112.7C400 134 500 177 600 175.5C700 174 800 128 900 118.5C1000 109 1100 136 1200 151.8C1300 167.7
            1400 172.3 1500 158C1600 143.7 1700 110.3 1800 97.7C1900 85 2000 93 2100 114.8C2200 136.7 2300 172.3 2350 190.2L2400 208L2400 301L2350 301C2300
            301 2200 301 2100 301C2000 301 1900 301 1800 301C1700 301 1600 301 1500 301C1400 301 1300 301 1200 301C1100 301 1000 301 900 301C800 301 700 301
            600 301C500 301 400 301 300 301C200 301 100 301 50 301L0 301Z" fill="" stroke-linecap="round" stroke-linejoin="miter" class="fill-highlight dark:fill-highlight-dark"></path>
            </svg>
        </div>
    </div> -->

	<div class="max-h-fit max-w-full">
		<svg
			class="max-w-full h-fit"
			id="visual"
			viewBox="0 0 2400 300"
			width="100%"
			height="300"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			version="1.1"
		>
			<path
				d="M0 63L57.2 72.2C114.3 81.3 228.7 99.7 343 104.7C457.3 109.7 571.7 101.3 686 106C800.3 110.7 914.7 128.3 1028.8 132.3C1143 136.3 1257 126.7 1371.2 112.2C1485.3 
            97.7 1599.7 78.3 1714 77.3C1828.3 76.3 1942.7 93.7 2057 94.7C2171.3 95.7 2285.7 80.3 2342.8 72.7L2400 65L2400 301L2342.8 301C2285.7 301 2171.3 301 2057 301C1942.7 301 
            1828.3 301 1714 301C1599.7 301 1485.3 301 1371.2 301C1257 301 1143 301 1028.8 301C914.7 301 800.3 301 686 301C571.7 301 457.3 301 343 301C228.7 301 114.3 301 57.2 301L0 
            301Z"
				class="fill-highlight dark:fill-highlight-dark"
			/>
			<path
				d="M0 99L57.2 107.5C114.3 116 228.7 133 343 145.7C457.3 158.3 571.7 166.7 686 167.2C800.3 167.7 914.7 160.3 1028.8 158.8C1143 157.3 1257 161.7 1371.2 161.2C1485.3 
            160.7 1599.7 155.3 1714 148.7C1828.3 142 1942.7 134 2057 126.2C2171.3 118.3 2285.7 110.7 2342.8 106.8L2400 103L2400 301L2342.8 301C2285.7 301 2171.3 301 2057 301C1942.7 
            301 1828.3 301 1714 301C1599.7 301 1485.3 301 1371.2 301C1257 301 1143 301 1028.8 301C914.7 301 800.3 301 686 301C571.7 301 457.3 301 343 301C228.7 301 114.3 301 57.2 
            301L0 301Z"
				fill={colors[0]}
			/>
			<path
				d="M0 202L57.2 198.7C114.3 195.3 228.7 188.7 343 181.5C457.3 174.3 571.7 166.7 686 164.2C800.3 161.7 914.7 164.3 1028.8 167.5C1143 170.7 1257 174.3 1371.2 
            176.7C1485.3 179 1599.7 180 1714 181.7C1828.3 183.3 1942.7 185.7 2057 183C2171.3 180.3 2285.7 172.7 2342.8 168.8L2400 165L2400 301L2342.8 301C2285.7 301 2171.3 301 2057 
            301C1942.7 301 1828.3 301 1714 301C1599.7 301 1485.3 301 1371.2 301C1257 301 1143 301 1028.8 301C914.7 301 800.3 301 686 301C571.7 301 457.3 301 343 301C228.7 301 114.3 
            301 57.2 301L0 301Z"
				fill={colors[1]}
			/>
			<path
				d="M0 204L57.2 205.7C114.3 207.3 228.7 210.7 343 216.2C457.3 221.7 571.7 229.3 686 232.7C800.3 236 914.7 235 1028.8 232.2C1143 229.3 1257 224.7 1371.2 222.8C1485.3 
            221 1599.7 222 1714 220.8C1828.3 219.7 1942.7 216.3 2057 219.2C2171.3 222 2285.7 231 2342.8 235.5L2400 240L2400 301L2342.8 301C2285.7 301 2171.3 301 2057 301C1942.7 301 
            1828.3 301 1714 301C1599.7 301 1485.3 301 1371.2 301C1257 301 1143 301 1028.8 301C914.7 301 800.3 301 686 301C571.7 301 457.3 301 343 301C228.7 301 114.3 301 57.2 301L0 
            301Z"
				fill={colors[2]}
			/>
			<path
				d="M0 267L57.2 261.2C114.3 255.3 228.7 243.7 343 242C457.3 240.3 571.7 248.7 686 253.7C800.3 258.7 914.7 260.3 1028.8 262.8C1143 265.3 1257 268.7 1371.2 
            264.8C1485.3 261 1599.7 250 1714 245.8C1828.3 241.7 1942.7 244.3 2057 246.8C2171.3 249.3 2285.7 251.7 2342.8 252.8L2400 254L2400 301L2342.8 301C2285.7 301 2171.3 301 
            2057 301C1942.7 301 1828.3 301 1714 301C1599.7 301 1485.3 301 1371.2 301C1257 301 1143 301 1028.8 301C914.7 301 800.3 301 686 301C571.7 301 457.3 301 343 301C228.7 301 
            114.3 301 57.2 301L0 301Z"
				class="dark:fill-main-400 fill-contrast-50"
			/>
		</svg>
	</div>
	<div class="w-full min-h-32 dark:bg-main-400 bg-contrast-50 md:pl-48 md:pb-8 pb-28 md:px-8">
		<footer>
			<div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
				<div class="md:flex md:justify-between">
				<div class="mb-6 md:mb-0">
					<a href="https://www.vitroidfpv.com/" class="font-caveat text-highlight dark:text-highlight-dark text-6xl">
						VitroidFPV
					</a>
				</div>
				<div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
					<div>
						<h2 class="text-base font-semibold uppercase mb-2">Resources</h2>
						<ul class="font-medium">
							<li>
								<LinkDetail
									href="https://www.youtube.com/@JoshuaBardwell"
									description="Reviews and tutorials"
									external
								>
									Joshua Bardwell
								</LinkDetail>
							</li>
							<li>
								<LinkDetail
									href="https://oscarliang.com/"
									description="Reviews and tutorials"
									external
								>
									Oscar Liang
								</LinkDetail>
							</li>
							<li>
								<LinkDetail
									href="https://fpvmarket.eu/"
									description="EU FPV store search"
									external
								>
									FPV Market
								</LinkDetail>
							</li>	
						</ul>
					</div>
					<div>
						<h2 class="text-base font-semibold uppercase mb-2">Discord servers</h2>
						<ul class="font-medium">
							<li>
								<LinkDetail
									href="https://discord.gg/drones"
									description="Generally about drones"
									external
									color="cyan"
									color1="cyan"
								>
									Drone Community
								</LinkDetail>
							</li>
							<li>
								<LinkDetail
									href="https://discord.gg/n4E6ak4u3c"
									description="Betaflight dev and support"
									external
									color="cyan"
									color1="cyan"
								>
									Betaflight
								</LinkDetail>
							</li>
							<li>
								<LinkDetail
									href="https://discord.gg/fpv"
									description="Only slightly™ chaotic"
									external
									color="cyan"
									color1="cyan"
								>
									Mr Steele
								</LinkDetail>
							</li>
							<li>
								<LinkDetail
									href="https://discord.gg/r7y68t7RKq"
									description="FPV science"
									external
									color="cyan"
									color1="cyan"
								>
									Chris Rosser
								</LinkDetail>
							</li>
						</ul>
					</div>
					<div>
						<h2 class="text-base font-semibold uppercase mb-2">Misc</h2>
						<ul class="font-medium">
							<!-- <li>
								<LinkDetail
									href="/"
									description="Open source software used"
									external
									color="red"
									color1="red"
								>
									Attributions
								</LinkDetail>
							</li> -->
							<li>
								<LinkDetail
									href="https://github.com/VitroidFPV/VitroidFPV/graphs/contributors"
									description="People that have contributed content"
									external
									color="red"
									color1="red"
								>
									Contributors
								</LinkDetail>
							</li>
							<li>
								<LinkDetail
									href="/support"
									description="Support development of the site"
									color="red"
									color1="red"
								>
									Support me
								</LinkDetail>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<hr class="my-6 border-neutral-500/30 lg:my-8" />
			<div class="flex md:flex-row flex-col md:items-start items-center justify-between w-full">
				<span class="text-sm sm:text-center text-neutral-400">© 2023 <a href="https://www.vitroidfpv.com/" class="hover:underline">VitroidFPV</a>.
				</span>
				<div class="flex space-x-6 w-fit">
					<a href="https://www.instagram.com/vitroid.fpv/" class="text-neutral-500/70 hover:text-highlight dark:hover:text-highlight-dark duration-300">
						<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" /></svg>
						<span class="sr-only">Instagram page</span>
					</a>
					<a href="https://github.com/VitroidFPV" class="text-neutral-500/70 hover:text-highlight dark:hover:text-highlight-dark duration-300">
						<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" /></svg>
						<span class="sr-only">GitHub account</span>
					</a>
					<!-- youtube page -->
					<a href="https://www.youtube.com/@VitroidFPV" class="text-neutral-500/70 hover:text-highlight dark:hover:text-highlight-dark duration-300">
						<svg class="w-8 h-8" fill="currentColor"  xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" id="youtube"><path d="M23,9.71a8.5,8.5,0,0,0-.91-4.13,2.92,2.92,0,0,0-1.72-1A78.36,78.36,0,0,0,12,4.27a78.45,78.45,0,0,0-8.34.3,2.87,2.87,0,0,0-1.46.74c-.9.83-1,2.25-1.1,3.45a48.29,48.29,0,0,0,0,6.48,9.55,9.55,0,0,0,.3,2,3.14,3.14,0,0,0,.71,1.36,2.86,2.86,0,0,0,1.49.78,45.18,45.18,0,0,0,6.5.33c3.5.05,6.57,0,10.2-.28a2.88,2.88,0,0,0,1.53-.78,2.49,2.49,0,0,0,.61-1,10.58,10.58,0,0,0,.52-3.4C23,13.69,23,10.31,23,9.71ZM9.74,14.85V8.66l5.92,3.11C14,12.69,11.81,13.73,9.74,14.85Z"></path></svg>
						<span class="sr-only">YouTube page</span>
					</a>
				</div>
			</div>
			</div>
		</footer>
	</div>
</div>
