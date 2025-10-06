<script lang="ts">

	import Rating from "$components/Rating.svelte";
	interface Props {
		title: string;
		color: string;
		deltaVotes?: number;
	}

	let { title, color, deltaVotes = 0 }: Props = $props();
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