<script lang="ts">
	import Corner from "$components/Corner.svelte"
	import SidebarItem from "$components/SidebarItem.svelte"
	import { resolve } from "$app/paths"
	import { page } from "$app/state"
	import type {
		PathnameWithSearchOrHash,
		RouteIdWithSearchOrHash
	} from "$app/types"
	import { House, Info } from "@lucide/svelte"

	type SidebarHref = RouteIdWithSearchOrHash | PathnameWithSearchOrHash

	function isActive(href: SidebarHref) {
		const target = resolve(href)

		return target === "/"
			? page.url.pathname === "/"
			: page.url.pathname === target ||
					page.url.pathname.startsWith(`${target}/`)
	}

	let homeActive = $derived(isActive("/"))
	let aboutActive = $derived(isActive("/about"))
	let activeIndex = $derived(homeActive ? 0 : aboutActive ? 1 : null)
	let highlightOffset = $derived(activeIndex === null ? "0rem" : `${activeIndex * 3.5}rem`)
</script>

<ul
	class="relative h-full border-r-4 border-primary-500 list-none pl-4 pt-8 gap-2 flex flex-col"
>
	{#if activeIndex !== null}
		<li
			aria-hidden="true"
			class="sidebar-highlight pointer-events-none absolute left-4 right-0 top-8 h-12 rounded-l-3xl bg-primary-500"
			style:transform={`translateY(${highlightOffset})`}
		>
			<Corner class="absolute bottom-full right-0 size-6 text-primary-500" />
			<Corner
				class="absolute top-full right-0 size-6 text-primary-500 -rotate-90"
			/>
		</li>
	{/if}

	<SidebarItem
		href="/"
		active={homeActive}
	>
		<House class="size-6" />
		<span>Home</span>
	</SidebarItem>
	<SidebarItem
		href="/about"
		active={aboutActive}
	>
		<Info class="size-6" />
		<span>About</span>
	</SidebarItem>
</ul>

<style>
	.sidebar-highlight {
		transition: transform 250ms ease;
	}
</style>
