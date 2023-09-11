<script lang="ts">
	import { T } from "@threlte/core"
	import { Environment, GLTF, OrbitControls, type ThrelteGltf } from "@threlte/extras"
	import { useGltf } from "@threlte/extras"
	import type { Mesh } from "three"
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

	$: if(hovered) {
		color.set("rgb(255, 204, 0)")
		opacity.set(0.75)
	} else {
		color.set("rgb(170, 170, 170)")
		opacity.set(0.2)
	}

	$: console.log($color)

	const monitor = useGltf("/uploads/three/monitor.glb")

	let meshes:Mesh[] = []

	$: if ($monitor) meshes.push($monitor.nodes["monitor"])
	$: if ($monitor) meshes.push($monitor.nodes["stuff"])
	$: if ($monitor) meshes.push($monitor.nodes["stuff_highlight"])


	let hovered = false
</script>

<T.PerspectiveCamera
  makeDefault
  position={[2, 2, 5]}
  fov={25}
>
  <OrbitControls
    enableZoom={false}
	enablePan={false}
    autoRotate
	autoRotateSpeed={-2}
    enableDamping
	minPolarAngle={Math.PI / 2}
	maxPolarAngle={Math.PI / 2}
  />
</T.PerspectiveCamera>

<T.AmbientLight />

<Float
	floatIntensity={0.5}
	rotationIntensity={0.5}
>
</Float>

<T.Group
	on:pointerenter={() => {hovered = true}} 
	on:pointerleave={() => {hovered = false}}
	scale={0.66}
	rotation.z={(Math.PI / 16) * -1}
	position={[0, -0.75, 0]}
>

	{#if $monitor}

		<T
			is={$monitor.nodes["monitor"]}
		>
			<T.MeshStandardMaterial
				color={0xaaaaaa}
				transparent
				opacity={0.2}
				depthWrite={false}
			/>
		</T>

		<T
			is={$monitor.nodes["stuff"]}
		>
			<T.MeshStandardMaterial
				color={0xaaaaaa}
				transparent
				opacity={0.2}
				depthWrite={false}
			/>
		</T>

		<T
			is={$monitor.nodes["stuff_highlight"]}
		>
			<T.MeshStandardMaterial
				color={$color}
				transparent
				opacity={$opacity}
				depthWrite={false}
			/>
		</T>

		<!-- {#key $pcb}
			<T
				is={$pcb.nodes["pcb"]}
			>
				<T.MeshStandardMaterial
					color={0xaaaaaa}
					transparent
					opacity={0.2}
					depthWrite={false}
				/>
			</T>
		{/key}

		{#key $normal}
			<T
				is={$normal.nodes["normal"]}
			>
				<T.MeshStandardMaterial
					color={$color}
					transparent
					opacity={$opacity}
					depthWrite={false}
				/>
			</T>
		{/key}

		{#key $highlight}
			<T
				is={$highlight.nodes["highlight"]}
			>
				<T.MeshStandardMaterial
					color={$color}
					transparent
					opacity={$opacity}
					depthWrite={false}
				/>
			</T>
		{/key} -->

	{/if}

</T.Group>