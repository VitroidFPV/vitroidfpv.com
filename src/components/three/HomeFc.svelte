<script lang="ts">
	import { run } from 'svelte/legacy';

	import { T } from "@threlte/core"
	import { OrbitControls } from "@threlte/extras"
	import { useGltf } from "@threlte/extras"
	import type { Mesh } from "three"
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



	const pcb = useGltf("/uploads/three/fc/fc_pcb.glb")
	const normal = useGltf("/uploads/three/fc/fc_normal.glb")
	const highlight = useGltf("/uploads/three/fc/fc_highlight.glb")

	let meshes:Mesh[] = []


	let hovered = $state(false)
	run(() => {
		if(hovered) {
			color.set("rgb(214, 57, 91)")
			opacity.set(0.5)
		} else {
			color.set("rgb(170, 170, 170)")
			opacity.set(0.2)
		}
	});
	// 

	run(() => {
		console.log($color)
	});
	run(() => {
		if ($pcb) meshes.push($pcb.nodes["pcb"])
	});
	run(() => {
		if ($normal) meshes.push($normal.nodes["normal"])
	});
	run(() => {
		if ($highlight) meshes.push($highlight.nodes["highlight"])
	});
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
	autoRotateSpeed={2}
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
	onpointerenter={() => {hovered = true; console.log("enter")}} 
	onpointerleave={() => {hovered = false; console.log("leave")}}
	scale={0.66}
	rotation.z={Math.PI / 4}
>

	{#if $pcb && $normal && $highlight}

		{#key $pcb}
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
					color={rgbToHexNumber($color)}
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
					color={rgbToHexNumber($color)}
					transparent
					opacity={$opacity}
					depthWrite={false}
				/>
			</T>
		{/key}

	{/if}

</T.Group>