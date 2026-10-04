export interface ParsedMotorSize {
	diameter: number
	height: number
}

export function parseMotorSize(size: string): ParsedMotorSize | null {
	// 2207 - diameter: 22mm, height: 7mm
	// 2306.5 - diameter: 23mm, height: 6.5mm
	// 2306,5 - diameter: 23mm, height: 6.5mm
	// 2207. - diameter: 22mm, height: 7mm (trailing separator ignored)

	const regex = /^(\d{2})(\d{1,2}(?:[.,]\d+)?)[.,]?$/
	const match = size.match(regex)
	if (!match) return null

	const diameter = parseInt(match[1], 10)
	const height = parseFloat(match[2].replace(",", "."))

	return { diameter, height }
}

export function statorVolume(size: string): number | null {
	const parsed = parseMotorSize(size)
	if (!parsed) return null

	// Calculate volume in mm³
	const radius = parsed.diameter / 2
	const volume = Math.PI * Math.pow(radius, 2) * parsed.height
	return Math.round(volume)
}

export function statorSurfaceArea(size: string): number | null {
	const parsed = parseMotorSize(size)
	if (!parsed) return null

	// Calculate surface area in mm²
	const radius = parsed.diameter / 2
	const surfaceArea = 2 * Math.PI * radius * (radius + parsed.height)
	return Math.round(surfaceArea)
}
