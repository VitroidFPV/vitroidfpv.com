<script lang="ts">
	import "./main.css"
	import favicon from "$lib/assets/favicon.svg"
	import "@fontsource-variable/geist/wght.css"
	import "@fontsource-variable/geist-mono/wght.css"
	import "@fontsource-variable/caveat/wght.css"
	import "@fontsource-variable/josefin-sans/wght.css"
	import Sidebar from "$components/Sidebar.svelte"
	import { Menu } from "@lucide/svelte"
	import { fade } from "svelte/transition"
	import { afterNavigate } from "$app/navigation"
	import Footer from "$components/Footer.svelte"

	let sidebarOpen = $state(false)

	let { children } = $props()

	let afterNavTimeout: ReturnType<typeof setTimeout> | null = null

	// 250ms timeout to show the fancy sliding indicator that I spent a lot of time on
	afterNavigate(() => {
		if (afterNavTimeout) clearTimeout(afterNavTimeout)
		afterNavTimeout = setTimeout(() => {
			sidebarOpen = false
		}, 250)
	})

	$effect(() => {
		if (!sidebarOpen) return

		const previousOverflow = document.body.style.overflow
		document.body.style.overflow = "hidden"

		return () => {
			document.body.style.overflow = previousOverflow
		}
	})
</script>

<svelte:head>
	<link
		rel="icon"
		href={favicon}
	/>
	<title>VitroidFPV</title>
</svelte:head>

<div class="relative grid grid-cols-1 md:grid-cols-[auto_1fr]">
	<!-- Backdrop (mobile only) -->
	{#if sidebarOpen}
		<button
			type="button"
			aria-label="Close sidebar"
			class="fixed inset-0 z-20 bg-surface-950/50 backdrop-blur-xs md:hidden"
			onclick={() => (sidebarOpen = false)}
			transition:fade={{ duration: 200 }}
		></button>
	{/if}
	<!-- Sidebar -->
	<aside
		class="fixed top-0 right-0 z-30 col-span-1 h-dvh transition-transform duration-200 md:sticky {sidebarOpen
			? 'translate-x-0'
			: 'translate-x-full md:translate-x-0'}"
	>
		<Sidebar />
	</aside>
	<!-- Main -->
	<main class="col-span-1">
		{@render children()}
		<Footer />
	</main>
	<aside class="fixed right-4 bottom-4 z-40 md:hidden">
		<button
			type="button"
			class="btn aspect-square preset-filled-surface-100-900"
			aria-label="Toggle sidebar"
			onclick={() => (sidebarOpen = !sidebarOpen)}
		>
			<Menu class="size-6" />
		</button>
	</aside>
</div>
