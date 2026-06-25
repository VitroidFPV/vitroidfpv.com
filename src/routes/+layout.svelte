<script lang="ts">
	import "./layout.css"
	import favicon from "$lib/assets/favicon.svg"
	import "@fontsource-variable/geist/wght.css"
	import "@fontsource-variable/caveat/wght.css"
	import "@fontsource-variable/josefin-sans/wght.css"
	import Sidebar from "$components/Sidebar.svelte"
	import { Menu } from "@lucide/svelte"

	let sidebarOpen = $state(false)

	let { children } = $props()
</script>

<svelte:head>
	<link
		rel="icon"
		href={favicon}
	/>
	<title>VitroidFPV</title>
</svelte:head>

<div class="grid grid-cols-1 md:grid-cols-[auto_1fr] relative">
	<!-- Sidebar -->
	<aside
		class="fixed md:sticky right-0 top-0 col-span-1 h-screen z-10 transition-transform duration-200 {sidebarOpen
			? 'translate-x-0'
			: 'md:translate-x-0 translate-x-full'}"
	>
		<Sidebar />
	</aside>
	<!-- Main -->
	<main class="col-span-1">
		{@render children()}
	</main>
	<aside class="fixed bottom-4 right-4 z-10">
		<button
			type="button"
			class="btn preset-filled-surface-100-900 aspect-square md:hidden"
			aria-label="Toggle sidebar"
			onclick={() => (sidebarOpen = !sidebarOpen)}
		>
			<Menu class="size-6" />
		</button>
	</aside>
</div>
