export const BUILD_MODEL_TARGET_SIZE = 0.2090570330619812
export const BUILD_MODEL_AUTO_ROTATE_SPEED = 1

export type BuildModelRotation = [number, number, number]

export const buildModels = {
	s1v5: {
		path: "/models/builds/s1v5.glb",
		nodeName: "s1v5",
		targetSize: BUILD_MODEL_TARGET_SIZE,
		rotation: [Math.PI / 8, 0, 0] as BuildModelRotation,
		autoRotateSpeed: BUILD_MODEL_AUTO_ROTATE_SPEED
	},
	flipmode: {
		path: "/models/builds/flipmode.glb",
		nodeName: "flipmode",
		targetSize: BUILD_MODEL_TARGET_SIZE,
		rotation: [Math.PI / 8, 0, 0] as BuildModelRotation,
		autoRotateSpeed: BUILD_MODEL_AUTO_ROTATE_SPEED
	}
} as const

export type BuildModelId = keyof typeof buildModels

export type BuildModel = (typeof buildModels)[BuildModelId] & {
	id: BuildModelId
}

export function resolveBuildModel(
	modelId?: string,
	useModel = false
): BuildModel | null {
	const resolvedModelId = modelId ?? (useModel ? "s1v5" : undefined)

	if (!resolvedModelId) return null

	if (!(resolvedModelId in buildModels)) {
		throw new Error(`Unknown build model "${resolvedModelId}"`)
	}

	const id = resolvedModelId as BuildModelId

	return {
		id,
		...buildModels[id]
	}
}
