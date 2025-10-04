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

	switch (size) {
		case "1":
			size = "text-xl!";
			break;
		case "2":
			size = "text-2xl!";
			break;
		case "3":
			size = "text-3xl!";
			break;
		case "4":
			size = "text-4xl!";
			break;
		case "5":
			size = "text-5xl!";
			break;
		default:
			size = "text-xl!";
			break;
	}
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
	class="{color} t-{color1} link {size}"
>
	{@render children?.()}
</a>