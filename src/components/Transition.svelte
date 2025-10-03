<script lang="ts">
	import { fly, fade } from "svelte/transition";
	interface Props {
		refresh?: string;
		children?: import('svelte').Snippet;
	}

	let { refresh = "", children }: Props = $props();
</script>

{#key refresh}
	<div in:fade={{duration: 500 }} class="w-full min-h-full relative">
		{@render children?.()}
	</div>
{/key}
