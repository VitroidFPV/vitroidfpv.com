<script lang="ts">
	import { T } from "@threlte/core"
	import { Environment, GLTF, OrbitControls, interactivity, type ThrelteGltf } from "@threlte/extras"
	import { useGltf } from "@threlte/extras"
	import type { Mesh, Vector3 } from "three"
	import { Float } from "@threlte/extras"
	interactivity()

	export let url: string = ""
	export let position: [number, number, number] = [0, 0, 0]
	export let rotation: [number, number, number] = [0, 0, 0]
	export let scale: number = 1
	export let pan: boolean = false

	import { createTransition } from "@threlte/extras";
	import { cubicOut } from "svelte/easing";

	const scaleT = createTransition<Mesh>((ref) => {
		const from = ref.scale.x;
		return {
			tick(t) {
				t = 0.1 + 0.9 * t;
				ref.scale.setScalar(from * t);
			},
			easing: cubicOut,
			duration: 400
		}
	})

</script>

<Environment path="/uploads/" files="brown_photostudio_01_1k.hdr" />

<T.PerspectiveCamera
  makeDefault
  position={[2, 2, 5]}
  fov={25}
>
	<OrbitControls
		enablePan={pan}
		enableDamping
	/>
</T.PerspectiveCamera>

<!-- <T.AmbientLight intensity={10}/> -->

<GLTF {url} {position} {rotation} scale={scale} in={scaleT} />