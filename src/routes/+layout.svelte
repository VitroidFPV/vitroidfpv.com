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

<div class="grid grid-cols-1 md:grid-cols-[auto_1fr] relative">
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
		class="fixed md:sticky right-0 top-0 col-span-1 h-dvh z-30 transition-transform duration-200 {sidebarOpen
			? 'translate-x-0'
			: 'md:translate-x-0 translate-x-full'}"
	>
		<Sidebar />
	</aside>
	<!-- Main -->
	<main class="col-span-1">
		{@render children()}
	</main>
	<aside class="fixed bottom-4 right-4 z-40">
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
