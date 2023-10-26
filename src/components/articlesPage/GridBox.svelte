<script lang="ts">
	export let title: string = "";
	export let level: 1 | 2 | 3 | 4 | 5 | 6 = null;
	export let cols: number = 2;

	export let classes: string = "";

	switch (cols) {
		case 2:
			classes += " grid-cols-2";
			break;
		case 3:
			classes += " grid-cols-2 md:grid-cols-3";
			break;
		case 4:
			classes += " grid-cols-2 md:grid-cols-4";
			break;
		default:
			classes += " grid-cols-2 md:grid-cols-2";
			break;
	}
</script>

<div>
	{#if level}
		<h{level} class="text-2xl colored">{title}</h{level}>
	{/if}
	<div class="grid {classes} gap-4">
		<slot />
	</div>
</div>