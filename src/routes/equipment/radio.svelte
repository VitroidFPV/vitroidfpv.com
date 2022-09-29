<script>
	// @ts-ignore
	import BuildProduct from "/src/components/buildsPage/buildProduct.svelte";
	// @ts-ignore
	import MainHeader from "/src/components/mainHeader.svelte";
	// @ts-ignore
	import Header from "/src/components/Header.svelte";
	// @ts-ignore
	import Paragraph from "/src/components/Paragraph.svelte";

	import { marked } from "marked";
	marked.setOptions({
		gfm: true,
		breaks: true,
		sanitize: false,
		smartLists: false,
		smartypants: false,
		xhtml: false
	});

	const modules = import.meta.globEager("/modules/equipmentLists/radioList/*.md");
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

	// sort grouped_modules to have the group "Info" be last
	let sorted_grouped_modules = {};
	for (const cat in grouped_modules) {
		sorted_grouped_modules[cat] = {};
		for (const group in grouped_modules[cat]) {
			if (group === "Info") {
				continue;
			}
			sorted_grouped_modules[cat][group] = grouped_modules[cat][group];
		}
		if (grouped_modules[cat]["Info"]) {
			sorted_grouped_modules[cat]["Info"] = grouped_modules[cat]["Info"];
		}
	}
	// omfg copilot carries this shit

	console.log(JSON.stringify(sorted_grouped_modules));

	let prefix = "Equipment";
	let title = " - Radio Equipment";
	let titleRaw = title.slice(3);
	let color = "#5ad8e6";
	let description =
		"Radios, TX modules, receivers, antennas, and any other misc accessories for radios, all you need to get control over your craft";
</script>

<svelte:head>
	<title>VitroidFPV{title}</title>
	<meta name="author" content="VitroidFPV" />
	<meta property="og:image" content="https://www.vitroidfpv.com/sources/radio_512.png" />
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
	<MainHeader text={titleRaw} />
	<Header text="Everything you need to control your quad" />
	<Paragraph
		text="{description}<br>
    If you're trying to decide, or don't even have any prior experience, this list will hopefully help you!<br><br>
    Prices may depend on where and when you source the parts, (prices and specs are sourced from the manufacturers website at the time of the writing when possible)"
	/>

	{#each Object.entries(sorted_grouped_modules) as [cat, contents]}
		<div class="{cat} my-8 w-full h-fit flex flex-col">
			<div class="text-4xl tracking-tight w-fit px-1 cat {cat} mb-2" id={cat}>{cat}</div>
			{#each Object.entries(contents) as [group, info]}
				{#if group != "Info"}
					<div class="group {group} my-4 w-full h-fit">
						{#if group != "undefined"}
							<div
								class="text-xl tracking-tight w-full px-1 {group} mb-2 border-b-[1px] border-gray-700 text-main-50 dark:text-contrast-500"
								id={group}
							>
								{group}
							</div>
						{/if}
						<div
							class="ml-3 flex flex-col md:flex-row flex-wrap w-full md:justify-start md:items-start items-center border-white/10"
						>
							{#each info as product}
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
								/>
							{/each}
						</div>
					</div>
				{:else}
					{#each info as product}
						<div class="md ml-4">{@html marked.parse(product.metadata.text)}</div>
					{/each}
				{/if}
			{/each}
		</div>
	{/each}
</div>
