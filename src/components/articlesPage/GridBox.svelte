<script lang="ts">

	interface Props {
		title?: string;
		level?: 1 | 2 | 3 | 4 | 5 | 6;
		cols?: number;
		classes?: string;
		children?: import('svelte').Snippet;
	}

	let {
		title = "",
		level = null,
		cols = 2,
		classes = $bindable(""),
		children
	}: Props = $props();

	switch (cols) {
		case 2:
			classes += " grid-cols-1 md:grid-cols-2";
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
		{#if level === 1}
			<h1 class="text-2xl colored">{title}</h1>
		{:else if level === 2}
			<h2 class="text-2xl colored">{title}</h2>
		{:else if level === 3}
			<h3 class="text-2xl colored">{title}</h3>
		{:else if level === 4}
			<h4 class="text-2xl colored">{title}</h4>
		{:else if level === 5}
			<h5 class="text-2xl colored">{title}</h5>
		{:else if level === 6}
			<h6 class="text-2xl colored">{title}</h6>
		{/if}
	{/if}
	<div class="grid {classes} gap-4">
		{@render children?.()}
	</div>
</div>