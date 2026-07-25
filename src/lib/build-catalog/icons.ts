import {
	BatteryMedium,
	RulerDimensionLine,
	SignalHigh,
	Weight
} from "@lucide/svelte"
import type { Component } from "svelte"

export type BuildCatalogIcon = Component<{ class?: string }>

export const buildCatalogIcons = {
	weight: Weight,
	ruler: RulerDimensionLine,
	battery: BatteryMedium,
	signal: SignalHigh
} as const satisfies Record<string, BuildCatalogIcon>

export type BuildCatalogIconId = keyof typeof buildCatalogIcons

export function resolveBuildCatalogIcon(
	id: string | undefined,
	source: string
): BuildCatalogIcon | undefined {
	if (id === undefined) return undefined
	if (!(id in buildCatalogIcons)) {
		throw new Error(
			`Invalid metadata in "${source}": unknown build icon "${id}"`
		)
	}
	return buildCatalogIcons[id as BuildCatalogIconId]
}
