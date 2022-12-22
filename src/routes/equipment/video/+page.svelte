<script>
	import BuildProduct from "$components/buildsPage/buildProduct.svelte";
	import MainHeader from "$components/mainHeader.svelte";
	import Header from "$components/Header.svelte";
	import Paragraph from "$components/Paragraph.svelte";

	import { marked } from "marked";
	marked.setOptions({
		gfm: true,
		breaks: true,
		sanitize: false,
		smartLists: false,
		smartypants: false,
		xhtml: false
	});

	const modules = import.meta.glob("/modules/equipmentLists/videoList/*.md", {eager: true});
	let grouped_modules = {};

	for (const k in modules) {
		const cat = modules[k].metadata.Category;
		const group = modules[k].metadata.group;

		// construct object as {cat: {group: [metadata]}}

		if (grouped_modules[cat]) {
			if (grouped_modules[cat][group]) {
				grouped_modules[cat][group].push(modules[k]);
			} else {
				grouped_modules[cat][group] = [modules[k]];
			}
		} else {
			grouped_modules[cat] = {};
			grouped_modules[cat][group] = [modules[k]];
		}
	}

	// sort the products in each category by the "order" key, and have the group "Info" be last while keeping the same structure
	let sorted_grouped_modules = {};
	for (const cat in grouped_modules) {
		sorted_grouped_modules[cat] = {};
		const groups = Object.keys(grouped_modules[cat]);
		groups.sort((a, b) => {
			if (a === "Info") return 1;
			if (b === "Info") return -1;
			return grouped_modules[cat][a][0].metadata.order - grouped_modules[cat][b][0].metadata.order;
		});
		for (const group of groups) {
			sorted_grouped_modules[cat][group] = grouped_modules[cat][group];
		}
	}

	// if key visible isn't in the metadata, set it to true, otherwise set it to the value in the metadata
	for (const cat in sorted_grouped_modules) {
		for (const group in sorted_grouped_modules[cat]) {
			for (const product of sorted_grouped_modules[cat][group]) {
				if (product.metadata.visible === undefined) {
					product.metadata.visible = true;
				}
			}
		}
	}		

	// omfg copilot carries this shit

	// console.log(JSON.stringify(sorted_grouped_modules));

	let prefix = "VitroidFPV";
	let titleRaw = "Video Equipment";
	let title = " - " + titleRaw;
	let color = "#87cc52";
	let img = "/uploads/images/radio_512.png";
	let description =
		"Cameras, goggles, antennas, video receivers, and any other misc accessories for all of your video equipment. Can't have FPV without the \"view\" part (sorry I'll stop)";
</script>

<svelte:head>
	<title>VitroidFPV{title}</title>
	<meta name="author" content="VitroidFPV" />
	<meta property="og:image" content="https://vitroidfpv-sv.netlify.app{img}" />
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
	<Header text={"Put the \"V\" in FPV"} />
	<Paragraph>
		{description}<br>
    If you're trying to decide, or don't even have any prior experience, this list will hopefully help you!<br><br>
    Prices may depend on where and when you source the parts, (prices and specs are sourced from the manufacturers website at the time of the writing when possible)
	<ul class="flex flex-row justify-between w-full flex-wrap mt-4">
		<li class="before:content-[''] before:pr-7 before:rounded-lg before:mr-2 before:bg-green before:relative mb-2">
			Budget
		</li>
		<li class="before:content-[''] before:pr-7 before:rounded-lg before:mr-2 before:bg-orange before:relative mb-2">
			Mid-range
		</li>
		<li class="before:content-[''] before:pr-7 before:rounded-lg before:mr-2 before:bg-red before:relative mb-2">
			High-end
		</li>
		<li class="before:content-[''] before:pr-7 before:rounded-lg before:mr-2 before:bg-violet before:relative mb-2">
			Highly varied
		</li>
	</ul>
	</Paragraph>

	{#each Object.entries(sorted_grouped_modules) as [cat, contents]}
		<div class="{cat} category my-8 w-full h-fit flex flex-col">
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
							class="md:ml-3 flex flex-col md:flex-row flex-wrap w-full md:justify-start md:items-start items-center border-white/10">
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
											text={product.metadata.text}
											link={product.metadata.link}
											img={product.metadata.img}
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
	{/each}
</div>
