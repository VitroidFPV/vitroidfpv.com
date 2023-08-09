<script lang="ts">
	import Confetti from "svelte-confetti";
	import { tick } from "svelte";
	
	let active = false;
	let things: Object[] = []
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

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<span on:click={click} class="relative flex justify-center w-full">

	<slot/>


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