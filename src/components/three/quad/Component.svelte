<script lang="ts">
	import { run } from 'svelte/legacy';

	import { T } from "@threlte/core"
	import { transitions, createTransition, useGltf, Edges } from "@threlte/extras"
	import { BufferGeometry, MeshBasicMaterial, MeshStandardMaterial } from "three"
	import type { Material, Mesh } from "three"
	import { Float } from "@threlte/extras"
	import { interactivity } from "@threlte/extras"
	interactivity()
	transitions()
	import { createEventDispatcher } from "svelte";
	import { interpolateHcl, interpolateLab } from "d3-interpolate";
	import { cubicInOut } from "svelte/easing";
	import { spring, tweened } from "svelte/motion"
	const dispatch = createEventDispatcher();

	import { component } from "$lib/stores/quadStore"

	import { theme } from "$lib/stores/themeStore"
	import { text } from "@sveltejs/kit";

	const flyDown = createTransition<Mesh>((ref) => {
		return {
			tick(t) {
				t = 1 - t
				ref.position.y = t / 100
			},
			easing: cubicInOut,
			duration: 400
		}
	})

	const pulse = createTransition<Mesh>((ref) => {
		// console.log(ref.scale)
		return {
			tick(t) {
				t = t * Math.PI			
				let scale = Math.sin(t) / 50
				ref.scale.set(1 + scale, 1 + scale, 1 + scale)	
			},
			easing: cubicInOut,
			duration: 500
		}
	})

	interface Props {
		url?: string;
	}

	let { url = "" }: Props = $props();
	const gltf = useGltf(url)

	let nodeList: any[] = []
	run(() => {
		if ($gltf) {
			for (const [key, value] of Object.entries($gltf.nodes)) {
				nodeList.push(key)
			}
		}
	});

	const color = tweened($theme == "dark" ? "rgb(170, 170, 170)" : "rgb(30, 30, 30)", {
		duration: 200,
		interpolate: interpolateHcl,
	})

	run(() => {
		if ($theme == "dark") {
			color.set("rgb(170, 170, 170)")
		} else {
			color.set("rgb(30, 30, 30)")
		}
	});

	const opacity = tweened(0.05, {
		duration: 200,
	})

	const texturedOpacity = tweened(0, {
		duration: 500,
	})

	// tween scale [1,1,1]
	const scale = tweened([1, 1, 1], {
		duration: 200,
	})

	run(() => {
		if ($component.hovered == url && $component.selected !== url) {
			opacity.set($theme == "dark" ? 0.4 : 0.6)
		} else {
			opacity.set($theme == "dark" ? 0.2 : 0.2)
		}
	});
	
	let texturedMaterials: MeshStandardMaterial[] = $state([])

	// log every node"s material from nodesList
	run(() => {
		if ($gltf) {
			for (const node of nodeList) {
				if ($gltf.nodes[node].material) {
					let material = new MeshStandardMaterial()
					material.copy($gltf.nodes[node].material)
					texturedMaterials[node] = material
					texturedMaterials[node].transparent = true
					texturedMaterials[node].opacity = 0
				}
			}
		}
	});

	let material = $state(new MeshStandardMaterial({color: $color, transparent: true, opacity: $opacity, depthWrite: false}))
	run(() => {
		material.opacity = $opacity
	});

	// if selected, set the material to the textured material, set the opacity to 1
	run(() => {
		if ($component.selected == url) {
			texturedOpacity.set(1)
		} else {
			texturedOpacity.set(0)
		}
	});

	run(() => {
		if ($component.selected == url) {
			for (const node of nodeList) {
				if ($gltf?.nodes[node].material) {
					texturedMaterials[node].opacity = $texturedOpacity
				}
			}
		}
	});
	
</script>

{#if $gltf}
	<T.Group
		name={url}
	>
		{#each nodeList as node, i}
			<!-- <T
				is={$gltf.nodes[node]}
				transparent
				depthWrite={false}
				depthTest={false}
				scale={$scale}
				material={$component.selected == url ? texturedMaterials[node] : material}
			>
				<Outlines color="red" />
			</T> -->
			{#if $gltf.nodes[node].geometry}
				<T.Mesh
					geometry={$gltf.nodes[node].geometry}
					transparent
					material={$component.selected == url ? texturedMaterials[node] : material}
					renderOrder={i}
				>
					<!-- <Edges 
						color="white" 
						thickness="4" 
						thresholdAngle={15}
						screenspace
						transparent
						opacity={$component.hovered == url ? 0 : 1}
					/> -->
				</T.Mesh>
			{/if}
		{/each}
	</T.Group>
{/if}