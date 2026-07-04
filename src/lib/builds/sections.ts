import type { Component } from "svelte"
import { resolveBuildColor, type BuildColor } from "./colors"
import { resolveBuildIcon, type BuildIcon } from "./icons"
import { resolveBuildModel, type BuildModel } from "./models"

export type BuildFeatureMetadata = {
	title: string
	description: string
	icon?: string
}

export type BuildSectionMetadata = {
	title: string
	price: string
	order: number
	image: string
	useModel?: boolean
	model?: string
	color?: string
	features: BuildFeatureMetadata[]
}

export type BuildFeature = {
	title: string
	description: string
	icon?: BuildIcon
}

export type BuildSection = {
	slug: string
	title: string
	price: string
	order: number
	image: string
	model: BuildModel | null
	color: BuildColor
	features: BuildFeature[]
	component: Component
}

type BuildSectionModule = {
	default: Component
	metadata: BuildSectionMetadata
}

function getBuildSlug(path: string): string {
	const match = path.match(/\/([^/]+)\.svx$/)
	return match?.[1] ?? path
}

const modules = import.meta.glob<BuildSectionModule>(
	"../../content/builds/*.svx",
	{
		eager: true
	}
)

export const buildSections: BuildSection[] = Object.entries(modules)
	.map(([path, module]) => ({
		slug: getBuildSlug(path),
		title: module.metadata.title,
		price: module.metadata.price,
		order: module.metadata.order,
		image: module.metadata.image,
		model: resolveBuildModel(
			module.metadata.model,
			module.metadata.useModel ?? false
		),
		color: resolveBuildColor(module.metadata.color),
		features: module.metadata.features.map((feature) => ({
			title: feature.title,
			description: feature.description,
			icon: resolveBuildIcon(feature.icon)
		})),
		component: module.default
	}))
	.sort((a, b) => a.order - b.order)
