<script lang="ts">
	import Corner from "$components/graphics/Corner.svelte"
	import SidebarItem from "$components/SidebarItem.svelte"
	import { page } from "$app/state"
	import ThemeSwitch from "$components/ThemeSwitch.svelte"
	import SearchDialog from "$components/search/SearchDialog.svelte"
	import { pathnameFromHref, sidebarNavItems } from "$lib/navigation/sidebar"

	function isActive(href: (typeof sidebarNavItems)[number]["href"]) {
		const path = pathnameFromHref(String(href))

		return path === "/"
			? page.url.pathname === "/"
			: page.url.pathname === path || page.url.pathname.startsWith(`${path}/`)
	}

	let activeIndex = $derived.by(() => {
		const index = sidebarNavItems.findIndex((item) => isActive(item.href))
		return index === -1 ? null : index
	})

	let highlightOffset = $derived(
		activeIndex === null ? "0rem" : `${activeIndex * 3.5}rem`
	)
</script>

<div
	class="flex h-full flex-col gap-4 border-l-4 border-primary-500 bg-surface-50-950 py-8 md:border-r-4 md:border-l-0"
>
	<ul
		class="relative mt-auto flex list-none flex-col gap-2 pl-4 md:mt-0 md:h-full"
	>
		<li
			aria-hidden="true"
			class="sidebar-highlight pointer-events-none absolute top-0 right-4 left-0 h-12 rounded-r-3xl bg-primary-500 md:right-0 md:left-4 md:rounded-l-3xl md:rounded-r-none"
			class:invisible={activeIndex === null}
			style:transform={`translateY(${highlightOffset})`}
		>
			<Corner
				class="absolute bottom-full left-0 size-6 rotate-90 text-primary-500 md:right-0 md:left-auto md:rotate-0"
			/>
			<Corner
				class="absolute top-full left-0 size-6 -rotate-180 text-primary-500 md:right-0 md:left-auto md:-rotate-90"
			/>
		</li>

		{#each sidebarNavItems as item (item.href)}
			<SidebarItem
				href={item.href}
				label={item.label}
				active={isActive(item.href)}
			>
				<item.icon class="size-6" />
			</SidebarItem>
		{/each}

		<li
			role="presentation"
			class="pr-4"
		>
			<hr class="hr" />
		</li>

		<SearchDialog />
	</ul>
	<div class="mb-16 flex w-full justify-center md:mt-auto md:mb-0">
		<ThemeSwitch />
	</div>
</div>

<style>
	.sidebar-highlight {
		transition: transform 250ms ease;
	}
</style>
