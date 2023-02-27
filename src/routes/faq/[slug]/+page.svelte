<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import removeMarkdown from 'remove-markdown';
	const modules = import.meta.glob("/modules/faqs/*.md", {eager: true});
	// console.log(JSON.stringify(modules, null, 2));

	let slug = $page.params.slug
	console.log(slug)
	// slugModule is module that has a key id which's value matches the slug
	let slugModule = Object.values(modules).find(module => module.metadata.id === slug)
	console.log(slugModule.metadata.category + " - " + slugModule.metadata.title)
	let moduleContent = removeMarkdown(slugModule.metadata.answer, {useImgAltText: false}).slice(0, 600) + "..."

	// redirect to faq page
	onMount(() => {
		if (slugModule) {
			window.location.href = "/faq#" + slugModule.metadata.id
		}
	})

	let prefix = slugModule.metadata.category;
	let titleRaw = slugModule.metadata.title;
	let title = "FAQ - " + titleRaw;
	let description = moduleContent;
	let category = slugModule.metadata.category;

	let categoryColor
	let hexColor
	switch (category) {
		case "Video":
			categoryColor = "green"
			hexColor = "#87cc52"
			break
		case "Radio":
			categoryColor = "cyan"
			hexColor = "#5ad8e6"
			break
		case "Building":
			categoryColor = "red"
			hexColor = "#d6395b"
			break
		case "Betaflight":
			categoryColor = "yellow"
			hexColor = "#ffcc00"
			break
		case "Starting Out":
			categoryColor = "violet"
			hexColor = "#9550ba"
			break
		default:
			categoryColor = "violet"
			hexColor = "#9550ba"
	}
</script>

<svelte:head>
	<!-- <title>VitroidFPV{title}</title> -->
	<meta name="author" content="VitroidFPV" />
	<meta name="twitter:card" content="summary_large_image">
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="VitroidFPV" />
	<meta property="article:author" content="VitroidFPV" />
	<meta property="og:title" content="{title}" />
	<meta name="description" content={description} />
	<meta property="og:description" content={description} />
	<meta content="https://vitroidfpv.com/" property="og:url" />
	<meta name="theme-color" content={hexColor} />
</svelte:head>