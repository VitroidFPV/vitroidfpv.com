<script lang="ts">
	import { T } from '@threlte/core'
	import { Environment, GLTF, OrbitControls } from '@threlte/extras'
	import { useGltf } from '@threlte/extras'
	import { MeshBasicMaterial, MeshStandardMaterial } from 'three'
	import { Float } from '@threlte/extras'
	import { interactivity } from '@threlte/extras'
	interactivity()

	import { theme } from "$lib/stores/themeStore"

	let color = theme ? "#ffffff" : "#000000"

	const gltf = useGltf('/uploads/three/s1v5.glb')

	$: console.log($gltf)
</script>

<T.PerspectiveCamera
	makeDefault
	position={[5, 2, 5]}
	fov={25}
>
	<OrbitControls
		enableZoom={false}
		autoRotateSpeed={-2}
		autoRotate
		enableDamping
		minPolarAngle={Math.PI / 2}
		maxPolarAngle={Math.PI / 2}
		enablePan={false}
	/>
</T.PerspectiveCamera>

<T.AmbientLight />

<Float
	floatIntensity={0.5}
	rotationIntensity={0.5}
>
</Float>

{#if $gltf}
	<T 
		is={$gltf.nodes['s1v5']} 
		scale={17} 
		rotation.x={Math.PI / 8}
	>
		<T.MeshStandardMaterial
			metalness={0.5}
			roughness={0.5}
			color={"#aaaaaa"}
			transparent
			opacity={0.2}
			depthWrite={false}
		/>
	</T>
{/if}