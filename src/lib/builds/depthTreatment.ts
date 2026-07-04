export type BuildModelDepthTreatment = "legacy" | "prepass"

export type BuildModelDepthMode = BuildModelDepthTreatment | "compare"

const LEGACY_ALIASES = new Set(["legacy", "a", "old"])
const PREPASS_ALIASES = new Set(["prepass", "b", "new"])
const COMPARE_ALIASES = new Set(["compare", "ab", "both"])

export function resolveBuildModelDepthMode(
	searchParams: URLSearchParams
): BuildModelDepthMode {
	const param = searchParams.get("modelDepth")?.toLowerCase()

	if (!param) return "prepass"
	if (LEGACY_ALIASES.has(param)) return "legacy"
	if (COMPARE_ALIASES.has(param)) return "compare"
	if (PREPASS_ALIASES.has(param)) return "prepass"

	return "prepass"
}
