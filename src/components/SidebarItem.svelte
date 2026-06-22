<script lang="ts">
	import type {
		PathnameWithSearchOrHash,
		RouteIdWithSearchOrHash
	} from "$app/types"
	import type { Snippet } from "svelte"
	import { resolve } from "$app/paths"

	let {
		href,
		active = false,
		children
	}: {
		href: RouteIdWithSearchOrHash | PathnameWithSearchOrHash
		active?: boolean
		children: Snippet
	} = $props()
</script>

<li class="relative z-10 h-12 p-3 px-4 pr-6 rounded-l-3xl">
	<a
		href={resolve(href)}
		class="sidebar-link flex items-center gap-2 font-semibold
		{active
			? 'sidebar-link--active text-primary-contrast-dark'
			: 'text-surface-contrast-light'}"
	>
		{@render children()}
	</a>
</li>

<style>
	.sidebar-link:not(.sidebar-link--active) {
		transition:
			transform 200ms,
			color 0s;
	}

	.sidebar-link:not(.sidebar-link--active):hover {
		color: var(--color-primary-500);
		/* transform: translateX(0.25rem); */
		transition:
			transform 200ms,
			color 200ms;
	}
</style>
