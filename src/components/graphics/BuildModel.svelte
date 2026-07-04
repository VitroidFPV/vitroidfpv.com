<script lang="ts">
	import type { BuildModelDepthTreatment } from "$lib/builds/depthTreatment"
	import type { BuildModel } from "$lib/builds/models"
	import { T } from "@threlte/core"
	import { OrbitControls, useGltf, useDraco } from "@threlte/extras"
	import { untrack } from "svelte"
	import { Vector3, type BufferGeometry } from "three"

	let {
		model,
		depthTreatment = "prepass"
	}: { model: BuildModel; depthTreatment?: BuildModelDepthTreatment } = $props()

	const dracoLoader = useDraco()
	const gltf = useGltf(untrack(() => model.path), {dracoLoader})

	const modelScene = $derived.by(
		(): {
			geometry: BufferGeometry
			position: [number, number, number]
			scale: number
		} | null => {
			if (!$gltf) return null

			const geometry = $gltf.nodes[model.nodeName]?.geometry as
				BufferGeometry | undefined

			if (!geometry) return null

			geometry.computeBoundingBox()
			if (!geometry.boundingBox) return null

			const size = geometry.boundingBox.getSize(new Vector3())
			const maxSize = Math.max(size.x, size.y, size.z)
			const normalizationScale = maxSize > 0 ? model.targetSize / maxSize : 1
			const center = geometry.boundingBox
				.getCenter(new Vector3())
				.multiplyScalar(normalizationScale)

			return {
				geometry,
				position: [-center.x, -center.y, -center.z],
				scale: 14 * normalizationScale
			}
		}
	)
</script>

<T.PerspectiveCamera
	makeDefault
	position={[6, 12, 6]}
	zoom={3.8}
>
	<OrbitControls
		enableDamping
		rotateSpeed={0.5}
		autoRotate
		autoRotateSpeed={model.autoRotateSpeed}
		enablePan={false}
		enableZoom={false}
		minPolarAngle={Math.PI / 2}
		maxPolarAngle={Math.PI / 2}
	/>
</T.PerspectiveCamera>

{#snippet edges(geometry: BufferGeometry)}
	<T.LineSegments>
		<T.EdgesGeometry args={[geometry, 15]} />
		<T.LineBasicMaterial
			color="rgb(127.5, 127.5, 127.5)"
			transparent
			opacity={0.2}
			depthWrite={depthTreatment === "prepass" ? false : undefined}
			depthTest={depthTreatment === "prepass" ? true : undefined}
		/>
	</T.LineSegments>
{/snippet}

{#if modelScene}
	{#if depthTreatment === "legacy"}
		<T.Mesh
			geometry={modelScene.geometry}
			position={modelScene.position}
			scale={modelScene.scale}
			rotation={model.rotation}
		>
			<T.MeshBasicMaterial
				color={0xaaaaaa}
				transparent
				opacity={0.1}
				depthWrite={true}
				depthTest={true}
			/>
			{@render edges(modelScene.geometry)}
		</T.Mesh>
	{:else}
		<T.Group
			position={modelScene.position}
			scale={modelScene.scale}
			rotation={model.rotation}
		>
			<T.Mesh geometry={modelScene.geometry} renderOrder={0}>
				<T.MeshBasicMaterial colorWrite={false} depthWrite={true} depthTest={true} />
			</T.Mesh>
			<T.Mesh geometry={modelScene.geometry} renderOrder={1}>
				<T.MeshBasicMaterial
					color={0xaaaaaa}
					transparent
					opacity={0.1}
					depthWrite={false}
					depthTest={true}
				/>
			</T.Mesh>
			<T.LineSegments renderOrder={2}>
				<T.EdgesGeometry args={[modelScene.geometry, 15]} />
				<T.LineBasicMaterial
					color="rgb(127.5, 127.5, 127.5)"
					transparent
					opacity={0.2}
					depthWrite={false}
					depthTest={true}
				/>
			</T.LineSegments>
		</T.Group>
	{/if}
{/if}
