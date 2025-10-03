<script lang="ts">
	import { run } from 'svelte/legacy';

	import { T } from "@threlte/core"
	import { Environment, GLTF, OrbitControls, type ThrelteGltf } from "@threlte/extras"
	import { useGltf } from "@threlte/extras"
	import { Group, MeshBasicMaterial, MeshStandardMaterial } from "three"
	import { Float } from "@threlte/extras"
	import { interactivity } from "@threlte/extras"
	interactivity()

	import { spring, tweened } from "svelte/motion"
	import { interpolateHcl, interpolateLab } from 'd3-interpolate';

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


	let meshes: any[] = []



	let transform = spring(0, {
		damping: 0.5,
		stiffness: 0.2
	})

	let hovered = $state(false)
	run(() => {
		if(hovered) {
			color.set("rgb(255, 151, 66)")
			opacity.set(0.5)
		} else {
			color.set("rgb(170, 170, 170)")
			opacity.set(0.2)
		}
	});
	run(() => {
		console.log([$ironNormal, $ironHighlight, $tipNormal, $tipHighlight])
	});
	run(() => {
		if ($ironNormal) meshes.push($ironNormal.nodes["normal"])
	});
	run(() => {
		if ($ironHighlight) meshes.push($ironHighlight.nodes["highlight"])
	});
	run(() => {
		if ($tipNormal) meshes.push($tipNormal.nodes["tip_normal"])
	});
	run(() => {
		if ($tipHighlight) meshes.push($tipHighlight.nodes["tip_highlight"])
	});
	run(() => {
		console.log(meshes)
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
	on:pointerenter={() => {hovered = true; $transform = -4}} 
	on:pointerleave={() => {hovered = false; $transform = 0}}
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
					color={hovered ? "#aaaaaa" : "#aaaaaa"}
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
					color={$color}
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
					color={"#aaaaaa"}
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
					color={$color}
					transparent
					opacity={$opacity}
					depthWrite={false}
				/>
			</T>
		{/key}
	{/if}
</T.Group>