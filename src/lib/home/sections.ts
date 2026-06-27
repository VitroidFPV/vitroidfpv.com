import type { Component } from "svelte"

export type HomeSectionMetadata = {
	title: string
	order: number
}

export type HomeSection = {
	title: string
	order: number
	component: Component<{ age: number }>
}

type HomeSectionModule = {
	default: Component<{ age: number }>
	metadata: HomeSectionMetadata
}

const modules = import.meta.glob<HomeSectionModule>("../../content/home/*.svx", {
	eager: true
})

export const homeSections: HomeSection[] = Object.values(modules)
	.map((module) => ({
		title: module.metadata.title,
		order: module.metadata.order,
		component: module.default
	}))
	.sort((a, b) => a.order - b.order)
