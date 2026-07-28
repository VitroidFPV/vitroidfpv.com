import type {
	PathnameWithSearchOrHash,
	RouteIdWithSearchOrHash
} from "$app/types"
import {
	CircleQuestionMark,
	House,
	Newspaper,
	Rocket,
	Toolbox,
	Wrench
} from "@lucide/svelte"
import type { Component } from "svelte"

export type SidebarHref = RouteIdWithSearchOrHash | PathnameWithSearchOrHash

export type SidebarNavItem = {
	href: SidebarHref
	label: string
	icon: Component<{ class?: string }>
}

export const sidebarNavItems: SidebarNavItem[] = [
	{ href: "/", label: "Home", icon: House },
	{ href: "/faq", label: "FAQ", icon: CircleQuestionMark },
	{ href: "/builds", label: "Builds", icon: Rocket },
	{ href: "/equipment", label: "Gear", icon: Toolbox },
	{ href: "/articles", label: "Articles", icon: Newspaper },
	{ href: "/tools", label: "Tools", icon: Wrench }
]

export function pathnameFromHref(href: string): string {
	const query = href.indexOf("?")
	const hash = href.indexOf("#")
	const end = Math.min(
		query === -1 ? href.length : query,
		hash === -1 ? href.length : hash
	)
	return href.slice(0, end)
}

export function getSidebarIconForUrl(
	url: string
): Component<{ class?: string }> | undefined {
	const pathname = pathnameFromHref(url)
	return sidebarNavItems.find(({ href }) => {
		const sidebarPath = pathnameFromHref(String(href))
		return sidebarPath === "/"
			? pathname === "/"
			: pathname === sidebarPath || pathname.startsWith(`${sidebarPath}/`)
	})?.icon
}
