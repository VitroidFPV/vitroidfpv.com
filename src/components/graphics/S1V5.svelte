<script lang="ts">
	import { T } from "@threlte/core"
	import { OrbitControls, useGltf } from "@threlte/extras"
	import { Vector3 } from "three"
	const gltf = useGltf("/models/builds/s1v5.glb")
	const modelOffset = $derived.by((): [number, number, number] | null => {
		if (!$gltf) return null
		const geometry = $gltf.nodes["s1v5"].geometry
		geometry.computeBoundingBox()
		if (!geometry.boundingBox) return null
		const center = geometry.boundingBox.getCenter(new Vector3())
		return [-center.x, -center.y, -center.z]
	})
</script>
<T.PerspectiveCamera makeDefault position={[6, 12, 6]} zoom={3.8}>
	<OrbitControls
		enableDamping
		rotateSpeed={0.5}
		autoRotate
		autoRotateSpeed={1}
		enablePan={false}
		enableZoom={false}
		minPolarAngle={Math.PI / 2}
		maxPolarAngle={Math.PI / 2}
	/>
</T.PerspectiveCamera>
{#if $gltf && modelOffset}
	<T.Mesh
		geometry={$gltf.nodes["s1v5"].geometry}
		position={modelOffset}
		scale={14}
		rotation.x={Math.PI / 8}
	>
		<T.MeshBasicMaterial
			metalness={0.5}
			roughness={0.5}
			color={0xaaaaaa}
			transparent
			opacity={0.1}
			depthWrite={false}
		/>
		<T.LineSegments>
			<T.EdgesGeometry args={[$gltf.nodes["s1v5"].geometry, 15]} />
			<T.LineBasicMaterial
				color="rgb(127.5, 127.5, 127.5)"
				transparent
				opacity={0.2}
			/>
		</T.LineSegments>
	</T.Mesh>
{/if}