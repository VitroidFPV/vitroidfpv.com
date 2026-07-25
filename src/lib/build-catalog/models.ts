export const BUILD_CATALOG_MODEL_TARGET_SIZE = 0.2090570330619812
export const BUILD_CATALOG_MODEL_AUTO_ROTATE_SPEED = 1

export type BuildCatalogModelRotation = [number, number, number]

export const buildCatalogModels = {
	s1v5: {
		path: "/models/builds/s1v5.glb",
		nodeName: "s1v5",
		targetSize: BUILD_CATALOG_MODEL_TARGET_SIZE,
		rotation: [Math.PI / 8, 0, 0] as BuildCatalogModelRotation,
		autoRotateSpeed: BUILD_CATALOG_MODEL_AUTO_ROTATE_SPEED
	},
	flipmode: {
		path: "/models/builds/flipmode.glb",
		nodeName: "flipmode",
		targetSize: BUILD_CATALOG_MODEL_TARGET_SIZE,
		rotation: [Math.PI / 8, 0, 0] as BuildCatalogModelRotation,
		autoRotateSpeed: BUILD_CATALOG_MODEL_AUTO_ROTATE_SPEED
	},
	mario8: {
		path: "/models/builds/mario8.glb",
		nodeName: "Assembly",
		targetSize: BUILD_CATALOG_MODEL_TARGET_SIZE * 1.1,
		rotation: [Math.PI / 8, 0, 0] as BuildCatalogModelRotation,
		autoRotateSpeed: BUILD_CATALOG_MODEL_AUTO_ROTATE_SPEED
	}
} as const

export type BuildCatalogModelId = keyof typeof buildCatalogModels

export type BuildCatalogModel =
	(typeof buildCatalogModels)[BuildCatalogModelId] & {
		id: BuildCatalogModelId
	}

export function resolveBuildCatalogModel(
	modelId: string | undefined,
	useModel: boolean,
	source: string
): BuildCatalogModel | null {
	const resolvedId = modelId ?? (useModel ? "s1v5" : undefined)
	if (!resolvedId) return null
	if (!(resolvedId in buildCatalogModels)) {
		throw new Error(
			`Invalid metadata in "${source}": unknown build model "${resolvedId}"`
		)
	}

	const id = resolvedId as BuildCatalogModelId
	return { id, ...buildCatalogModels[id] }
}
