import type { Picture } from "@sveltejs/enhanced-img"
import type { Component } from "svelte"
import type { BuildGuideAccent, BuildGuidePartAccent } from "./theme"

export type BuildGuidePartTag = {
	label: string
	tooltip?: string
}

export type BuildGuidePart = {
	id: string
	slug: string
	guideSlug: string
	sectionSlug: string
	title: string
	url: string
	order: number
	accent: BuildGuidePartAccent
	price?: string
	tags: BuildGuidePartTag[]
	image: Picture | null
	imageFilename?: string
	imageAlt: string
	Content: Component
}

export type BuildGuideSection = {
	id: string
	guideSlug: string
	title: string
	order: number
	Content: Component
	parts: BuildGuidePart[]
}

export type BuildGuide = {
	slug: string
	title: string
	subtitle: string
	accent: BuildGuideAccent
	seoDescription?: string
	seoImage?: string
	Intro: Component
	sections: BuildGuideSection[]
}

export function getBuildGuidePartId(
	guideSlug: string,
	sectionSlug: string,
	partSlug: string
): string {
	return `${guideSlug}-${sectionSlug}-${partSlug}`
}
