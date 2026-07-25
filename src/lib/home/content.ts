import {
	readMetadataRecord,
	readRequiredNumber,
	readRequiredString,
	type CompiledSvxModule
} from "$lib/content/metadata"
import type { Component } from "svelte"

export type HomeSection = {
	title: string
	order: number
	Content: Component<{ age: number }>
}

const modules = import.meta.glob<CompiledSvxModule<{ age: number }>>(
	"../../content/home/*.svx",
	{ eager: true }
)

export const homeSections: HomeSection[] = Object.entries(modules)
	.map(([source, module]) => {
		const metadata = readMetadataRecord(module.metadata, source)
		return {
			title: readRequiredString(metadata, "title", source),
			order: readRequiredNumber(metadata, "order", source),
			Content: module.default
		}
	})
	.sort((a, b) => a.order - b.order)
