<script lang="ts">
	export let title: string;
	export let color: string;
	export let deltaVotes: number = 0;

	import Rating from "$components/Rating.svelte";
</script>

<div class="flex flex-col md:flex-row items-center w-fit">
	<h1
		class="md:text-[130px] text-[70px] h-min w-fit mb-2 md:-ml-3 leading-none text-{color} duration-500">
		{title}
	</h1>
	<div>
		{#if deltaVotes != undefined && deltaVotes != 0}
			<Rating>{deltaVotes}</Rating>
		{/if}
	</div>
</div>