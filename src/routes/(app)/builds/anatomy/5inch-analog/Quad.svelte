<script lang="ts">
	import { T } from "@threlte/core"
	import { Environment, GLTF, OrbitControls, interactivity, transitions, type ThrelteGltf } from "@threlte/extras"
	import { useGltf } from "@threlte/extras"
	import type { Mesh } from "three"
	import { Float } from "@threlte/extras"
	interactivity()
	import { component } from "$lib/stores/quadStore"
	import Component from "$components/three/quad/Component.svelte"

	

	interface Props {
		// export let value: [number, number, number] = [0, 0, 0]
		urls?: string[];
	}

	let { urls = [] }: Props = $props();

	function addSelect(url: string, event: any) {
		if ($component.selected != url) {
			$component.selected = url
			$component.coords = event.normal
			// console.log("Selected: " + $component.selected)
			// console.log(event)
		}
	}

	function addHover(url: string, event: any, remove: boolean = false) {
		// if url has changed, add to hovered\
		// if ($component.hovered != url) {
		// 	$component.hovered = url
		// 	// console.log("Hovered: " + $component.hovered)
		// }
		if (remove) {
			// if ($component.hovered != url) {
				$component.hovered = ""
			// }
		} else {
			if ($component.hovered != url) {
				$component.hovered = url
			}
		}
	}

	let isHolding = false

	function handleMouseDown(event: any) {
		if (event.button == 0) {
			isHolding = true
		}
	}
	
</script>

<Environment path="/uploads/three/" files="brown_photostudio_01_1k.hdr" />

<T.PerspectiveCamera
makeDefault
position={[2, 2.5, 5]}
fov={25}
>
	<OrbitControls
		enableDamping
		dampingFactor={0.15}
	/>
</T.PerspectiveCamera>

<T.AmbientLight intensity={2} />

<T.Group 
	rotation={[0, 2.75, 0]} scale={[1,1,1]} 
	on:click={(event) => {event.stopPropagation(); addSelect(event.object.parent.name, event)}}
	on:pointerenter={(event) => {event.stopPropagation(); addHover(event.object.parent.name, event)}}
	on:pointerleave={(event) => {event.stopPropagation(); addHover(event.object.parent.name, event, true)}}
>
	{#each urls as url}
		<Component {url} />
	{/each}
</T.Group>