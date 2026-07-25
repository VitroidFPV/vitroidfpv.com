declare module "*.glsl?raw" {
	const source: string
	export default source
}

declare module "@skeletonlabs/skeleton-svelte"

declare module "*.md" {
	import type { Component } from "svelte"

	const component: Component<Record<string, unknown>>
	export default component

	export const metadata: Record<string, unknown>
}

declare module "*.svx" {
	import type { Component } from "svelte"

	const component: Component<Record<string, unknown>>
	export default component

	export const metadata: Record<string, unknown>
}
