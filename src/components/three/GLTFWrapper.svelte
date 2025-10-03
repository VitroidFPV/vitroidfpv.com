<script lang="ts">
	import { T } from "@threlte/core"
	import { Environment, GLTF, OrbitControls, interactivity, type ThrelteGltf } from "@threlte/extras"
	import { useGltf } from "@threlte/extras"
	import type { Mesh, Vector3 } from "three"
	import { Float } from "@threlte/extras"
	interactivity()


	import { createTransition } from "@threlte/extras";
	import { cubicOut } from "svelte/easing";
	interface Props {
		url?: string;
		position?: [number, number, number];
		rotation?: [number, number, number];
		scale?: number;
		pan?: boolean;
	}

	let {
		url = "",
		position = [0, 0, 0],
		rotation = [0, 0, 0],
		scale = 1,
		pan = false
	}: Props = $props();

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

<T.OrthographicCamera
	makeDefault
	position={[3,3,3]}
	zoom={150}
>
	<OrbitControls
		enablePan={pan}
		enableDamping
	/>
</T.OrthographicCamera>

<!-- <T.AmbientLight intensity={10}/> -->

<GLTF {url} {position} {rotation} scale={scale} in={scaleT} />