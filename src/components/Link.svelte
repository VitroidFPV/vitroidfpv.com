<script lang="ts">
	interface Props {
		color?: string;
		color1?: string;
		size?: string;
		href?: string;
		external?: boolean;
		preload?: boolean;
		children?: import('svelte').Snippet;
	}

	let {
		color = "green",
		color1 = "green",
		size = "",
		href = "",
		external = false,
		preload = false,
		children
	}: Props = $props();
</script>

<!-- {#if external}
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
{/if} -->

<a
	target={external ? "_blank" : ""}
	rel={external ? "noopener noreferrer" : ""}
	data-sveltekit-preload-data={preload ? "hover" : "off"}
	{href}
	class="{color} t-{color1} text-{size}xl link"
>
	{@render children?.()}
</a>