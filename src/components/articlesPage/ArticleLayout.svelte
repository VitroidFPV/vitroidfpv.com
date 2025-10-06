<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<script lang="ts" module>
	import { img } from "./components.js"
	export { img }
</script>

<article>
	{@render children?.()}
</article>