import type { Component } from "svelte"

export type FaqSectionMetadata = {
	title: string
	description: string
	order: number
}

export type FaqQuestionMetadata = {
	title: string
	order: number
}

type FaqQuestionModule = {
	default: Component
	metadata: FaqQuestionMetadata
}

function getSectionSlug(path: string): string {
	const match = path.match(/\/faq\/([^/]+)\//)
	return match?.[1] ?? path
}

function getQuestionSlug(path: string): string {
	const match = path.match(/\/([^/]+)\.svx$/)
	return match?.[1] ?? path
}

const sectionModules = import.meta.glob(
	"../../content/faq/*/metadata.json",
	{ eager: true, import: "default" }
) as Record<string, FaqSectionMetadata>

const questionModules = import.meta.glob<FaqQuestionModule>(
	"../../content/faq/*/*.svx",
	{ eager: true }
)

export type FaqQuestion = {
	id: string
	slug: string
	title: string
	order: number
	component: Component
}

export type FaqSection = {
	id: string
	title: string
	description: string
	order: number
	questions: FaqQuestion[]
}

const sectionsBySlug = new Map<string, FaqSection>()

for (const [path, metadata] of Object.entries(sectionModules)) {
	const slug = getSectionSlug(path)
	sectionsBySlug.set(slug, {
		id: slug,
		title: metadata.title,
		description: metadata.description,
		order: metadata.order,
		questions: []
	})
}

for (const [path, module] of Object.entries(questionModules)) {
	const slug = getSectionSlug(path)
	const section = sectionsBySlug.get(slug)
	if (!section) continue

	const questionSlug = getQuestionSlug(path)

	section.questions.push({
		id: `${slug}-${questionSlug}`,
		slug: questionSlug,
		title: module.metadata.title,
		order: module.metadata.order,
		component: module.default
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

export function buildFaqQuestionUrl(url: URL, questionId: string) {
	const link = new URL(url)
	link.search = ""
	link.hash = questionId
	return link.toString()
}
