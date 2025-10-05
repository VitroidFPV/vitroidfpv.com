export function rgbToHexNumber(rgb: string) {
	// rgb(255, 255, 255) to 0xffffff
	const [r, g, b] = rgb.match(/\d+/g)!.map(Number)
	return (r << 16) + (g << 8) + b
}