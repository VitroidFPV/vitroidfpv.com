<script>
	// @ts-ignore
	import BuildProduct from "/src/components/buildsPage/buildProduct.svelte";
	// @ts-ignore
	import MainHeader from "/src/components/mainHeader.svelte";
	// @ts-ignore
	import Header from "/src/components/Header.svelte";
	// @ts-ignore
	import Paragraph from "/src/components/Paragraph.svelte";

	const modules = import.meta.glob("/modules/buildLists/5inchBeginner/*.md", {eager: true});

	// console.log(modules)
	let grouped_modules = {};

	for (const k in modules) {
		const cat = modules[k].metadata.Category;
		if (grouped_modules[cat]) {
			grouped_modules[cat].push(modules[k]);
		} else {
			grouped_modules[cat] = [modules[k]];
		}
	}

	let prefix = "Builds";
	let titleRaw = "5\" Beginner Quad";
	let title = " - " + titleRaw;
	let color = "#90d95b";
	let img = "/uploads/images/beginner_512.png";
	let description =
		"Specced out to be easy to assemble, with affordable and accessible parts, and electronics that should be easy to solder, this build should be perfect to get you started in the world of FPV";
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
	<MainHeader>{titleRaw} 
		<div class="bg-green/30 h-8 rounded-full w-16 ml-4 text-xl flex items-center justify-between px-1">
			+4
			<span class="w-6 h-6 rounded-full bg-green/80 hover:bg-green select-none duration-300 
				text-black pl-2 text-base relative group">?
				<div class="absolute dark:bg-black/50 bg-black/20 backdrop-blur-sm invisible group-hover:visible duration-300 rounded-r-2xl rounded-bl-2xl w-64 text-white text-xl p-4 select-auto shadow-2xl">4 people have found this page useful</div>
			</span>
		</div></MainHeader>
	<Header text="Cheap, durable, and easy to put together and repair" />
	<Paragraph>{description}<br>
		This list is specced for 6s, and includes everything to build a full quad, except parts such as cameras, goggles, receiver and radio systems as those vary depending on prefference and you'll find recommendations on this site elsewhere.<br>
		The price range for each part is highlighted, so you can quickly find something to suit your budget. That doesn't mean the budget parts are bad and that the high-end ones are too expensive. It's all relative to the price avarage of the build itself, all of them here are great
		<ul class="flex flex-row justify-between w-full flex-wrap mt-4">
			<li
				class="before:content-[''] before:pr-7 before:rounded-lg before:mr-2 before:bg-green before:relative mb-2"
			>
				Budget
			</li>
			<li
				class="before:content-[''] before:pr-7 before:rounded-lg before:mr-2 before:bg-orange before:relative mb-2"
			>
				Mid-range
			</li>
			<li
				class="before:content-[''] before:pr-7 before:rounded-lg before:mr-2 before:bg-red before:relative mb-2"
			>
				High-end
			</li>
			<li
				class="before:content-[''] before:pr-7 before:rounded-lg before:mr-2 before:bg-violet before:relative mb-2"
			>
				Highly varied
			</li>
		</ul>
	</Paragraph>

	<div class="flex flex-col">
		{#each Object.entries(grouped_modules) as [cat, contents]}
			<div class="{cat} my-8 w-full h-fit">
				<div
					class="text-4xl tracking-tight md:w-fit f-full px-1 md:ml-1 ml-2 cat {cat} mb-2 text-center"
					id={cat}
				>
					{cat}
				</div>
				<div
					class="ml-3 flex flex-col md:flex-row flex-wrap w-full md:justify-start md:items-start items-center border-b-[1px] border-white/10"
				>
					{#each contents as info}
						<BuildProduct
							color={info.metadata.color}
							title={info.metadata.title}
							price={info.metadata.price}
							point1={info.metadata.point1}
							point2={info.metadata.point2}
							point3={info.metadata.point3}
							point4={info.metadata.point4}
							point5={info.metadata.point5}
							text={info.metadata.text}
							link={info.metadata.link}
						/>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>
