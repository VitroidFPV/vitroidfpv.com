<script lang="ts">
	import Corner from "$components/Corner.svelte"
	import SidebarItem from "$components/SidebarItem.svelte"
	import { page } from "$app/state"
	import ThemeSwitch from "$components/ThemeSwitch.svelte"
	import type {
		PathnameWithSearchOrHash,
		RouteIdWithSearchOrHash
	} from "$app/types"
	import type { Component } from "svelte"
	import { House, CircleQuestionMark, List, Newspaper } from "@lucide/svelte"

	type SidebarHref = RouteIdWithSearchOrHash | PathnameWithSearchOrHash

	type NavItem = {
		href: SidebarHref
		label: string
		icon: Component<{ class?: string }>
	}

	const navItems: NavItem[] = [
		{ href: "/", label: "Home", icon: House },
		{ href: "/faq", label: "FAQ", icon: CircleQuestionMark },
		{ href: "/lists", label: "Lists", icon: List },
		{ href: "/articles", label: "Articles", icon: Newspaper }
	]

	function pathnameFromHref(href: SidebarHref) {
		const str = String(href)
		const query = str.indexOf("?")
		const hash = str.indexOf("#")
		const end = Math.min(
			query === -1 ? str.length : query,
			hash === -1 ? str.length : hash
		)
		return str.slice(0, end)
	}

	function isActive(href: SidebarHref) {
		const path = pathnameFromHref(href)

		return path === "/"
			? page.url.pathname === "/"
			: page.url.pathname === path ||
					page.url.pathname.startsWith(`${path}/`)
	}

	let activeIndex = $derived.by(() => {
		const index = navItems.findIndex((item) => isActive(item.href))
		return index === -1 ? null : index
	})

	let highlightOffset = $derived(
		activeIndex === null ? "0rem" : `${activeIndex * 3.5}rem`
	)
</script>

<div class="flex flex-col h-full border-r-4 border-primary-500 py-8">
	<ul class="relative h-full list-none pl-4 gap-2 flex flex-col">
		<li
			aria-hidden="true"
			class="sidebar-highlight pointer-events-none absolute left-4 right-0 top-0 h-12 rounded-l-3xl bg-primary-500"
			class:invisible={activeIndex === null}
			style:transform={`translateY(${highlightOffset})`}
		>
			<Corner class="absolute bottom-full right-0 size-6 text-primary-500" />
			<Corner
				class="absolute top-full right-0 size-6 text-primary-500 -rotate-90"
			/>
		</li>

		{#each navItems as item (item.href)}
			<SidebarItem
				href={item.href}
				label={item.label}
				active={isActive(item.href)}
			>
				<item.icon class="size-6" />
			</SidebarItem>
		{/each}
	</ul>
	<div class="w-full flex justify-center mt-auto">
		<ThemeSwitch />
	</div>
</div>

<style>
	.sidebar-highlight {
		transition: transform 250ms ease;
	}
</style>
