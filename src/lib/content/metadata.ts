import type { Component } from "svelte"

export type SvxMetadata = Record<string, unknown>

export type CompiledSvxModule<
	Props extends Record<string, unknown> = Record<string, never>
> = {
	default: Component<Props>
	metadata: unknown
}

export type PageMetadata = {
	title: string
	description: string
	seoDescription?: string
}

function metadataError(
	source: string,
	field: string,
	expectation: string
): never {
	throw new Error(
		`Invalid metadata in "${source}": field "${field}" ${expectation}`
	)
}

export function readMetadataRecord(raw: unknown, source: string): SvxMetadata {
	if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
		throw new Error(`Invalid metadata in "${source}": expected an object`)
	}

	return raw as SvxMetadata
}

export function readRequiredString(
	metadata: SvxMetadata,
	field: string,
	source: string
): string {
	const value = metadata[field]
	if (typeof value !== "string" || value.trim().length === 0) {
		return metadataError(source, field, "must be a non-empty string")
	}
	return value
}

export function readOptionalString(
	metadata: SvxMetadata,
	field: string,
	source: string
): string | undefined {
	const value = metadata[field]
	if (value === undefined || value === null) return undefined
	if (typeof value !== "string") {
		return metadataError(source, field, "must be a string when supplied")
	}
	return value
}

export function readRequiredNumber(
	metadata: SvxMetadata,
	field: string,
	source: string
): number {
	const value = metadata[field]
	if (typeof value !== "number" || !Number.isFinite(value)) {
		return metadataError(source, field, "must be a finite number")
	}
	return value
}

export function readOptionalNumber(
	metadata: SvxMetadata,
	field: string,
	source: string
): number | undefined {
	const value = metadata[field]
	if (value === undefined || value === null) return undefined
	if (typeof value !== "number" || !Number.isFinite(value)) {
		return metadataError(source, field, "must be a finite number when supplied")
	}
	return value
}

export function readRequiredBoolean(
	metadata: SvxMetadata,
	field: string,
	source: string
): boolean {
	const value = metadata[field]
	if (typeof value !== "boolean") {
		return metadataError(source, field, "must be a boolean")
	}
	return value
}

export function readOptionalBoolean(
	metadata: SvxMetadata,
	field: string,
	source: string
): boolean | undefined {
	const value = metadata[field]
	if (value === undefined || value === null) return undefined
	if (typeof value !== "boolean") {
		return metadataError(source, field, "must be a boolean when supplied")
	}
	return value
}

export function readRequiredArray(
	metadata: SvxMetadata,
	field: string,
	source: string
): unknown[] {
	const value = metadata[field]
	if (!Array.isArray(value)) {
		return metadataError(source, field, "must be an array")
	}
	return value
}

export function readOptionalArray(
	metadata: SvxMetadata,
	field: string,
	source: string
): unknown[] | undefined {
	const value = metadata[field]
	if (value === undefined || value === null) return undefined
	if (!Array.isArray(value)) {
		return metadataError(source, field, "must be an array when supplied")
	}
	return value
}

export function readRequiredRecord(
	metadata: SvxMetadata,
	field: string,
	source: string
): SvxMetadata {
	const value = metadata[field]
	if (!value || typeof value !== "object" || Array.isArray(value)) {
		return metadataError(source, field, "must be an object")
	}
	return value as SvxMetadata
}

export function readOptionalRecord(
	metadata: SvxMetadata,
	field: string,
	source: string
): SvxMetadata | undefined {
	const value = metadata[field]
	if (value === undefined || value === null) return undefined
	if (!value || typeof value !== "object" || Array.isArray(value)) {
		return metadataError(source, field, "must be an object when supplied")
	}
	return value as SvxMetadata
}

export function parsePageMetadata(raw: unknown, source: string): PageMetadata {
	const metadata = readMetadataRecord(raw, source)
	return {
		title: readRequiredString(metadata, "title", source),
		description: readRequiredString(metadata, "description", source),
		seoDescription: readOptionalString(metadata, "seoDescription", source)
	}
}
