export const buildCatalogAccents = ["success", "warning", "error"] as const

export type BuildCatalogAccent = (typeof buildCatalogAccents)[number]

export function resolveBuildCatalogAccent(
	value: string | undefined,
	source: string
): BuildCatalogAccent {
	if (value === undefined) return "success"
	if (buildCatalogAccents.includes(value as BuildCatalogAccent)) {
		return value as BuildCatalogAccent
	}
	throw new Error(
		`Invalid metadata in "${source}": unknown build accent "${value}"`
	)
}

export const buildCatalogAccentClasses: Record<
	BuildCatalogAccent,
	{
		text: string
		bar: string
		cardHover: string
		splitEdgeHover: string
	}
> = {
	success: {
		text: "text-success-500",
		bar: "bg-success-500",
		cardHover: "hover:border-success-500/40 hover:shadow-success-500/5",
		splitEdgeHover: "group-hover:text-success-500/40"
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

export const buildCatalogAccentVar: Record<BuildCatalogAccent, string> = {
	success: "var(--color-success-500)",
	warning: "var(--color-warning-500)",
	error: "var(--color-error-500)"
}
