<script>
	export let color = "green";
	export let color1 = "green";
	export let size = "";
	export let href = "";
	export let external = false;
</script>

{#if external}
	<a
		target="_blank"
		rel="noopener noreferrer"
		href={href}
		class="{color} t-{color1} text-{size}xl link"><slot />
	</a>
{:else}
	<a
		href={href}
		class="{color} t-{color1} text-{size}xl link"><slot />
	</a>
{/if}