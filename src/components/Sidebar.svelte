<script lang="ts">
	import Corner from "$components/graphics/Corner.svelte"
	import SidebarItem from "$components/SidebarItem.svelte"
	import { page } from "$app/state"
	import ThemeSwitch from "$components/ThemeSwitch.svelte"
	import type {
		PathnameWithSearchOrHash,
		RouteIdWithSearchOrHash
	} from "$app/types"
	import type { Component } from "svelte"
	import { House, CircleQuestionMark, Newspaper, Rocket, Toolbox, Wrench } from "@lucide/svelte"

	type SidebarHref = RouteIdWithSearchOrHash | PathnameWithSearchOrHash

	type NavItem = {
		href: SidebarHref
		label: string
		icon: Component<{ class?: string }>
	}

	const navItems: NavItem[] = [
		{ href: "/", label: "Home", icon: House },
		{ href: "/faq", label: "FAQ", icon: CircleQuestionMark },
		// { href: "/lists", label: "Lists", icon: List },
		{ href: "/builds", label: "Builds", icon: Rocket },
		{ href: "/equipment", label: "Gear", icon: Toolbox },
		{ href: "/articles", label: "Articles", icon: Newspaper },
		{ href: "/tools", label: "Tools", icon: Wrench }
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
			: page.url.pathname === path || page.url.pathname.startsWith(`${path}/`)
	}

	let activeIndex = $derived.by(() => {
		const index = navItems.findIndex((item) => isActive(item.href))
		return index === -1 ? null : index
	})

	let highlightOffset = $derived(
		activeIndex === null ? "0rem" : `${activeIndex * 3.5}rem`
	)
</script>

<div
	class="flex flex-col h-full border-l-4 md:border-l-0 md:border-r-4 border-primary-500 py-8 bg-surface-50-950 gap-4"
>
	<ul
		class="relative mt-auto md:mt-0 md:h-full list-none pl-4 gap-2 flex flex-col"
	>
		<li
			aria-hidden="true"
			class="sidebar-highlight pointer-events-none absolute md:left-4 md:right-0 left-0 right-4 top-0 h-12 md:rounded-l-3xl rounded-r-3xl md:rounded-r-none bg-primary-500"
			class:invisible={activeIndex === null}
			style:transform={`translateY(${highlightOffset})`}
		>
			<Corner
				class="absolute bottom-full md:right-0 md:left-auto left-0 size-6 text-primary-500 md:rotate-0 rotate-90"
			/>
			<Corner
				class="absolute top-full md:right-0 md:left-auto left-0 size-6 text-primary-500 md:-rotate-90 -rotate-180"
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
	<div class="w-full flex justify-center md:mt-auto md:mb-0 mb-16">
		<ThemeSwitch />
	</div>
</div>

<style>
	.sidebar-highlight {
		transition: transform 250ms ease;
	}
</style>
