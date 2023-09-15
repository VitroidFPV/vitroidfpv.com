<script lang="ts">
	import { T } from "@threlte/core"
	import { Environment, GLTF, OrbitControls, interactivity, type ThrelteGltf } from "@threlte/extras"
	import { useGltf } from "@threlte/extras"
	import type { Mesh } from "three"
	import { Float } from "@threlte/extras"
	interactivity()

	export let url: string = ""
	export let position: [number, number, number] = [0, 0, 0]
	export let rotation: [number, number, number] = [0, 0, 0]
	export let scale: number = 1
</script>

<Environment path="/uploads/" files="brown_photostudio_01_1k.hdr" />

<T.PerspectiveCamera
  makeDefault
  position={[2, 2, 5]}
  fov={25}
>
	<OrbitControls
		enablePan={false}
		enableDamping
	/>
</T.PerspectiveCamera>

<!-- <T.AmbientLight intensity={10}/> -->

<GLTF {url} {position} {rotation} {scale} />