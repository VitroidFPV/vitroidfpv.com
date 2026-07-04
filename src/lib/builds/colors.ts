export const buildColors = ["primary", "warning", "error"] as const

export type BuildColor = (typeof buildColors)[number]

export function resolveBuildColor(color?: string): BuildColor {
	if (color === "warning" || color === "error") return color
	return "primary"
}

export const buildColorClasses: Record<
	BuildColor,
	{
		text: string
		bar: string
		cardHover: string
		splitEdgeHover: string
	}
> = {
	primary: {
		text: "text-primary-500",
		bar: "bg-primary-500",
		cardHover: "hover:border-primary-500/40 hover:shadow-primary-500/5",
		splitEdgeHover: "group-hover:text-primary-500/40"
	},
	warning: {
		text: "text-warning-500",
		bar: "bg-warning-500",
		cardHover: "hover:border-warning-500/40 hover:shadow-warning-500/5",
		splitEdgeHover: "group-hover:text-warning-500/40"
	},
	error: {
		text: "text-error-500",
		bar: "bg-error-500",
		cardHover: "hover:border-error-500/40 hover:shadow-error-500/5",
		splitEdgeHover: "group-hover:text-error-500/40"
	}
}

export const buildAccentVar: Record<BuildColor, string> = {
	primary: "var(--color-primary-500)",
	warning: "var(--color-warning-500)",
	error: "var(--color-error-500)"
}
