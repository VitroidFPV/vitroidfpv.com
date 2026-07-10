export type GuideSectionFormData = {
	title: string
	description: string
	order: number
}

export function serializeGuideSection(data: GuideSectionFormData): string {
	return (
		JSON.stringify(
			{
				title: data.title,
				description: data.description.trim(),
				order: data.order
			},
			null,
			"\t"
		) + "\n"
	)
}
