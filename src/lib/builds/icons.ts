import type { Component } from "svelte"
import {
	Weight,
	RulerDimensionLine,
	BatteryMedium,
	SignalHigh
} from "@lucide/svelte"

export type BuildIcon = Component<{ class?: string }>

export const buildIcons = {
	weight: Weight,
	ruler: RulerDimensionLine,
	battery: BatteryMedium,
	signal: SignalHigh
} as const satisfies Record<string, BuildIcon>

export type BuildIconKey = keyof typeof buildIcons

export function resolveBuildIcon(key?: string): BuildIcon | undefined {
	if (!key) return undefined
	return buildIcons[key as BuildIconKey]
}
