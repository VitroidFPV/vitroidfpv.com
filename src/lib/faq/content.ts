import {
	readMetadataRecord,
	readRequiredNumber,
	readRequiredString,
	type CompiledSvxModule
} from "$lib/content/metadata"
import { createFaqQuestionDescription } from "$lib/faq/description"
import type { Component } from "svelte"

export type FaqQuestion = {
	id: string
	slug: string
	title: string
	description: string
	order: number
	Content: Component
}

export type FaqSection = {
	id: string
	title: string
	order: number
	Content: Component
	questions: FaqQuestion[]
}

function getSectionSlug(path: string): string {
	const match = path.match(/\/faq\/([^/]+)\//)
	if (!match)
		throw new Error(`Could not read FAQ section identifier from "${path}"`)
	return match[1]
}

function getQuestionSlug(path: string): string {
	const match = path.match(/\/([^/]+)\.svx$/)
	if (!match)
		throw new Error(`Could not read FAQ question identifier from "${path}"`)
	return match[1]
}

const sectionModules = import.meta.glob<CompiledSvxModule>(
	"../../content/faq/*/_section.svx",
	{ eager: true }
)

const questionModules = import.meta.glob<CompiledSvxModule>(
	["../../content/faq/*/*.svx", "!../../content/faq/*/_section.svx"],
	{ eager: true }
)

const questionSources = import.meta.glob<string>(
	["../../content/faq/*/*.svx", "!../../content/faq/*/_section.svx"],
	{ eager: true, query: "?raw", import: "default" }
)

const sectionsBySlug = new Map<string, FaqSection>()

for (const [source, module] of Object.entries(sectionModules)) {
	const slug = getSectionSlug(source)
	if (sectionsBySlug.has(slug)) {
		throw new Error(`Duplicate FAQ section identifier "${slug}" in "${source}"`)
	}

	const metadata = readMetadataRecord(module.metadata, source)
	sectionsBySlug.set(slug, {
		id: slug,
		title: readRequiredString(metadata, "title", source),
		order: readRequiredNumber(metadata, "order", source),
		Content: module.default,
		questions: []
	})
}

const questionIds = new Set<string>()

for (const [source, module] of Object.entries(questionModules)) {
	const sectionSlug = getSectionSlug(source)
	const section = sectionsBySlug.get(sectionSlug)
	if (!section) {
		throw new Error(
			`Orphan FAQ question "${source}" references missing section "${sectionSlug}"`
		)
	}

	const slug = getQuestionSlug(source)
	const id = `${sectionSlug}-${slug}`
	if (questionIds.has(id)) {
		throw new Error(`Duplicate FAQ question identifier "${id}" in "${source}"`)
	}
	questionIds.add(id)

	const questionSource = questionSources[source]
	if (typeof questionSource !== "string") {
		throw new Error(`Could not read FAQ question content from "${source}"`)
	}

	const metadata = readMetadataRecord(module.metadata, source)
	section.questions.push({
		id,
		slug,
		title: readRequiredString(metadata, "title", source),
		description: createFaqQuestionDescription(questionSource),
		order: readRequiredNumber(metadata, "order", source),
		Content: module.default
	})
}

export const faqSections: FaqSection[] = Array.from(sectionsBySlug.values())
	.map((section) => ({
		...section,
		questions: [...section.questions].sort((a, b) => a.order - b.order)
	}))
	.sort((a, b) => a.order - b.order)

export function findFaqQuestionById(questionId: string) {
	for (const section of faqSections) {
		const question = section.questions.find((entry) => entry.id === questionId)
		if (question) return { section, question }
	}

	return null
}
