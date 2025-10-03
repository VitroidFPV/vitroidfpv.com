<script lang="ts">
	import { slide } from "svelte/transition"

	interface Props {
		title: string;
		open?: boolean;
		children?: import('svelte').Snippet;
	}

	let { title, open = $bindable(false), children }: Props = $props();
</script>

<div>
	<button onclick={() => open = !open}>
		<div class="flex">{title}</div>
	</button>
	{#if open}
		<div transition:slide={{duration: 500}}>{@render children?.()}</div>
	{/if}
</div>