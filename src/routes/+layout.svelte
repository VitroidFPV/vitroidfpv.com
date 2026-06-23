<script lang="ts">
	import "./layout.css"
	import favicon from "$lib/assets/favicon.svg"
	import "@fontsource-variable/geist/wght.css"
	import Sidebar from "$components/Sidebar.svelte"

	let { children } = $props()
</script>

<svelte:head>
	<link
		rel="icon"
		href={favicon}
	/>
	<title>VitroidFPV</title>
</svelte:head>

<div class="grid grid-cols-[auto_1fr]">
	<!-- Sidebar -->
	<aside class="sticky top-0 col-span-1 h-screen">
		<Sidebar />
	</aside>
	<!-- Main -->
	<main class="col-span-1 space-y-4">
		{@render children()}
	</main>
</div>
