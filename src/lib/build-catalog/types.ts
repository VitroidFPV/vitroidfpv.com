import type { Component } from "svelte"
import type { BuildCatalogAccent } from "./theme"
import type { BuildCatalogIcon } from "./icons"
import type { BuildCatalogModel } from "./models"

export type BuildCatalogSpec = {
	title: string
	description: string
	icon?: BuildCatalogIcon
}

export type BuildCatalogEntry = {
	slug: string
	title: string
	price: string
	order: number
	image?: string
	href?: string
	description?: string
	seoDescription?: string
	model: BuildCatalogModel | null
	accent: BuildCatalogAccent
	specs: BuildCatalogSpec[]
	Summary: Component
}
