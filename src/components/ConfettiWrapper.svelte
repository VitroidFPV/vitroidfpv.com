<script lang="ts">
	import Confetti from "svelte-confetti";
	import { tick } from "svelte";
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
	
	let active = false;
	let things: Object[] = $state([])
	let timeout: any
	let duration = 1000

	interface Things {
		x: number
		y: number
		duration: number
	}

	async function click(event: MouseEvent) {
		// active = false
		// await tick()
		// active = true
		const { target, clientX, clientY } = event

		const elementY = target?.getBoundingClientRect().top
		const elementX = target?.getBoundingClientRect().left

		const x = clientX - elementX
		const y = clientY - elementY

		things = [...things, { x, y }]

		clearTimeout(timeout)

		timeout = setTimeout(() => things = [], duration)
	}


	// async function moveConfetti(event) {

	// }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<span onclick={click} class="relative flex justify-center w-full">

	{@render children?.()}


	{#each things as thing}
		<div class="absolute" style="left: {thing.x}px; top: {thing.y}px">
			<!-- <Confetti y={[-0.5, 0.5]} fallDistance=20px amount=10 {duration} /> -->
			<Confetti x={[-1, 1]} y={[-1, 1]} delay={[0, 50]} amount=100 fallDistance="100px" {duration} colorArray={["#90d95b", "#2ad162", "#87cc52", "#5ad8e6"]}/>
		</div>
	{/each}
</span>

<!-- <div class="box" on:click={moveConfetti}>
  <span>Click in me</span>

  {#each things as thing}
    <div class="mover" style="left: {thing.x}px; top: {thing.y}px">
      <Confetti y={[-0.5, 0.5]} fallDistance=20px amount=10 {duration} />
    </div>
  {/each}
</div> -->