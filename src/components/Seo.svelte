<script lang="ts">
	import { page } from "$app/state"

	const SITE_NAME = "VitroidFPV"
	const SITE_URL = "https://next.vitroidfpv.com"
	const DEFAULT_DESCRIPTION = "Making FPV easier. One line of code at a time."
	const DEFAULT_THEME_COLOR = "#9AD040"

	let {
		title = SITE_NAME,
		description = DEFAULT_DESCRIPTION,
		path,
		image,
		themeColor = DEFAULT_THEME_COLOR
	}: {
		title?: string
		description?: string
		path?: string
		image?: string
		themeColor?: string
	} = $props()

	let documentTitle = $derived(
		title === SITE_NAME ? SITE_NAME : `${title} · ${SITE_NAME}`
	)
	let canonicalUrl = $derived(new URL(path ?? page.url.pathname, SITE_URL).href)
	let imageUrl = $derived(image ? new URL(image, SITE_URL).href : undefined)
</script>

<svelte:head>
	<title>{documentTitle}</title>
	<meta
		name="description"
		content={description}
	/>
	<meta
		name="author"
		content="VitroidFPV"
	/>
	<meta
		name="robots"
		content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
	/>
	<meta
		name="theme-color"
		content={themeColor}
	/>
	<meta
		name="msapplication-TileColor"
		content={themeColor}
	/>
	<meta
		name="application-name"
		content={SITE_NAME}
	/>
	<meta
		name="apple-mobile-web-app-title"
		content={SITE_NAME}
	/>
	<link
		rel="canonical"
		href={canonicalUrl}
	/>

	<meta
		property="og:type"
		content="website"
	/>
	<meta
		property="og:site_name"
		content={SITE_NAME}
	/>
	<meta
		property="og:locale"
		content="en_US"
	/>
	<meta
		property="og:title"
		content={documentTitle}
	/>
	<meta
		property="og:description"
		content={description}
	/>
	<meta
		property="og:url"
		content={canonicalUrl}
	/>
	{#if imageUrl}
		<meta
			property="og:image"
			content={imageUrl}
		/>
	{/if}

	<meta
		name="twitter:card"
		content={imageUrl ? "summary_large_image" : "summary"}
	/>
	<meta
		name="twitter:title"
		content={documentTitle}
	/>
	<meta
		name="twitter:description"
		content={description}
	/>
	{#if imageUrl}
		<meta
			name="twitter:image"
			content={imageUrl}
		/>
	{/if}
</svelte:head>
