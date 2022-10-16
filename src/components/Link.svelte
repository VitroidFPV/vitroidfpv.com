<script>
	export let color = "green";
	export let color1 = "green";
	export let size = "";
	export let link = "";
	export let external = false;
</script>

{#if external}
	<a
		target="_blank"
		rel="noopener noreferrer"
		href={link}
		class="{color} t-{color1} text-{size}xl link"><slot />
	</a>
{:else}
	<a
		href={link}
		class="{color} t-{color1} text-{size}xl link"><slot />
	</a>
{/if}