export const buildGuidePartAccentClasses = {
	success: {
		text: "text-success-500",
		bar: "bg-success-500",
		price:
			"flex items-center justify-center rounded-full dark:bg-success-500/20 bg-success-500/30 px-2 py-1 text-[11px] font-semibold dark:text-success-500 text-success-700 md:text-xs",
		link: "fancy-link md:text-2xl text-xl font-semibold text-success-500",
		iconHover: "transition-colors duration-300 hover:text-success-500"
	},
	warning: {
		text: "text-warning-500",
		bar: "bg-warning-500",
		price:
			"flex items-center justify-center rounded-full dark:bg-warning-500/20 bg-warning-500/30 px-2 py-1 text-[11px] font-semibold dark:text-warning-500 text-warning-600 md:text-xs",
		link: "fancy-link md:text-2xl text-xl font-semibold text-warning-500",
		iconHover: "transition-colors duration-300 hover:text-warning-500"
	},
	error: {
		text: "text-error-500",
		bar: "bg-error-500",
		price:
			"flex items-center justify-center rounded-full bg-error-500/20 px-2 py-1 text-[11px] font-semibold text-error-500 md:text-xs",
		link: "fancy-link md:text-2xl text-xl font-semibold text-error-500",
		iconHover: "transition-colors duration-300 hover:text-error-500"
	},
	secondary: {
		text: "text-secondary-500",
		bar: "bg-secondary-500",
		price:
			"flex items-center justify-center rounded-full bg-secondary-500/20 px-2 py-1 text-[11px] font-semibold text-secondary-500 md:text-xs",
		link: "fancy-link md:text-2xl text-xl font-semibold text-secondary-500",
		iconHover: "transition-colors duration-300 hover:text-secondary-500"
	}
} as const

export type BuildGuidePartAccent = keyof typeof buildGuidePartAccentClasses

export function resolveBuildGuidePartAccent(
	value: string,
	source: string
): BuildGuidePartAccent {
	if (value in buildGuidePartAccentClasses) {
		return value as BuildGuidePartAccent
	}
	throw new Error(
		`Invalid metadata in "${source}": unknown guide part accent "${value}"`
	)
}
