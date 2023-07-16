<script lang="ts">
	import BuildProduct from "$components/buildsPage/buildProduct.svelte";
	import type { Module } from "$lib/types/module";
	import { marked } from "marked";
	marked.setOptions({
		gfm: true,
		breaks: true,
		sanitize: false,
		smartLists: false,
		smartypants: false,
		xhtml: false
	});

	export let modules: Record<string, Record<string, Module[]>>;
</script>

{#each Object.entries(modules) as [cat, contents], i}
	<div class="flex flex-col">
		{#if i % 2 !== 0}
			<div>
				<svg 
					class="max-w-full h-fit" 
					width="100%" height="300" 
					viewBox="0 0 2400 300" 
					xmlns="http://www.w3.org/2000/svg"
				>
					<g filter="url(#filter0_d_1_2)">
						<path 
							d="M0 63L57.2 72.2C114.3 81.3 228.7 99.7 343 104.7C457.3 109.7 571.7 101.3 686 106C800.3 
							110.7 914.7 128.3 1028.8 132.3C1143 136.3 1257 126.7 1371.2 112.2C1485.3 97.7 1599.7 78.3 
							1714 77.3C1828.3 76.3 1942.7 93.7 2057 94.7C2171.3 95.7 2285.7 80.3 2342.8 72.7L2400 
							65V301H2342.8C2285.7 301 2171.3 301 2057 301C1942.7 301 1828.3 301 1714 301C1599.7 301 
							1485.3 301 1371.2 301C1257 301 1143 301 1028.8 301C914.7 301 800.3 301 686 301C571.7 301 
							457.3 301 343 301C228.7 301 114.3 301 57.2 301H0V63Z" 
							class="dark:fill-main-300 fill-contrast-100"
						/>
					</g>
					<defs>
						<filter 
							id="filter0_d_1_2" x="-64" y="-33" 
							width="2528" 
							height="366" 
							filterUnits="userSpaceOnUse" 
							color-interpolation-filters="sRGB">
							<feFlood flood-opacity="0" result="BackgroundImageFix"/>
							<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
							<feOffset dy="-32"/>
							<feGaussianBlur stdDeviation="16"/>
							<feComposite in2="hardAlpha" operator="out"/>
							<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.07 0"/>
							<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_2"/>
							<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_2" result="shape"/>
						</filter>
					</defs>
				</svg>
			</div>
		{/if}
		<div class={i % 2 !== 0 ? "px-4 md:px-8 dark:bg-main-300 bg-contrast-100 flex flex-col" : "px-4 md:px-8 flex flex-col"}>
			<div class="text-4xl tracking-tight w-fit px-1 cat {cat} mb-2" id={cat}>{cat}</div>
			{#each Object.entries(contents) as [group, info]}
				{#if group != "Info"}
					<div class="group {group} my-4 w-full h-fit">
						{#if group != "undefined"}
							<div
								class="text-xl tracking-tight w-full px-1 {group} mb-2 border-b-[1px] border-gray-700 text-main-50 dark:text-contrast-500"
								id={group}>
								{group}
							</div>
						{/if}
						<div
							class="md:ml-3 grid 3xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8"
						>
							{#each info as product}
								{#if product.metadata.visible}
									<BuildProduct
										color={product.metadata.color}
										title={product.metadata.title}
										price={product.metadata.price}
										point1={product.metadata.point1}
										point2={product.metadata.point2}
										point3={product.metadata.point3}
										point4={product.metadata.point4}
										point5={product.metadata.point5}
										info={product.metadata.info}
										text={product.metadata.text}
										href={product.metadata.link}
										img={product.metadata.img}
										category={cat}
									/>
								{/if}
							{/each}
						</div>
					</div>
				{:else}
					{#each info as product}
						<div class="md ml-4 group {group}">{@html marked.parse(product.metadata.text)}</div>
					{/each}
				{/if}
			{/each}
		</div>
		{#if i % 2 !== 0}
			<div>
				<svg 
					class="max-w-full h-fit rotate-180" 
					width="100%" height="300" 
					viewBox="0 0 2400 300" 
					xmlns="http://www.w3.org/2000/svg"
				>
					<g filter="url(#filter0_d_1_2)">
						<path 
							d="M0 63L57.2 72.2C114.3 81.3 228.7 99.7 343 104.7C457.3 109.7 571.7 101.3 686 106C800.3 
							110.7 914.7 128.3 1028.8 132.3C1143 136.3 1257 126.7 1371.2 112.2C1485.3 97.7 1599.7 78.3 
							1714 77.3C1828.3 76.3 1942.7 93.7 2057 94.7C2171.3 95.7 2285.7 80.3 2342.8 72.7L2400 
							65V301H2342.8C2285.7 301 2171.3 301 2057 301C1942.7 301 1828.3 301 1714 301C1599.7 301 
							1485.3 301 1371.2 301C1257 301 1143 301 1028.8 301C914.7 301 800.3 301 686 301C571.7 301 
							457.3 301 343 301C228.7 301 114.3 301 57.2 301H0V63Z" 
							class="dark:fill-main-300 fill-contrast-100"
						/>
					</g>
					<defs>
						<filter 
							id="filter0_d_1_2" x="-64" y="-33" 
							width="2528" 
							height="366" 
							filterUnits="userSpaceOnUse" 
							color-interpolation-filters="sRGB">
							<feFlood flood-opacity="0" result="BackgroundImageFix"/>
							<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
							<feOffset dy="-32"/>
							<feGaussianBlur stdDeviation="16"/>
							<feComposite in2="hardAlpha" operator="out"/>
							<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0. 0"/>
							<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_2"/>
							<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_2" result="shape"/>
						</filter>
					</defs>
				</svg>
			</div>
		{/if}
	</div>
{/each}