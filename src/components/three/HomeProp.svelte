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

	const gltf = useGltf('/uploads/three/prop.glb')

	$: console.log($gltf)

	let hovered = false
</script>

<T.PerspectiveCamera
	makeDefault
	position={[5, 2, 5]}
	fov={25}
>
<OrbitControls
	enableZoom={false}
	autoRotate
	autoRotateSpeed={-5}
	enableDamping
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
		is={$gltf.nodes['Prop004']} 
		scale={0.66} 
		on:pointerenter={() => hovered = true} 
		on:pointerleave={() => hovered = false} 
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