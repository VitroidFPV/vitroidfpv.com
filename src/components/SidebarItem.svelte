<script lang="ts">
	import type {
		PathnameWithSearchOrHash,
		RouteIdWithSearchOrHash
	} from "$app/types"
	import type { Snippet } from "svelte"
	import { resolve } from "$app/paths"

	let {
		href,
		label,
		active = false,
		children
	}: {
		href: RouteIdWithSearchOrHash | PathnameWithSearchOrHash
		label: string
		active?: boolean
		children: Snippet
	} = $props()

	const resolveHref = resolve as (
		route: RouteIdWithSearchOrHash | PathnameWithSearchOrHash
	) => string
</script>

<li class="relative z-10 h-12 p-3 px-4 pr-6 rounded-l-3xl">
	<a
		href={resolveHref(href)}
		class="sidebar-link flex items-center gap-2
		{active
			? 'sidebar-link--active text-primary-contrast-dark'
			: 'dark:text-surface-contrast-light text-surface-contrast-dark'}"
	>
		{@render children()}
		<span class="inline-grid">
			<span
				class="invisible col-start-1 row-start-1 font-bold"
				aria-hidden="true">{label}</span
			>
			<span
				class="col-start-1 row-start-1 {active ? 'font-bold' : 'font-medium'}"
				>{label}</span
			>
		</span>
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
