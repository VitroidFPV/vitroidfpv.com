<script lang="ts">
	import { run } from 'svelte/legacy';

	import { T } from "@threlte/core"
	import { OrbitControls } from "@threlte/extras"
	import { useGltf } from "@threlte/extras"
	import { Float } from "@threlte/extras"
	import { interactivity } from "@threlte/extras"
	interactivity()

	import { spring, tweened } from "svelte/motion"
	import { interpolateHcl } from 'd3-interpolate';
	import { rgbToHexNumber } from '$lib/rgbToHexNumber';

	const color = tweened("rgb(170, 170, 170)", {
		duration: 200,
		interpolate: interpolateHcl,
	})

	const opacity = tweened(0.2, {
		duration: 200,
	})


	const ironNormal = useGltf("/uploads/three/iron/iron_normal.glb")
	const ironHighlight = useGltf("/uploads/three/iron/iron_highlight.glb")
	const tipNormal = useGltf("/uploads/three/iron/tip_normal.glb")
	const tipHighlight = useGltf("/uploads/three/iron/tip_highlight.glb")

	let transform = spring(0, {
		damping: 0.5,
		stiffness: 0.2
	})

	let hovered = $state(false)
	$effect(() => {
		if(hovered) {
			color.set("rgb(255, 151, 66)")
			opacity.set(0.5)
		} else {
			color.set("rgb(170, 170, 170)")
			opacity.set(0.2)
		}
	});
</script>

<T.PerspectiveCamera
makeDefault
position={[2, 2, 5]}
fov={25}
>
	<OrbitControls
		enableZoom={false}
		autoRotateSpeed={-1.5}
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

<T.Group
	onpointerenter={() => {hovered = true; $transform = -4}} 
	onpointerleave={() => {hovered = false; $transform = 0}}
	scale={0.2}
	rotation.x={Math.PI / -12}
	rotation.z={Math.PI / 4}
>
	{#if $ironNormal && $ironHighlight && $tipNormal && $tipHighlight}
		{#key $ironNormal}
			<T 
				is={$ironNormal.nodes["normal"]} 
			>
				<T.MeshStandardMaterial
					color={hovered ? 0xaaaaaa : 0xaaaaaa}
					transparent
					opacity={hovered ? 0.2 : 0.2}
					depthWrite={false}
				/>
			</T>
		{/key}
		{#key $ironHighlight}
			<T
				is={$ironHighlight.nodes["highlight"]}
			>
				<T.MeshStandardMaterial
					color={rgbToHexNumber($color)}
					transparent
					opacity={$opacity}
					depthWrite={false}
				/>
			</T>
		{/key}
		{#key $tipNormal}
			<T 
				is={$tipNormal.nodes["tip_normal"]}
				position={[0, 0, $transform]}
			>
				<T.MeshStandardMaterial
					color={0xaaaaaa}
					transparent
					opacity={hovered ? 0.2 : 0.2}
					depthWrite={false}
				/>
			</T>
		{/key}
		{#key $tipHighlight}
			<T
				is={$tipHighlight.nodes["tip_highlight"]}
				position={[0, 0, $transform]}
			>
				<T.MeshStandardMaterial
					color={rgbToHexNumber($color)}
					transparent
					opacity={$opacity}
					depthWrite={false}
				/>
			</T>
		{/key}
	{/if}
</T.Group>