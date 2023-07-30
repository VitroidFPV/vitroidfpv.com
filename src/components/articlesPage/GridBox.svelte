<script lang="ts">
	export let title: string = "";
	export let level: 1 | 2 | 3 | 4 | 5 | 6 = 1;
	export let cols: number = 2;

	let classes: string = "";

	switch (cols) {
		case 2:
			classes = "grid-cols-2";
			break;
		case 3:
			classes = "grid-cols-2 md:grid-cols-3";
			break;
		case 4:
			classes = "grid-cols-2 md:grid-cols-4";
			break;
		default:
			classes = "grid-cols-2 md:grid-cols-2";
			break;
	}
</script>

<div>
	<!-- header level from the level variable -->
	{#if level === 1}
		<h1 class="text-2xl colored">{title}</h1>
	{/if}
	{#if level === 2}
		<h2 class="text-2xl colored">{title}</h2>
	{/if}
	{#if level === 3}
		<h3 class="text-2xl colored">{title}</h3>
	{/if}
	{#if level === 4}
		<h4 class="text-2xl colored">{title}</h4>
	{/if}
	{#if level === 5}
		<h5 class="text-2xl colored">{title}</h5>
	{/if}
	{#if level === 6}
		<h6 class="text-2xl colored">{title}</h6>
	{/if}
	<div class="grid {classes} gap-4">
		<slot />
	</div>
</div>