export function quoteYamlScalar(value: string): string {
	if (
		/[:#{}[\],&*?|>!%@`"'\\]/.test(value) ||
		value.startsWith(" ") ||
		value.endsWith(" ")
	) {
		return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`
	}
	return value
}
